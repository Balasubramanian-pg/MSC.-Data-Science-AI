# 3.9.10. Handling Complex Feature Interactions

While neither method guarantees global optimality, they process feature interactions differently based on their starting positions.

Sequential Backward Selection is generally superior at capturing complex, multi-feature interactions. Because SBS begins with the full feature space, denoted as:

$$
X_{full}
$$

all interactive signals are present in the model from the very first iteration. The algorithm evaluates features based on their contribution to the complete interactive web.

Sequential Forward Selection struggles with deep interactions. If two features are entirely useless on their own but perfectly separate the target class when combined, SFS will likely discard both during the first iteration because their independent evaluation scores will be abysmal.
