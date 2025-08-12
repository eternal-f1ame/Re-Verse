# Re:Verse - Can Your VLM Read a Manga?

📄 **1st AI Story Workshop ICCV (Oral)**

## Overview

Re:Verse introduces a comprehensive benchmark for evaluating Vision Language Models (VLMs) on manga reading comprehension. Our framework tests models' ability to understand sequential visual narratives, character relationships, and temporal reasoning across manga panels.

## Dataset

The Re:Verse dataset contains:

- **Multi-panel manga sequences** from diverse genres
- **Structured annotations** for story comprehension tasks
- **Evaluation frameworks** for three key experiments

### Request Dataset

```bash
# TODO: Add dataset download/request instructions
# Contact: [email] for dataset access
```

## Experiments

### 1. Story & Summary Generation

Evaluates VLMs' ability to generate coherent narratives and summaries from manga sequences.

```python
# TODO: Add experiment 1 code
# Example usage for story generation evaluation
from reverse.experiments import StoryGenerationEvaluator

evaluator = StoryGenerationEvaluator()
results = evaluator.run(model, manga_sequences)
```

### 2. Next-Page & Intermediate-Page Prediction

Tests models' understanding of narrative flow and ability to predict story progression.

```python
# TODO: Add experiment 2 code  
# Example usage for page prediction evaluation
from reverse.experiments import PagePredictionEvaluator

evaluator = PagePredictionEvaluator()
results = evaluator.run(model, manga_panels)
```

### 3. Dataset Process & Annotation Pipeline

Our systematic approach to creating high-quality multimodal manga data.

```python
# TODO: Add experiment 3 code
# Example usage for dataset processing
from reverse.data import DatasetProcessor

processor = DatasetProcessor()
processed_data = processor.run(raw_manga_data)
```

## Quick Start

```bash
# Clone repository
git clone https://github.com/your-username/ReVerse.git
cd ReVerse

# Install dependencies
pip install -r requirements.txt

# TODO: Add setup instructions
```

## Evaluation

```python
# TODO: Add evaluation code
# Run all experiments
python evaluate.py --model [MODEL_NAME] --experiments all
```

## Results

Our evaluation reveals significant performance gaps in VLMs for:

- **Temporal reasoning** across manga panels
- **Cross-panel consistency** in character understanding
- **Sequential narrative comprehension**

## Citation

```bibtex
@inproceedings{
baranwal2025reverse,
title={Re:Verse - Can your {VLM} read a Manga?},
author={Aaditya Baranwal and Madhav Kataria and Naitik Agrawal and Shruti Vyas and Yogesh S Rawat},
booktitle={1st Workshop on Generative AI for Storytelling (AISTORY)},
year={2025},
url={https://openreview.net/forum?id=eInygm3qd6}
}
```

## Authors

**Aaditya Baranwal**¹†, **Madhav Kataria**², **Naitik Agrawal**³  
**Yogesh Singh Rawat**¹, **Shruti Vyas**¹

¹University of Central Florida || ²Indian Institute of Technology Jodhpur || ³Indian Institute of Technology Varanasi

## License

```bash
# TODO: Add license information
```
