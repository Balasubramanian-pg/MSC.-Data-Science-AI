# Delimiter Issues

Not all CSVs use commas.

Some use:

- semicolon `;`
    
- tab `\t`
    
- pipe `|`
    

Example:

```python
pd.read_csv(url, sep=';')
```
