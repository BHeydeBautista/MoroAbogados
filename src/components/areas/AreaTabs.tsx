"use client";
import React from "react";

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AreaTabs({ tabs, activeTab, onTabChange }: Props) {
  return (
    <nav role="tablist" aria-label="Áreas de derecho" className="bg-blue-900 text-white shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center px-4 py-3 space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            tabIndex={activeTab === tab ? 0 : -1}
            onClick={() => onTabChange(tab)}
            className={`px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 rounded-t-md
              ${
                activeTab === tab
                  ? "border-b-4 border-yellow-400 text-yellow-400 bg-blue-800"
                  : "hover:text-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
