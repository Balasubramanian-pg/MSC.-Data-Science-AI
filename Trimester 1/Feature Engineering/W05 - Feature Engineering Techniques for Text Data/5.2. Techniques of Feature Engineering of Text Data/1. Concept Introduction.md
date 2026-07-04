# 1. Concept Introduction

Natural Language Processing (NLP) fundamentally battles the "representation problem": machine learning models optimize mathematical objective functions using linear algebra and calculus. Raw text (strings of characters) is intrinsically discrete and non-numeric. 

Feature engineering for text is the mathematical transformation $\phi : \mathcal{T} \rightarrow \mathbb{R}^d$, where a document in the text space $\mathcal{T}$ is mapped to a high-dimensional vector space $\mathbb{R}^d$. This mapping must preserve the informational signal (syntax, semantics, context) required for the downstream learning task (e.g., classification, sentiment analysis, clustering).

This document rigorously covers three foundational, non-parametric feature extraction algorithms:
1. **$N$-Grams (Unigrams, Bigrams, Trigrams)**: Capturing local sequence contexts.
2. **One-Hot Encoding**: Orthogonal categorical representation.
3. **Part-of-Speech (POS) Tagging**: Extracting syntactic meta-features.

> [!IMPORTANT]
> While modern NLP heavily relies on dense continuous representations (Transformers, Word2Vec), discrete techniques (N-grams, OHE, POS tags) remain crucial for baseline models, specific linguistic rule-based systems, and domains where interpretability and exact word matching are non-negotiable.
