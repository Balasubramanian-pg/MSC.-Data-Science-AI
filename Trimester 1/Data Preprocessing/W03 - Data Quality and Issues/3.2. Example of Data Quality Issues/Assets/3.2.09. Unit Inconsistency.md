# Unit Inconsistency

Suppose one dataset stores temperature in Celsius while another stores it in Fahrenheit.

|City|Temperature|
|---|---|
|Pune|32°C|
|Dallas|89°F|

Blindly merging these values creates inconsistency.

Temperature conversion formula:

F=\frac{9}{5}C+32

Without standardization, downstream analytics become meaningless.
