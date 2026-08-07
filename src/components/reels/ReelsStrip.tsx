"use client";

import ReelPlayer from "./ReelPlayer";
import type { ProjectVideo } from "@/data/projects";
import styles from "./ReelsStrip.module.css";

interface ReelsStripProps {
  reels: ProjectVideo[];
}

export default function ReelsStrip({ reels }: ReelsStripProps) {
  return (
    <div className={styles.strip} role="list">
      {reels.map((video, index) => (
        <div key={video.id} role="listitem" className={styles.item}>
          <ReelPlayer
            video={video}
            autoPlayWhenVisible={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
