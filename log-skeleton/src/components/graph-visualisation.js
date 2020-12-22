import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import '../styles/Graph.css'


const GraphVisualizer = () => {
    // Reference to the svg
    const node = useRef(null)
    const model = useLogSkeleton()

    var graph = {
        nodes: [
            'a1',
            'a2'
        ],
        edges: [
            {
                source: 'a1',
                target: 'a2'
            }
        ]
    }

    useEffect(() => {
        if (node.current) {
            var svg = d3.select(node.current)
            var {nodes, edges} = graph

            var simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(100).strength(1))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(300 / 2, 300 / 2));

            // -----------------------
            // |   Draw the nodes    |
            // -----------------------
            
            // Enter new elements
            let n = svg.selectAll(".node")
                .data(nodes)
                .enter()
                .append("g")
                .attr("class", "node")
                
            // Update existing elements
            n.append("circle")
                .attr("r", 15)
                .attr('cx', (d, i) => i === 0 ? 100 : 200)
                .attr('cy', (d, i) => 150)
                .style("fill", 'red')

            // Remove old elements
            n.exit()
                .remove()
            
            // -----------------------
            // |   Draw the edges    |
            // -----------------------
            
            let l = svg.selectAll(".edge")
                .data(edges)
                .enter()
                .append("line")
                .attr("class", "edge")

            let edgepaths = svg.selectAll(".edgepath")
                .data(edges)
                .enter()
                .append('path')
                .attr('class', 'edgepath')
                .attr('fill-opacity', 0)
                .attr('stroke-opacity', 0)
                .attr('id', function (d, i) {return 'edgepath' + i})
                .style("pointer-events", "none")

            simulation
                .nodes(nodes)
                .on("tick", ticked);
    
            simulation.force("link")
                .links(edges);

            function ticked() {
                l
                    .attr("x1", function (d) {return d.source.x;})
                    .attr("y1", function (d) {return d.source.y;})
                    .attr("x2", function (d) {return d.target.x;})
                    .attr("y2", function (d) {return d.target.y;});
        
                n
                    .attr("transform", function (d) {return "translate(" + d.x + ", " + d.y + ")";});
        
                edgepaths.attr('d', function (d) {
                    return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                });
        
                // edgelabels.attr('transform', function (d) {
                //     if (d.target.x < d.source.x) {
                //         var bbox = this.getBBox();
        
                //         rx = bbox.x + bbox.width / 2;
                //         ry = bbox.y + bbox.height / 2;
                //         return 'rotate(180 ' + rx + ' ' + ry + ')';
                //     }
                //     else {
                //         return 'rotate(0)';
                //     }
                // });
            }
        }
    }, [node.current])

    return (
        <svg ref={node}
             className='container'
             width={400}
             height={200}>
        </svg>
    )
}

export default GraphVisualizer
