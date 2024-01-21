"use client";

import { useEffect } from "react";
export const AppAudio = ({ tts }: any) => {
  useEffect(() => {
    if (tts) {
      const audio = document.getElementById("tss_audio") as HTMLAudioElement;
      audio.play();
    }
  }, [tts]);

  return (
    <audio id="tss_audio" controls>
      <source src={tts.oss_url} type="audio/wav" />
      Your browser does not support the audio tag.
    </audio>
  );
};
