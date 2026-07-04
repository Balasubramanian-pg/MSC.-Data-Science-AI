---
title: W05 - Feature Engineering Techniques for Text Data
module: Statistical Modelling And Inferencing
week: W05 - Feature Engineering Techniques for Text Data
---

# Week 5 Practice Quiz

<img width="453" height="842" alt="image" src="https://github.com/user-attachments/assets/c7e1c2e6-b002-4058-9678-6e171d2ff767" />

# Question 1

How can POS (Part-of-Speech) tagging improve feature extraction in NLP tasks?

## Options

* By assigning grammatical roles to words and helping identify informative features
* By increasing the vocabulary size in the dataset
* By removing all stopwords from the dataset
* By translating text into another language

## Answer

✅ **By assigning grammatical roles to words and helping identify informative features**

> [!NOTE]
> **Reason**
>
> **POS tagging** assigns grammatical categories such as noun, verb, adjective, and adverb to words. This additional linguistic information helps identify meaningful and informative features, enabling models to focus on important parts of speech relevant to the task.

# Question 2

What is the purpose of the Inverse Document Frequency (IDF) term in TF-IDF vectorisation?

## Options

* It emphasises words that are common across documents.
* It down-weights words that occur in many documents.
* It down-weights rare words in the corpus.
* It increases the frequency of common words.

## Answer

✅ **It down-weights words that occur in many documents.**

> [!NOTE]
> **Reason**
>
> The **IDF** component assigns lower weights to terms that appear frequently across many documents because such words carry less discriminative information. Rare or document-specific terms receive higher weights, making them more useful for distinguishing documents.

# Question 3

Which of the following is TRUE about Word2Vec embeddings?

## Options

* They assign fixed-length dense vectors based on word context.
* They produce sparse binary vectors.
* They can directly handle subword tokenisation.
* They use co-occurrence matrices like TF-IDF.

## Answer

✅ **They assign fixed-length dense vectors based on word context.**

> [!NOTE]
> **Reason**
>
> **Word2Vec** learns **dense, fixed-length vector representations** for words by analyzing their surrounding context in a corpus. Words appearing in similar contexts tend to have similar embeddings.
>
> Word2Vec does not produce sparse vectors, nor does it directly model subwords. Models such as FastText extend Word2Vec to incorporate subword information.

# Question 4

Which of the following statements is TRUE regarding tokenisation and n-grams?

## Options

* Trigrams ignore word order.
* Character-level tokenisation is commonly used in POS tagging.
* Bigrams capture more contextual information than unigrams.
* Tokenisation splits text into feature vectors based on frequency.

## Answer

✅ **Bigrams capture more contextual information than unigrams.**

> [!NOTE]
> **Reason**
>
> **Bigrams** consider pairs of consecutive words, thereby capturing local word order and context that unigrams miss.
>
> For example:
>
> * Unigrams: *machine*, *learning*
> * Bigrams: *machine learning*
>
> This additional contextual information often improves NLP model performance.

# Question 5

Given two documents:

* Doc1: "Data Science is powerful"
* Doc2: "Science is evolving"

What would be the Bag of Words representation for Doc2 using the combined vocabulary from both?

Vocabulary: **[Data, Science, is, powerful, evolving]**

## Options

* [1, 1, 1, 1, 1]
* [0, 1, 1, 0, 1]
* [0, 2, 0, 1, 0]
* [1, 1, 0, 0, 1]

## Answer

✅ **[0, 1, 1, 0, 1]**

> [!NOTE]
> **Reason**
>
> The combined vocabulary is:
>
> | Term     | Present in Doc2? | Count |
> | -------- | ---------------- | ----- |
> | Data     | No               | 0     |
> | Science  | Yes              | 1     |
> | is       | Yes              | 1     |
> | powerful | No               | 0     |
> | evolving | Yes              | 1     |
>
> Therefore, the Bag of Words vector for **Doc2** is:
>
> **[0, 1, 1, 0, 1]**

Let's move to [Week 6 quiz](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W06%20-%20Feature%20Engineering%20Techniques%20for%20Image%20Data/Quiz.md)
