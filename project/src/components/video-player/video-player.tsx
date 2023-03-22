import { useState, useEffect, useRef } from 'react';
import { PLAYING_DELAY } from '../../utils/constants';

type VideoPlayerProps = {
  isActive: boolean;
  src: string;
  poster: string;
};

function VideoPlayer({ isActive, src, poster }: VideoPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(isActive);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(()=>{
    let isMounted = true;
    let timer:ReturnType<typeof setTimeout>;
    if(videoRef.current === null){
      return;
    }

    if(isMounted && isPlaying){
      timer = setTimeout(()=>setIsPlaying(true),PLAYING_DELAY);
    }
    if(isMounted && !isPlaying){
      setIsPlaying(false);
    }

    if(isPlaying){
      videoRef.current.play();
      return;
    }
    videoRef.current.pause();

    return()=>{
      clearTimeout(timer);
      isMounted = false;
    };

  },[ isPlaying]);

  return <video ref = {videoRef} src={src} poster={poster} width="280" height="175" loop muted />;
}

export default VideoPlayer;
