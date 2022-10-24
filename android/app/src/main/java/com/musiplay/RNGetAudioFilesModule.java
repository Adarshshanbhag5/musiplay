package com.musiplay;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.content.ContextWrapper;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaMetadataRetriever;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import android.os.Environment;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;


public class RNGetAudioFilesModule extends ReactContextBaseJavaModule {

    public String coverFolder = "/";
    public double coverResizeRatio = 1;
    public int coverSize = 0;
    public boolean getCoverFromSongs = true;

    public RNGetAudioFilesModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "RNGetAudioFiles";
    }

    public String saveImageToStorageAndGetPath(String pathToImg, Bitmap songImage) throws IOException {
        try{

            if (songImage != null) {
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                songImage.compress(Bitmap.CompressFormat.JPEG, 10, byteArrayOutputStream);
                byte[] byteArray = byteArrayOutputStream.toByteArray();
                String encodedImage = Base64.encodeToString(byteArray, Base64.DEFAULT);
                byte[] imageByte = Base64.decode(encodedImage, Base64.DEFAULT);

                if(byteArray != null) {
                    saveToStorage(pathToImg, imageByte);

                    return pathToImg;
                }
            }

        } catch (IOException e){
            Log.e("Error savingImageAfter",e.getMessage());
        }

        return "";
    }

    public void saveToStorage(String pathToImg, byte[] imageBytes) throws IOException {
        FileOutputStream fos = null;
        try {
            File filePath = new File(pathToImg);
            fos = new FileOutputStream(filePath, true);
            fos.write(imageBytes);
        } catch (IOException e){
            Log.e("Error saving image => ",e.getMessage());
        } finally {
            if (fos != null) {
                fos.flush();
                fos.close();
            }
        }
    }

    public void getCoverByPath( String coverFolder, Double coverResizeRatio, int coverSize, String songPath, long songId, WritableMap items) {
        MediaMetadataRetriever mmrr = new MediaMetadataRetriever();
        String encoded = "";
        try {
            mmrr.setDataSource(songPath);
            byte[] albumImageData = mmrr.getEmbeddedPicture();

            if (albumImageData != null) {
                Bitmap songImage = BitmapFactory.decodeByteArray(albumImageData, 0, albumImageData.length);
                Bitmap resized = songImage;
                if (coverResizeRatio != 1 && coverSize == 0) {
                    resized = Bitmap.createScaledBitmap(songImage, (int) (songImage.getWidth() * coverResizeRatio),
                            (int) (songImage.getHeight() * coverResizeRatio), true);
                }

                if (coverSize != 0) {
                    resized = Bitmap.createScaledBitmap(songImage, coverSize, coverSize, true);
                }

                try {
                    ContextWrapper contextWrapper = new ContextWrapper(getReactApplicationContext());
                    File musicDir = contextWrapper.getExternalFilesDir(Environment.DIRECTORY_MUSIC);
                    File covers = new File(musicDir + File.separator + coverFolder
                            + File.separator + "covers");
                    boolean success = true;
                    if (!covers.exists()) {
                        success = covers.mkdirs();
                    }
                    if (success) {
                        String pathToImg = covers.getAbsolutePath() + "/covers" + songId + ".jpg";
                        encoded = saveImageToStorageAndGetPath(pathToImg, resized);
                        items.putString("cover", "file://" + encoded);
                    } else {
                        // Do something else on failure
                        Log.e("faiure","no success failure");
                    }

                } catch (Exception e) {
                    // Just let images empty
                    Log.e("error in image", e.getMessage());
                }

            }

        }catch (Exception e) {
            Log.e("embedImage", "No embed image");
        }

    }

    public void coverCheck(String songPath, long songId, WritableMap items){
        ContextWrapper contextWrapper = new ContextWrapper(getReactApplicationContext());
        File musicDir = contextWrapper.getExternalFilesDir(Environment.DIRECTORY_MUSIC);
        File covers = new File(musicDir + File.separator + coverFolder + File.separator + "covers");
        String pathToImg = covers.getAbsolutePath() + "/covers" + songId + ".jpg";
        File file = new File(pathToImg);
        if(!file.exists()){
            getCoverByPath( coverFolder, coverResizeRatio, coverSize, songPath, songId, items);
        }
        else{
            items.putString("cover","file://" + pathToImg );
        }

    }


    @ReactMethod
    public void getSong(ReadableMap options, final Callback successCallback, final Callback errorCallback) {

        if (options.hasKey("coverFolder")) {
            coverFolder = options.getString("coverFolder");
        }

        if (options.hasKey("cover")) {
            getCoverFromSongs = options.getBoolean("cover");
        }

        if (options.hasKey("coverResizeRatio")) {
            coverResizeRatio = options.getDouble("coverResizeRatio");
        }

        if (options.hasKey("coverSize")) {
            coverSize = options.getInt("coverSize");
        }

        WritableArray jsonArray = new WritableNativeArray();

        if (options.hasKey("artist") && !options.hasKey("album")) {
            String[] projection = new String[] { MediaStore.Audio.Media.TITLE, MediaStore.Audio.Media.ARTIST,
                    MediaStore.Audio.Media.ALBUM, MediaStore.Audio.Media.DURATION, MediaStore.Audio.Media.DATA,
                    MediaStore.Audio.Media._ID };

            Cursor cursor = getCurrentActivity().getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                    projection, MediaStore.Audio.Albums.ARTIST + " Like ?",
                    new String[] { "%" + options.getString("artist") + "%" }, null);
            if (cursor != null && cursor.getCount() > 0) {
                int idColumn = cursor.getColumnIndex(android.provider.MediaStore.Audio.Media._ID);
                cursor.moveToFirst();
                do {
                    WritableMap item = new WritableNativeMap();
                    item.putString("title", String.valueOf(cursor.getString(0)));
                    item.putString("artist", String.valueOf(cursor.getString(1)));
                    item.putString("album", String.valueOf(cursor.getString(2)));
                    item.putString("duration", String.valueOf(cursor.getString(3)));
                    item.putString("path", String.valueOf(cursor.getString(4)));
                    item.putString("id", String.valueOf(cursor.getString(5)));
                    String songPath = cursor.getString(4);
                    long id = cursor.getLong(idColumn);
                    //getCoverByPath( coverFolder, coverResizeRatio, coverSize, songPath, id, item);
                    coverCheck(songPath,id,item);
                    jsonArray.pushMap(item);
                } while (cursor.moveToNext());
            } else {
                String msg = "cursor is either null or empty ";
                Log.e("Musica", msg);
            }
            Log.e("MusicaAlbums", String.valueOf(jsonArray));
            cursor.close();
            successCallback.invoke(jsonArray);
        }

        if (!options.hasKey("artist") && options.hasKey("album")) {
            String[] projection = new String[] { MediaStore.Audio.Media.TITLE, MediaStore.Audio.Media.ARTIST,
                    MediaStore.Audio.Media.ALBUM, MediaStore.Audio.Media.DURATION, MediaStore.Audio.Media.DATA,
                    MediaStore.Audio.Media._ID };

            Cursor cursor = getCurrentActivity().getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                    projection, MediaStore.Audio.Albums.ALBUM + " Like ?", new String[] { "%" + options.getString("album") + "%" },
                    null);
            if (cursor != null && cursor.getCount() > 0) {
                int idColumn = cursor.getColumnIndex(android.provider.MediaStore.Audio.Media._ID);
                cursor.moveToFirst();
                do {
                    WritableMap item = new WritableNativeMap();
                    item.putString("title", String.valueOf(cursor.getString(0)));
                    item.putString("artist", String.valueOf(cursor.getString(1)));
                    item.putString("album", String.valueOf(cursor.getString(2)));
                    item.putString("duration", String.valueOf(cursor.getString(3)));
                    item.putString("path", String.valueOf(cursor.getString(4)));
                    item.putString("id", String.valueOf(cursor.getString(5)));
                    long id = cursor.getLong(idColumn);
                    String songPath = cursor.getString(4);
                    //getCoverByPath( coverFolder, coverResizeRatio, coverSize, songPath, id, item);
                    coverCheck(songPath,id,item);
                    jsonArray.pushMap(item);
                } while (cursor.moveToNext());
            } else {
                String msg = "cursor is either null or empty ";
                Log.e("Musica", msg);
            }
            Log.e("MusicaAlbums", String.valueOf(jsonArray));
            cursor.close();
            successCallback.invoke(jsonArray);
        }

        if (!options.hasKey("artist") && !options.hasKey("album")) {
            String[] projection = new String[] { MediaStore.Audio.Media.TITLE, MediaStore.Audio.Media.ARTIST,
                    MediaStore.Audio.Media.ALBUM, MediaStore.Audio.Media.DURATION, MediaStore.Audio.Media.DATA,
                    MediaStore.Audio.Media._ID };

            Cursor cursor = getCurrentActivity().getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                    projection, MediaStore.Audio.Media.IS_MUSIC + "!= 0", null, null);
            if (cursor != null && cursor.getCount() > 0) {
                int idColumn = cursor.getColumnIndex(android.provider.MediaStore.Audio.Media._ID);
                cursor.moveToFirst();
                do {
                    WritableMap item = new WritableNativeMap();
                    item.putString("title", String.valueOf(cursor.getString(0)));
                    item.putString("artist", String.valueOf(cursor.getString(1)));
                    item.putString("album", String.valueOf(cursor.getString(2)));
                    item.putString("duration", String.valueOf(cursor.getString(3)));
                    item.putString("path", String.valueOf(cursor.getString(4)));
                    item.putString("id", String.valueOf(cursor.getString(5)));
                    long id = cursor.getLong(idColumn);
                    String songPath = cursor.getString(4);
                    //getCoverByPath( coverFolder, coverResizeRatio, coverSize, songPath, id, item);
                    coverCheck(songPath,id,item);
                    jsonArray.pushMap(item);
                } while (cursor.moveToNext());
            } else {
                String msg = "cursor is either null or empty ";
                Log.e("Musica", msg);
            }
            Log.e("MusicaAlbums", String.valueOf(jsonArray));
            cursor.close();
            successCallback.invoke(jsonArray);
        }

        if (options.hasKey("artist") && options.hasKey("album")) {
            String[] projection = new String[] { MediaStore.Audio.Media.TITLE, MediaStore.Audio.Media.ARTIST,
                    MediaStore.Audio.Media.ALBUM, MediaStore.Audio.Media.DURATION, MediaStore.Audio.Media.DATA,
                    MediaStore.Audio.Media._ID };

            Cursor cursor = getCurrentActivity().getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                    projection,
                    MediaStore.Audio.Albums.ARTIST + " Like ? AND " + MediaStore.Audio.Albums.ALBUM + " Like ?",
                    new String[] { "%" + options.getString("artist") + "%", "%" + options.getString("album") + "%"}, null);
            if (cursor != null && cursor.getCount() > 0) {
                int idColumn = cursor.getColumnIndex(android.provider.MediaStore.Audio.Media._ID);
                cursor.moveToFirst();
                do {
                    WritableMap item = new WritableNativeMap();
                    item.putString("title", String.valueOf(cursor.getString(0)));
                    item.putString("artist", String.valueOf(cursor.getString(1)));
                    item.putString("album", String.valueOf(cursor.getString(2)));
                    item.putString("duration", String.valueOf(cursor.getString(3)));
                    item.putString("path", String.valueOf(cursor.getString(4)));
                    item.putString("id", String.valueOf(cursor.getString(5)));
                    long id = cursor.getLong(idColumn);
                    String songPath = cursor.getString(4);
                    //getCoverByPath( coverFolder, coverResizeRatio, coverSize, songPath, id, item);
                    coverCheck(songPath,id,item);
                    jsonArray.pushMap(item);
                } while (cursor.moveToNext());
            } else {
                String msg = "cursor is either null or empty ";
                Log.e("Musica", msg);
            }
            Log.e("MusicaAlbums", String.valueOf(jsonArray));
            cursor.close();
            successCallback.invoke(jsonArray);
        }
    }
}
