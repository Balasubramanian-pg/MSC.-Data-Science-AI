# Migration in progress
# Lesson 6: Summary and Assessment

Sequence Models Summary and Assessment:

Overview of Sequence Modeling:
- Sequence models process ordered data where context and temporal relationships matter, such as text, speech, audio, and time series.
- Traditional feedforward networks struggle with sequences because they assume input and output variables are independent and require fixed-length vectors.
- Recurrent neural networks introduce feedback loops, allowing hidden states to pass information from one time step to the next.

Recurrent Neural Networks (RNNs):
- An RNN maintains a hidden state vector that updates at each time step using the current input and the previous hidden state.
- Parameters are shared across all time steps, reducing model size and enabling processing of variable-length sequences.
- Training uses backpropagation through time, which unrolls the computation graph across sequence steps to calculate gradients.
- Standard RNNs suffer from vanishing and exploding gradient problems when handling long sequences, limiting their ability to retain long-term dependencies.
- Gradient clipping helps mitigate exploding gradients by scaling down the gradient vector when its norm exceeds a defined threshold.

Gated Architectures:
- Long Short-Term Memory networks solve vanishing gradients by introducing a memory cell and three gating mechanisms: forget gate, input gate, and output gate.
- The forget gate controls how much of the previous cell state to discard.
- The input gate decides which new information from the input should be stored in the cell state.
- The output gate determines what information from the updated cell state goes into the hidden state.
- Gated Recurrent Units simplify the LSTM design by merging the cell state and hidden state, using only two gates: a reset gate and an update gate.
- GRUs have fewer parameters than LSTMs, which often leads to faster training times while achieving comparable performance on many tasks.

Bidirectional and Deep Architectures:
- Standard sequence models only process information from past time steps to the present.
- Bidirectional RNNs process the sequence in both forward and backward directions, combining both hidden states to capture fu