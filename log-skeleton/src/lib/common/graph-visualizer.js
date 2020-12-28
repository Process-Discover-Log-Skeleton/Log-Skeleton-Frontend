import * as d3 from 'd3'
import { selectAll } from 'd3';
import styles from '../../styles/Graph.css'
import { generateMarkers } from './d3-markers';

//	graph data store
var graph,
    link,
    node,
    circles,
    labels,
    svg,
    simulation,
    color,
    radius,
    tooltip,
    currentTooltipNode,
    showToolTip = false,
    zoom = d3.zoomIdentity;

const tooltipContent = (node, counter) => {
    return `
        <div>
            <div class="tooltipTitle">${node.name}</div>
            <div class="tooltipCounter">
                <div class="tooltipCounterItem">
                    <div>
                        Min
                    </div>
                    <div>
                        ${counter.min}
                    </div>
                </div>
                <div class="tooltipCounterItem">
                    <div>
                        Max
                    </div>
                    <div>
                        ${counter.max}
                    </div>
                </div>
                <div>
                    <div>
                        Sum
                    </div>
                    <div>
                        ${counter.sum}
                    </div>
                </div>
            </div>
        </div>
    `
}

export const runForceGraph = (container) => {

    const containerRect = container.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    const hideTooltip = () =>  {
        currentTooltipNode = null
        showToolTip = false
        const visibility = showToolTip ? 'visible' : 'hidden'
        tooltip.style('visibility', visibility)
    }

    //	svg and sizing
    svg = d3
        .select(container)
        .select("svg")
        .attr("cursor", "arrow")
        .on('click', event => {
            // Return if click is not on the svg
            if (event.target.id != 'graph-svg') return 

            hideTooltip()
        })
    svg.call(
        d3.zoom().on("zoom", function (event) {
            hideTooltip()
            zoom = event.transform
            node.attr("transform", event.transform)
            link.attr("transform", event.transform)
        }).scaleExtent([0.5, 6])
    )

    radius = 15

    tooltip = d3
        .select('body')
        .select('#tooltip-div')
        .attr('class', 'tooltip')

    tooltip
        .append('p')
        .attr('text', d => 'Hallo')
        .attr('visibility', 'hidden')

    const clickNode = (event, node) => {
        console.log(node);

        showToolTip = true
        const visibility = showToolTip ? 'visible' : 'hidden'
        currentTooltipNode = node
        
        tooltip
            .style('left', `${event.pageX + radius}px`)
            .style('top', `${event.pageY + radius}px`)
            .style('visibility', 'visible')

        if (graph != null) {
            console.log(node);
            tooltip.html(tooltipContent(node, graph.counter[node.name]))
        }
    }

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
            .strength(function (d) { return -1500; }))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .alphaDecay(0.02)
        .velocityDecay(0.75)

    //	follow v4 general update pattern
    const update = (g) => {
        if (g === null) {
            return
        }

        showToolTip = false
        const visibility = showToolTip ? 'visible' : 'hidden'
        tooltip.style('visibility', visibility)

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
            .attr('transform', zoom)
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
            .on('click', clickNode)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            )
            .attr('transform', zoom)
            .merge(node)

            
        circles = node
            .append("circle")
            .merge(circles)
            .attr("class", "node")
            .attr("r", radius)
            .style("fill", d => d.color)
            // .attr('stroke-width', 5)
            // .attr('stroke', 'transparent')
            
        circles.exit().remove()

        node.append("title")
            .text(d => d.name)

        labels = node.append("svg:text")
            .text(d => d.name)
            .attr("class", "label")
            .attr("dy", 5)
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

        console.log(zoom);
        console.log(event);

        d.x = (event.sourceEvent.layerX - zoom.x) / zoom.k
        d.y = (event.sourceEvent.layerY - zoom.y) / zoom.k

        if (currentTooltipNode != null && d.id == currentTooltipNode.id) {
            tooltip
                .style('left', `${event.sourceEvent.pageX + radius}px`)
                .style('top', `${event.sourceEvent.pageY + radius}px`)
        }

        ticked()
    }

    function dragended(event, d) {
        
    }

    function clipX(x) {
        return x
        // return Math.max(radius * 1.5, Math.min(width - radius * 1.5, x))
    }

    function clipY(y) {
        return y
        // return Math.max(radius * 2.5, Math.min(height - radius * 2.5, y))
    }

    //	tick event handler (nodes bound to container)
    function ticked() {
        link
            .attr("x1", function (d) { return clipX(d.source.x) })
            .attr("y1", function (d) { return clipY(d.source.y) })
            .attr("x2", function (d) { return clipX(d.target.x) })
            .attr("y2", function (d) { return clipY(d.target.y) })

        node.selectAll("circle")
            .attr("cx", function(d) { return d.x = clipX(d.x) })
            .attr("cy", function(d) { return d.y = clipY(d.y) })

        labels
            .attr("x", function(d) { return d.x = clipX(d.x) })
            .attr("y", function(d) { return d.y = clipY(d.y) })
    }

    return update
}