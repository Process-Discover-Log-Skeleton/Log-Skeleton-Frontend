import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import '../styles/Graph.css'
import { runForceGraph } from '../lib/common/graph-visualizer'
import { graphConverter } from '../lib/common/model-converter'


const GraphVisualizer = () => {
    // Reference to the svg
    const node = useRef(null)
    const model = useLogSkeleton()

    const nodeHoverTooltip = React.useCallback((node) => {
        console.log(node.name);
        return `<div>${node.name}</div>`;
      }, []);


    useEffect(() => {
        if (model.filteredLogSkeleton === null || model.filteredLogSkeleton.logSkeleton === null) {
            return
        }

        console.log(model.filteredLogSkeleton);

        let destroyFn

        let graph = graphConverter(model.filteredLogSkeleton.logSkeleton, model.filteredLogSkeleton.activities)

        if (node.current) {
          const { destroy } = runForceGraph(node.current, graph.nodes, graph.edges, nodeHoverTooltip)
          destroyFn = destroy
        }
    
        return destroyFn
      }, [model.filteredLogSkeleton])

    return (
        <div ref={node}
             className='container'>
                 <svg></svg>
        </div>
    )
}

export default GraphVisualizer
