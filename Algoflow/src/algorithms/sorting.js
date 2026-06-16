const clone=(arr)=>[...arr];

//bubble sort
export function generateBubbleSort(arr){
    const a=clone(arr);
    const n=a.length;
    //frame 
    const snapshots=[];

    //initial state
    snapshots.push({
        array:clone(a),
        comparing:[],
        sorted:[],
        description:'Starting Bubble Sort. We will scan adjacent elements and swap them if they are in the wrong order.',
        line:0
    });

    for(let i=0;i<n;i++){
        for(let j=0;j<n-i-1;j++){

            snapshots.push({
                array:clone(a),
                comparing:[j,j+1],
                swapping:[],
                sorted:Array.from({length:i},(_,k)=>n-1-k),
                description:'Comparing elements at index ${j} (${a[j]}) and index ${j + 1} (${a[j + 1]}).',
                line:2
            });
            if(a[j]>a[j+1]){
                const temp=a[j];
                a[j]=a[j+1];
                a[j+1]=temp;
                snapshots.push({
                    array:clone(a),
                    comparing:[],
                    swapping:[j,j+1],
                    sorted:Array.from({length:i},(_,k)=>n-1-k),
                    description:`Since ${a[j+1]}>${a[j]},swap them.`,
                    line:3
                });
            }
        }
        snapshots.push({
            array:clone(a),
            comparing:[],
            swapping:[],
            sorted:Array.from({length:i+1},(_,k)=>n-1-k),
            description:`Element at index ${n-1-i}(${a[n-1-i]}) is now in its correct position.`,
            line:0
        });
    }
    snapshots.push({
        array:clone(a),
        comparing:[],
        swapping:[],
        sorted:Array.from({length:n},(_,k)=>k),
        description:'Bubble Sort finished. All elements are sorted!',
        line:0
    });

    return snapshots;
}

//selection Sort
export function generateSelectionSort(arr) {
    const snapshots=[];
    const a=clone(arr);
    const n=a.length;

    snapshots.push({
        array:clone(a),
        comparing:[],
        swapping:[],
        sorted:[],
        description:'Starting Selection Sort. We will repeatedly find the minimum element from the unsorted part.',
        line:0
    });

    for(let i=0;i<n-1;i++){
        let minIdx=i;
        snapshots.push({
            array:clone(a),
            comparing:[i],
            swapping:[],
            sorted:Array.from({length:i},(_,k)=>k),
            description:`Assume index ${i} (${a[i]}) contains the minimum. Scan the rest of the array.`,
            line:1
        });
        for(let j=i+1;j<n;j++){
            snapshots.push({
                array:clone(a),
                comparing:[j, minIdx],
                swapping:[],
                sorted:Array.from({length:i},(_,k)=>k),
                description:`Comparing index ${j} (${a[j]}) with current minimum at index ${minIdx} (${a[minIdx]}).`,
                line:3
            });
            if(a[j]<a[minIdx]){
                minIdx=j;
                snapshots.push({
                    array:clone(a),
                    comparing:[minIdx],
                    swapping:[],
                    sorted:Array.from({length:i},(_,k)=>k),
                    description:`Found a smaller element. New minimum is at index ${minIdx} (${a[minIdx]}).`,
                    line:4
                });
            }
        }
        if(minIdx!==i){
            const temp=a[i];
            a[i]=a[minIdx];
            a[minIdx]=temp;
            snapshots.push({
                array:clone(a),
                comparing:[],
                swapping:[i,minIdx],
                sorted:Array.from({length:i},(_,k)=>k),
                description:`Swapping minimum element at index ${minIdx} (${a[i]}) with index ${i} (${a[minIdx]}).`,
                line:5
            });
        }
        snapshots.push({
            array:clone(a),
            comparing:[],
            swapping:[],
            sorted:Array.from({length:i+1},(_,k)=>k),
            description:`Index ${i} is now sorted.`,
            line:0
        });
    }
    snapshots.push({
        array:clone(a),
        comparing:[],
        swapping:[],
        sorted:Array.from({length:n},(_,k)=>k),
        description:'Selection Sort finished. All elements are sorted!',
        line:0
    });

    return snapshots;
}


//insertion Sort
export function generateInsertionSort(arr){
    const snapshots =[];
    const a=clone(arr);
    const n=a.length;
    snapshots.push({
        array:clone(a),
        comparing:[],
        swapping:[],
        sorted:[0],
        description:'Starting Insertion Sort. Elements are inserted into their correct relative position one by one.',
        line:0
    });
    for(let i=1;i<n;i++){
        const key=a[i];
        let j=i-1;
        snapshots.push({
            array:clone(a),
            comparing:[i],
            swapping:[],
            sorted:Array.from({length:i},(_,k)=>k),
            description:`Picking element at index ${i} (${key}) to insert.`,
            line:1
        });
        while(j>=0 && a[j]>key){
            snapshots.push({
                array:clone(a),
                comparing:[j,j+1],
                swapping:[],
                sorted:Array.from({length:i},(_,k)=>k),
                description:`Comparing if element at index ${j} (${a[j]}) > key (${key}). It is, so shift it right.`,
                line:3
            });
            a[j+1]=a[j];
            j=j-1;
            snapshots.push({
                array:clone(a),
                comparing:[],
                swapping:[j+1,j+2],
                sorted:Array.from({length:i},(_,k)=>k),
                description:`Shifted element to index ${j+2}.`,
                line:4
            });
        }
        a[j+1]=key;
        snapshots.push({
            array:clone(a),
            comparing:[],
            swapping:[],
            sorted:Array.from({length:i+1},(_,k)=>k),
            description:`Placed key (${key}) in its sorted relative position at index ${j + 1}.`,
            line:6
        });
    }
    snapshots.push({
        array:clone(a),
        comparing:[],
        swapping:[],
        sorted:Array.from({length:n},(_,k)=>k),
        description:'Insertion Sort finished. All elements are sorted!',
        line:0
    });

    return snapshots;
}


//merge Sort
export function generateMergeSort(arr){
    const snapshots=[];
    const a=clone(arr);
    snapshots.push({
        array:clone(a),
        comparing:[],
        swapping:[],
        sorted:[],
        description:'Starting Merge Sort. Divide and conquer recursively.',
        line:0
    });
    function merge(left,mid,right){
        const temp=[];
        let i=left;
        let j=mid+1;
        snapshots.push({
            array:clone(a),
            comparing:[left,right],
            swapping:[],
            sorted:[],
            description:`Merging subarray [${left}...${mid}] and [${mid + 1}...${right}].`,
            line:5
        });
        while(i<=mid && j<=right){
            snapshots.push({
                array:clone(a),
                comparing:[i,j],
                swapping:[],
                sorted:[],
                description:`Comparing elements at index ${i} (${a[i]}) and index ${j} (${a[j]}).`,
                line:5
            });
            if(a[i]<=a[j]){
                temp.push(a[i]);
                i++;
            }else{
                temp.push(a[j]);
                j++;
            }
        }
        while(i<=mid){
            temp.push(a[i]);
            i++;
        }
        while(j<=right){
            temp.push(a[j]);
            j++;
        }
        for(let k=0;k<temp.length;k++){
            a[left+k]=temp[k];
            snapshots.push({
                array:clone(a),
                comparing:[],
                swapping:[left+k],
                sorted:[],
                description:`Placing minimum element (${temp[k]}) back into original array at index ${left + k}.`,
                line:5
            });
        }
    }
    function sort(left,right){
        if(left<right){
            const mid=Math.floor((left +right)/2);
            snapshots.push({
                array:clone(a),
                comparing:[left,right],
                swapping:[],
                sorted:[],
                description:`Splitting subarray [${left}...${right}] at index ${mid}.`,
                line:2
            });
            sort(left,mid);
            sort(mid+1,right);
            merge(left,mid,right);
        }
    }
    sort(0,a.length-1);
    snapshots.push({
        array:clone(a),
        comparing:[],
        swapping:[],
        sorted:Array.from({ length:a.length},(_,k)=>k),
        description:'Merge Sort finished. All elements are sorted!',
        line:0
    });

    return snapshots;
}



//quick Sort
export function generateQuickSort(arr){
    const snapshots=[];
    const a=clone(arr);
    snapshots.push({
        array:clone(a),
        comparing:[],
        swapping:[],
        sorted:[],
        description:'Starting Quick Sort. Pick a pivot and partition around it.',
        line:0
    });

    function partition(low,high){
        const pivot=a[high];
        let i=low-1;
        snapshots.push({
            array:clone(a),
            comparing:[],
            swapping:[],
            sorted:[],
            pivot:high,
            description:`Picking element at index ${high} (${pivot}) as the pivot.`,
            line:2
        });

        for(let j=low;j<high;j++){
            snapshots.push({
                array:clone(a),
                comparing:[j,high],
                swapping:[],
                sorted:[],
                pivot:high,
                description:`Comparing elements at index ${j} (${a[j]}) with pivot (${pivot}).`,
                line:2
            });

            if(a[j]<pivot){
                i++;
                const temp=a[i];
                a[i]=a[j];
                a[j]=temp;
                snapshots.push({
                    array:clone(a),
                    comparing:[],
                    swapping:[i,j],
                    sorted:[],
                    pivot:high,
                    description:`Since ${a[i]} < pivot (${pivot}), increment left boundary and swap index ${i} and ${j}.`,
                    line:2
                });
            }
        }
        const temp=a[i+1];
        a[i+1]=a[high];
        a[high]=temp;
        snapshots.push({
            array:clone(a),
            comparing:[],
            swapping:[i+1,high],
            sorted:[],
            pivot:i+1,
            description:`Swap pivot element with index ${i + 1} to place pivot in correct position.`,
            line:2
        });

        return i+1;
    }

    function sort(low,high){
        if(low<high){
            const pi=partition(low,high);
      
            snapshots.push({
                array:clone(a),
                comparing:[],
                swapping:[],
                sorted:[pi],
                description:`Pivot element at index ${pi} is now in its correct position. Recursively sort partition boundaries.`,
                line:3
            });

            sort(low,pi-1);
            sort(pi+1,high);
        }else if(low>=0 && low===high){
            snapshots.push({
                array:clone(a),
                comparing:[],
                swapping:[],
                sorted:[low],
                description:`Subarray of size 1 at index ${low} is already sorted.`,
                line:0
            });
        }
    }
    sort(0,a.length-1);
    snapshots.push({
        array:clone(a),
        comparing:[],
        swapping:[],
        sorted:Array.from({length:a.length},(_,k)=>k),
        description:'Quick Sort finished. All elements are sorted!',
        line: 0
    });

    return snapshots;
}
