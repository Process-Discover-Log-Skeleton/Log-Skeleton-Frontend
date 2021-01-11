import { generateColors } from '../logic/equivalence-color';
import { minimalTransitive } from '../logic/minimal-transitive';
import { relationshipsHierarchy } from '../logic/relationships-hierarchy';

const combineRelationship = (edges, rel1, rel2, marker, start) => {

    // Filter all always after edges
    var first = edges.filter(edge => {
        return edge.type === rel1
    })

    while(first.length > 0) {
        let edge = first.shift()

        // Filter for oposite edges
        const second = edges.filter(e => {
            return e.type === rel2 &&
                   e.source === edge.target &&
                   e.target === edge.source
        })
    
        if (second.length > 0) {
            // At this point both side edges are included
    
            // Remove all of the edges
            edges = edges.filter(item => {
                return !second.includes(item)
            })

            first = first.filter(item => {
                return !second.includes(item)
            })
    
            if (start === 0)
                edge.markerStart = marker
            else if (start === 1)
                edge.markerEnd = marker
            else {
                edge.markerStart = marker + '_start'
                edge.markerEnd = marker + '_end'
            }
        }
    }

    return edges
}

const reduceEdges = (edges) => {

    // Remove double always relationship
    edges = combineRelationship(edges, 'always_after', 'always_before', 'always_before_combined', 1)

    // Combine always_before with next_one_way
    edges = combineRelationship(edges, 'always_before', 'next_one_way', 'next_one_way_combined', 1)

    // Remove double next_one_way
    edges = combineRelationship(edges, 'next_one_way', 'next_one_way', 'next_both_ways', 2)

    // Remove double next_both_ways
    edges = combineRelationship(edges, 'next_both_ways', 'next_both_ways', 'next_both_ways', 2)

    // Remove double always after
    edges = combineRelationship(edges, 'always_after', 'always_after', 'always_after_end', 1)

    // Remove double always before
    edges = combineRelationship(edges, 'always_before', 'always_before', 'always_before_combine', 1)

    return edges
}

export const graphConverter = (logSkeleton, activities, start, end) => {

    const reducedLogSkeleton = relationshipsHierarchy(logSkeleton)

    let graph = {
        nodes: [],
        links: []
    }

    var colors = {}

    if (logSkeleton['equivalence'] != null) {
        colors = generateColors(logSkeleton['equivalence'])
    }

    // Map the nodes to a graph-node
    let act = activities.map((item, index) => {
        let name = item
        let isExtension = false

        if (name === start){
            name = '🚀'
            isExtension = true
        } else if (name === end) {
            name = '🏁'
            isExtension = true
        }

        return {
            id: index,
            activity: item,
            name: name,
            color: colors[item] ?? '#BBB',
            isExtension: isExtension
        }
    })

    graph.nodes = act

    let edges = []

    // Convert all relationships to links but 'counter' and 'equivilence'
    for (let rel of Object.keys(reducedLogSkeleton)) {
        if (rel === 'counter' || rel === 'equivalence') continue

        var closure;

        if (rel.startsWith('always')) {
            closure = minimalTransitive(reducedLogSkeleton[rel], activities)
        } else {
            closure = reducedLogSkeleton[rel]
        }

        const ed = closure.filter(item => {
            const source = activities.indexOf(item[0])
            const target = activities.indexOf(item[1])

            // Make sure the graph does not contain any self loops
            return source !== target
        }).map(item => {
            const source = activities.indexOf(item[0])
            const target = activities.indexOf(item[1])

            return {
                id: rel + '-' + source + '-' + target,
                source: source,
                target: target,
                markerStart: rel + '_start',
                markerEnd: rel + '_end',
                type: rel
            }
        })

        edges = edges.concat(ed)
    }

    graph.links = reduceEdges(edges)
    graph.counter = logSkeleton['counter']

    return graph
}

