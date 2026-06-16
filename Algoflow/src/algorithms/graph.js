function getAdjacencyList(nodes, edges) {
  const adj = {};
  nodes.forEach(n => {
    adj[n.id] = [];
  });
  edges.forEach(e => {
    if (adj[e.from]) adj[e.from].push({ to: e.to, weight: e.weight });
    if (adj[e.to]) adj[e.to].push({ to: e.from, weight: e.weight });
  });
  return adj;
}


function reconstructPath(parent, current) {
  const path = [current];
  while (parent[current] !== null) {
    current = parent[current];
    path.unshift(current);
  }
  return path;
}


//BFS
export function generateBFS(
  nodes,
  edges,
  startId,
  targetId
) {
  const snapshots = [];
  const adj = getAdjacencyList(nodes, edges);
  const visited = [];
  const queue = [startId];
  const parent = {};
  const distances = {};
  nodes.forEach(n => {
    parent[n.id] = null;
    distances[n.id] = Infinity;
  });
  distances[startId] = 0;
  visited.push(startId);
  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    queue: [...queue],
    distances: { ...distances },
    shortestPath: [],
    description: `Initialized BFS at node ${startId}. Added to queue.`,
    line: 0
  });
  let found = false;
  while (queue.length > 0) {
    const u = queue.shift();
    snapshots.push({
      nodes,
      edges,
      visited: [...visited],
      currentNode: u,
      queue: [...queue],
      distances: { ...distances },
      shortestPath: [],
      description: `Dequeued and visiting node ${u}.`,
      line: 3
    });
    if (u === targetId) {
      found = true;
      break;
    }
    const neighbors = adj[u] || [];
    for (const neighbor of neighbors) {
      const v = neighbor.to;
      if (!visited.includes(v)) {
        visited.push(v);
        queue.push(v);
        parent[v] = u;
        distances[v] = distances[u] + 1;
        snapshots.push({
          nodes,
          edges,
          visited: [...visited],
          currentNode: u,
          neighbors: neighbors.map(n => n.to),
          queue: [...queue],
          distances: { ...distances },
          shortestPath: [],
          description: `Discovered unvisited neighbor node ${v}. Added to queue. Set parent to ${u}.`,
          line: 7
        });
      }
    }
  }
  const path = found && targetId ? reconstructPath(parent, targetId) : [];
  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    queue: [...queue],
    distances: { ...distances },
    shortestPath: path,
    description: found
      ? `BFS finished. Found target node ${targetId}! Shortest path is highlighted.`
      : 'BFS finished. Visited all reachable nodes.',
    line: found ? 5 : 2
  });
  return snapshots;
}


//DFS
export function generateDFS(
  nodes,
  edges,
  startId,
  targetId
) {
  const snapshots = [];
  const adj = getAdjacencyList(nodes, edges);
  const visited = [];
  const stack = [startId];
  const parent = {};
  const distances = {};
  nodes.forEach(n => {
    parent[n.id] = null;
    distances[n.id] = Infinity;
  });
  distances[startId] = 0;
  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    stack: [...stack],
    distances: { ...distances },
    shortestPath: [],
    description: `Initialized DFS at start node ${startId}. Added to stack.`,
    line: 0
  });
  let found = false;
  while (stack.length > 0) {
    const u = stack.pop();
    
    if (visited.includes(u)) {
      continue;
    }
    visited.push(u);
    snapshots.push({
      nodes,
      edges,
      visited: [...visited],
      currentNode: u,
      stack: [...stack],
      distances: { ...distances },
      shortestPath: [],
      description: `Popped node ${u} from stack and marked it as visited.`,
      line: 3
    });
    if (u === targetId) {
      found = true;
      break;
    }
    const neighbors = adj[u] || [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const v = neighbors[i].to;
      if (!visited.includes(v)) {
        if (!stack.includes(v)) {
          stack.push(v);
          parent[v] = u;
          distances[v] = distances[u] + 1;
        }
        snapshots.push({
          nodes,
          edges,
          visited: [...visited],
          currentNode: u,
          stack: [...stack],
          distances: { ...distances },
          shortestPath: [],
          description: `Discovered neighbor node ${v}. Pushed to stack.`,
          line: 7
        });
      }
    }
  }
  const path = found && targetId ? reconstructPath(parent, targetId) : [];
  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    stack: [...stack],
    distances: { ...distances },
    shortestPath: path,
    description: found
      ? `DFS finished. Target node ${targetId} found! Path is highlighted.`
      : 'DFS finished. Visited all reachable nodes.',
    line: found ? 5 : 2
  });
  return snapshots;
}


//Dijkstra
export function generateDijkstra(
  nodes,
  edges,
  startId,
  targetId
) {
  const snapshots = [];
  const adj = getAdjacencyList(nodes, edges);
  const visited = [];
  const distances = {};
  const parent = {};
  const pq = [];
  nodes.forEach(n => {
    distances[n.id] = Infinity;
    parent[n.id] = null;
  });
  distances[startId] = 0;
  pq.push({ id: startId, dist: 0 });
  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    queue: pq.map(item => `${item.id}(d:${item.dist})`),
    distances: { ...distances },
    shortestPath: [],
    description: `Set initial distances to infinity. Start node ${startId} set to 0 and added to Priority Queue.`,
    line: 0
  });
  let found = false;
  while (pq.length > 0) {

    pq.sort((a, b) => a.dist - b.dist);
    const curr = pq.shift();
    const u = curr.id;
    if (visited.includes(u)) continue;
    visited.push(u);
    snapshots.push({
      nodes,
      edges,
      visited: [...visited],
      currentNode: u,
      queue: pq.map(item => `${item.id}(d:${item.dist})`),
      distances: { ...distances },
      shortestPath: [],
      description: `Extracting node ${u} with minimum distance (${distances[u]}) from Priority Queue.`,
      line: 3
    });
    if (u === targetId) {
      found = true;
      break;
    }
    const neighbors = adj[u] || [];
    for (const neighbor of neighbors) {
      const v = neighbor.to;
      const w = neighbor.weight;
      if (!visited.includes(v)) {
        const alt = distances[u] + w;
        if (alt < distances[v]) {
          distances[v] = alt;
          parent[v] = u;
          pq.push({ id: v, dist: alt });
          snapshots.push({
            nodes,
            edges,
            visited: [...visited],
            currentNode: u,
            queue: pq.map(item => `${item.id}(d:${item.dist})`),
            distances: { ...distances },
            shortestPath: [],
            description: `Relaxing edge (${u} -> ${v}). Found shorter path of cost ${alt} (previous: ${distances[v] === Infinity ? '∞' : distances[v]}).`,
            line: 6
          });
        }
      }
    }
  }
  const path = found && targetId ? reconstructPath(parent, targetId) : [];
  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    distances: { ...distances },
    shortestPath: path,
    description: found
      ? `Dijkstra's finished. Found shortest path to target ${targetId} of total cost ${distances[targetId]}.`
      : 'Dijkstra finished. Explored all connected nodes.',
    line: found ? 5 : 2
  });
  return snapshots;
}

function getHeuristic(nodeA, nodeB) {
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  return Math.round(Math.sqrt(dx * dx + dy * dy) / 10);
}


//A* search
export function generateAStar(
  nodes,
  edges,
  startId,
  targetId
) {
  const snapshots = [];
  const adj = getAdjacencyList(nodes, edges);
  const targetNode = nodes.find(n => n.id === targetId);
  const visited = [];
  const gScore = {};
  const fScore = {};
  const parent = {};
  const openSet = [];
  nodes.forEach(n => {
    gScore[n.id] = Infinity;
    fScore[n.id] = Infinity;
    parent[n.id] = null;
  });
  gScore[startId] = 0;
  fScore[startId] = getHeuristic(nodes.find(n => n.id === startId), targetNode);
  openSet.push({ id: startId, f: fScore[startId] });
  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    queue: openSet.map(item => `${item.id}(f:${item.f})`),
    distances: { ...gScore },
    shortestPath: [],
    description: `Initialized A*. g(start) = 0, h(start) = ${fScore[startId]}. f(start) = ${fScore[startId]}.`,
    line: 0
  });
  let found = false;
  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const curr = openSet.shift();
    const u = curr.id;
    if (visited.includes(u)) continue;
    visited.push(u);
    snapshots.push({
      nodes,
      edges,
      visited: [...visited],
      currentNode: u,
      queue: openSet.map(item => `${item.id}(f:${item.f})`),
      distances: { ...gScore },
      shortestPath: [],
      description: `Visiting node ${u} with minimum f-score (${curr.f}) from Open Set.`,
      line: 4
    });
    if (u === targetId) {
      found = true;
      break;
    }
    const neighbors = adj[u] || [];
    for (const neighbor of neighbors) {
      const v = neighbor.to;
      const w = neighbor.weight;
      if (!visited.includes(v)) {
        const tentativeG = gScore[u] + w;
        if (tentativeG < gScore[v]) {
          parent[v] = u;
          gScore[v] = tentativeG;
          const h = getHeuristic(nodes.find(n => n.id === v), targetNode);
          fScore[v] = tentativeG + h;
          
          if (!openSet.some(item => item.id === v)) {
            openSet.push({ id: v, f: fScore[v] });
          }
          snapshots.push({
            nodes,
            edges,
            visited: [...visited],
            currentNode: u,
            queue: openSet.map(item => `${item.id}(f:${item.f})`),
            distances: { ...gScore },
            shortestPath: [],
            description: `Relaxing edge (${u} -> ${v}). Updated g(${v}) = ${tentativeG}, h(${v}) = ${h}, f(${v}) = ${fScore[v]}.`,
            line: 7
          });
        }
      }
    }
  }
  const path = found ? reconstructPath(parent, targetId) : [];
  snapshots.push({
    nodes,
    edges,
    visited: [...visited],
    distances: { ...gScore },
    shortestPath: path,
    description: found
      ? `A* search complete. Target node ${targetId} reached with path cost ${gScore[targetId]}.`
      : 'A* search finished. Target is unreachable.',
    line: found ? 5 : 2
  });
  return snapshots;
}
