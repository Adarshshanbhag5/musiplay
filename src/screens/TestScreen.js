import React, {useState} from 'react';
import {Image, Text, useWindowDimensions, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  cancelAnimation,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import QueueListView from '../components/QueueListView';
import TrackPlayer from 'react-native-track-player';

function clamp(value, lowerBound, upperBound) {
  'worklet';
  return Math.max(lowerBound, Math.min(value, upperBound));
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  // console.log(array);
  return array;
}

const ALBUM_COVERS = {
  DISCOVERY:
    'https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.jpg',
  HUMAN_AFTER_ALL:
    'https://upload.wikimedia.org/wikipedia/en/0/0d/Humanafterall.jpg',
  HOMEWORK:
    'https://upload.wikimedia.org/wikipedia/en/9/9c/Daftpunk-homework.jpg',
  RANDOM_ACCESS_MEMORIES:
    'https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg',
};

const DAFT_PUNK = 'Daft Punk';

const SONGS = [
  {
    id: 'one-more-time',
    title: 'One More Time',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'digital-love',
    title: 'Digital Love',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'nightvision',
    title: 'Nightvision',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'something-about-us',
    title: 'Something About Us',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'veridis-quo',
    title: 'Veridis Quo',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'make-love',
    title: 'Make Love',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
  },
  {
    id: 'television-rules-the-nation',
    title: 'Television Rules the Nation',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
  },
  {
    id: 'phoenix',
    title: 'Phoenix',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: 'revolution-909',
    title: 'Revolution 909',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: 'around-the-world',
    title: 'Around the World',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: 'within',
    title: 'Within',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'touch',
    title: 'Touch (feat. Paul Williams)',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'beyond',
    title: 'Beyond',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'motherboard',
    title: 'Motherboard',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'axis',
    title: 'axis',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'cry',
    title: 'cry',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'branch',
    title: 'branch',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'case',
    title: 'case',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'active',
    title: 'active',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'aids',
    title: 'aids',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'brand',
    title: 'brand',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'requirement',
    title: 'requirement',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'maid',
    title: 'maid',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'scream',
    title: 'scream',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'rocket',
    title: 'rocket',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'forest',
    title: 'forest',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'fraction',
    title: 'fraction',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'quarter',
    title: 'quarter',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'facade',
    title: 'facade',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'professional',
    title: 'professional',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'firm',
    title: 'firm',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'reign',
    title: 'reign',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
];

const SONG_HEIGHT = 90;
const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT + 200;

function objectMove(object, from, to, queue) {
  'worklet';
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }
  let temp = queue[from];
  queue[from] = queue[to];
  queue[to] = temp;

  return newObject;
}

function listToObject(list) {
  const values = Object.values(list);
  const object = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
}

function Song({artist, cover, title}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: SONG_HEIGHT,
        padding: 10,
      }}>
      <Image
        source={{uri: cover}}
        style={{height: 50, width: 50, borderRadius: 4}}
      />

      <View
        style={{
          marginLeft: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4,
          }}>
          {title}
        </Text>

        <Text style={{fontSize: 12, color: 'gray'}}>{artist}</Text>
      </View>
    </View>
  );
}

function MovableSong({
  id,
  artist,
  cover,
  title,
  album,
  duration,
  queue,
  positions,
  scrollY,
  songsCount,
}) {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * SONG_HEIGHT);

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SONG_HEIGHT);
        }
      }
    },
    [moving],
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // Scroll up
        scrollY.value = withTiming(0, {duration: 80});
      } else if (
        positionY >=
        scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD
      ) {
        // Scroll down
        const contentHeight = songsCount * SONG_HEIGHT;
        const containerHeight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;
        scrollY.value = withTiming(maxScroll, {duration: 80});
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      });

      const newPosition = clamp(
        Math.floor(positionY / SONG_HEIGHT),
        0,
        songsCount - 1,
      );

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPosition,
          queue,
        );
      }
    },
    onFinish() {
      top.value = positions.value[id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowColor: '#fff',
      elevation: withSpring(moving ? 2 : 0),
      shadowRadius: 10,
      //   borderRadius: 5,
      borderWidth: 1,
      //   borderColor: 'blue',
    };
  }, [moving]);

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{maxWidth: '90%'}}>
          {/* <Song artist={artist} cover={cover} title={title} /> */}
          <QueueListView
            artist={artist}
            album={album}
            duration={duration}
            artwork={cover}
            title={title}
            height={`${SONG_HEIGHT}`}
          />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

export default function TestScreen({queue}) {
  const positions = useSharedValue(listToObject(queue));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();

  useAnimatedReaction(
    () => scrollY.value,
    scrolling => scrollTo(scrollViewRef, 0, scrolling, false),
  );

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#111',
        }}
        contentContainerStyle={{
          height: queue.length * SONG_HEIGHT,
        }}>
        {queue.map(song => (
          <MovableSong
            queue={queue}
            key={song.id}
            id={song.id}
            artist={song.artist}
            cover={song.artwork}
            title={song.title}
            album={song.album}
            duration={song.duration}
            positions={positions}
            scrollY={scrollY}
            songsCount={queue.length}
          />
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
