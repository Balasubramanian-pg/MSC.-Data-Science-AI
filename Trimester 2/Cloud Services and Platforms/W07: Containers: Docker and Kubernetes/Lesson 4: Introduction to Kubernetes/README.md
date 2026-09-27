# Lesson 4: Introduction to Kubernetes

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It abstracts individual machines into a pool of compute so you think in terms of pods and services, not which VM runs which process. A cluster consists of a control plane and worker nodes that together maintain the desired state of your workloads.

```mermaid
flowchart TD
    A[Kubernetes] --> B[Control Plane]
    A --> C[Worker Nodes]
    A --> D[Workload Objects]
    A --> E[Networking]
    A --> F[Configuration and Security]
    B --> B1[kube-apiserver, etcd, scheduler, controllers]
    C --> C1[kubelet, kube-proxy, container runtime]
    D --> D1[Pods, Deployments, Services, StatefulSets]
    E --> E1[CNI, Service types, Ingress, NetworkPolicy]
    F --> F1[ConfigMaps, Secrets, RBAC, PSA]
```

## What Is Kubernetes

*Definition*: Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and operations of containerized applications. You declare desired state in YAML, and controllers continuously reconcile actual state toward that target.

- Kubernetes solves the problems of manual container management: scheduling, self-healing, scaling, and service discovery.
- It abstracts the underlying infrastructure. You work with pods and services, not individual servers.
- Managed clusters like Amazon EKS, Google GKE, and Azure AKS hide the control plane, but you still debug the same workload objects with `kubectl`.

> [!Important]
> **Kubernetes is declarative, not imperative**: You describe what you want, not how to do it. Controllers compare actual state to desired state and take action to close the gap. This is the fundamental mental model for everything in Kubernetes.

## Cluster Architecture

A Kubernetes cluster consists of a control plane and one or more worker nodes. The control plane manages the cluster, and worker nodes run the containerized applications.

### Control Plane Components

The control plane makes global decisions about the cluster, detects and responds to cluster events, and maintains the desired state.

| Component | Description |
|---|---|
| kube-apiserver | Exposes the Kubernetes HTTP API. All `kubectl` commands go here. |
| etcd | Consistent and highly-available key-value store for all API server data. |
| kube-scheduler | Watches for newly created Pods and assigns them to suitable nodes. |
| kube-controller-manager | Runs controllers that implement Kubernetes API behavior (Deployments, ReplicaSets, etc.). |
| cloud-controller-manager | Integrates with the underlying cloud provider (optional). |

- The control plane is usually distributed across multiple nodes for fault tolerance.
- In managed clusters (EKS, GKE, AKS), the control plane is managed by the cloud provider.
- All cluster data is stored in etcd. Backing up etcd is critical for disaster recovery.

> [!Important]
> **The API server is the front door to the cluster**: Every request, whether from `kubectl`, a controller, or a kubelet, goes through the kube-apiserver. It authenticates, authorizes, validates, and persists objects to etcd. If the API server is down, the cluster cannot make changes.

### Worker Node Components

Worker nodes run the containerized workloads. Every node runs three key components.

| Component | Description |
|---|---|
| kubelet | Agent that runs on every node. Ensures Pods and their containers are running. |
| kube-proxy | Maintains network rules on nodes to implement Services (ClusterIP, NodePort, LoadBalancer). |
| Container Runtime | Software responsible for running containers (containerd, CRI-O, or Docker via shim). |

- The kubelet receives Pod specs from the API server and ensures the containers described in those specs are running.
- kube-proxy programs iptables or IPVS rules so Service virtual IPs route to healthy Pod endpoints.
- The container runtime pulls images and runs containers via the Container Runtime Interface (CRI).
- On Windows, the CRI integrates with Host Compute Service (HCS) and Host Networking Service (HNS).

```mermaid
flowchart TD
    subgraph ControlPlane["Control Plane"]
        API[kube-apiserver]
        ETCD[etcd]
        SCHED[kube-scheduler]
        CM[kube-controller-manager]
    end
    subgraph WorkerNodes["Worker Nodes"]
        N1[Node 1]
        N2[Node 2]
        N1 --> K1[kubelet]
        N1 --> KP1[kube-proxy]
        N1 --> CR1[Container Runtime]
        N2 --> K2[kubelet]
        N2 --> KP2[kube-proxy]
        N2 --> CR2[Container Runtime]
    end
    API --> ETCD
    API --> SCHED
    API --> CM
    API --> N1
    API --> N2
```

> [!Tip]
> **Managed clusters hide the control plane, not the concepts**: EKS, GKE, and AKS manage the control plane for you, but understanding kube-apiserver, etcd, and the scheduler is still essential for debugging and designing resilient workloads.

## Core Workload Objects

Kubernetes uses a layered set of resource types to deploy and manage applications. Each layer adds capabilities like networking, self-healing, and zero-downtime upgrades on top of the one below it.

### Pods

*Definition*: A Pod is the smallest deployable unit in Kubernetes. It represents a single instance of a running process in the cluster and can contain one or more containers that share a network namespace, IP address, and storage.

- A Pod is not a container. A Pod can hold multiple containers that share a single IP address, localhost, IPC space, network ports, and volumes.
- Containers within a Pod communicate via localhost. Pod-to-Pod communication is done via Services.
- Pods are ephemeral. If a Pod fails, it cannot restart itself. This is why you use higher-level controllers.
- Pods are assigned a unique cluster-private IP address.

> [!Important]
> **Pods are ephemeral, Services are stable**: Pod IPs change when Pods are recreated. Applications should always connect to Services, not Pod IPs directly. This is the fundamental networking pattern in Kubernetes.

### Deployments

*Definition*: A Deployment manages a set of replicas of a Pod. It provides declarative updates, self-healing, and zero-downtime rollouts.

- Deployments sit above ReplicaSets and perform rolling upgrades one Pod at a time.
- Built-in rollback if something goes wrong.
- Deployments are for stateless applications.
- You declare the desired number of replicas, and the Deployment ensures that number is running.

### StatefulSets

*Definition*: A StatefulSet manages stateful applications, providing stable identity and storage for each Pod.

- StatefulSets provide stable, unique network identifiers and persistent storage.
- Use them for databases, message queues, and other stateful workloads.
- Databases cannot be replicated using Deployments because they are stateful.
- Each Pod in a StatefulSet has a stable hostname and can be associated with its own PersistentVolume.

### DaemonSets

*Definition*: A DaemonSet ensures that a copy of a Pod runs on all (or some) nodes in the cluster.

- Use DaemonSets for per-node agents such as monitoring agents, log collectors, and network plugins.
- When a new node is added to the cluster, the DaemonSet automatically adds a Pod to it.

### Jobs and CronJobs

- Jobs run to completion. Use them for batch processing and one-time tasks.
- CronJobs run on a schedule. Use them for recurring tasks like backups and report generation.

### Workload Object Comparison

| Object | Use Case | State | Scaling |
|---|---|---|---|
| Pod | Single instance, lowest level | Ephemeral | Manual |
| Deployment | Stateless apps, rolling updates | Stateless | Replicas |
| StatefulSet | Databases, message queues | Stateful | Ordered, stable identity |
| DaemonSet | Per-node agents | Stateless | One per node |
| Job | Batch processing | Run-to-completion | Parallelism |
| CronJob | Scheduled tasks | Run-to-completion | Schedule-based |

> [!Tip]
> **Choose the right workload type**: Use StatefulSets for persistent storage needs, DaemonSets for per-node agents, and Jobs or CronJobs for batch processing instead of defaulting to Deployments for every workload.

## Services and Networking

Kubernetes networking provides each Pod with its own cluster-private IP address, enables Pod-to-Pod communication without NAT, and provides stable Service endpoints for dynamic Pod sets.

### The Kubernetes Network Model

- Every Pod gets its own unique cluster-wide IP address.
- Pods have their own private network namespace. All containers in a Pod share that namespace.
- Containers within a Pod communicate via localhost.
- Pods can communicate with all other Pods without NAT, regardless of which node they are on.
- Nodes can communicate with all Pods on that node.
- Services provide stable IP addresses or hostnames for a set of Pods that can change at any time.
- Kubernetes automatically manages EndpointSlice objects to track which Pods are backing a Service.

### Service Types

*Definition*: A Service is a network abstraction over a set of Pods that provides a stable DNS record and virtual IP, automatically tracking IP changes and load-balancing traffic.

| Service Type | Description | Use Case |
|---|---|---|
| ClusterIP | Internal-only IP within the cluster | Internal microservice communication |
| NodePort | Exposes service on each node's IP at a static port | Development, simple external access |
| LoadBalancer | Provisions an external load balancer | Production external access |
| ExternalName | Maps service to a DNS name | External dependencies |

- ClusterIP is the default. It creates an internal IP for use within the cluster.
- NodePort creates a mapping from a port on each node to the Service.
- LoadBalancer provisions a cloud provider load balancer for external access.
- ExternalName returns a CNAME record with the value of the external name.

### Ingress

*Definition*: Ingress exposes HTTP and HTTPS routes from outside the cluster to Services within the cluster. It provides Layer 7 routing based on hostnames and paths.

- Ingress requires an ingress controller (NGINX, Traefik, HAProxy, AWS Load Balancer Controller).
- Ingress allows you to define routing rules for domain names and paths.
- Gateway API is the successor to Ingress and provides more expressive routing.

### Network Policies

*Definition*: NetworkPolicy is a built-in Kubernetes API that allows you to control traffic between Pods, or between Pods and the outside world.

- NetworkPolicy provides pod-level firewall rules so you can implement least privilege (default deny, explicit allow).
- Requires a CNI implementation that supports NetworkPolicy, otherwise policies are ignored.
- Common CNI plugins that support NetworkPolicy: Calico, Cilium, Weave Net.
- Policies are defined with ingress and egress rules based on labels, IP blocks, and ports.

```mermaid
flowchart TD
    Internet[Internet] --> Ingress[Ingress Controller]
    Ingress --> S1[Service A]
    Ingress --> S2[Service B]
    S1 --> P1[Pod 1]
    S1 --> P2[Pod 2]
    S2 --> P3[Pod 3]
    S2 --> P4[Pod 4]
    NP[NetworkPolicy] -.->|Restricts| P1
    NP -.->|Restricts| P2
    NP -.->|Restricts| P3
```

> [!Important]
> **NetworkPolicies are default-allow unless you create a default-deny policy**: Kubernetes does not deny traffic by default. If you want zero-trust micro-segmentation, you must create a NetworkPolicy that selects all Pods in a namespace and denies all ingress and egress, then add explicit allow rules for required traffic.

## Configuration and Secrets

Kubernetes separates configuration and sensitive data from application code.

### ConfigMaps

*Definition*: A ConfigMap stores non-sensitive configuration data as key-value pairs or files.

- Use ConfigMaps for application configuration that varies between environments.
- ConfigMaps can be injected into Pods as environment variables or mounted as files.
- ConfigMaps are not encrypted at rest.

### Secrets

*Definition*: A Secret stores sensitive data such as passwords, tokens, and certificates.

- Secrets are base64-encoded at rest by default. Base64 encoding is not encryption.
- Enable encryption at rest for Secrets using a KMS provider.
- Secrets can be injected as environment variables or mounted as files.
- Use a secrets management solution like AWS Secrets Manager or HashiCorp Vault for production.

> [!Important]
> **Base64 is not encryption**: Secrets are base64-encoded, not encrypted, by default. Anyone with access to etcd can read them. Enable encryption at rest and use a dedicated secrets manager for production workloads.

## Namespaces and RBAC

### Namespaces

*Definition*: Namespaces isolate resources within a cluster. They are used to divide cluster resources between multiple users, teams, or environments.

- Production often uses namespaces like `prod`, `staging`, and `kube-system`.
- Resources in one namespace are isolated from resources in another by default.
- Namespaces are a way to apply quotas, network policies, and RBAC.

### RBAC

*Definition*: Role-Based Access Control (RBAC) controls who can do what in a Kubernetes cluster. Roles and ClusterRoles define permissions. RoleBindings and ClusterRoleBindings bind those permissions to users, groups, or ServiceAccounts.

| Resource | Scope | Purpose |
|---|---|---|
| Role | Namespace | Defines permissions within a namespace |
| ClusterRole | Cluster | Defines permissions across the cluster |
| RoleBinding | Namespace | Binds a Role to a subject within a namespace |
| ClusterRoleBinding | Cluster | Binds a ClusterRole to a subject across the cluster |
| ServiceAccount | Namespace | Identity for Pods to access the API |

- `Forbidden` errors are almost always RBAC or wrong namespace.
- Follow least privilege: define Roles and RoleBindings per namespace, not cluster-wide.
- Audit RBAC regularly. Remove unused permissions.
- Tie permissions to your identity provider so access is revoked when someone leaves the project.

> [!Important]
> **Start with read-only and add permissions incrementally**: Grant read-only access first, then add specific verbs (get, list, create) per microservice. This prevents accidental deletions and lateral movement during a compromised pipeline.

## Kubernetes Security Best Practices

Kubernetes security requires a layered approach. No single control is sufficient. The following practices represent the current standard for securing Kubernetes deployments.

### 1. Enforce RBAC and Least Privilege

- Stop using cluster-admin for everything.
- Define Roles and RoleBindings per namespace, not cluster-wide.
- Audit RBAC regularly.
- A front-end developer should never have delete rights on a production database namespace.
- Tie permissions to your identity provider so access is revoked automatically when someone leaves.

### 2. Lock Down Pod Security with Admission Controllers

- Running containers as root is a disaster waiting to happen.
- Use Pod Security Admission (PSA) with restricted profiles.
- PodSecurityPolicy was removed in Kubernetes v1.25. PSA is its built-in replacement.
- PSA applies one of three profiles — privileged, baseline, or restricted — at the namespace level via labels.
- Set restricted everywhere you can.
- Pair PSA with a policy engine like OPA Gatekeeper or Kyverno.

### 3. Scan Images and Sign Every Artifact

- Integrate vulnerability scanning into your CI/CD pipeline.
- Use cosign or Notation to sign images.
- Enforce signature verification at admission.
- Without policy enforcement, a community image with a known CVE lands in production silently.
- With mandatory signing, the deployment is blocked until the image is approved.

### 4. Isolate Network Traffic with Zero-Trust Micro-Segmentation

- Default "allow all" network policies are a security risk.
- Define ingress and egress rules for each namespace based on actual communication paths.
- Only the API gateway should talk to the payments service. Payments should only reach the database.
- Use labels like `app: payments` to craft policies.
- This cuts the blast radius if a single container is compromised.

### 5. Use Secrets Management

- Enable encryption at rest for Secrets.
- Use a dedicated secrets manager (AWS Secrets Manager, HashiCorp Vault).
- Do not store secrets in ConfigMaps or container images.

### 6. Enable Audit Logging

- Enable Kubernetes audit logging to record all API calls.
- Ship audit logs to a centralized SIEM.
- Monitor for unusual API activity.

### Pod Security Admission Levels

| Level | Description | Use Case |
|---|---|---|
| Privileged | Unrestricted, allows all capabilities | System components, trusted workloads |
| Baseline | Minimally restrictive, prevents known privilege escalations | Most workloads |
| Restricted | Heavily restricted, follows security best practices | Production workloads |

> [!Important]
> **Pod Security Admission replaced PodSecurityPolicy**: PodSecurityPolicy was removed in Kubernetes v1.25. PSA is enforced through namespace labels rather than a separate resource type. Apply the restricted profile to production namespaces with enforce mode.

## kubectl and Cluster Interaction

`kubectl` is the command-line tool for interacting with the Kubernetes API server.

### How kubectl Interacts with the Cluster

1. Config: `~/.kube/config` holds clusters, users, contexts, and namespaces.
2. Request: `kubectl` sends HTTPS to the API server (auth via certificate, token, or OIDC).
3. Admission and validation: The API server checks schema, RBAC, and webhooks.
4. Persist: The object is written to etcd.
5. Reconcile: Controllers and kubelet react to watches and update status.

```mermaid
sequenceDiagram
    participant User as kubectl
    participant API as kube-apiserver
    participant ETCD as etcd
    participant CTRL as Controllers
    participant KL as kubelet
    User->>API: HTTPS request
    API->>API: Authenticate and authorize
    API->>API: Validate schema and webhooks
    API->>ETCD: Persist object
    ETCD-->>API: Confirm
    API-->>User: Return response
    API->>CTRL: Watch event
    CTRL->>API: Update status
    API->>KL: Pod spec
    KL->>KL: Run containers
```

### Helper Tooling

- krew: Plugin manager for kubectl.
- stern: Tail logs from multiple pods and containers at once.
- kubectx: Switch cluster contexts quickly.
- kubens: Switch default namespace.
- k9s: Terminal-based cluster UI.

> [!Tip]
> **Use kubectx and kubens to avoid context mistakes**: Accidentally running a command in the wrong cluster is a common source of incidents. kubectx and kubens make it fast and visible to switch contexts and namespaces.

## Kubernetes in AWS

Amazon EKS is the managed Kubernetes service on AWS. It runs the control plane across multiple Availability Zones and integrates with AWS networking, IAM, and load balancing.

- EKS manages the control plane. You manage worker nodes or use Fargate.
- EKS supports EC2 worker nodes and Fargate for serverless containers.
- IAM Roles for Service Accounts (IRSA) provides fine-grained IAM permissions to Pods.
- AWS Load Balancer Controller provisions ALB and NLB for Ingress and Service resources.
- EKS supports EBS and EFS for persistent storage via CSI drivers.
- VPC CNI assigns Pod IPs from the VPC CIDR, enabling direct VPC communication.

| EKS Feature | Description |
|---|---|
| Managed Control Plane | AWS manages the control plane across multiple AZs |
| EC2 Worker Nodes | You manage the worker nodes |
| Fargate | Serverless compute for Pods |
| IRSA | IAM roles for service accounts |
| VPC CNI | Pod IPs from VPC CIDR |
| EBS CSI Driver | Persistent storage for Pods |
| ALB Ingress Controller | Application Load Balancer for Ingress |

> [!Important]
> **EKS is standard Kubernetes with AWS integration**: The core Kubernetes concepts are identical. The AWS-specific pieces are IAM integration (IRSA), networking (VPC CNI), load balancing (ALB Controller), and storage (EBS CSI). Learn standard Kubernetes first, then the AWS integration.

## Assessment Preparation

### Practice Questions

1. Define Kubernetes and explain how it works declaratively.
2. Describe the components of the Kubernetes control plane.
3. Describe the components of a Kubernetes worker node.
4. Explain the difference between a Pod, a Deployment, and a Service.
5. Compare StatefulSets, DaemonSets, and Jobs.
6. Explain the Kubernetes network model.
7. Compare ClusterIP, NodePort, and LoadBalancer Services.
8. Describe the purpose of Ingress and NetworkPolicy.
9. Compare ConfigMaps and Secrets.
10. Explain the role of RBAC and how Roles and ClusterRoles differ.
11. Describe Pod Security Admission and its three profiles.
12. List five Kubernetes security best practices.
13. Explain how kubectl interacts with the cluster.
14. Describe how Amazon EKS integrates with AWS services.

### Scenario Questions

**Scenario 1: Stateless Web Application**
A team needs to deploy a stateless web application with rolling updates and rollback. What Kubernetes object should they use?

- Use a Deployment.
- Define the desired number of replicas.
- Use a Service to expose the Deployment.
- Use an Ingress for external HTTP routing.
- Configure resource requests and limits.

**Scenario 2: Stateful Database**
A company needs to run a PostgreSQL database on Kubernetes with persistent storage and stable network identity. What should they use?

- Use a StatefulSet.
- Each Pod gets a stable hostname and its own PersistentVolume.
- Use a headless Service for stable network identity.
- Consider using a managed database service (Amazon RDS) instead.

**Scenario 3: Per-Node Monitoring Agent**
A team needs to run a monitoring agent on every node in the cluster. What should they use?

- Use a DaemonSet.
- A copy of the Pod runs on every node.
- New nodes automatically get the agent.
- Use tolerations to run on control plane nodes if needed.

**Scenario 4: Scheduled Backup Job**
A company needs to run a backup job every night at 2 AM. What should they use?

- Use a CronJob.
- Define the schedule in cron format.
- The Job runs to completion and then terminates.
- Monitor Job status and failures.

**Scenario 5: Zero-Trust Network Security**
A security team requires that only the API gateway can talk to the payment service, and only the payment service can talk to the database. How should this be enforced?

- Create a default-deny NetworkPolicy for the namespace.
- Add explicit allow rules for API gateway to payment service and payment service to database.
- Use labels to select Pods.
- Ensure the CNI supports NetworkPolicy enforcement.

```mermaid
flowchart TD
    A[Kubernetes Decision] --> B{Stateful or Stateless?}
    B -->|Stateless| C[Deployment]
    B -->|Stateful| D[StatefulSet]
    A --> E{Per-Node Agent?}
    E -->|Yes| F[DaemonSet]
    E -->|No| G{Task?}
    G -->|Run to Completion| H[Job]
    G -->|Scheduled| I[CronJob]
    A --> J{Networking?}
    J -->|Internal| K[ClusterIP Service]
    J -->|External HTTP| L[Ingress]
    J -->|External TCP| M[LoadBalancer Service]
    J -->|Security| N[NetworkPolicy]
```

## Key Takeaways

- Kubernetes is an open-source container orchestration platform. It uses declarative state and controllers to maintain desired state.
- A cluster consists of a control plane and worker nodes. The control plane includes kube-apiserver, etcd, kube-scheduler, kube-controller-manager, and cloud-controller-manager.
- Worker nodes run kubelet, kube-proxy, and a container runtime.
- Pods are the smallest deployable unit. Deployments manage stateless apps. StatefulSets manage stateful apps. DaemonSets run per-node agents. Jobs and CronJobs handle batch tasks.
- Services provide stable networking for dynamic Pod sets. ClusterIP, NodePort, and LoadBalancer are the main types. Ingress provides Layer 7 routing.
- NetworkPolicy provides pod-level firewall rules. Requires a CNI that supports it. Default is allow-all unless you create a default-deny policy.
- ConfigMaps store non-sensitive configuration. Secrets store sensitive data. Enable encryption at rest for Secrets.
- RBAC controls access. Roles are namespace-scoped. ClusterRoles are cluster-scoped. Follow least privilege.
- Pod Security Admission replaced PodSecurityPolicy in v1.25. Three levels: privileged, baseline, restricted. Apply restricted to production namespaces.
- Kubernetes security requires layered controls: RBAC, PSA, image signing, network policies, secrets management, and audit logging.
- kubectl sends requests to the API server, which authenticates, authorizes, validates, and persists to etcd. Controllers and kubelet reconcile.
- Amazon EKS is managed Kubernetes on AWS with IAM integration (IRSA), VPC CNI, ALB Ingress Controller, and EBS CSI storage.
- Learn standard Kubernetes first, then the AWS integration.

> [!Important]
> **Kubernetes is a platform, not just a tool**: It provides a declarative API, self-healing, service discovery, and extensibility. Understanding the architecture and workload objects is essential before deploying production workloads. Start with Pods, Deployments, and Services. Add StatefulSets, DaemonSets, and Jobs as needed. Layer on RBAC, Pod Security Admission, NetworkPolicies, and image signing for security. Use managed EKS to reduce operational overhead while retaining standard Kubernetes semantics.
