'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Trash2, Code2, Sparkles, AlertCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner'; // Import your reusable AdBanner component

const SPECIAL_ATTRIBUTES: Record<string, string> = {
  'class': 'className',
  'for': 'htmlFor',
  'xmlns:xlink': 'xmlnsXlink',
  'xml:space': 'xmlSpace',
  'xml:lang': 'xmlLang',
  'xml:base': 'xmlBase',
};

export default function SvgToJsxConverter() {
  const [inputSvg, setInputSvg] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [stripComments, setStripComments] = useState<boolean>(true);
  const [componentName, setComponentName] = useState<string>('Icon');

  const { outputJsx, error } = useMemo(() => {
    if (!inputSvg.trim()) {
      return { outputJsx: '', error: '' };
    }

    try {
      let cleaned = inputSvg;

      if (stripComments) {
        cleaned = cleaned
          .replace(/<\?xml.*?\?>/gi, '')
          .replace(/<!--[\s\S]*?-->/g, '')
          .replace(/<!DOCTYPE.*?>/gi, '');
      }

      if (!cleaned.includes('<svg')) {
        return { 
          outputJsx: '', 
          error: 'Please enter valid SVG code containing an <svg> tag.' 
        };
      }

      // 1. Convert attributes from kebab-case to camelCase
      let jsxBody = cleaned.replace(
        /([a-zA-Z0-9:-]+)=(["'])(.*?)\2/g,
        (match: string, attrName: string, quote: string, value: string) => {
          if (SPECIAL_ATTRIBUTES[attrName]) {
            return `${SPECIAL_ATTRIBUTES[attrName]}=${quote}${value}${quote}`;
          }
          // Explicitly typed parameters (_: string, char: string) to pass TS check
          const camelCased = attrName.replace(/[-:]([a-z0-9])/gi, (_: string, char: string) =>
            char.toUpperCase()
          );
          return `${camelCased}=${quote}${value}${quote}`;
        }
      );

      // 2. Inject {...props} into the opening <svg> tag
      jsxBody = jsxBody.replace(/<svg([^>]*)>/i, '<svg$1 {...props}>');

      // 3. Wrap in component structure
      const safeName = componentName.replace(/[^a-zA-Z0-9]/g, '') || 'Icon';
      const result = `export const ${safeName} = (props: React.SVGProps<SVGSVGElement>) => (\n  ${jsxBody.trim()}\n);`;

      return { outputJsx: result, error: '' };
    } catch (err) {
      return { outputJsx: '', error: 'Error parsing SVG. Check markup syntax.' };
    }
  }, [inputSvg, stripComments, componentName]);

  const handleCopy = () => {
    if (!outputJsx) return;
    navigator.clipboard.writeText(outputJsx);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-indigo-400" />
          <h1 className="font-bold text-lg tracking-tight">SVG2JSX</h1>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
            Free Utility
          </span>
        </div>
      </header>

      {/* Top Ad Unit */}
      <div className="w-full max-w-5xl mx-auto mt-4 px-4 min-h-[90px]">
        <AdBanner dataAdSlot="1234567890" /> {/* Replace with your Top Ad Slot ID */}
      </div>

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-4">
            <label className="text-xs text-slate-400 flex items-center gap-2">
              Component Name:
              <input
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 w-32"
              />
            </label>

            <label className="text-xs text-slate-400 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={stripComments}
                onChange={(e) => setStripComments(e.target.checked)}
                className="rounded border-slate-700 text-indigo-600 focus:ring-0 bg-slate-950"
              />
              Strip Comments & Headers
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setInputSvg('')}
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
            <button
              onClick={handleCopy}
              disabled={!outputJsx}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy JSX'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[420px]">
          {/* Input Editor */}
          <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-950/50 px-4 py-2.5 border-b border-slate-800 text-xs font-medium text-slate-400">
              Input SVG
            </div>
            <textarea
              value={inputSvg}
              onChange={(e) => setInputSvg(e.target.value)}
              placeholder="Paste raw <svg> markup here..."
              className="flex-1 bg-transparent p-4 font-mono text-xs text-slate-200 resize-none focus:outline-none focus:ring-0 border-none"
            />
          </div>

          {/* Output Editor */}
          <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-950/50 px-4 py-2.5 border-b border-slate-800 text-xs font-medium text-slate-400 flex items-center justify-between">
              <span>JSX Output</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <textarea
              readOnly
              value={outputJsx}
              placeholder="JSX component will generate automatically..."
              className="flex-1 bg-transparent p-4 font-mono text-xs text-indigo-200/90 resize-none focus:outline-none border-none"
            />
          </div>
        </div>
      </main>

      {/* Footer Ad Unit */}
      <footer className="mt-auto py-4 border-t border-slate-900 bg-slate-950/80">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-2">
          <div className="w-full min-h-[90px]">
            <AdBanner dataAdSlot="0987654321" />
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>&copy; {new Date().getFullYear()} SVG2JSX</span>
            <span>&bull;</span>
            <a href="/privacy" className="hover:text-slate-300 transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}