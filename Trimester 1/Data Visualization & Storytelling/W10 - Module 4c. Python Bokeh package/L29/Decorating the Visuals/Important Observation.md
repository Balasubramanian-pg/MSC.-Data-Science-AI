# Important Observation

The instructor actually chooses a suboptimal formatter.

Better would usually be:

plot.yaxis.formatter = NumeralTickFormatter(  
format="0.0a"  
)

````

because:

```text id="jlwmpc"
14.0m
````

is cognitively easier than:

```text
14000000
```

This is an important real-world dashboard principle:

- humans scan abbreviations faster
