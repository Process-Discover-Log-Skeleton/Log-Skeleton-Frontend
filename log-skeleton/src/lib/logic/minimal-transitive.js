// Do a DFS to compute reachable nodes from node start 
const reachable = (start, vertices, adjacentList) => {
    let visited = {};
    for (const vertex of vertices){
        visited[vertex] = false;
    }
    let stack = [start];
    do {
        let cur = stack.pop();
        visited[cur] = true;
        for(const neighbor of adjacentList[cur]){
            if(visited[neighbor] === false){
                stack.push(neighbor);
                visited[neighbor] = true;
            }
        }  
    } while (stack.length > 0)
    let res = [];
    for(const vertex in visited){
        if(visited[vertex] === true){
            res.push(vertex);
        }
    }
    return new Set(res);
}

// Function to compare sets
const setEqual = (set1, set2) => {
    if(set1.size !== set2.size){
        return false;
    }
    for(const elem of set1){
        if(!set2.has(elem)){
            return false
        }
    }
    return true;
}

// Clone an object
const clone = (original) => {
    return JSON.parse(JSON.stringify(original));
}

// Remove an edge from an adjacent list and return a new adjacent list
const without = (adjacentList, edge) => {
    let newAdjList = clone(adjacentList);
    for(let i = 0, l = newAdjList[edge[0]].length; i < l; i++){
        if(newAdjList[edge[0]][i] === edge[1]){
            newAdjList[edge[0]].splice(i, 1);
            break;
        }
    }
    return newAdjList;
}

// Return a minimal representation of a transitive relationship
export const minimalTransitive = function(relationship, activities) {
    let adjacentList = {};
    for (const act of activities){
        adjacentList[act] = [];
    }
    for (const pair of relationship){
        adjacentList[pair[0]].push(pair[1]);
    }
    for (const act of activities){
        let rAct = reachable(act, activities, adjacentList);
        for(const successor of adjacentList[act]){
            let adjListWithoutEdge = without(adjacentList, [act, successor]);
            let rActPrime = reachable(act, activities, adjListWithoutEdge);
            if(setEqual(rAct, rActPrime)){
                adjacentList = adjListWithoutEdge;
            }
        }
    }
    let res = [];
    for (const act in adjacentList){
        for (const succ of adjacentList[act]){
            res.push([act, succ]);
        }
    }
    return res;
}