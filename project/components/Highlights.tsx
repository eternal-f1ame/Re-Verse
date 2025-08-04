import styles from "./styles/Highlights.module.css";

export function Highlights() {
  const highlights = [
    {
      icon: "📚",
      title: "Sequential Visual Storytelling",
      description: "First comprehensive evaluation of VLMs on manga narrative understanding across 11 chapters with 308 annotated pages"
    },
    {
      icon: "🎯",
      title: "Novel Evaluation Framework",
      description: "Fine-grained multimodal annotation protocol linking visual elements to narrative structure through aligned light novel text"
    },
    {
      icon: "🔍",
      title: "Cross-Modal Analysis",
      description: "Systematic characterization of VLM limitations through cross-modal embedding analysis and retrieval-augmented assessment"
    },
    {
      icon: "⚡",
      title: "Three Core Evaluation Axes",
      description: "Generative storytelling, contextual dialogue grounding, and temporal reasoning assessment"
    },
    {
      icon: "💡",
      title: "Critical Insights",
      description: "Reveals fundamental gaps in temporal causality, cross-panel cohesion, and character consistency"
    },
    {
      icon: "😎",
      title: "Cool Work",
      description: "Bringing Traction to work on super fun and under-served domain of Comics and Mangas with VLMs and AI"
    }
  ];

  return (
    <section id="highlights" className={styles.highlights}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Key Highlights
        </h2>
        <p className={styles.subtitle}>
          Breakthrough insights into Vision Language Models' narrative understanding capabilities
        </p>
        {/* Featured Quote */}
        <div className={styles.quoteSection}>
          <div className={`manga-speech-bubble ${styles.quote}`}>
            <p className={styles.quoteText}>
              " models lack story-level intelligence, struggling particularly with non-linear narratives, 
              character consistency, and causal inference "
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className={styles.highlightsGrid}>
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="manga-panel manga-universal-card manga-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="manga-card-icon">{highlight.icon}</div>
              <h3 className="manga-card-title">
                {highlight.title}
              </h3>
              <p className="manga-card-description">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
