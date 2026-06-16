export const ALGORITHM_METADATA={
  bubble:{
    name:'Bubble Sort',
    category:'sorting',
    timeComplexity:{ best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity:'O(1)',
    description:'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    pseudocode:[
      'for i = 0 to n - 1',
      '  for j = 0 to n - i - 2',
      '    if arr[j] > arr[j + 1]',
      '      swap(arr[j], arr[j + 1])'
    ]
  },
  selection:{
    name:'Selection Sort',
    category:'sorting',
    timeComplexity:{ best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity:'O(1)',
    description:'Divides the input list into two parts: a sorted sublist and an unsorted sublist, repeatedly finding the minimum element from the unsorted part.',
    pseudocode:[
      'for i = 0 to n - 1',
      '  min_idx = i',
      '  for j = i + 1 to n - 1',
      '    if arr[j] < arr[min_idx]',
      '      min_idx = j',
      '  swap(arr[i], arr[min_idx])'
    ]
  },
  insertion:{
    name:'Insertion Sort',
    category:'sorting',
    timeComplexity:{ best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity:'O(1)',
    description:'Builds the final sorted array one item at a time by placing elements in their correct position relative to the already sorted part.',
    pseudocode:[
      'for i = 1 to n - 1',
      '  key = arr[i]',
      '  j = i - 1',
      '  while j >= 0 and arr[j] > key',
      '    arr[j + 1] = arr[j]',
      '    j = j - 1',
      '  arr[j + 1] = key'
    ]
  },
  merge:{
    name:'Merge Sort',
    category:'sorting',
    timeComplexity:{ best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity:'O(n)',
    description:'A divide-and-conquer algorithm that recursively splits the array into halves, sorts them, and merges the sorted halves.',
    pseudocode:[
      'function mergeSort(arr, left, right)',
      '  if left < right',
      '    mid = (left + right) / 2',
      '    mergeSort(arr, left, mid)',
      '    mergeSort(arr, mid + 1, right)',
      '    merge(arr, left, mid, right)'
    ]
  },
  quick:{
    name:'Quick Sort',
    category:'sorting',
    timeComplexity:{ best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity:'O(log n)',
    description:'Picks an element as a pivot and partitions the given array around the picked pivot, placing smaller elements to its left and larger to its right.',
    pseudocode:[
      'function quickSort(arr, low, high)',
      '  if low < high',
      '    pi = partition(arr, low, high)',
      '    quickSort(arr, low, pi - 1)',
      '    quickSort(arr, pi + 1, high)'
    ]
  },
  bfs:{
    name:'Breadth-First Search (BFS)',
    category:'graph',
    timeComplexity:{ best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity:'O(V)',
    description:'Explores the graph level-by-level, visiting all neighbor nodes of the current depth before moving to the next level.',
    pseudocode:[
      'queue.enqueue(start)',
      'mark start as visited',
      'while queue is not empty',
      '  u = queue.dequeue()',
      '  for each neighbor v of u',
      '    if v is not visited',
      '      mark v as visited',
      '      queue.enqueue(v)'
    ]
  },
  dfs:{
    name:'Depth-First Search (DFS)',
    category:'graph',
    timeComplexity:{ best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity:'O(V)',
    description:'Explores as far as possible along each branch before backtracking, visiting deep neighbor nodes first.',
    pseudocode:[
      'stack.push(start)',
      'while stack is not empty',
      '  u = stack.pop()',
      '  if u is not visited',
      '    mark u as visited',
      '    for each neighbor v of u (in reverse)',
      '      if v is not visited',
      '        stack.push(v)'
    ]
  },
  dijkstra:{
    name:"Dijkstra's Algorithm",
    category:'graph',
    timeComplexity:{ best: 'O((V + E) log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)' },
    spaceComplexity:'O(V)',
    description:'Calculates the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights.',
    pseudocode:[
      'distances[all] = infinity, distances[start] = 0',
      'pq.insert(start, 0)',
      'while pq is not empty',
      '  u = pq.extractMin()',
      '  for each neighbor v of u with weight w',
      '    if distances[u] + w < distances[v]',
      '      distances[v] = distances[u] + w',
      '      pq.decreaseKey(v, distances[v])'
    ]
  },
  astar:{
    name:'A* Search',
    category:'graph',
    timeComplexity:{ best: 'O(E)', average: 'O(E)', worst: 'O(b^d)' },
    spaceComplexity:'O(V)',
    description:'An informed pathfinding algorithm that finds the shortest path by combining actual path cost with a heuristic estimate to the target.',
    pseudocode:[
      'gScore[all] = infinity, gScore[start] = 0',
      'fScore[start] = heuristic(start, target)',
      'openSet.insert(start, fScore[start])',
      'while openSet is not empty',
      '  u = openSet.extractMin()',
      '  if u == target return path',
      '  for each neighbor v of u',
      '    tempG = gScore[u] + weight(u, v)',
      '    if tempG < gScore[v]',
      '      gScore[v] = tempG',
      '      fScore[v] = tempG + heuristic(v, target)',
      '      openSet.insert(v, fScore[v])'
    ]
  },
  bst:{
    name:'Binary Search Tree (BST)',
    category:'tree',
    timeComplexity:{ best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity:'O(n)',
    description:'A node-based binary tree data structure where each node has at most two children, and left subtree values < node value < right subtree values.',
    pseudocode:[
      'insert(node, val):',
      '  if node is null: return Node(val)',
      '  if val < node.val: node.left = insert(node.left, val)',
      '  else: node.right = insert(node.right, val)',
      '  return node'
    ]
  },
  avl:{
    name:'AVL Tree',
    category:'tree',
    timeComplexity:{ best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity:'O(n)',
    description:'A self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most one.',
    pseudocode:[
      'insertAVL(node, val):',
      '  node = insertBST(node, val)',
      '  updateHeight(node)',
      '  balance = getBalance(node)',
      '  if balance > 1 and val < node.left.val: rotateRight(node)',
      '  if balance < -1 and val > node.right.val: rotateLeft(node)',
      '  if balance > 1 and val > node.left.val: rotateLeftRight(node)',
      '  if balance < -1 and val < node.right.val: rotateRightLeft(node)'
    ]
  },
  lcs:{
    name:'Longest Common Subsequence',
    category:'dp',
    timeComplexity:{ best: 'O(m*n)', average: 'O(m*n)', worst: 'O(m*n)' },
    spaceComplexity:'O(m*n)',
    description:'Finds the longest subsequence common to two sequences using bottom-up tabulating.',
    pseudocode:[
      'for i = 1 to m',
      '  for j = 1 to n',
      '    if S1[i-1] == S2[j-1]',
      '      dp[i][j] = dp[i-1][j-1] + 1',
      '    else',
      '      dp[i][j] = max(dp[i-1][j], dp[i][j-1])'
    ]
  },
  knapsack:{
    name:'0/1 Knapsack Problem',
    category:'dp',
    timeComplexity:{ best: 'O(n*W)', average: 'O(n*W)', worst: 'O(n*W)' },
    spaceComplexity:'O(n*W)',
    description:'Finds the maximum value that can be put in a knapsack of capacity W using items with given weights and values.',
    pseudocode:[
      'for i = 1 to n',
      '  for w = 1 to W',
      '    if wt[i-1] <= w',
      '      dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])',
      '    else',
      '      dp[i][w] = dp[i-1][w]'
    ]
  },
  'coin-change':{
    name:'Coin Change Problem',
    category:'dp',
    timeComplexity:{ best: 'O(n*A)', average: 'O(n*A)', worst: 'O(n*A)' },
    spaceComplexity:'O(A)',
    description:'Calculates the minimum number of coins needed to make a target amount using a set of coin denominations.',
    pseudocode:[
      'dp[0] = 0, dp[1..A] = infinity',
      'for coin in coins',
      '  for i = coin to A',
      '    dp[i] = min(dp[i], dp[i - coin] + 1)'
    ]
  }
};
