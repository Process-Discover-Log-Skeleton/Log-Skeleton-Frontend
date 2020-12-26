import Activities from "../../components/activities";
import transitiveClosure from "../logic/transitive-closure";

export const graphConverter = (logSkeleton, activities) => {

    let graph = {
        nodes: [],
        links: []
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

        const ed = closure.filter(item => {
            const source = activities.indexOf(item[0])
            const target = activities.indexOf(item[1])

            return source != target
        }).map(item => {
            const source = activities.indexOf(item[0])
            const target = activities.indexOf(item[1])

            return {
                id: rel + '-' + source + '-' + target,
                source: source,
                target: target,
                type: rel
            }
        })

        edges = edges.concat(ed)
    }

    graph.links = edges

    return graph
}

