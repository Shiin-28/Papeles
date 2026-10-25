"use client";

import { MotionConfig } from "motion/react";

/** Respects the OS "reduce motion" setting for every animation in the app. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
