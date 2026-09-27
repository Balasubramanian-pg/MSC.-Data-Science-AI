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
- Bidirectional RNNs process the sequence in both forward and backward directions, combining both hidden states to capture future and past context.
- Deep or stacked RNNs place recurrent layers on top of one another, allowing the network to learn hierarchical representations across sequence steps.

Sequence-to-Sequence and Attention:
- Sequence-to-sequence models use an encoder network to compress an input sequence into a fixed-length vector and a decoder network to generate the target sequence.
- Bottleneck issues occur when a single fixed vector must capture the entire meaning of long input sequences.
- Attention mechanisms allow the decoder to refer back to all intermediate encoder states, dynamically assigning weights to relevant parts of the input sequence.

Assessment Review and Practice Questions:
- Question: Why do standard recurrent networks struggle with long-term dependencies?
- Answer: Repeated multiplication of weight matrices across many time steps causes gradients to vanish exponentially or explode during backpropagation through time.
- Question: How does an LSTM prevent the vanishing gradient problem?
- Answer: The cell state provides an additive gradient path regulated by gates, preventing gradients from decaying exponentially across time steps.
- Question: In what scenario would a bidirectional RNN be inappropriate?
- Answer: Real-time causal forecasting, such as stock price prediction or live speech generation, where future inputs are unavailable at inference time.
- Question: What is the primary operational difference between GRU and LSTM?
- Answer: GRU combines the cell state and hidden state and uses two gates (reset and update), whereas LSTM uses three gates and maintains a separate cell state.

Key Takeaways:
- Sequence models rely on hidden states and parameter sharing to handle ordered, variable-length data.
- Basic RNNs fail on long sequences due to vanishing and exploding gradients during backpropagation through time.
- LSTMs and GRUs use gating mechanisms to regulate information flow and preserve long-term context.
- Bidirectional networks improve representation when full sequences are available by incorporating both past and future context.
- Encoder-decoder networks handle tasks with different input and output lengths, while attention solves the fixed-length context bottleneck.
