"use client";

import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Refresh() {
  const router = useRouter();
  return (
    <button
      className="pointer-events-auto inset-0 flex items-center gap-2 rounded-sm px-2 sm:h-8"
      onClick={() => {
        router.refresh();
      }}
    >
      <span className="hidden font-semibold sm:inline">REFRESH</span>
      <RotateCcw className="size-5 transform rounded-md transition-transform duration-300 ease-in-out sm:size-8 sm:hover:-rotate-180" />
    </button>
  );
}
