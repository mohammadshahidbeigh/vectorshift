from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
import json
from collections import defaultdict

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    # Create adjacency list
    graph = defaultdict(list)
    for edge in edges:
        graph[edge['source']].append(edge['target'])
    
    # Keep track of visited nodes
    visited = set()
    temp = set()
    
    def has_cycle(node: str) -> bool:
        if node in temp:
            return True
        if node in visited:
            return False
            
        temp.add(node)
        
        # Check all neighbors
        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True
                
        temp.remove(node)
        visited.add(node)
        return False
    
    # Check each node for cycles
    node_ids = [node['id'] for node in nodes]
    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(node_id):
                return False
    
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: str = Form(...)):
    try:
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
        
        return {
            'num_nodes': len(nodes),
            'num_edges': len(edges),
            'is_dag': is_dag(nodes, edges)
        }
    except Exception as e:
        return {
            'error': str(e)
        }