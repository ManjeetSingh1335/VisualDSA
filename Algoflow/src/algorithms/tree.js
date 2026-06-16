let nodeCounter = 0;
function nextId() {
  nodeCounter++;
  return `node_${nodeCounter}_${Date.now()}`;
}

function cloneNodes(nodes) {
  const cloned = {};
  for (const id in nodes) {
    cloned[id] = { ...nodes[id] };
  }
  return cloned;
}

function getHeight(nodeId, nodes) {
  if (!nodeId || !nodes[nodeId]) return 0;
  return nodes[nodeId].height;
}

function getBalanceFactor(nodeId, nodes) {
  if (!nodeId || !nodes[nodeId]) return 0;
  const node = nodes[nodeId];
  return getHeight(node.leftId, nodes) - getHeight(node.rightId, nodes);
}

function updateHeight(nodeId, nodes) {
  const node = nodes[nodeId];
  node.height = 1 + Math.max(getHeight(node.leftId, nodes), getHeight(node.rightId, nodes));
  node.balanceFactor = getBalanceFactor(nodeId, nodes);
}


//BST insert generator
export function generateBSTInsert(
  currentNodes,
  currentRootId,
  value
) {
  const snapshots = [];
  const nodes = cloneNodes(currentNodes);
  let rootId = currentRootId;
  const newId = nextId();
  const newNode = {
    id: newId,
    value,
    height: 1,
    balanceFactor: 0
  };
  snapshots.push({
    nodes: cloneNodes(nodes),
    rootId,
    highlightedIds: [],
    description: `Starting insertion of value ${value} into Binary Search Tree.`,
    line: 0
  });
  if (!rootId) {
    nodes[newId] = newNode;
    rootId = newId;
    snapshots.push({
      nodes: cloneNodes(nodes),
      rootId,
      highlightedIds: [newId],
      description: `Tree was empty. Value ${value} created as the new root.`,
      line: 1
    });
    return snapshots;
  }
  function insert(currId) {
    snapshots.push({
      nodes: cloneNodes(nodes),
      rootId,
      currentNodeId: currId,
      highlightedIds: [currId],
      description: `Comparing insert value ${value} with current node ${nodes[currId].value}.`,
      line: 2
    });
    if (value < nodes[currId].value) {
      if (!nodes[currId].leftId) {
        nodes[newId] = newNode;
        nodes[currId].leftId = newId;
        updateHeight(currId, nodes);
        snapshots.push({
          nodes: cloneNodes(nodes),
          rootId,
          currentNodeId: newId,
          highlightedIds: [currId, newId],
          description: `Insert value ${value} < node value ${nodes[currId].value}. Left child is empty, inserting here.`,
          line: 3
        });
      } else {
        snapshots.push({
          nodes: cloneNodes(nodes),
          rootId,
          currentNodeId: currId,
          highlightedIds: [currId],
          description: `Insert value ${value} < node value ${nodes[currId].value}. Traversing left.`,
          line: 3
        });
        nodes[currId].leftId = insert(nodes[currId].leftId);
        updateHeight(currId, nodes);
      }
    } else {
      if (!nodes[currId].rightId) {
        nodes[newId] = newNode;
        nodes[currId].rightId = newId;
        updateHeight(currId, nodes);
        snapshots.push({
          nodes: cloneNodes(nodes),
          rootId,
          currentNodeId: newId,
          highlightedIds: [currId, newId],
          description: `Insert value ${value} >= node value ${nodes[currId].value}. Right child is empty, inserting here.`,
          line: 4
        });
      } else {
        snapshots.push({
          nodes: cloneNodes(nodes),
          rootId,
          currentNodeId: currId,
          highlightedIds: [currId],
          description: `Insert value ${value} >= node value ${nodes[currId].value}. Traversing right.`,
          line: 4
        });
        nodes[currId].rightId = insert(nodes[currId].rightId);
        updateHeight(currId, nodes);
      }
    }
    return currId;
  }
  insert(rootId);
  snapshots.push({
    nodes: cloneNodes(nodes),
    rootId,
    highlightedIds: [newId],
    description: `Successfully inserted value ${value} into the tree. Recalculated node heights.`,
    line: 0
  });
  return snapshots;
}


//AVL insert generator
export function generateAVLInsert(
  currentNodes,
  currentRootId,
  value
) {
  const snapshots = [];
  let nodes = cloneNodes(currentNodes);
  let rootId = currentRootId;
  const newId = nextId();
  const newNode = {
    id: newId,
    value,
    height: 1,
    balanceFactor: 0
  };
  snapshots.push({
    nodes: cloneNodes(nodes),
    rootId,
    highlightedIds: [],
    description: `Starting AVL Tree insertion of value ${value}. AVL trees maintain balance factor ∈ [-1, 1].`,
    line: 0
  });
  if (!rootId) {
    nodes[newId] = newNode;
    rootId = newId;
    snapshots.push({
      nodes: cloneNodes(nodes),
      rootId,
      highlightedIds: [newId],
      description: `Tree was empty. Created new root node ${value}.`,
      line: 1
    });
    return snapshots;
  }
  function rotateRight(yId) {
    const y = nodes[yId];
    const xId = y.leftId;
    const x = nodes[xId];
    const T2Id = x.rightId;
    snapshots.push({
      nodes: cloneNodes(nodes),
      rootId,
      currentNodeId: yId,
      highlightedIds: [yId, xId],
      action: 'rotate-right',
      description: `Performing Right Rotation around node ${y.value} (pivot: ${x.value}).`,
      line: 4
    });
    x.rightId = yId;
    y.leftId = T2Id;
    updateHeight(yId, nodes);
    updateHeight(xId, nodes);
    return xId;
  }
  function rotateLeft(xId) {
    const x = nodes[xId];
    const yId = x.rightId;
    const y = nodes[yId];
    const T2Id = y.leftId;
    snapshots.push({
      nodes: cloneNodes(nodes),
      rootId,
      currentNodeId: xId,
      highlightedIds: [xId, yId],
      action: 'rotate-left',
      description: `Performing Left Rotation around node ${x.value} (pivot: ${y.value}).`,
      line: 5
    });
    y.leftId = xId;
    x.rightId = T2Id;
    updateHeight(xId, nodes);
    updateHeight(yId, nodes);
    return yId;
  }
  function balanceNode(nodeId, val) {
    updateHeight(nodeId, nodes);
    const balance = getBalanceFactor(nodeId, nodes);
    if (balance > 1 && val < nodes[nodes[nodeId].leftId].value) {
      snapshots.push({
        nodes: cloneNodes(nodes),
        rootId,
        currentNodeId: nodeId,
        highlightedIds: [nodeId],
        description: `Node ${nodes[nodeId].value} is unbalanced (balance factor: ${balance}). Left-Left case. Right rotation required.`,
        line: 4
      });
      return rotateRight(nodeId);
    }
    if (balance < -1 && val > nodes[nodes[nodeId].rightId].value) {
      snapshots.push({
        nodes: cloneNodes(nodes),
        rootId,
        currentNodeId: nodeId,
        highlightedIds: [nodeId],
        description: `Node ${nodes[nodeId].value} is unbalanced (balance factor: ${balance}). Right-Right case. Left rotation required.`,
        line: 5
      });
      return rotateLeft(nodeId);
    }
    if (balance > 1 && val > nodes[nodes[nodeId].leftId].value) {
      snapshots.push({
        nodes: cloneNodes(nodes),
        rootId,
        currentNodeId: nodeId,
        highlightedIds: [nodeId, nodes[nodeId].leftId],
        description: `Node ${nodes[nodeId].value} is unbalanced (balance: ${balance}). Left-Right case. Left rotate child first.`,
        line: 6
      });
      nodes[nodeId].leftId = rotateLeft(nodes[nodeId].leftId);
      return rotateRight(nodeId);
    }
    if (balance < -1 && val < nodes[nodes[nodeId].rightId].value) {
      snapshots.push({
        nodes: cloneNodes(nodes),
        rootId,
        currentNodeId: nodeId,
        highlightedIds: [nodeId, nodes[nodeId].rightId],
        description: `Node ${nodes[nodeId].value} is unbalanced (balance: ${balance}). Right-Left case. Right rotate child first.`,
        line: 7
      });
      nodes[nodeId].rightId = rotateRight(nodes[nodeId].rightId);
      return rotateLeft(nodeId);
    }
    return nodeId;
  }
  function insert(currId) {
    snapshots.push({
      nodes: cloneNodes(nodes),
      rootId,
      currentNodeId: currId,
      highlightedIds: [currId],
      description: `Comparing insert value ${value} with node ${nodes[currId].value}.`,
      line: 1
    });
    if (value < nodes[currId].value) {
      if (!nodes[currId].leftId) {
        nodes[newId] = newNode;
        nodes[currId].leftId = newId;
        updateHeight(currId, nodes);
        snapshots.push({
          nodes: cloneNodes(nodes),
          rootId,
          currentNodeId: newId,
          highlightedIds: [currId, newId],
          description: `Inserting value ${value} as left child of node ${nodes[currId].value}.`,
          line: 1
        });
      } else {
        nodes[currId].leftId = insert(nodes[currId].leftId);
      }
    } else {
      if (!nodes[currId].rightId) {
        nodes[newId] = newNode;
        nodes[currId].rightId = newId;
        updateHeight(currId, nodes);
        snapshots.push({
          nodes: cloneNodes(nodes),
          rootId,
          currentNodeId: newId,
          highlightedIds: [currId, newId],
          description: `Inserting value ${value} as right child of node ${nodes[currId].value}.`,
          line: 1
        });
      } else {
        nodes[currId].rightId = insert(nodes[currId].rightId);
      }
    }
    return balanceNode(currId, value);
  }
  rootId = insert(rootId);
  snapshots.push({
    nodes: cloneNodes(nodes),
    rootId,
    highlightedIds: [newId],
    description: `AVL Tree rebalancing completed successfully. Height and balance factors are satisfied.`,
    line: 0
  });
  return snapshots;
}