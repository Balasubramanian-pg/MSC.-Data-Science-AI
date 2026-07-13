# Technological Limitations

Sometimes the issue is not malfunction but insufficient hardware precision.

Example:

A tsunami detection system requires centimeter-level precision:

$$
Precision_{required} = 0.01m
$$

However, the deployed sensor measures only in meters:

$$
Precision_{available} = 1m
$$

This limitation introduces measurement uncertainty.

Another example is humidity measurement where the system requires decimal precision but the sensor only supports integer outputs.

This creates approximation noise.
