---
title: W04 - Dimensionality Reduction Techniques
module: Statistical Modelling And Inferencing
week: W04 - Dimensionality Reduction Techniques
---

# Week 4 Practice Quiz

<img width="372" height="740" alt="image" src="https://github.com/user-attachments/assets/0434d05c-9351-4493-9c58-084bffe82cc7" />

# Question 1

Which of the following dimensionality reduction methods is non-linear?

## Options

* PCA
* Truncated SVD
* t-SNE
* Fisher Score

## Answer

✅ **t-SNE**

> [!NOTE]
> **Reason**
>
> **t-SNE (t-Distributed Stochastic Neighbor Embedding)** is a **non-linear** dimensionality reduction technique designed to preserve local structure and similarities among data points in lower-dimensional space.
>
> In contrast, **PCA** and **Truncated SVD** are linear techniques, while **Fisher Score** is a feature selection method rather than a dimensionality reduction technique.

# Question 2

Which technique is used in Latent Semantic Analysis (LSA) for text data dimensionality reduction?

## Options

* SVD
* PCA
* t-SNE
* Chi-square test

## Answer

✅ **SVD**

> [!NOTE]
> **Reason**
>
> **Latent Semantic Analysis (LSA)** relies on **Singular Value Decomposition (SVD)** to decompose the document-term matrix into lower-dimensional latent factors. These latent factors capture hidden semantic relationships between terms and documents.

# Question 3

Which of the following is *not* a reason for using dimensionality reduction?

## Options

* To decrease computational cost
* To increase the number of features
* To improve visualisation
* To reduce overfitting

## Answer

✅ **To increase the number of features**

> [!NOTE]
> **Reason**
>
> The purpose of dimensionality reduction is to **reduce** the number of features while preserving as much useful information as possible. Common benefits include lower computational cost, improved visualization, and reduced overfitting.
>
> Increasing the number of features is the opposite of dimensionality reduction.

# Question 4

Which of the following statements is true about t-SNE?

## Options

* It is faster and more interpretable than PCA.
* It is mainly used for data visualisation in 2D or 3D.
* It is a linear technique used for feature selection.
* It uses eigen-decomposition of the covariance matrix.

## Answer

✅ **It is mainly used for data visualisation in 2D or 3D.**

> [!NOTE]
> **Reason**
>
> **t-SNE** is primarily used to visualize high-dimensional data in **2D or 3D** while preserving local neighborhood relationships.
>
> It is computationally expensive, non-linear, and is not typically used for feature selection or covariance matrix decomposition.

# Question 5

In Principal Component Analysis (PCA), what are the principal components?

## Options

* Original features with the highest variance
* Random projections of input data
* Linear combinations of features that maximise variance
* Features selected using chi-square test

## Answer

✅ **Linear combinations of features that maximise variance**

> [!NOTE]
> **Reason**
>
> In **PCA**, principal components are new orthogonal variables formed as **linear combinations of the original features**. These components are constructed to capture the maximum possible variance in the data, with each successive component explaining the maximum remaining variance.

Let us focus on [week 5 quiz](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W05%20-%20Feature%20Engineering%20Techniques%20for%20Text%20Data/Quiz.md)


Tags: #statistics #machine-learning #data-science #statistical-modelling