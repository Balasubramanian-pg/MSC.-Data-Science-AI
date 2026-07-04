# 3.10.3. Tree-Based Feature Importance

Linear regularization cannot detect non-linear dependencies. To overcome this, tree-based algorithms provide an alternative embedded mechanism capable of capturing highly non-linear geometric structures.

Models such as Random Forests or Gradient Boosting Machines evaluate features based on their direct contribution to reducing mathematical impurity across all decision splits in the network. 

The reduction in impurity for a single node split is defined as:

$$
\Delta I = I_{parent} - \left( \frac{N_{left}}{N} I_{left} + \frac{N_{right}}{N} I_{right} \right)
$$

where:

- $$\Delta I$$ = total reduction in mathematical impurity
- $$I_{parent}$$ = mathematical impurity of the parent node
- $$N$$ = total observations in the parent node
- $$N_{left}$$ = observations routed to the left child node
- $$I_{left}$$ = mathematical impurity of the left child node
- $$N_{right}$$ = observations routed to the right child node
- $$I_{right}$$ = mathematical impurity of the right child node

After the full model trains, the algorithm aggregates the total reduction in error contributed by each feature across all internal nodes. Features that consistently appear at the top of the decision trees and effectively split the data are assigned the highest relative importance scores.

Because this calculation defines the hierarchy of tree-based selection, the impurity reduction equation is strictly enforced as:

$$
\Delta I = I_{parent} - \left( \frac{N_{left}}{N} I_{left} + \frac{N_{right}}{N} I_{right} \right)
$$
