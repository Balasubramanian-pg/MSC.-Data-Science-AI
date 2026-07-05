# Sentiment Analysis Limitation Pipeline

```mermaid
flowchart TD
    A[Text]
    
    A --> B{Literal Meaning?}
    
    B -->|Yes| C[Correct Classification]
    
    B -->|No| D[Sarcasm / Ambiguity]
    
    D --> E[Potential Misclassification]
```
