---
title: W06 - Feature Engineering Techniques for Image Data
module: Statistical Modelling And Inferencing
week: W06 - Feature Engineering Techniques for Image Data
---

# Week 6 Practice Quiz

<img width="440" height="808" alt="image" src="https://github.com/user-attachments/assets/719759ad-f2cc-4deb-ae3a-5a1c64ef2001" />

# Question 1

What is the main advantage of using Histogram of Oriented Gradients (HOG) features over raw pixel features for object detection?

## Options

* HOG features increase the dimensionality of the data.
* HOG features reduce colour information loss.
* HOG features are invariant to geometric and photometric transformations.
* HOG features eliminate the need for a classifier.

## Answer

✅ **HOG features are invariant to geometric and photometric transformations.**

> [!NOTE]
> **Reason**
>
> **HOG (Histogram of Oriented Gradients)** captures the distribution of edge directions and local shape information rather than relying on raw pixel intensities. This makes HOG relatively robust to changes in illumination, shadows, and small geometric variations, improving object detection performance.
>
> HOG does not eliminate the need for a classifier. In practice, HOG features are often used together with classifiers such as SVMs.

# Question 2

Which of the following statements best describes the role of hysteresis thresholding in the Canny edge detection algorithm?

## Options

* It selects edges based on a fixed intensity value.
* It enhances image contrast before applying edge detection.
* It removes all weak edges from the image.
* It connects weak edges to strong edges if they are spatially related.

## Answer

✅ **It connects weak edges to strong edges if they are spatially related.**

> [!NOTE]
> **Reason**
>
> In the **Canny edge detector**, hysteresis thresholding uses two thresholds: a high threshold and a low threshold.
>
> * Strong edges exceeding the high threshold are always retained.
> * Weak edges are retained only if they are connected to strong edges.
>
> This process helps preserve meaningful edges while suppressing noise.

# Question 3

Which image enhancement technique is most appropriate for improving contrast in low-light grayscale images?

## Options

* Thresholding
* Gaussian blurring
* Histogram equalisation
* Median filtering

## Answer

✅ **Histogram equalisation**

> [!NOTE]
> **Reason**
>
> **Histogram equalisation** redistributes pixel intensity values to span the full available intensity range, thereby enhancing contrast in low-light or poorly illuminated grayscale images.
>
> Gaussian blurring and median filtering primarily reduce noise, while thresholding is used for segmentation rather than contrast enhancement.

# Question 4

What is the primary limitation of using raw pixel values as input features for traditional machine learning models?

## Options

* They always result in overfitting, regardless of model type.
* They require complex normalisation steps.
* They cannot be used with Support Vector Machines (SVMs).
* They carry excessive noise and high dimensionality without structural abstraction.

## Answer

✅ **They carry excessive noise and high dimensionality without structural abstraction.**

> [!NOTE]
> **Reason**
>
> Raw pixel values produce extremely high-dimensional feature spaces and contain significant noise and redundancy. They also fail to explicitly capture meaningful structures such as edges, shapes, or textures.
>
> Feature extraction methods such as HOG, SIFT, and CNNs address this limitation by learning or extracting more informative representations.

# Question 5

In the Harris corner detection method, what condition is true when the detected region is considered a corner?

## Options

* The trace of the matrix is negative.
* Both eigenvalues of the gradient matrix are large.
* One eigenvalue is large and the other is small.
* Both eigenvalues of the gradient matrix are small.

## Answer

✅ **Both eigenvalues of the gradient matrix are large.**

> [!NOTE]
> **Reason**
>
> The **Harris corner detector** analyzes the eigenvalues of the second-moment (gradient) matrix:
>
> * **Both eigenvalues small** → Flat region
> * **One large, one small** → Edge
> * **Both large** → Corner
>
> A corner is characterized by significant intensity changes in both horizontal and vertical directions, which corresponds to both eigenvalues being large.

Let us focus on [week 7 quiz](https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/blob/main/Trimester%201/Feature%20Engineering/W07%20-%20Feature%20Engineering%20Techniques%20for%20Time-Series%20Data/Quiz.md)
