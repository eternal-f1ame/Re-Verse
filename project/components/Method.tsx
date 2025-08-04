import styles from "./styles/Method.module.css";

export function Method() {
  const methodSteps = [
    {
      step: "1",
      title: "Data Collection",
      description: "Re:Zero manga chapters with corresponding light novel text alignment",
      icon: "📚"
    },
    {
      step: "2", 
      title: "Annotation Protocol",
      description: "Fine-grained multimodal annotation linking visual elements to narrative structure",
      icon: "🎯"
    },
    {
      step: "3",
      title: "Evaluation Framework",
      description: "Three-axis assessment: storytelling, dialogue grounding, temporal reasoning",
      icon: "🔍"
    },
    {
      step: "4",
      title: "Cross-Modal Analysis",
      description: "Embedding analysis revealing misalignments in VLM joint representations",
      icon: "⚡"
    }
  ];

  return (
    <section id="dataset-methodology" className={styles.method}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Re:Verse Dataset
        </h2>

        {/* Dataset Overview */}
        <div className={styles.datasetGrid}>
          <div className="manga-panel manga-universal-card">
            <div className="manga-card-icon">📖</div>
            <h3 className="manga-card-title">11 Chapters</h3>
            <p className="manga-card-description">Complete Re:Zero manga coverage</p>
          </div>
          <div className="manga-panel manga-universal-card">
            <div className="manga-card-icon">🎯</div>
            <h3 className="manga-card-title">308 Pages</h3>
            <p className="manga-card-description">Fine-grained annotations</p>
          </div>
          <div className="manga-panel manga-universal-card">
            <div className="manga-card-icon">📝</div>
            <h3 className="manga-card-title">Aligned Text</h3>
            <p className="manga-card-description">Light novel correspondence</p>
          </div>
        </div>

        {/* Method Steps */}
        <div className={styles.methodStepsGrid}>
          {methodSteps.map((step, index) => (
            <div key={index} className="manga-panel manga-universal-card">
              <div className={styles.stepBadge}>
                {step.step}
              </div>
              <div className="manga-card-icon">{step.icon}</div>
              <h3 className="manga-card-title">
                {step.title}
              </h3>
              <p className="manga-card-description">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
