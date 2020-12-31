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
            node.attr("transform", event.transform)
            link.attr("transform", event.transform)
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
        
        link.append("title").text(d => d.type)
    
        // Add all the nodes
        node = svg
            .select('#links')
            .selectAll(".nodes")
            .data(graph.nodes)
            .enter()
            // .enter()
            .append("g")
            .on('click', clickNode)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            )
            .attr('transform', zoom)
            .merge(node)

        circles.remove()
            
        circles = node
            .append("circle")
            .merge(circles)
            // .style('opacity', '0.5')
            .attr("class", "node")
            .attr("r", radius)
            .style("fill", d => d.color)
            // .attr('stroke-width', 5)
            // .attr('stroke', 'transparent')
            

        node.append("title")
            .text(d => d.name)


        labels.remove()

        labels = node
            .append("g")

        labels
            .append("text")
            .text(d => trimString(d.name, 6, false))
            .attr("class", "label")
            .attr("dy", d => d.isExtension ? 5 : 3)
            .attr("text-anchor", "middle")
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

        // console.log(zoom);
        // console.log(event);

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
            .selectAll("text")
            .attr("x", function(d) { return d.x = clipX(d.x) })
            .attr("y", function(d) { return d.y = clipY(d.y) })

    }

    return update
}