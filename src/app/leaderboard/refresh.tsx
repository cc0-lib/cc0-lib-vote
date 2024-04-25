"use client";

import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Refresh() {
  const router = useRouter();
  return (
    <button className="pointer-events-auto">
      <RotateCcw
        onClick={() => {
          router.refresh();
        }}
      />
    </button>
  );
}
