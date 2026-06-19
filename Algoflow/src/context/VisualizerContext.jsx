import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ALGORITHM_METADATA } from '@/algorithms/metadata';
import {
  generateBubbleSort,
  generateSelectionSort,
  generateInsertionSort,
  generateMergeSort,
  generateQuickSort
} from '@/algorithms/sorting';
import {
  generateBFS,
  generateDFS,
  generateDijkstra,
  generateAStar
} from '@/algorithms/graph';
import {
  generateBSTInsert,
  generateAVLInsert
} from '@/algorithms/tree';
import {
  generateLCS,
  generateKnapsack,
  generateCoinChange
} from '@/algorithms/dp';
import confetti from 'canvas-confetti';

const VisualizerContext = createContext(undefined);

const PRESET_NODES = [
  { id: 'A', label: 'A', x: 150, y: 150 },
  { id: 'B', label: 'B', x: 300, y: 100 },
  { id: 'C', label: 'C', x: 300, y: 250 },
  { id: 'D', label: 'D', x: 450, y: 150 },
  { id: 'E', label: 'E', x: 600, y: 150 }
];

const PRESET_EDGES = [
  { from: 'A', to: 'B', weight: 4 },
  { from: 'A', to: 'C', weight: 2 },
  { from: 'B', to: 'C', weight: 1 },
  { from: 'B', to: 'D', weight: 5 },
  { from: 'C', to: 'D', weight: 8 },
  { from: 'C', to: 'E', weight: 10 },
  { from: 'D', to: 'E', weight: 2 }
];

const PRESET_TREE_NODES = {
  'node_1': { id: 'node_1', value: 40, leftId: 'node_2', rightId: 'node_3', height: 3, balanceFactor: 0 },
  'node_2': { id: 'node_2', value: 25, leftId: 'node_4', rightId: 'node_5', height: 2, balanceFactor: 0 },
  'node_3': { id: 'node_3', value: 50, height: 1, balanceFactor: 0 },
  'node_4': { id: 'node_4', value: 15, height: 1, balanceFactor: 0 },
  'node_5': { id: 'node_5', value: 30, height: 1, balanceFactor: 0 }
};

export const VisualizerProvider = ({ children }) => {
 
  const [algorithm, setAlgorithmState] = useState(null);
  const [category, setCategory] = useState(null);


  const [snapshots, setSnapshots] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  
  const [arraySize, setArraySize] = useState(20);
  const [arrayInitType, setArrayInitType] = useState('random');
  const [sortingArray, setSortingArray] = useState([]);


  const [graphNodes, setGraphNodes] = useState(PRESET_NODES);
  const [graphEdges, setGraphEdges] = useState(PRESET_EDGES);
  const [graphStartNode, setGraphStartNode] = useState('A');
  const [graphTargetNode, setGraphTargetNode] = useState('E');

 
  const [treeNodes, setTreeNodes] = useState(PRESET_TREE_NODES);
  const [treeRootId, setTreeRootId] = useState('node_1');
  const [treeInsertValue, setTreeInsertValue] = useState(20);

 
  const [dpS1, setDpS1] = useState('AGGTAB');
  const [dpS2, setDpS2] = useState('GXTXAYB');
  const [dpCoins, setDpCoins] = useState([1, 3, 4, 5]);
  const [dpAmount, setDpAmount] = useState(7);
  const [dpWeights, setDpWeights] = useState([1, 2, 3, 5]);
  const [dpValues, setDpValues] = useState([1, 6, 10, 16]);
  const [dpCapacity, setDpCapacity] = useState(6);

  const setAlgorithm = (algo) => {
    if (!algo) {
      setAlgorithmState(null);
      setCategory(null);
      setIsPlaying(false);
      setCurrentStep(0);
      setSnapshots([]);
      return;
    }
    const meta = ALGORITHM_METADATA[algo];
    if (meta) {
      setAlgorithmState(algo);
      setCategory(meta.category);
    }
    setIsPlaying(false);
    setCurrentStep(0);
    setSnapshots([]);
  };

  const generateInitialSortingArray = (size, type) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 90) + 10);
    }
    if (type === 'sorted') {
      arr.sort((a, b) => a - b);
    } else if (type === 'reversed') {
      arr.sort((a, b) => b - a);
    }
    setSortingArray(arr);
    return arr;
  };

 
  useEffect(() => {
    if (category === 'sorting') {
      const timer = setTimeout(() => {
        generateInitialSortingArray(arraySize, arrayInitType);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [arraySize, arrayInitType, category]);


  const startVisualization = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    
    let generated;
    switch (algorithm) {
      case 'bubble':
        generated = generateBubbleSort(sortingArray);
        break;
      case 'selection':
        generated = generateSelectionSort(sortingArray);
        break;
      case 'insertion':
        generated = generateInsertionSort(sortingArray);
        break;
      case 'merge':
        generated = generateMergeSort(sortingArray);
        break;
      case 'quick':
        generated = generateQuickSort(sortingArray);
        break;
      case 'bfs':
        generated = generateBFS(graphNodes, graphEdges, graphStartNode, graphTargetNode);
        break;
      case 'dfs':
        generated = generateDFS(graphNodes, graphEdges, graphStartNode, graphTargetNode);
        break;
      case 'dijkstra':
        generated = generateDijkstra(graphNodes, graphEdges, graphStartNode, graphTargetNode);
        break;
      case 'astar':
        generated = generateAStar(graphNodes, graphEdges, graphStartNode, graphTargetNode);
        break;
      case 'lcs':
        generated = generateLCS(dpS1, dpS2);
        break;
      case 'knapsack':
        generated = generateKnapsack(dpWeights, dpValues, dpCapacity);
        break;
      case 'coin-change':
        generated = generateCoinChange(dpCoins, dpAmount);
        break;
      default:
        return;
    }
    setSnapshots(generated);
    setCurrentStep(0);
    setIsPlaying(true);
  };


  const insertIntoTree = (val) => {
    setIsPlaying(false);
    let generated;
    if (algorithm === 'bst') {
      generated = generateBSTInsert(treeNodes, treeRootId, val);
    } else {
      generated = generateAVLInsert(treeNodes, treeRootId, val);
    }
    setSnapshots(generated);
    setCurrentStep(0);
    setIsPlaying(true);
    const finalSnapshot = generated[generated.length - 1];
    setTreeNodes(finalSnapshot.nodes);
    setTreeRootId(finalSnapshot.rootId);
  };

  const clearTree = () => {
    setTreeNodes({});
    setTreeRootId(undefined);
    setSnapshots([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const stepForward = () => {
    if (currentStep < snapshots.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStart = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const goToEnd = () => {
    if (snapshots.length > 0) {
      setCurrentStep(snapshots.length - 1);
      setIsPlaying(false);
    }
  };

  const scrubTo = (step) => {
    if (step >= 0 && step < snapshots.length) {
      setCurrentStep(step);
    }
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setSnapshots([]);
    if (category === 'sorting') {
      generateInitialSortingArray(arraySize, arrayInitType);
    }
  };

  useEffect(() => {
    if (isPlaying && snapshots.length > 0) {
      const delay = Math.max(50, 450 - (speed - 1) * 120);
      
      timerRef.current = setTimeout(() => {
        if (currentStep < snapshots.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#00DF89', '#059669', '#00c2cb']
          });
        }
      }, delay);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStep, snapshots, speed]);

  const addGraphNode = (x, y) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let label = 'A';
    for (let i = 0; i < letters.length; i++) {
      if (!graphNodes.some(n => n.id === letters[i])) {
        label = letters[i];
        break;
      }
      if (i === letters.length - 1) {
        label = `N${graphNodes.length}`;
      }
    }
    const newNode = { id: label, label, x, y };
    setGraphNodes(prev => [...prev, newNode]);
  };

  const deleteGraphNode = (id) => {
    setGraphNodes(prev => prev.filter(n => n.id !== id));
    setGraphEdges(prev => prev.filter(e => e.from !== id && e.to !== id));
    if (graphStartNode === id) setGraphStartNode('');
    if (graphTargetNode === id) setGraphTargetNode('');
  };

  const addGraphEdge = (from, to, weight) => {
    if (from === to) return;
    const exists = graphEdges.some(
      e => (e.from === from && e.to === to) || (e.from === to && e.to === from)
    );
    if (exists) return;
    const finalWeight = weight !== undefined ? weight : Math.floor(Math.random() * 9) + 1;
    const newEdge = { from, to, weight: finalWeight };
    setGraphEdges(prev => [...prev, newEdge]);
  };

  const deleteGraphEdge = (from, to) => {
    setGraphEdges(prev =>
      prev.filter(
        e => !((e.from === from && e.to === to) || (e.from === to && e.to === from))
      )
    );
  };

  const clearGraph = () => {
    setGraphNodes([]);
    setGraphEdges([]);
    setGraphStartNode('');
    setGraphTargetNode('');
    setSnapshots([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const setGraphPreset = (preset) => {
    if (preset === 'basic') {
      setGraphNodes(PRESET_NODES);
      setGraphEdges(PRESET_EDGES);
      setGraphStartNode('A');
      setGraphTargetNode('E');
    } else if (preset === 'cycle') {
      setGraphNodes([
        { id: 'A', label: 'A', x: 200, y: 100 },
        { id: 'B', label: 'B', x: 400, y: 100 },
        { id: 'C', label: 'C', x: 500, y: 250 },
        { id: 'D', label: 'D', x: 300, y: 350 },
        { id: 'E', label: 'E', x: 100, y: 250 }
      ]);
      setGraphEdges([
        { from: 'A', to: 'B', weight: 3 },
        { from: 'B', to: 'C', weight: 4 },
        { from: 'C', to: 'D', weight: 2 },
        { from: 'D', to: 'E', weight: 5 },
        { from: 'E', to: 'A', weight: 1 },
        { from: 'B', to: 'D', weight: 7 }
      ]);
      setGraphStartNode('A');
      setGraphTargetNode('D');
    } else if (preset === 'grid') {
      setGraphNodes([
        { id: 'A', label: 'A', x: 150, y: 100 },
        { id: 'B', label: 'B', x: 350, y: 100 },
        { id: 'C', label: 'C', x: 150, y: 250 },
        { id: 'D', label: 'D', x: 350, y: 250 }
      ]);
      setGraphEdges([
        { from: 'A', to: 'B', weight: 2 },
        { from: 'A', to: 'C', weight: 3 },
        { from: 'B', to: 'D', weight: 4 },
        { from: 'C', to: 'D', weight: 1 }
      ]);
      setGraphStartNode('A');
      setGraphTargetNode('D');
    }
    setSnapshots([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <VisualizerContext.Provider
      value={{
        algorithm,
        category,
        setCategory,
        setAlgorithm,
        snapshots,
        currentStep,
        isPlaying,
        setIsPlaying,
        speed,
        setSpeed,
        scrubTo,
        stepForward,
        stepBackward,
        goToStart,
        goToEnd,
        startVisualization,
        reset,
        arraySize,
        setArraySize,
        arrayInitType,
        setArrayInitType,
        sortingArray,
        setSortingArray,
        graphNodes,
        graphEdges,
        graphStartNode,
        graphTargetNode,
        addGraphNode,
        deleteGraphNode,
        addGraphEdge,
        deleteGraphEdge,
        setGraphStartNode,
        setGraphTargetNode,
        clearGraph,
        setGraphPreset,
        treeNodes,
        treeRootId,
        treeInsertValue,
        setTreeInsertValue,
        insertIntoTree,
        clearTree,
        dpS1,
        setDpS1,
        dpS2,
        setDpS2,
        dpCoins,
        setDpCoins,
        dpAmount,
        setDpAmount,
        dpWeights,
        setDpWeights,
        dpValues,
        setDpValues,
        dpCapacity,
        setDpCapacity
      }}
    >
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizer = () => {
  const context = useContext(VisualizerContext);
  if (!context) {
    throw new Error('useVisualizer must be used within a VisualizerProvider');
  }
  return context;
};