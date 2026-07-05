---
title: W05 - Feature Engineering Techniques for Text Data
module: Statistical Modelling And Inferencing
week: W05 - Feature Engineering Techniques for Text Data
---

## [Feature Engineering Techniques for Text Data](./Feature%20Engineering%20Techniques%20for%20Text%20Data.md)

## [1. Concept Introduction](./1.%20Concept%20Introduction.md)

## [2. Unigrams and N-Grams](./2.%20Unigrams%20and%20N-Grams.md)

## [Simulated clean text corpus (e.g., from 20 Newsgroups subset)](./Simulated%20clean%20text%20corpus%20%28e.g.%2C%20from%2020%20Newsgroups%20subset%29.md)

## [1. Unigram Vectorizer](./1.%20Unigram%20Vectorizer.md)

## [2. Unigram + Bigram + Trigram Vectorizer](./2.%20Unigram%20%2B%20Bigram%20%2B%20Trigram%20Vectorizer.md)

## [ngram_range=(1, 3) means extract n=1, n=2, and n=3](./ngram_range%3D%281%2C%203%29%20means%20extract%20n%3D1%2C%20n%3D2%2C%20and%20n%3D3.md)

## [Display features for the first document](./Display%20features%20for%20the%20first%20document.md)

## [Expected Output:](./Expected%20Output%20-.md)

## [Unigram Feature Matrix Shape: (3, 8)](./Unigram%20Feature%20Matrix%20Shape%20-%20%283%2C%208%29.md)

## [N-Gram Feature Matrix Shape: (3, 23)](./N-Gram%20Feature%20Matrix%20Shape%20-%20%283%2C%2023%29.md)

## [Document 1 N-Gram Vector:](./Document%201%20N-Gram%20Vector%20-.md)

## [- great: 1](./-%20great%20-%201.md)

## [- is: 1](./-%20is%20-%201.md)

## [- is great: 1](./-%20is%20great%20-%201.md)

## [- learning: 1](./-%20learning%20-%201.md)

## [- learning is: 1](./-%20learning%20is%20-%201.md)

## [- learning is great: 1](./-%20learning%20is%20great%20-%201.md)

## [- machine: 1](./-%20machine%20-%201.md)

## [- machine learning: 1](./-%20machine%20learning%20-%201.md)

## [- machine learning is: 1](./-%20machine%20learning%20is%20-%201.md)

## [3. One-Hot Encoding (OHE) for Text](./3.%20One-Hot%20Encoding%20%28OHE%29%20for%20Text.md)

## [A list of categorical words to encode](./A%20list%20of%20categorical%20words%20to%20encode.md)

## [Initialize the OneHotEncoder](./Initialize%20the%20OneHotEncoder.md)

## [sparse_output=False for demonstration purposes to see the dense array](./sparse_output%3DFalse%20for%20demonstration%20purposes%20to%20see%20the%20dense%20array.md)

## [Fit and transform the words](./Fit%20and%20transform%20the%20words.md)

## [Categories discovered: ['hockey' 'religion' 'science']](./Categories%20discovered%20-%20%5B%27hockey%27%20%27religion%27%20%27science%27%5D.md)

## [](./.md)

## [Word: science    | OHE Vector: [0. 0. 1.]](./Word%20-%20science%20OHE%20Vector%20-%20%5B0.%200.%201.%5D.md)

## [Word: religion   | OHE Vector: [0. 1. 0.]](./Word%20-%20religion%20OHE%20Vector%20-%20%5B0.%201.%200.%5D.md)

## [Word: hockey     | OHE Vector: [1. 0. 0.]](./Word%20-%20hockey%20OHE%20Vector%20-%20%5B1.%200.%200.%5D.md)

## [4. Part-of-Speech (POS) Tagging](./4.%20Part-of-Speech%20%28POS%29%20Tagging.md)

## [Note: In a real environment, you must download the NLTK data bundles first:](./Note%20-%20In%20a%20real%20environment%2C%20you%20must%20download%20the%20NLTK%20data%20bundles%20first%20-.md)

## [nltk.download('punkt')](./nltk.download%28%27punkt%27%29.md)

## [nltk.download('averaged_perceptron_tagger')](./nltk.download%28%27averaged_perceptron_tagger%27%29.md)

## [Step 1: Tokenize the document](./Step%201%20-%20Tokenize%20the%20document.md)

## [Step 2: Apply POS Tagging](./Step%202%20-%20Apply%20POS%20Tagging.md)

## [The Viterbi algorithm runs under the hood here](./The%20Viterbi%20algorithm%20runs%20under%20the%20hood%20here.md)

## [Step 3: Feature Engineering - Convert tags to counts](./Step%203%20-%20Feature%20Engineering%20-%20Convert%20tags%20to%20counts.md)

## [Count frequencies of grammatical structures](./Count%20frequencies%20of%20grammatical%20structures.md)

## [Convert to a feature vector format (e.g., for a DataFrame)](./Convert%20to%20a%20feature%20vector%20format%20%28e.g.%2C%20for%20a%20DataFrame%29.md)
