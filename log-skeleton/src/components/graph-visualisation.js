import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import '../styles/Graph.css'
import { runForceGraph } from '../lib/common/grah-visualizer'


const GraphVisualizer = () => {
    // Reference to the svg
    const node = useRef(null)
    const model = useLogSkeleton()

    const nodeHoverTooltip = React.useCallback((node) => {
        console.log(node.name);
        return `<div>${node.name}</div>`;
      }, []);

    var graph = {
        nodes: [
            {
                id: 0,
                name: 'r r'
            },{
                id: 1,
                name: 'a2'
            },{
                id: 2,
                name: 'a3'
            },
        ],
        edges: [
            {
                source: 0,
                target: 1
            },
            {
                source: 1,
                target: 2
            }
        ]
    }

    useEffect(() => {
        let destroyFn;

        if (node.current) {
          const { destroy } = runForceGraph(node.current, graph.nodes, graph.edges, nodeHoverTooltip);
          destroyFn = destroy;
        }
    
        return destroyFn;
      }, []);

    return (
        <div ref={node}
             className='container'>
        </div>
    )
}

export default GraphVisualizer
