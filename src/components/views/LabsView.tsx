import React, { useState } from 'react';
import { Code2, Terminal, Copy, Check, ExternalLink, Cpu, Cloud, Database, Layers } from 'lucide-react';
import { SimpleIcon } from '../icons/SimpleIcon';

interface LabRecipe {
  id: string;
  title: string;
  subject: string;
  icon: string;
  description: string;
  code: string;
  language: string;
}

const labRecipes: LabRecipe[] = [
  {
    id: 'ann-pytorch',
    title: 'PyTorch Deep MLP with Backprop & Adam',
    subject: 'Artificial Neural Networks',
    icon: 'siPytorch',
    description: 'Clean modular implementation of a multi-layer perceptron with BatchNorm, Dropout, and evaluation metrics.',
    language: 'python',
    code: `import torch
import torch.nn as nn
import torch.optim as optim

class DeepMLP(nn.Module):
    def __init__(self, input_dim=784, hidden_dim=256, num_classes=10):
        super(DeepMLP, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.BatchNorm1d(hidden_dim // 2),
            nn.ReLU(),
            nn.Linear(hidden_dim // 2, num_classes)
        )

    def forward(self, x):
        return self.network(x)

# Training dynamics with Adam & CrossEntropy
model = DeepMLP()
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
print("PyTorch model initialized successfully.")`,
  },
  {
    id: 'cloud-docker-k8s',
    title: 'Production Dockerfile & Kubernetes Deployment',
    subject: 'Cloud Services & Platforms',
    icon: 'siDocker',
    description: 'Multi-stage lean Docker containerization and Kubernetes manifest with health probes for model serving.',
    language: 'dockerfile',
    code: `# Multi-stage Build
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

---
# Kubernetes Deployment Manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-serving-deploy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ml-serving
  template:
    metadata:
      labels:
        app: ml-serving
    spec:
      containers:
      - name: inference-service
        image: ghcr.io/msc-data-science/serving:v1.0
        ports:
        - containerPort: 8000
        livenessProbe:
          httpGet:
            path: /health
            port: 8000`,
  },
  {
    id: 'lakehouse-iceberg',
    title: 'Apache Airflow DAG for Lakehouse ETL',
    subject: 'Data Stores & Pipelines',
    icon: 'siApacheairflow',
    description: 'Production Airflow DAG orchestrating batch data ingestion, Apache Iceberg compaction, and data quality assertions.',
    language: 'python',
    code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data_platform',
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    dag_id='lakehouse_ingest_iceberg',
    default_args=default_args,
    start_date=datetime(2026, 1, 1),
    schedule_interval='@daily',
    catchup=False
) as dag:

    def ingest_raw_batch():
        print("Ingesting raw telemetry into S3 landing bucket...")

    def transform_to_iceberg():
        print("Applying Iceberg ACID table writes with partition evolution...")

    def run_great_expectations():
        print("Executing data quality checks and schema assertions...")

    t1 = PythonOperator(task_id='ingest_raw', python_callable=ingest_raw_batch)
    t2 = PythonOperator(task_id='write_iceberg', python_callable=transform_to_iceberg)
    t3 = PythonOperator(task_id='validate_quality', python_callable=run_great_expectations)

    t1 >> t2 >> t3`,
  },
];

export const LabsView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 space-y-6 select-none">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Trimester 2 Practical Labs & Code Recipes
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Production code templates, Docker recipes, Airflow DAGs, and PyTorch architectures.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {labRecipes.map((lab) => {
          const isCopied = copiedId === lab.id;

          return (
            <div
              key={lab.id}
              className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs overflow-hidden"
            >
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <SimpleIcon name={lab.icon} size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-neutral-400">
                      {lab.subject}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {lab.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => copyCode(lab.id, lab.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy Recipe'}</span>
                </button>
              </div>

              <div className="p-4 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed border-b border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/30">
                {lab.description}
              </div>

              <pre className="p-4 text-xs font-mono bg-[#141416] text-neutral-200 overflow-x-auto leading-relaxed">
                <code>{lab.code}</code>
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabsView;
