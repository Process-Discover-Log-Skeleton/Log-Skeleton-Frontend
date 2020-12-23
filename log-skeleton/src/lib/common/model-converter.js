import Activities from "../../components/activities";
import transitiveClosure from "../logic/transitive-closure";

export const graphConverter = (logSkeleton, activities) => {

    let graph = {
        nodes: [],
        edges: []
    }

    // Map the nodes to a graph-node
    let act = activities.map((item, index) => {
        return {
            id: index,
            name: item
        }
    })

    graph.nodes = act

    let edges = []

    for (let rel of Object.keys(logSkeleton)) {
        if (rel === 'counter') continue

        const closure = transitiveClosure(logSkeleton[rel], activities)
        console.log(closure);

        const ed = closure.map(item => {
            return {
                source: activities.indexOf(item[0]),
                target: activities.indexOf(item[1])
            }
        })

        edges = edges.concat(ed)
    }

    graph.edges = edges

    return graph
}

