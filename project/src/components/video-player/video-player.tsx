import { useState, useEffect, useRef } from 'react';
import { PLAYING_DELAY } from '../../utils/constants';

type VideoPlayerProps = {
  isActive: boolean;
  src: string;
  poster: string;
};

function VideoPlayer({ isActive, src, poster }: VideoPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(()=>{
    let isMounted = true;
    let timer:ReturnType<typeof setTimeout>;

    if(isMounted && isActive){
      timer = setTimeout(setIsPlaying, PLAYING_DELAY, isActive);
    }

    return()=>{
      clearTimeout(timer);
      isMounted = false;
    };

  },[isActive]);

  useEffect(()=>{
    if(videoRef.current === null){
      return;
    }
    if(isPlaying){
      videoRef.current.play();
      return;
    }
    videoRef.current.pause();
  },[isPlaying]);

  return <video ref = {videoRef} data-testid="video-element" src={src} poster={poster} width="280" height="175" autoPlay loop muted />;
}

export default VideoPlayer;
