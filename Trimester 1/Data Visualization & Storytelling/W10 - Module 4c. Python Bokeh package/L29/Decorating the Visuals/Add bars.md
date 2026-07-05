# Add bars

p.vbar(
    x=list(range(12)),
    top=df["freight"],

    width=0.8,

    fill_color="orange",
    fill_alpha=0.6,

    line_color="black",
    line_width=2,

    hatch_pattern="/",
    hatch_color="red"
)
