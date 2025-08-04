import styles from "./styles/Results.module.css";

export function Results() {
  const findings = [
    {
      title: "Surface vs. Deep Understanding",
      description: "VLMs excel at individual panel interpretation but fail at temporal causality and cross-panel cohesion",
      impact: "Critical Gap Identified"
    },
    {
      title: "Character Consistency Issues",
      description: "Models struggle with character identity tracking across extended manga sequences",
      impact: "Fundamental Limitation"
    },
    {
      title: "Non-Linear Narrative Challenges", 
      description: "Poor performance on complex storytelling techniques like flashbacks and parallel timelines",
      impact: "Story-Level Intelligence Missing"
    },
    {
      title: "Retrieval-Augmented Benefits",
      description: "RAG approaches show improvements but don't solve core reasoning limitations",
      impact: "Partial Solution"
    }
  ];

  const metrics = [
    {
      category: "Generative Storytelling",
      score: "Low",
      description: "Inconsistent narrative generation across panels",
      icon: "📝"
    },
    {
      category: "Dialogue Grounding",
      score: "Moderate",
      description: "Limited contextual dialogue understanding",
      icon: "💬"
    },
    {
      category: "Temporal Reasoning",
      score: "Poor",
      description: "Weak causal inference capabilities",
      icon: "⏰"
    },
    {
      category: "Character Consistency",
      score: "Low",
      description: "Difficulty maintaining character identity",
      icon: "👥"
    }
  ];

  return (
    <section id="results" className={styles.results}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Key Findings
        </h2>
        <p className={styles.subtitle}>
          Systematic evaluation reveals critical limitations in current VLM narrative understanding
        </p>

        {/* Performance Overview */}
        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div key={index} className={`manga-panel ${styles.metricCard}`}>
              <div className={styles.metricIcon}>{metric.icon}</div>
              <h3 className={styles.metricCategory}>
                {metric.category}
              </h3>
              <div className={`${styles.metricScore} ${
                metric.score === 'Poor' || metric.score === 'Low' ? styles.metricScorePoor : 
                metric.score === 'Moderate' ? styles.metricScoreModerate : styles.metricScoreGood
              }`}>
                {metric.score}
              </div>
              <p className={styles.metricDescription}>
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Findings */}
        <div className={styles.findingsGrid}>
          {findings.map((finding, index) => (
            <div key={index} className={`manga-panel ${styles.findingCard}`}>
              <h3 className={styles.findingTitle}>
                {finding.title}
              </h3>
              <p className={styles.findingDescription}>
                {finding.description}
              </p>
              <div className="manga-speech-bubble">
                <span className={styles.findingImpact}>
                  {finding.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.prose}>
              <p style={{ textAlign: "center" }}>
              Current VLMs demonstrate a <strong>critical gap between surface-level recognition and deep narrative reasoning</strong>.<br/>
              While they excel at individual panel interpretation, they systematically fail at the temporal causality and 
              cross-panel cohesion that are core requirements for coherent story comprehension.
              </p>
        </div>
      </div>
    </section>
  );
}
