import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import '../styles/Graph.css'
import { runForceGraph } from '../lib/common/graph-visualizer'
import { graphConverter } from '../lib/common/model-converter'

var updateGraph = (g) => {};

const GraphVisualizer = () => {
    // Reference to the svg
    const node = useRef(null)
    const model = useLogSkeleton()

    // var [updateGraph, setUpdateGraph] = useState(null);

    const nodeHoverTooltip = React.useCallback((node) => {
        console.log(node.name);
        return `<div>${node.name}</div>`;
      }, []);

    useEffect(() => {
        if (node.current != null) {
            const update = runForceGraph(node.current)

            updateGraph = update
        }
    }, [])

    useEffect(() => {
        if (model.filteredLogSkeleton === null || model.filteredLogSkeleton.logSkeleton === null) {
            return
        }

        if (updateGraph == null) {
            return
        }
        
        let graph = graphConverter(model.filteredLogSkeleton.logSkeleton, model.filteredLogSkeleton.activities)
        
        console.log(graph);

        updateGraph(graph)

      }, [model.filteredLogSkeleton])

    return (
        <div ref={node}
             className='container'>
                <div id='zoomLevel'></div>
                <svg id='graph-svg'></svg>
        </div>
    )
}

export default GraphVisualizer
