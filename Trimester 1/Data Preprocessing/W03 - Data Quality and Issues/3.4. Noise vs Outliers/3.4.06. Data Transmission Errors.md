# Data Transmission Errors

Noise can also be introduced while transmitting data between systems.

If two computers communicate over a network:

```mermaid
flowchart LR
    A[Computer A]
    --> B[Internet Transmission]

    B --> C[Signal Corruption]

    C --> D[Computer B]
```

communication noise may alter the transmitted information.

This is why networking systems use:

|Mechanism|Purpose|
|---|---|
|Checksum Bits|Validate integrity|
|Error Detection|Detect corruption|
|Error Correction|Repair damaged packets|
|Retransmission|Resend corrupted data|

The lecture references TCP/IP systems where additional bits verify whether transmitted information has been modified.
