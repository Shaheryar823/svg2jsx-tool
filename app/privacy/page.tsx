import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - SVG2JSX',
  description: 'Privacy Policy and Google AdSense data disclosure for SVG2JSX.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Converter
        </Link>

        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
          <h1 className="text-2xl font-bold text-slate-100">Privacy Policy</h1>
        </div>

        <p className="text-xs text-slate-500">Last updated: September 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">1. Overview</h2>
          <p className="text-sm leading-relaxed">
            SVG2JSX is a free web utility tool. We respect your privacy and process all SVG code directly in your browser. We do not store, log, or transmit your input SVG files or output JSX components to external servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">2. Google AdSense & Cookies</h2>
          <p className="text-sm leading-relaxed">
            We use Google AdSense to display advertisements on our site. Google uses cookies to serve ads based on your prior visits to our website or other websites on the internet.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-slate-400 pl-2">
            <li>Google's use of advertising cookies enables it and its partners to serve ads based on user visits.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Google Ad Settings</a>.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">3. Third-Party Links</h2>
          <p className="text-sm leading-relaxed">
            Our site may contain links to external web resources. We are not responsible for the privacy practices or content of these third-party services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">4. Contact Information</h2>
          <p className="text-sm leading-relaxed">
            If you have questions regarding this privacy policy, you can reach out via our official GitHub repository or contact page.
          </p>
        </section>
      </div>
    </div>
  );
}