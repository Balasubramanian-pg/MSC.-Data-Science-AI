# Migration in progress
# Lesson 3: AWS Well-Architected Framework
Designing for Reliability and Performance

Reliability and Performance Goals:
- Reliability and performance are linked engineering goals in cloud design.
- Systems must keep high throughput and low latency during peak traffic.
- They must recover automatically from local hardware and network outages.
- Key design areas include fault domain separation, dynamic load distribution, auto-scaling, and distributed caching.
- Architects need to track availability metrics, remove single points of failure, and fix distributed bottlenecks.

High Availability Metrics:
- High availability measures the percentage of time a system remains operational.
- Availability = MTBF / (MTBF + MTTR) x 100 percent.
- MTBF is mean time between failures. MTTR is mean time to recovery.
- The nines of availability:
    - 99.9 percent allows about 8.77 hours of unplanned downtime per year.
    - 99.99 percent allows about 52.60 minutes per year.
    - 99.999 percent allows about 5.26 minutes per year.
- Serial dependencies multiply availability. Total availability = A1 x A2. Serial systems are less available than their parts.
- Redundant parallel components improve availability. Total availability = 1 - (1 - A1) x (1 - A2).
- Important: Three serial services with 99.9 percent availability each give about 99.7 percent availability. That allows over 26 hours of downtime per year.

Fault Domains and Blast Radius:
- A rack or chassis is the smallest fault domain. Servers share top-of-rack switches and power distribution units.
- An Availability Zone is a separate data center complex. It has isolated power, cooling, and flood planes.
- Zones are close enough for low latency but far enough to survive disasters. Inter-zone round trips are under two milliseconds.
- A Region is a geographic area with multiple Availability Zones. Regions connect through low-latency provider fiber.
- Failures in one region do not cross regional boundaries.

Redundancy Topologies:
- Active-passive: primary nodes handle production traffic. Standby nodes stay idle or receive asynchronous updates. They activate when health checks fail.
- Active-active: all nodes handle requests at the same time. This uses hardware better and removes failover delay.

Example Request Flow:
- A global request resolves through DNS to the nearest edge point of presence.
- If the edge cache has the asset, it returns it in under 10 milliseconds.
- On a cache miss, the request goes to a Layer 7 load balancer over the cloud private backbone.
- The load balancer checks node health. If a node fails a synthetic test, it shifts traffic to another Availability Zone.
- The healthy compute worker queries a distributed cache and returns a JSON payload.
- The load balancer returns the response, and the edge caches it for future requests.

Load Balancing Mechanics:
- Load balancers spread traffic across compute pools. They prevent host saturation and isolate bad nodes with health checks.
- Layer 4 load balancing works at the transport layer. It routes TCP and UDP streams using flow hash algorithms.
- Layer 4 gives very high throughput, microsecond latency, and does not inspect application payloads.
- Layer 7 load balancing works at the application layer. It terminates TLS and inspects HTTP headers, cookies, query parameters, and URL paths.
- Layer 7 supports content-based routing, microservice path routing, and custom tracking headers.
- Health checks can be shallow or deep.
- Shallow checks use TCP pings or basic HTTP GET requests. They miss database lockups and corrupted backend threads.
- Deep checks test the database, cache, and internal service dependencies.
- Flap damping uses consecutive failure thresholds and recovery thresholds. This stops instances from rapidly switching between healthy and unhealthy.
- Sticky sessions pin a user to one backend server. This causes uneven load and session loss when an instance fails.
- Stateless distribution stores session state in external distributed caches. Any instance can handle any client request.
- Important: Deep health checks should return warnings instead of hard failures when dependencies degrade. A minor database slowdown can otherwise cause the load balancer to remove an entire compute fleet.

Elastic Scalability:
- Scalability is the ability to handle more workload without degrading latency or responsiveness.
- Vertical scaling adds more CPU, RAM, or storage to one server. It has physical limits, requires downtime, and keeps a single point of failure.
- Horizontal scaling adds more identical instances or container tasks behind a load balancer. It has almost unlimited headroom and improves fault tolerance.
- Target tracking scaling sets a target metric, such as average CPU at 65 percent. The controller adds or removes instances to keep the metric stable.
- Step scaling uses graduated responses. Add two instances if CPU is 70 to 80 percent. Add six instances if CPU is above 85 percent.
- Scheduled and predictive scaling use historical patterns or schedules. They launch capacity before known events like flash sales or market open.
- Cooldown periods suppress more scaling events for a set time, su