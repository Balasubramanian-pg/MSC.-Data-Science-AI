# Add labels

for count, patch in zip(counts, patches):

    if count > 0:

        plt.text(
            patch.get_x() + patch.get_width()/2,
            patch.get_height(),
            int(count),
            ha='center',
            va='bottom',
            fontsize=8
        )

plt.show()
```
