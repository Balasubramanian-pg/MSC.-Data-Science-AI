# Mathematical Perspective

A histogram approximates the probability density function:

$$
f(x)
$$

Each bin represents:

$$
\text{Frequency in Interval}
$$

If normalized:

$$
\sum P(x_i) = 1
$$

Histogram estimation is related to density estimation:

$$
\hat{f}(x)=\frac{1}{nh}\sum K\left(\frac{x-x_i}{h}\right)
$$

Where:

- ( n ) = sample size
    
- ( h ) = bin width
    
- ( K ) = kernel function
    

This connects directly to Kernel Density Estimation.
