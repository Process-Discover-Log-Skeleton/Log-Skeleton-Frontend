import * as d3 from 'd3'
import { selectAll } from 'd3';
import styles from '../../styles/Graph.css'
import { generateMarkers } from './d3-markers';

//	graph data store
var graph, link, node, circles, labels, svg, simulation, color, radius;

export const runForceGraph = (container) => {

    const containerRect = container.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    //	svg and sizing
    svg = d3
        .select(container)
        .select("svg")
    svg.call(
        d3.zoom().on("zoom", function (event) {
            node.attr("transform", event.transform)
            link.attr("transform", event.transform)
        })
    )

    radius = 10

    //	d3 color scheme
    color = d3.scaleOrdinal(d3.schemeCategory10);

    // elements for data join
    link = svg.append("g").selectAll(".link")
    node = svg.append("g").selectAll(".node")

    circles = svg.selectAll("circles")
    labels = svg.selectAll("text")

    generateMarkers(svg, radius)

    //	simulation initialization
    simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
            .id(function (d) { return d.id; }))
        .force("charge", d3.forceManyBody()
            .strength(function (d) { return -2500; }))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .alphaDecay(0.02)
        .velocityDecay(0.9)

    //	follow v4 general update pattern
    const update = (g) => {
        if (g === null) {
            return
        }

        graph = g
        // Update link set based on current state
        // DATA JOIN
        link = link.data(graph.links);

        // EXIT
        // Remove old links
        link.exit().remove();

        // ENTER
        // Create new links as needed.	
        link = link.enter()
            .append("line")
            .attr("class", "link")
            .attr("marker-start", "url(#circle-outline)")
            .attr("marker-end", "url(#arrowend-outline)")
            .merge(link)
        
        link.append("title").text(d => d.type)

        // DATA JOIN
        node = node
            .data(graph.nodes)

        // EXIT
        node.exit().remove();

        circles.remove()
        labels.remove()

        // ENTER
        node = node
            .enter()
            .append("g")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            )
            .merge(node)

            
        circles = node
            .append("circle")
            .merge(circles)
            .attr("class", "node")
            .attr("r", radius)
            .attr("fill", function (d) { return color(d.id); })
            
        circles.exit().remove()

        node.append("title")
            .text(d => d.name)

        labels = node.append("svg:text")
            .text(d => d.name)
            .attr("class", "label")
            .attr("dy", radius + 10)
            .attr("text-anchor", "middle")
        
        //	Set nodes, links, and alpha target for simulation
        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        // Reset alpha to 1.0 and the target to 0.0
        simulation.alpha(1.0).alphaTarget(0.0).restart();
    }

    //	drag event handlers
    function dragstarted(event, d) {
        // if (!event.active) simulation.alphaTarget(0.2).restart();
        // d.x = d.x;
        // d.y = d.y;
        simulation.stop()
    }

    function dragged(event, d) {
        d.x = event.x;
        d.y = event.y;

        ticked()
    }

    function dragended(event, d) {
        
        // if (!event.active) simulation.alphaTarget(0);
        // d.fx = null;
        // d.fy = null;
    }

    //	tick event handler (nodes bound to container)
    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node.selectAll("circle")
            .attr("cx", function(d) { return d.x = Math.max(radius * 1.5, Math.min(width - radius * 1.5, d.x)); })
            .attr("cy", function(d) { return d.y = Math.max(radius * 2.5, Math.min(height - radius * 2.5, d.y)); });

        labels
        .attr("x", function(d) { return d.x = Math.max(radius * 1.5, Math.min(width - radius * 1.5, d.x)); })
        .attr("y", function(d) { return d.y = Math.max(radius * 2.5, Math.min(height - radius * 2.5, d.y)); });
        
    }

    return update
}