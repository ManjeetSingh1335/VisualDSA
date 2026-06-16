import React,{createContext,useContext,useState,useEffect,useRef} from 'react';
import {ALGORITHM_METADATA} from '@/algorithms/metadata';
import{
    generateBubbleSort,
    generateSelectionSort,
    generateInsertionSort,
    generateMergeSort,
    generateQuickSort,   
} from '@/algorithms/sorting';
import{
    generateBFS,
    generateDFS,
    generateDijkstra,
    generateAStar,
} from '@/algorithms/graph';
import{
    generateBSTInsert,
    generateAVLInsert,
} from '@/algorithms/tree';
import{
    generateLCS,
    generateKnapsack,
    generateCoinChange
} from '@/algorithms/dp';
import confetti from 'canvas-confetti';

const VisualizerContext=createContext(undefined);
const PRESET_NODES=[
    { id:'A', label:'A', x:150, y:150 },
    { id:'B', label:'B', x:300, y:100 },
    { id:'C', label:'C', x:300, y:250 },
    { id:'D', label:'D', x:450, y:150 },
    { id:'E', label:'E', x:600, y:150 }
];
const PRESET_EDGES=[
    { from:'A', to:'B', weight:4 },
    { from:'A', to:'C', weight:2 },
    { from:'B', to:'C', weight:1 },
    { from:'B', to:'D', weight:5 },
    { from:'C', to:'D', weight:8 },
    { from:'C', to:'E', weight:10 },
    { from:'D', to:'E', weight:2 }
];
const PRESET_TREE_NODES={
    'node_1':{ id:'node_1', value:40, leftId:'node_2', rightId:'node_3', height:3, balanceFactor:0 },
    'node_2':{ id:'node_2', value:25, leftId:'node_4', rightId:'node_5', height:2, balanceFactor:0 },
    'node_3':{ id:'node_3', value:50, height:1, balanceFactor:0 },
    'node_4':{ id:'node_4', value:15, height:1, balanceFactor:0 },
    'node_5':{ id:'node_5', value:30, height:1, balanceFactor:0 }
};

export const VisualizerProvider=({children})=>{

    const [algorithm, setAlgorithmState]=useState('bubble');
    const [category, setCategory]=useState('sorting');

    //playback
    const [snapshots, setSnapshots]=useState([]);
    const [currentStep, setCurrentStep]=useState(0);
    const [isPlaying, setIsPlaying]=useState(false);
    const [speed, setSpeed]=useState(1);
    const timerRef=useRef(null);
    const timerRef=useRef(null);

    //sorting
    const [arraySize, setArraySize]=useState(20);
    const [arrayInitType, setArrayInitType]=useState('random');
    const [sortingArray, setSortingArray]=useState([]);

    //graph
    const [graphNodes, setGraphNodes]=useState(PRESET_NODES);
    const [graphEdges, setGraphEdges]=useState(PRESET_EDGES);
    const [graphStartNode, setGraphStartNode]=useState('A');
    const [graphTargetNode, setGraphTargetNode]=useState('E');

    //tree
    const [treeNodes, setTreeNodes]=useState(PRESET_TREE_NODES);
    const [treeRootId, setTreeRootId]=useState('node_1');
    const [treeInsertValue, setTreeInsertValue]=useState(20);

    //dp
    const [dpS1, setDpS1] = useState('AGGTAB');
    const [dpS2, setDpS2] = useState('GXTXAYB');

    const [dpCoins, setDpCoins] = useState([1, 3, 4, 5]);
    const [dpAmount, setDpAmount] = useState(7);

    const [dpWeights, setDpWeights] = useState([1, 2, 3, 5]);
    const [dpValues, setDpValues] = useState([1, 6, 10, 16]);
    const [dpCapacity, setDpCapacity] = useState(6);


    const setAlgorithm=(algo)=>{
        const meta=ALGORITHM_METADATA[algo];
        setAlgorithmState(algo);
        setCategory(meta.category);
        setIsPlaying(false);
        setCurrentStep(0);
        setSnapshots([]);
    };

    const generateInitialSortingArray=(size,type)=>{
        const arr=[];
        for(let i=0;i<size;i++){
            arr.push(Math.floor(Math.random()*90)+10);
        }
        if(type=='sorted'){
            arr.sort((a,b)=>a-b);
        }else if(type=='reversed'){
            arr.sort((a,b)=>b-a);
        }
        setSortingArray(arr);
        return arr;
    }
    useEffect(()=>{
        if(category=='sorting'){
            generateInitialSortingArray(arraySize,arrayInitType)
        }
    },[arraySize,arrayInitType,category]);

    const startVisualization=()=>{
        setIsPlaying(false);
        setCurrentStep(0);

        let generated=[];
        switch(algorithm){
            case 'bubble':
                generat
        }
    }






}
// Compute snapshots when clicking start
  const startVisualization = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    
    let generated = [];
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

