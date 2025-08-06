"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./styles/Hero.module.css";

interface HeroProps {
  onRequestDataset: () => void;
}

export function Hero({ onRequestDataset }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${
        isVisible ? styles.containerVisible : styles.containerHidden
      }`}>
        {/* Logo and Title Container */}
        <div className={styles.logoTitleContainer}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoGlow}></div>
              <div className={styles.logoImage}>
                <Image
                  src="/comic.png"
                  alt="Re:Verse Comic Logo"
                  width={120}
                  height={120}
                  className={styles.logo}
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            Re:Verse - Can Your VLM Read a Manga?
          </h1>
        </div>

        <div className={styles.conferenceInfo}>
          <p className={styles.conferenceTitle}>
            <a href="https://iccv.thecvf.com/Conferences/2025" target="_blank" rel="noopener noreferrer">
              International Conference on Computer Vision
            </a>
          </p>
          <p className={styles.conferenceSubTitle}>
            <a href="https://aistory2025.github.io/" target="_blank" rel="noopener noreferrer">
                AI Story Workshop
            </a>
          </p>
          <p className={styles.conferenceDetails}>
            Honolulu, Hawaii • October 2025
          </p>
        </div>

        {/* Badges */}
        <div className={styles.badgesContainer}>
          <div className={styles.badgesList}>
            <div className="manga-speech-bubble">
              <span className={styles.badgeEmoji}>🌟</span>
                Oral Presentation
            </div>
            <div className="manga-speech-bubble">
              <span className={styles.badgeEmoji}>🏆</span>
                Best Paper Recommendation
            </div>
          </div>
        </div>

        {/* Description & Image */}
        <div className="manga-panel" style={{ padding: '1rem', width: '100%', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2rem' }}>
          <p className={styles.descriptionText}>
            Evaluating Vision Language Models' Understanding of Sequential Visual Storytelling
          </p>
          
          <div className={styles.imageContainer}>
            <Image
              src="/teaser.svg"
              alt="Re:Verse - VLM Manga Reading Evaluation Framework"
              width={800}
              height={400}
              className={styles.teaserImage}
              priority
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>

        {/* Authors */}
        <div className={styles.authorsContainer}>
          <p className={styles.authorsMain}>
            <span className={styles.authorName}>Aaditya Baranwal</span>¹†,  
            <span className={styles.authorName}> Madhav Kataria</span>²,
            <span className={styles.authorName}> Naitik Agrawal</span>³
          </p>
          <p className={styles.authorsSecondary}>
            <span className={styles.authorName}>Yogesh Singh Rawat</span>¹,
            <span className={styles.authorName}> Shruti Vyas</span>¹
          </p>
          <div className={styles.affiliations}>
            <p className={styles.affiliationsText}>¹University of Central Florida  ||  ²Indian Institute of Technology Jodhpur  ||  ³Indian Institute of Technology Varanasi</p>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonsContainer}>
          <div className={styles.readPaperWrapper}>
            <div
              className="manga-panel"
              style={{ 
                padding: '0.75rem 1.5rem', 
                fontSize: '0.875rem', 
                fontWeight: '700', 
                color: 'var(--manga-black)', 
                textDecoration: 'none', 
                transition: 'transform 300ms',
                cursor: 'not-allowed',
                position: 'relative'
              }}
              onMouseEnter={() => setShowComingSoon(true)}
              onMouseLeave={() => setShowComingSoon(false)}
              onClick={(e) => e.preventDefault()}
            >
              📄 Read Paper
            </div>
            {showComingSoon && (
              <div className={styles.comingSoonPopup}>
                Coming Soon...
              </div>
            )}
          </div>
          <button
            onClick={onRequestDataset}
            className="manga-panel"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--manga-black)', textDecoration: 'none', transition: 'transform 300ms' }}
          >
            🌠 Request Dataset
          </button>
        </div>
      </div>
    </section>
  );
}
