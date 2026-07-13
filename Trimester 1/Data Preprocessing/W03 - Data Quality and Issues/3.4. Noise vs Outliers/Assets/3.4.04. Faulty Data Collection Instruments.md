# Faulty Data Collection Instruments

One of the most common sources of noise is malfunctioning sensors.

Suppose a humidity sensor consistently adds a small error:

$$
Humidity_{measured} = Humidity_{actual} + \delta
$$

where:

- $\delta$ is the sensor error
    

Even if the error is small, repeated noisy measurements degrade downstream machine learning systems.

Example:

|Actual Humidity|Sensor Output|
|---|---|
|70%|74%|
|65%|69%|
|80%|84%|

The measurements appear valid but are systematically distorted.
