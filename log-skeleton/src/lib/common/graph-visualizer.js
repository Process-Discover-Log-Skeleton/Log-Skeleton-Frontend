import * as d3 from 'd3'
import { generateMarkers } from './d3-markers';
import { trimString } from './trim-strings';

//	graph data store
var graph,
    link,
    node,
    circles,
    labels,
    svg,
    simulation,
    radius,
    tooltip,
    currentTooltipNode,
    showToolTip = false,
    zoomLevel,
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

    zoom = d3.zoomIdentity
    showToolTip = false

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
            if (event.target.id !== 'graph-svg') return 

            hideTooltip()
        })
    svg.call(
        d3.zoom()
        .on("start", (event) => {
            zoomLevel.style('opacity', 1)
        })
        .on("zoom",  (event) => {
            hideTooltip()
            zoom = event.transform
            zoomLevel.style('opacity', 1)
            zoomLevel.html(`${(zoom.k * 100).toFixed(1)}%`)
            // svg.attr('transform', event.transform)
            node.attr("transform", event.transform)
            link.attr("transform", event.transform)
            // circles.selectAll('circles').attr("transform", event.transform)
            // labels.selectAll('circles').attr("transform", event.transform)

        })
        .on("end", (event) => {
            setTimeout(() => {
                zoomLevel.style('opacity', 0)
            }, 1000)
        }).scaleExtent([0.5, 6])
    )

    radius = 20

    tooltip = d3
        .select('body')
        .select('#tooltip-div')
        .attr('class', 'tooltip')
        .style('left', `0px`)
            .style('top', `0px`)
        .style('visibility', 'hidden')

    zoomLevel = d3
        .select(container)
        .select('#zoomLevel')
        .style('opactiy', 0)

    const clickNode = (event, node) => {
        if (graph == null || graph.counter[node.activity] == null) {
            return
        }

        console.log(node);

        showToolTip = true
        currentTooltipNode = node
        
        tooltip
            .style('left', `${event.pageX + radius}px`)
            .style('top', `${event.pageY + radius}px`)
            .style('visibility', 'visible')

            console.log(node);
            tooltip.html(tooltipContent(node, graph.counter[node.activity]))
    }

    // elements for data join
    link = svg.select('#links').selectAll(".link")
    node = svg.select('#links').selectAll(".node")

    circles = node.selectAll("circles")
    labels = node.selectAll("text")

    generateMarkers(svg, radius)

    //	simulation initialization
    simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
            .id(function (d) { return d.id; }))
        .force("charge", d3.forceManyBody()
            .strength(function (d) { return -1500; }))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .alphaDecay(0.02)
        .velocityDecay(0.8)

    //	follow v4 general update pattern
    const update = (g) => {
        if (g === null) {
            return
        }

        showToolTip = false
        const visibility = showToolTip ? 'visible' : 'hidden'
        tooltip.style('visibility', visibility)

        graph = g

        // Remove all the data
        svg.select('#links').selectAll("g").remove()
        svg.select('#links').selectAll(".link").remove()
        svg.select('#links').selectAll(".nodes").remove()

        // ENTER
        // Create new links.	
        link = svg
            .select('#links')
            .selectAll(".link")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("marker-start", d => d.markerStart != null ? `url(#${d.markerStart})` : null)
            .attr("marker-end", d => d.markerEnd != null ? `url(#${d.markerEnd})` : null)
            .attr('transform', zoom)
        
        // link.append("title").text(d => d.type)
    
        // Add all the nodes
        node = svg
            .select('#links')
            .selectAll(".nodes")
            .data(graph.nodes)
            .enter()
            // .enter()
            .append("g")
            .on('click', clickNode)
            .attr('transform', zoom)
            .merge(node)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            )

        circles.remove()
            
        circles = node
            .append("circle")
            .merge(circles)
            .attr("class", "node")
            .attr("r", radius)
            .style("fill", d => d.color)
            .style("pointer-events", "none")

        node.append("title")
            .text(d => d.name)


        labels.remove()

        labels = node
            .append("text")
            .text(d => trimString(d.name, 6, false))
            .attr("class", "label")
            .attr("dy", d => d.isExtension ? 5 : 3)
            .attr("text-anchor", "middle")
            .attr('width', 2 * radius)
            .attr('height', 2 * radius)
            .style('font-size', d => d.isExtension ? '16px' : '10px')
        
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

        d.x = (event.sourceEvent.layerX - zoom.x) / zoom.k
        d.y = (event.sourceEvent.layerY - zoom.y) / zoom.k

        if (currentTooltipNode != null &&
            currentTooltipNode.id != null &&
            d.id === currentTooltipNode.id) {
            tooltip
                .style('left', `${event.sourceEvent.pageX + radius}px`)
                .style('top', `${event.sourceEvent.pageY + radius}px`)
        }

        ticked()
    }

    function dragended(event, d) {
        
    }

    //	tick event handler (nodes bound to container)
    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x })
            .attr("y1", function (d) { return d.source.y })
            .attr("x2", function (d) { return d.target.x })
            .attr("y2", function (d) { return d.target.y })

        node.selectAll("circle")
            .attr("cx", function(d) { return d.x })
            .attr("cy", function(d) { return d.y })

        node
            .selectAll("text")
            .attr("x", function(d) { return d.x })
            .attr("y", function(d) { return d.y })

    }

    return update
}