//longest common subsequence(lcs)
export function generateLCS(s1,s2){
    const snapshots=[];
    const m=s1.length;
    const n=s2.length;
    const matrix=Array.from({length:m+2},()=>
        Array.from({length:n+2},()=>0)
    );

    matrix[0][0]='S1\\S2';
    matrix[0][1]='Ø';
    for(let j=0;j<n;j++){
        matrix[0][j+2]=s2[j];
    }
    matrix[1][0]='Ø';
    for(let i=0;i<m;i++){
        matrix[i+2][0]=s1[i];
    }

    for(let j=0;j<=n;j++) matrix[1][j+1]=0;
    for(let i=0;i<=m;i++) matrix[i+1][1]=0;
        snapshots.push({
            matrix:matrix.map(row =>[...row]),
            currentRow:1,
            currentCol:1,
            dependencies:[],
            description:`Initialized LCS DP matrix. S1 = "${s1}", S2 = "${s2}". Fill base cases (0s).`,
            line:0
        });
        for(let i=1;i<=m;i++){
            for(let j=1;j<=n;j++){
                const r=i+1;
                const c=j+1;
                snapshots.push({
                    matrix:matrix.map(row=>[...row]),
                    currentRow:r,
                    currentCol:c,
                    dependencies:[],
                    description:`Comparing S1[${i-1}] ('${s1[i-1]}') and S2[${j-1}] ('${s2[j-1]}').`,
                    line:1
                });
                if(s1[i-1]===s2[j-1]){ 
                    const val=matrix[r-1][c-1]+1;
                    matrix[r][c]=val;
                    snapshots.push({
                        matrix:matrix.map(row =>[...row]),
                        currentRow:r,
                        currentCol:c,
                        dependencies:[{r:r-1, c:c-1}],
                        description:`Characters match! dp[${i}][${j}] = dp[${i-1}][${j-1}] + 1 = ${val}.`,
                        line: 3
                    });
                }else{
                    const up = matrix[r - 1][c];
                    const left=matrix[r][c - 1];
                    const val=Math.max(up, left);
                    matrix[r][c]=val;
                    snapshots.push({
                        matrix:matrix.map(row=>[...row]),
                        currentRow:r,
                        currentCol:c,
                        dependencies:[
                            {r:r-1, c:c},
                            {r:r, c:c-1}
                        ],
                        description:`Characters do not match. Taking max(dp[${i - 1}][${j}] = ${up}, dp[${i}][${j - 1}] = ${left}) = ${val}.`,
                        line:5
                    });
                }
            }
        }
        let currR=m+1;
        let currC=n+1;
        let lcs='';
        const path=[];
        while(currR>1 && currC>1){
            const char1=matrix[currR][0];
            const char2=matrix[0][currC];
            if(char1===char2){
                lcs=char1+lcs;
                path.push({r:currR, c:currC});
                currR--;
                currC--;
            }else{
                const up=matrix[currR-1][currC];
                const left=matrix[currR][currC-1];
                if(up>=left){
                    currR--;
                }else{
                    currC--;
                }
            }
        }
        snapshots.push({
            matrix:matrix.map(row=>[...row]),
                currentRow:m+1,
                currentCol:n+1,
                dependencies:path,
                result:lcs,
                description:`LCS computation completed. Longest Common Subsequence is "${lcs}" (length: ${matrix[m + 1][n + 1]}).`,
                line:0
        });

    return snapshots;
}



//knapsack
export function generateKnapsack(weights,values,capacity){
    const snapshots=[];
    const n=weights.length;
    const matrix=Array.from({length:n+2},()=>
        Array.from({length:capacity+2},()=>0)
    );
    matrix[0][0]='Item\\Cap';
    for(let w=0;w<=capacity;w++){
        matrix[0][w+1]=w;
    }
    matrix[1][0]='Ø (0)';
    for(let i=0;i<n;i++){
        matrix[i+2][0]=`Item ${i+1} (w:${weights[i]}, v:${values[i]})`;
    }

    for(let w=0;w<=capacity;w++) matrix[1][w+1]=0;
    for(let i=0;i<=n;i++) matrix[i+1][1]=0;
    snapshots.push({
        matrix:matrix.map(row=>[...row]),
        currentRow:1,
        currentCol:1,
        dependencies:[],
        description:`Initialized Knapsack DP matrix. Capacity = ${capacity}, Weights = [${weights.join(', ')}], Values = [${values.join(', ')}].`,
        line:0
    });
    for(let i=1;i<=n;i++){
        const itemWt=weights[i-1];
        const itemVal=values[i-1];
        const r=i+1;
        for(let w=1;w<=capacity;w++){
            const c=w+1;
            snapshots.push({
                matrix:matrix.map(row=>[...row]),
                currentRow:r,
                currentCol:c,
                dependencies:[],
                description:`Evaluating Item ${i} (weight: ${itemWt}, value: ${itemVal}) at sub-capacity ${w}.`,
                line:1
            });
            if(itemWt<=w){
                const exclude=matrix[r-1][c];
                const include=itemVal+matrix[r-1][c-itemWt];
                const val=Math.max(include,exclude);
                matrix[r][c]=val;
                snapshots.push({
                    matrix:matrix.map(row=>[...row]),
                    currentRow:r,
                    currentCol:c,
                    dependencies:[
                        {r:r-1, c},
                        {r:r-1, c:c-itemWt}
                    ],
                    description:`Item fits! Max of (include: ${itemVal} + dp[${i - 1}][${w - itemWt}] = ${include}, exclude: dp[${i - 1}][${w}] = ${exclude}) = ${val}.`,
                    line:3
                });
            }else{
                const val=matrix[r-1][c];
                matrix[r][c]=val;
                snapshots.push({
                    matrix:matrix.map(row=>[...row]),
                    currentRow:r,
                    currentCol:c,
                    dependencies:[{r:r-1, c}],
                    description:`Item too heavy (weight ${itemWt} > capacity ${w}). Carry forward previous value = ${val}.`,
                    line:5
                });
            }
        }
    }
    let currR=n+1;
    let currC=capacity+1;
    const selectedItems=[];
    const path=[];
    while(currR>1 && currC>1){
        if(matrix[currR][currC]!==matrix[currR-1][currC]){
            const itemIdx=currR-2;
            selectedItems.push(itemIdx+1);
            path.push({r:currR, c:currC});
            currC-=weights[itemIdx];
        }
        currR--;
    }
    snapshots.push({
        matrix:matrix.map(row=>[...row]),
        currentRow:n+1,
        currentCol:capacity+1,
        dependencies:path,
        result:selectedItems.reverse(),
        description:`Knapsack finished! Max value: ${matrix[n + 1][capacity + 1]}. Selected items: ${selectedItems.join(', ')}.`,
        line: 0
    });

    return snapshots;
}



//coin change
export function generateCoinChange(coins,amount){
    const snapshots=[];
    const n=coins.length;
    const matrix=Array.from({length:n+2},()=>
        Array.from({length:amount+2},()=>0)
    );

    matrix[0][0]='Coin\\Amt';
    for(let a=0;a<=amount;a++){
        matrix[0][a+1]=a;
    }
    matrix[1][0]='Ø (0)';
    for(let i=0;i<n;i++){
        matrix[i+2][0]=`Coin ${coins[i]}`;
    }
    //base case
    for(let a=1;a<=amount;a++) matrix[1][a+1]=Infinity;
    for(let i=0;i<=n;i++) matrix[i+1][1]=0;
        snapshots.push({
            matrix:matrix.map(row =>[...row]),
            currentRow:1,
            currentCol:1,
            dependencies:[],
            description:`Initialized Coin Change DP matrix. Coins = [${coins.join(', ')}], Target Amount = ${amount}.`,
            line:0
        });
        for(let i=1;i<=n;i++){
            const coin=coins[i-1];
            const r=i+1;
            for(let a=1;a<=amount;a++){
                const c=a+1;
                snapshots.push({
                    matrix:matrix.map(row =>[...row]),
                    currentRow:r,
                    currentCol:c,
                    dependencies:[],
                    description:`Evaluating coin ${coin} for sub-amount ${a}.`,
                    line:1
                });
                if(coin<=a){
                    const exclude=matrix[r-1][c];
                    const includeVal=matrix[r][c-coin];
                    const include=includeVal===Infinity ? Infinity:includeVal+1;
                    const val=Math.min(include,exclude);
                    matrix[r][c]=val;
                    snapshots.push({
                        matrix:matrix.map(row=>[...row]),
                        currentRow:r,
                        currentCol:c,
                        dependencies:[
                            {r:r-1, c},
                            {r, c:c-coin}
                        ],
                        description:`Coin fits! Min of (exclude: ${exclude === Infinity ? '∞' : exclude}, include: dp[i][a - ${coin}] + 1 = ${include === Infinity ? '∞' : include}) = ${val === Infinity ? '∞' : val}.`,
                        line:3
                    });
                }else{
                    const val=matrix[r-1][c];
                    matrix[r][c]=val;
                    snapshots.push({
                        matrix:matrix.map(row=>[...row]),
                        currentRow:r,
                        currentCol:c,
                        dependencies:[{r:r-1, c}],
                        description:`Coin too large (coin value ${coin} > sub-amount ${a}). Carry forward previous result = ${val === Infinity ? '∞' : val}.`,
                        line:4
                    });
                }
            }
        }
        const resultVal=matrix[n+1][amount+1];
        const result=resultVal===Infinity ? -1:resultVal;
        let currR=n+1;
        let currC=amount+1;
        const selectedCoins=[];
        const path=[];
        if(result!== -1){
            while(currC>1 && currR>1){
                const coinVal=coins[currR-2];
                const includeVal=matrix[currR][currC-coinVal];
                const include=includeVal===Infinity ? Infinity:includeVal + 1;
                if(matrix[currR][currC]===include){
                    selectedCoins.push(coinVal);
                    path.push({r:currR, c:currC});
                    currC-=coinVal;
                }else{
                    currR--;
                }
            }
        }
        snapshots.push({
            matrix:matrix.map(row=>[...row]),
            currentRow:n+1,
            currentCol:amount+1,
            dependencies:path,
            result:selectedCoins,
            description:result !== -1
            ?`Coin Change finished! Min coins needed: ${result}. Coins used: [${selectedCoins.join(', ')}].`
            :`Coin Change finished. It is impossible to make amount ${amount} with coins [${coins.join(', ')}].`,
            line:0
        });

    return snapshots;
}
