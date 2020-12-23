import * as d3 from 'd3'
import styles from '../../styles/Graph.css'

//	graph data store
var graph, link, node, svg, simulation, color;

export const runForceGraph = (container) => {

    const containerRect = container.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    //	svg and sizing
    svg = d3.select(container).select("svg")

    //	d3 color scheme
    color = d3.scaleOrdinal(d3.schemeCategory10);

    // elements for data join
    link = svg.append("g").selectAll(".link")
    node = svg.append("g").selectAll(".node")

    //	simulation initialization
    simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
            .id(function (d) { return d.id; }))
        .force("charge", d3.forceManyBody()
            .strength(function (d) { return -500; }))
        .force("center", d3.forceCenter(width / 2, height / 2));

    //	follow v4 general update pattern
    const update = (g) => {
        console.log(graph)
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
        link = link.enter().append("line")
            .attr("class", "link")
            .merge(link);

        // DATA JOIN
        node = node.data(graph.nodes);

        // EXIT
        node.exit().remove();

        // ENTER
        node = node.enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            // .attr("fill", function (d) { return color(d.group); })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            )
            .merge(node);

        //	Set nodes, links, and alpha target for simulation
        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        simulation.alphaTarget(0.3).restart();
    }
    //	drag event handlers
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    //	tick event handler (nodes bound to container)
    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    }

    return update
}