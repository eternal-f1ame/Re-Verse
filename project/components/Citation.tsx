"use client";
import styles from "./styles/Highlights.module.css";
import { useState } from "react";

export function Citation() {
  const [copied, setCopied] = useState(false);

  const bibtex = `@inproceedings{baranwal2025reverse,
    title={Re:Verse - Can Your VLM Read a Manga?},
    author={Baranwal, Aaditya and Kataria, Madhav and Agrawal, Naitik and Rawat, Yogesh Singh and Vyas, Shruti},
    booktitle={Proceedings of the IEEE/CVF International Conference on Computer Vision - Workshops (ICCV-W)},
    year={2025},
    organization={IEEE}
}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className={styles.title}>
          Citation
        </h2>
        <p className="text-lg text-center mb-16 max-w-3xl mx-auto" style={{ color: 'var(--manga-brown)' }}>
          if you use our work, cite our paper with the following bibTeX entry:
        </p>

        {/* Citation Box */}
        <div className="manga-panel p-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold" style={{ color: 'var(--manga-black)' }}>
              📝 BibTeX Citation
            </h3>
            <button
              onClick={copyToClipboard}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 manga-panel ${
                copied 
                  ? 'bg-green-100 text-green-600' 
                  : 'hover:scale-105'
              }`}
              style={{ color: copied ? '#16a34a' : 'var(--manga-black)' }}
            >
              {copied ? (
                <>
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          
          <div className="rounded-lg p-6 border-2 border-dashed" style={{ backgroundColor: 'var(--manga-cream)', borderColor: 'var(--manga-brown)' }}>
            <pre className="text-sm font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto" style={{ color: 'var(--manga-black)' }}>
              {bibtex}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
