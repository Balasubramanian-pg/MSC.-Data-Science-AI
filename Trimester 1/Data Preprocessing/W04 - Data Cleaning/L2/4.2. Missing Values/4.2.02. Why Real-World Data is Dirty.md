# Why Real-World Data is Dirty

Real-world data collection systems are inherently imperfect.

Errors may emerge because of:

- Faulty sensors
    
- Human mistakes
    
- Transmission failures
    
- Missing information
    
- Inconsistent formats
    
- Incorrect measurements
    

As a result, raw datasets often become:

|Problem Type|Meaning|
|---|---|
|Incomplete|Missing values|
|Noisy|Corrupted observations|
|Inconsistent|Non-uniform representation|

The lecture repeatedly stresses that directly training machine learning models on dirty data produces unreliable predictions.

This leads to the classic principle:

$$
Garbage\ In \Rightarrow Garbage\ Out
$$
