import styles from "./styles/Abstract.module.css";
import { ImagePopup } from "./ImagePopup";
import { useState } from "react";
import Image from "next/image";

export function Abstract() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="abstract" className={styles.abstract}>
      <div className={styles.container}>
        {/* Conference Info */}


        <h2 className={styles.title}>
          Abstract
        </h2>
        
        <div className="manga-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div className={styles.prose}>
            <p className={styles.paragraph}>
              Current Vision Language Models (VLMs) demonstrate a <span className={styles.highlight}>critical gap between surface-level recognition and deep narrative reasoning</span> when processing sequential visual storytelling. Through a comprehensive investigation of manga narrative understanding, we reveal that while recent large multimodal models excel at individual panel interpretation, they systematically fail at temporal causality and cross-panel cohesion—core requirements for coherent story comprehension.
            </p>
            
            <p className={styles.paragraph}>
              We introduce a novel evaluation framework that combines <span className={styles.highlight}>fine-grained multimodal annotation, cross-modal embedding analysis, and retrieval-augmented assessment</span> to systematically characterize these limitations.
            </p>
            
            <div className="manga-speech-bubble">
              <p className={styles.speechBubbleText}>
                Our methodology includes: <br/>
                <span className={styles.highlight}>(i)</span> a rigorous annotation protocol linking visual elements to narrative structure through aligned light novel text, <br/>
                <span className={styles.highlight}>(ii)</span> comprehensive evaluation across multiple reasoning paradigms including direct inference and retrieval-augmented generation, and <br/>
                <span className={styles.highlight}>(iii)</span> cross-modal similarity analysis revealing fundamental misalignments in current VLMs' joint representations.
              </p>
            </div>
            
            <p className={styles.paragraph}>
              Applying this framework to <span className={styles.highlight}>Re:Zero manga across 11 chapters with 308 annotated pages</span>, we conduct the first systematic study of long-form narrative understanding in VLMs through three core evaluation axes: generative storytelling, contextual dialogue grounding, and temporal reasoning.
            </p>
            
            <p className={styles.paragraphLast}>
              Our findings demonstrate that current models lack genuine story-level intelligence, struggling particularly with <span className={styles.highlight}>non-linear narratives, character consistency, and causal inference</span> across extended sequences. This work establishes both the foundation and practical methodology for evaluating narrative intelligence, while providing actionable insights into capability of deep sequential understanding of Discrete Visual Narratives beyond basic recognition in Multimodal Models.
            </p>
          </div>
        </div>
        {/* Experimental Results Section */}
        <div className={styles.experimentsSection}>
          <h4 className={styles.title}>
            Experiments and Curation
          </h4>
          <div className={styles.experimentsGrid}>
            <div className={styles.cardWrapper}>
              <div 
                className="manga-panel manga-universal-card"
                onMouseEnter={() => setHoveredCard('experiment1')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="manga-card-icon">📊</div>
                <h4 className="manga-card-title">
                  Experiment 1 Results
                </h4>
                <p className="manga-card-description">
                  Story & Summary Generation.
                </p>
              </div>
              {hoveredCard === 'experiment1' && (
                <div className={styles.hoverPopup}>
                  <div className={styles.popupContent}>
                    <Image
                      src="/expt1.png"
                      alt="Experiment 1: Generative Analysis"
                      width={400}
                      height={300}
                      className={styles.popupImage}
                    />
                    <div className={styles.popupText}>
                      <h4>Experiment 1: Generative Analysis</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.cardWrapper}>
              <div 
                className="manga-panel manga-universal-card"
                onMouseEnter={() => setHoveredCard('experiment2')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="manga-card-icon">📈</div>
                <h4 className="manga-card-title">
                  Experiment 2 Results
                </h4>
                <p className="manga-card-description">
                  Text-Box Detection, Classification and Association.
                </p>
              </div>
              {hoveredCard === 'experiment2' && (
                <div className={styles.hoverPopup}>
                  <div className={styles.popupContent}>
                    <Image
                      src="/expt2.png"
                      alt="Experiment 2: Grounding Analysis"
                      width={400}
                      height={300}
                      className={styles.popupImage}
                    />
                    <div className={styles.popupText}>
                      <h4>Experiment 2: Grounding Analysis</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>


            <div className={styles.cardWrapper}>
              <div 
                className="manga-panel manga-universal-card"
                onMouseEnter={() => setHoveredCard('experiment3')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="manga-card-icon">📈</div>
                <h4 className="manga-card-title">
                  Experiment 3 Results
                </h4>
                <p className="manga-card-description">
                  Page Predictions and Visual Question Answering.
                </p>
              </div>
              {hoveredCard === 'experiment3' && (
                <div className={styles.hoverPopup}>
                  <div className={styles.popupContent}>
                    <Image
                      src="/expt3.png"
                      alt="Experiment 3: Predictive Analysis"
                      width={400}
                      height={300}
                      className={styles.popupImage}
                    />
                    <div className={styles.popupText}>
                      <h4>Experiment 3: Predictive Analysis</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.cardWrapper}>
              <div 
                className="manga-panel manga-universal-card"
                onMouseEnter={() => setHoveredCard('dataset')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="manga-card-icon">⚙️</div>
                <h4 className="manga-card-title">
                  Dataset Procurement
                </h4>
                <p className="manga-card-description">
                  Data Preparation and Annotation Pipeline.
                </p>
              </div>
              {hoveredCard === 'dataset' && (
                <div className={styles.hoverPopup}>
                  <div className={styles.popupContent}>
                    <Image
                      src="/proc.png"
                      alt="Dataset Preparation Process"
                      width={400}
                      height={300}
                      className={styles.popupImage}
                    />
                    <div className={styles.popupText}>
                      <h4>Dataset Preparation Process</h4>
                      <p>Approach to creating the Re:Zero manga dataset, including panel extraction and annotation protocols.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
