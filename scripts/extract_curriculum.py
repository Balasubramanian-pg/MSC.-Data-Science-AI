import subprocess
import json
import re
import os

os.makedirs('src/data', exist_ok=True)

print("Starting Trimester 2 curriculum extraction from git tree...")
res = subprocess.run(['git', 'ls-tree', '-r', 'HEAD', 'Trimester 2'], cwd='repo_source', capture_output=True, text=True, encoding='utf-8')
lines = [l.strip() for l in res.stdout.strip().split('\n') if l.strip()]

subjects_map = {
    'Artificial Neural Networks': {
        'id': 'ann',
        'title': 'Artificial Neural Networks',
        'shortTitle': 'ANN & Deep Learning',
        'description': 'Perceptrons, Multi-Layer Perceptrons, backpropagation dynamics, CNN architectures, sequence modeling, and explainable AI.',
        'icon': 'siPytorch',
        'color': '#EE4C2C',
        'badge': '13 Weeks · PyTorch',
        'weeks': {}
    },
    'Cloud Services and Platforms': {
        'id': 'cloud',
        'title': 'Cloud Services and Platforms',
        'shortTitle': 'Cloud & AWS Engineering',
        'description': 'Enterprise AWS foundations, IAM, EC2 compute, VPC networking, Docker, Kubernetes container orchestration, S3, RDS, Serverless Lambda, and Terraform IaC.',
        'icon': 'siDocker',
        'color': '#2496ED',
        'badge': '13 Weeks · AWS & K8s',
        'weeks': {}
    },
    'Data Stores & Pipelines': {
        'id': 'data-stores',
        'title': 'Data Stores & Pipelines',
        'shortTitle': 'Data Stores & Lakehouses',
        'description': 'Modern data warehousing, lakehouses, Iceberg/Delta Lake formats, batch/streaming ingestion, and Apache Airflow orchestration.',
        'icon': 'siApacheairflow',
        'color': '#017CEE',
        'badge': '13 Weeks · Lakehouse & Airflow',
        'weeks': {}
    },
    'Machine Learning': {
        'id': 'ml',
        'title': 'Machine Learning',
        'shortTitle': 'Machine Learning',
        'description': 'Supervised & unsupervised learning algorithms, decision trees, rule-based classification, k-NN, ensemble methods, clustering, and association rule mining.',
        'icon': 'siScikitlearn',
        'color': '#F7931E',
        'badge': '13 Weeks · Scikit-Learn',
        'weeks': {}
    }
}

total_parsed = 0
search_index = []

for line in lines:
    parts = line.split('\t')
    meta = parts[0].split()
    path = parts[1]
    blob_hash = meta[2]
    
    path_parts = path.split('/')
    if len(path_parts) < 2:
        continue
    sub_name = path_parts[1]
    if sub_name not in subjects_map:
        continue
    
    # Read content
    c_res = subprocess.run(['git', 'show', blob_hash], cwd='repo_source', capture_output=True, text=True, encoding='utf-8', errors='ignore')
    content = c_res.stdout
    
    week_raw = path_parts[2] if len(path_parts) > 2 else ''
    lesson_raw = path_parts[3] if len(path_parts) > 3 else ''
    filename = path_parts[-1]
    
    if not week_raw:
        continue
        
    week_title = week_raw.replace(':', ' -')
    week_id_match = re.search(r'W(\d+)|Week\s*(\d+)', week_raw, re.IGNORECASE)
    week_num = int(week_id_match.group(1) or week_id_match.group(2)) if week_id_match else 0
    week_key = f"w{week_num:02d}" if week_num > 0 else week_raw
    
    subj = subjects_map[sub_name]
    if week_key not in subj['weeks']:
        subj['weeks'][week_key] = {
            'id': week_key,
            'weekNum': week_num,
            'title': week_title,
            'lessons': []
        }
        
    # Extract title
    title = ''
    for cl in content.split('\n'):
        cl = cl.strip()
        if cl.startswith('# '):
            title = cl.replace('# ', '').strip()
            break
    if not title:
        title = lesson_raw.replace(':', ' -') if lesson_raw else filename
        
    # Summary
    desc_lines = []
    for cl in content.split('\n'):
        cl = cl.strip()
        if cl and not cl.startswith('#') and not cl.startswith('<') and not cl.startswith('!['):
            desc_lines.append(cl)
            if len(desc_lines) >= 3:
                break
    summary = ' '.join(desc_lines)[:250] if desc_lines else 'Comprehensive study notes and curriculum reference.'
    
    words = len(content.split())
    read_mins = max(2, round(words / 180))
    lesson_idx = len(subj['weeks'][week_key]['lessons']) + 1
    subj_id = subj['id']
    lesson_id = f"{subj_id}-{week_key}-{lesson_idx}"
    
    lesson_item = {
        'id': lesson_id,
        'title': title,
        'subjectId': subj_id,
        'subjectTitle': subj['title'],
        'weekId': week_key,
        'weekTitle': week_title,
        'rawPath': path,
        'summary': summary,
        'readingTime': f"{read_mins} min read",
        'words': words,
        'size': len(content),
        'content': content
    }
    
    subj['weeks'][week_key]['lessons'].append(lesson_item)
    
    search_index.append({
        'id': lesson_id,
        'title': title,
        'subjectId': subj_id,
        'subjectTitle': subj['title'],
        'weekTitle': week_title,
        'summary': summary,
        'readingTime': f"{read_mins} min read"
    })
    
    total_parsed += 1

# Flatten weeks into sorted lists
result_subjects = []
for k, subj in subjects_map.items():
    weeks_list = sorted(list(subj['weeks'].values()), key=lambda w: w['weekNum'])
    # sort lessons within each week
    for w in weeks_list:
        w['lessons'].sort(key=lambda l: l['title'])
    
    subj_copy = {
        'id': subj['id'],
        'title': subj['title'],
        'shortTitle': subj['shortTitle'],
        'description': subj['description'],
        'icon': subj['icon'],
        'color': subj['color'],
        'badge': subj['badge'],
        'totalLessons': sum(len(w['lessons']) for w in weeks_list),
        'weeks': weeks_list
    }
    result_subjects.append(subj_copy)

print(f"Extraction complete! Total lessons: {total_parsed}")

# Write curriculumData.json and searchIndex.json
with open('src/data/curriculumData.json', 'w', encoding='utf-8') as f:
    json.dump(result_subjects, f, ensure_ascii=False, indent=2)

with open('src/data/searchIndex.json', 'w', encoding='utf-8') as f:
    json.dump(search_index, f, ensure_ascii=False, indent=2)

# Write TypeScript wrappers
ts_curriculum = """// Auto-generated curriculum data for Trimester 2
import curriculumJson from './curriculumData.json';
import searchIndexJson from './searchIndex.json';

export interface Lesson {
  id: string;
  title: string;
  subjectId: string;
  subjectTitle: string;
  weekId: string;
  weekTitle: string;
  rawPath: string;
  summary: string;
  readingTime: string;
  words: number;
  size: number;
  content: string;
}

export interface Week {
  id: string;
  weekNum: number;
  title: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
  totalLessons: number;
  weeks: Week[];
}

export interface SearchItem {
  id: string;
  title: string;
  subjectId: string;
  subjectTitle: string;
  weekTitle: string;
  summary: string;
  readingTime: string;
}

export const curriculumData: Subject[] = curriculumJson as Subject[];
export const searchIndex: SearchItem[] = searchIndexJson as SearchItem[];

export const allLessons: Lesson[] = curriculumData.flatMap(s => 
  s.weeks.flatMap(w => w.lessons)
);

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find(l => l.id === id);
}

export function getSubjectById(id: string): Subject | undefined {
  return curriculumData.find(s => s.id === id);
}
"""

with open('src/data/curriculumData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_curriculum)

print("Saved src/data/curriculumData.json, src/data/searchIndex.json, and src/data/curriculumData.ts successfully!")
