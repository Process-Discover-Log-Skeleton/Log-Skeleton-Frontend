const copyRelationship = (relationship) => {
    let res = []
    relationship.forEach(element => {
        res.push(element)
    })
    return res;
}

const contains = (relationship, act1, act2) => {
    for(let i = 0, l = relationship.length; i < l; i++){
        if(relationship[i][0] === act1 && relationship[i][1] === act2){
            return true
        }
    }
    return false;
}

// Floyd-Warshall algorithm. Not best in terms of complexity but easy to implement
const transitiveClosure = (relationship, activities) => {
    let res = copyRelationship(relationship)
    let l = activities.length
    for (let k = 0; k < l; k++){
        for (let i = 0; i < l; i++){
            for (let j = 0; j < l; j++){
                if(contains(relationship, activities[i], activities[k])
                   && contains(relationship, activities[k], activities[j])
                   && !contains(relationship, activities[i], activities[j])){
                    res.push([activities[i], activities[j]])
                }
            }
        }
    }
    return res;
}

export default transitiveClosure