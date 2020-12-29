import { generateColors } from '../logic/equivalence-color';
import { minimalTransitive } from '../logic/minimal-transitive';

export const graphConverter = (logSkeleton, activities) => {

    let graph = {
        nodes: [],
        links: []
    }

    var colors = {}

    if (logSkeleton['equivalence'] != null) {
        colors = generateColors(logSkeleton['equivalence'])
        console.log(colors)
    }

    // Map the nodes to a graph-node
    let act = activities.map((item, index) => {
        return {
            id: index,
            name: item,
            color: colors[item] ?? '#DDD'
        }
    })

    graph.nodes = act

    let edges = []

    // Convert all relationships to links but 'counter' and 'equivilence'
    for (let rel of Object.keys(logSkeleton)) {
        if (rel === 'counter' || rel === 'equivalence') continue

        var closure;

        if (rel.startsWith('always')) {
            closure = minimalTransitive(logSkeleton[rel], activities)
        } else {
            closure = logSkeleton[rel]
        }

        const ed = closure.filter(item => {
            const source = activities.indexOf(item[0])
            const target = activities.indexOf(item[1])

            return source !== target
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
    graph.counter = logSkeleton['counter']

    return graph
}

