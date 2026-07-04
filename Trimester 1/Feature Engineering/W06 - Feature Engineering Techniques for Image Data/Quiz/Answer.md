# Answer

✅ **HOG features are invariant to geometric and photometric transformations.**

> [!NOTE]
> **Reason**
>
> **HOG (Histogram of Oriented Gradients)** captures the distribution of edge directions and local shape information rather than relying on raw pixel intensities. This makes HOG relatively robust to changes in illumination, shadows, and small geometric variations, improving object detection performance.
>
> HOG does not eliminate the need for a classifier. In practice, HOG features are often used together with classifiers such as SVMs.
