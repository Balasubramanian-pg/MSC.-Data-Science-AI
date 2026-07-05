# Production-Grade Systems Architecture and Pipelines

Transforming raw transactional records into advanced interactive visualizations requires a structured data pipeline. The system architecture below outlines this flow:

```mermaid
flowchart LR
    subgraph Data Tier
        DB[(PostgreSQL / Snowflake)] -->|1. Export Flat Transactions| CSV[Flat CSV / JSON Stream]
    end
    
    subgraph Transformation Tier (Python / Node.js API)
        CSV -->|2. Validate Schema| VAL[Schema Validator]
        VAL -->|3. Route Data| ROUTE{Target Paradigm?}
        
        ROUTE -->|Sankey / Network| SANK[Build Nodes & Edges]
        ROUTE -->|Circle Pack| PACK[Build Nested JSON Tree]
        ROUTE -->|Geospatial| GEO[Project Shape Coordinates]
        ROUTE -->|Temporal Stream| STRM[Apply Wiggle Offset Algorithm]
        
        SANK -->|Cycle Check| CYC[Detect & Break Loops]
        PACK -->|Scaling Math| SCALE[Apply Area Scaling: r = sqrt V/pi]
        GEO -->|Simplification| SIMP[Simplify Polygon Coordinates]
        STRM -->|Interpolation| INT[Symmetric Baseline Interpolator]
    end

    subgraph Client-Side Render Tier (Web UI)
        CYC -->|Nodes & Edges List| G_SANKEY[Plotly / D3 Sankey Canvas]
        SCALE -->|Coordinate Tree| G_PACK[D3 Pack / Canvas Engine]
        SIMP -->|Optimized TopoJSON| G_MAP[Leaflet / Mapbox Map]
        INT -->|Interpolated Ribbons| G_STRM[D3 Stream Canvas]
    end
```

### Production Data Schemas

Network and flow engines require separate validated lists of nodes and links (source-to-target pairs). A typical JSON schema for network link data includes a nodes array with required id and label fields and optional group integers, plus a links array where each entry requires source, target, and weight fields (with weight minimum of 0.01). Hierarchical engines such as circle packing and bubble trees require a nested tree structure where parent nodes contain children arrays, with each node requiring a name field and optionally containing value numbers and children arrays that reference the same schema recursively. Temporal stream and stacked area engines require sorted arrays of data points representing categories across a continuous timeline, including timestamps array (date-time format strings) and a series array where each entry contains a category string and a values array of numbers.
