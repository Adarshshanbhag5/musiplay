import {useEffect, useState} from 'react';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

export default function useCurrentTrack() {
  const [index, setIndex] = useState();
  const [track, setTrack] = useState();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async ({nextTrack}) => {
    setIndex(nextTrack);
  });
  useEffect(() => {
    if (index === undefined) return;
    (async () => {
      const track = await TrackPlayer.getTrack(index);
      setTrack(track);
    })();
  }, [index]);

  return track;
}
