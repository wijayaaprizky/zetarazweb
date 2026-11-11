'use client';

import React, { useState } from 'react';
import { Columns, AlignJustify, Plus, Minus, Check } from 'lucide-react';

interface DiffViewerProps {
  publishedContent: string | null;
  draftContent: string;
  publishedVersion: number;
  draftVersion: number;
}

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
  lineNumLeft?: number;
  lineNumRight?: number;
}

export default function DiffViewer({
  publishedContent,
  draftContent,
  publishedVersion,
  draftVersion,
}: DiffViewerProps) {
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const oldLines = (publishedContent || '').split('\n');
  const newLines = (draftContent || '').split('\n');

  // Compute clean line-by-line diff
  const diffs: DiffLine[] = [];
  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;

  // Simple Longest Common Subsequence or line comparison
  const maxLen = Math.max(oldLines.length, newLines.length);
  const oldSet = new Set(oldLines);
  const newSet = new Set(newLines);

  let oldIdx = 0;
  let newIdx = 0;

  while (oldIdx < oldLines.length || newIdx < newLines.length) {
    const oldLine = oldLines[oldIdx];
    const newLine = newLines[newIdx];

    if (oldLine === newLine) {
      diffs.push({
        type: 'unchanged',
        text: oldLine,
        lineNumLeft: oldIdx + 1,
        lineNumRight: newIdx + 1,
      });
      oldIdx++;
      newIdx++;
      unchangedCount++;
    } else if (newLine !== undefined && !oldSet.has(newLine)) {
      diffs.push({
        type: 'added',
        text: newLine,
        lineNumRight: newIdx + 1,
      });
      newIdx++;
      addedCount++;
    } else if (oldLine !== undefined && !newSet.has(oldLine)) {
      diffs.push({
        type: 'removed',
        text: oldLine,
        lineNumLeft: oldIdx + 1,
      });
      oldIdx++;
      removedCount++;
    } else {
      // Displaced lines
      if (oldLine !== undefined) {
        diffs.push({
          type: 'removed',
          text: oldLine,
          lineNumLeft: oldIdx + 1,
        });
        oldIdx++;
        removedCount++;
      }
      if (newLine !== undefined) {
        diffs.push({
          type: 'added',
          text: newLine,
          lineNumRight: newIdx + 1,
        });
        newIdx++;
        addedCount++;
      }
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Perbandingan Versi Konten
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300">
              v{publishedVersion} (Publik) ➔ v{draftVersion} (Draf)
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-300 mt-1 font-mono">
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <Plus className="w-3.5 h-3.5" /> +{addedCount} baris ditambah
            </span>
            <span className="text-rose-400 flex items-center gap-1 font-semibold">
              <Minus className="w-3.5 h-3.5" /> -{removedCount} baris dihapus
            </span>
            <span className="text-slate-400">
              {unchangedCount} baris tidak berubah
            </span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-800 rounded-xl p-1 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'split'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('unified')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'unified'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <AlignJustify className="w-3.5 h-3.5" />
            <span>Unified Diff</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side View */}
      {viewMode === 'split' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-xs font-mono">
          {/* Left: Published Version */}
          <div>
            <div className="bg-slate-100 p-2.5 font-sans font-bold text-slate-700 text-xs border-b border-slate-200 flex justify-between items-center">
              <span>Versi Publik Terbit (v{publishedVersion})</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Live di Website
              </span>
            </div>
            <div className="max-h-[500px] overflow-y-auto p-4 space-y-1 bg-slate-50/50">
              {publishedContent ? (
                oldLines.map((line, idx) => {
                  const isRemoved = !newSet.has(line);
                  return (
                    <div
                      key={idx}
                      className={`py-0.5 px-2 rounded flex gap-2 ${
                        isRemoved
                          ? 'bg-red-100 text-red-900 border-l-2 border-red-500'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="text-slate-400 select-none w-8 text-right shrink-0">
                        {idx + 1}
                      </span>
                      <span className="whitespace-pre-wrap break-words">{line || ' '}</span>
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-400 italic p-4 text-center">
                  Belum ada versi yang dipublikasikan (Artikel Draf Baru).
                </div>
              )}
            </div>
          </div>

          {/* Right: Draft Version */}
          <div>
            <div className="bg-teal-50 p-2.5 font-sans font-bold text-brand-teal text-xs border-b border-teal-100 flex justify-between items-center">
              <span>Draf Google Docs Terbaru (v{draftVersion})</span>
              <span className="text-[10px] uppercase tracking-wider text-teal-600 bg-teal-100 px-1.5 py-0.5 rounded">
                Pending Approval
              </span>
            </div>
            <div className="max-h-[500px] overflow-y-auto p-4 space-y-1 bg-white">
              {newLines.map((line, idx) => {
                const isAdded = !oldSet.has(line);
                return (
                  <div
                    key={idx}
                    className={`py-0.5 px-2 rounded flex gap-2 ${
                      isAdded
                        ? 'bg-emerald-50 text-emerald-900 border-l-2 border-emerald-500 font-medium'
                        : 'text-slate-700'
                    }`}
                  >
                    <span className="text-slate-400 select-none w-8 text-right shrink-0">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre-wrap break-words">{line || ' '}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Unified Diff View */
        <div className="max-h-[500px] overflow-y-auto p-4 text-xs font-mono space-y-0.5 bg-slate-900 text-slate-100">
          {diffs.map((d, idx) => {
            if (d.type === 'added') {
              return (
                <div
                  key={idx}
                  className="bg-emerald-950/60 text-emerald-300 py-0.5 px-2 rounded flex gap-2 border-l-2 border-emerald-500"
                >
                  <span className="text-emerald-500 font-bold select-none">+</span>
                  <span className="text-slate-500 select-none w-8 text-right">
                    {d.lineNumRight}
                  </span>
                  <span className="whitespace-pre-wrap break-words">{d.text}</span>
                </div>
              );
            }
            if (d.type === 'removed') {
              return (
                <div
                  key={idx}
                  className="bg-rose-950/60 text-rose-300 py-0.5 px-2 rounded flex gap-2 border-l-2 border-rose-500"
                >
                  <span className="text-rose-500 font-bold select-none">-</span>
                  <span className="text-slate-500 select-none w-8 text-right">
                    {d.lineNumLeft}
                  </span>
                  <span className="whitespace-pre-wrap break-words line-through opacity-80">
                    {d.text}
                  </span>
                </div>
              );
            }
            return (
              <div key={idx} className="py-0.5 px-2 flex gap-2 text-slate-400">
                <span className="select-none text-transparent"> </span>
                <span className="text-slate-600 select-none w-8 text-right">
                  {d.lineNumRight || d.lineNumLeft}
                </span>
                <span className="whitespace-pre-wrap break-words text-slate-300">
                  {d.text}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
