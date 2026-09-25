"use client";

import { useEffect, useState } from "react";
import { isServerOpen } from "@/lib/launch";

type LaunchGateProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function LaunchGate({ children, fallback = null }: LaunchGateProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function sync() {
      setOpen(isServerOpen(new Date()));
    }

    sync();
    const intervalId = window.setInterval(sync, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return open ? children : fallback;
}
