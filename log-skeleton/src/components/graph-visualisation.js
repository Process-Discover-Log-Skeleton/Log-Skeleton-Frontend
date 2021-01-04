import React, { useEffect, useRef } from 'react'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import '../styles/Graph.css'
import { runForceGraph } from '../lib/common/graph-visualizer'
import { graphConverter } from '../lib/common/model-converter'

var updateGraph = (g) => {};

const GraphVisualizer = () => {
    // Reference to the svg
    const node = useRef(null)
    const model = useLogSkeleton()

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
        
        let graph = graphConverter(model.filteredLogSkeleton.logSkeleton,
                                   model.filteredLogSkeleton.activities,
                                   model.config.parameters['trace-start'],
                                   model.config.parameters['trace-end'])
        
        updateGraph(graph)

      }, [model.filteredLogSkeleton, model.config.parameters])

    return (
        <div ref={node}
             className='container'>
                <div id='zoomLevel'></div>
                <svg id='graph-svg'>
                    <g id='nodes'></g>
                    <g id='links'></g>
                </svg>
        </div>
    )
}

export default GraphVisualizer
