import styles from "./styles/Abstract.module.css";
import { ImagePopup } from "./ImagePopup";
export function Abstract() {
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
            <ImagePopup
              trigger={
                <div className="manga-panel manga-universal-card">
                  <div className="manga-card-icon">📊</div>
                  <h4 className="manga-card-title">
                    Experiment 1 Results
                  </h4>
                  <p className="manga-card-description">
                    Story & Summary Generation.
                  </p>
                </div>
              }
              imageSrc="/expt1.png"
              title="Experiment 1: VLM Performance Analysis"
              description="Comprehensive evaluation of various Vision Language Models on manga narrative understanding tasks. The results show significant performance gaps in temporal reasoning and cross-panel consistency across all tested models."
            />

            <ImagePopup
              trigger={
                <div className="manga-panel manga-universal-card">
                  <div className="manga-card-icon">📈</div>
                  <h4 className="manga-card-title">
                    Experiment 2 Results
                  </h4>
                  <p className="manga-card-description">
                    Next-Page & Intermediate-Page Prediction.
                  </p>
                </div>
              }
              imageSrc="/expt2.png"
              title="Experiment 2: Evaluation Methodology Comparison"
              description="Detailed comparison of different evaluation approaches for measuring VLM understanding of sequential visual narratives. This analysis reveals the importance of multi-modal assessment frameworks."
            />

            <ImagePopup
              trigger={
                <div className="manga-panel manga-universal-card">
                  <div className="manga-card-icon">⚙️</div>
                  <h4 className="manga-card-title">
                    Dataset Procurement
                  </h4>
                  <p className="manga-card-description">
                    Data Preparation and Annotation Pipeline.
                  </p>
                </div>
              }
              imageSrc="/proc.png"
              title="Dataset Preparation Process"
              description="Our systematic approach to creating the Re:Zero manga dataset, including panel extraction, annotation protocols, and quality assurance measures. This process ensures high-quality multimodal data for reliable evaluation."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
