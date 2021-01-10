export const generateMarkers = (svg, radius) => {

    // ----------------------
    // Always after
    // ----------------------

    // Always-after start marker
    // Rect-outline
    svg.append('defs')
        .append('marker')
        .attr('id', 'always_after_start')
        .attr('viewBox', '0 -2.5 5 5')
        .attr('refX', -radius / 1.5)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0, -2.5 L 5, -2.5 L 5, 2.5 L 0, 2.5 L 0, -2.5')
        .attr('fill', '#f4f6f8')
        .style('stroke','black')
        .style('stroke-width', '1.5')

    // Arrow end fill
    // Always-after end
    svg.append('defs')
        .append('marker')
        .attr('id', 'always_after_end')
        .attr('viewBox', '-0 -2.5 5 5')
        .attr('refX', radius / 1.5 + 2.5)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-2.5 L 5 ,0 L 0, 2.5 L 0, -2.5')
        .attr('fill', '#000')
        .style('stroke','none')
        .style('stroke-width', '1')

    // ----------------------
    // Always before
    // ----------------------

    // Arrow end fill
    // Always-after end
    const always_before_start = svg.append('defs')
        .append('marker')
        .attr('id', 'always_before_start')
        .attr('viewBox', '0 -2.5 10 5')
        .attr('refX', -radius + 6)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 10)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')

    always_before_start
        .append('svg:path')
        .attr('d', 'M 5 0 L 10 -2.5 L 10 2.5 L 5 0')
        .attr('fill', '#000')
        .style('stroke','none')
        .style('stroke-width', 'none')
        .attr('x', '-2.5')
        .attr('y', '-2.25')

    always_before_start
        .append('rect')
        .attr('width', 4.5)
        .attr('height', 4.5)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', '0.75px')
        // .attr('x', '-2.5')
        .attr('y', '-2.25')

    const always_before_end = svg.append('defs')
    .append('marker')
    .attr('id', 'always_before_combine')
    .attr('viewBox', '0 -2.5 10 5')
    .attr('refX', radius + 2)
    .attr('refY', 0)
    .attr('orient', 'auto')
    .attr('markerWidth', 10)
    .attr('markerHeight', 5)
    .attr('xoverflow', 'visible')

    always_before_end
        .append('svg:path')
        .attr('d', 'M 0 -2.5 L 5 0 L 0 2.5 L 0 -2.5')
        .attr('fill', '#000')
        .style('stroke','none')
        .style('stroke-width', 'none')
        .attr('x', '-2.5')
        .attr('y', '-2.25')

    always_before_end
        .append('rect')
        .attr('width', 4.5)
        .attr('height', 4.5)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', '0.75px')
        .attr('x', '5')
        .attr('y', '-2.25')

    // -------------------
    // Always before x Always after
    // -------------------
    
    const always_before_combinded = svg.append('defs')
        .append('marker')
        .attr('id', 'always_before_combined')
        .attr('viewBox', '0 -2.5 10 5')
        .attr('refX', radius + 3.5)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 10)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')

    always_before_combinded
        .append('svg:path')
        .attr('d', 'M 0, -2.5 L 5 ,0 L 0, 2.5 L 0, -2.5')
        .attr('fill', '#000')
        .style('stroke','none')
        .style('stroke-width', 'none')
        .attr('x', '-2.5')
        .attr('y', '-2.25')

    always_before_combinded
        .append('rect')
        .attr('width', 4.5)
        .attr('height', 4.5)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', '0.75px')
        .attr('x', '5')
        .attr('y', '-2.25')

    // Rect for the arrow

    
    // ----------------------
    // Never Together
    // ----------------------
    svg.append('defs')
        .append('marker')
        .attr('id', 'never_together_start')
        .attr('viewBox', '0 -2.5 5 5')
        .attr('refX', -radius / 1.5)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0, -2.5 L 5, -2.5 L 5, 2.5 L 0, 2.5 L 0, -2.5')
        .attr('fill', 'black')
        .style('stroke','black')
        .style('stroke-width', '1')

    svg.append('defs')
        .append('marker')
        .attr('id', 'never_together_end')
        .attr('viewBox', '0 -2.5 5 5')
        .attr('refX', radius / 1.5 + 5)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0, -2.5 L 5, -2.5 L 5, 2.5 L 0, 2.5 L 0, -2.5')
        .attr('fill', 'black')
        .style('stroke','black')
        .style('stroke-width', '1')

    //-------------------------
    // Next one way
    //-------------------------
    svg.append('defs')
        .append('marker')
        .attr('id', 'next_one_way_start')
        .attr('viewBox', '-2.5 -2.5 5 5')
        .attr('refX', -radius + 4)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')
        .append('circle')
        .attr('r', 2)
        .attr('fill', '#f4f6f8')
        .style('stroke','black')
        .style('stroke-width', '0.5')

    svg.append('defs')
        .append('marker')
        .attr('id', 'next_one_way_end')
        .attr('viewBox', '0 -2.5 5 5')
        .attr('refX', radius - 2)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-2.5 L 5 ,0 L 0, 2.5 L 0, -2.5')
        .attr('fill', '#000')
        .style('stroke','none')
        .style('stroke-width', '1')

    //------------------------------
    // Next_one_way_combined
    //  This marker will get displayed 
    //  in case two activities are 
    //  both next_one_way
    //------------------------------

    svg.append('defs')
        .append('marker')
        .attr('id', 'next_one_way_combined')
        .attr('viewBox', '-2.5 -2.5 5 5')
        .attr('refX', radius - 6.5)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .append('circle')
        .attr('r', 2)
        .attr('fill', '#f4f6f8')
        .style('stroke','black')
        .style('stroke-width', '0.5')


    //-------------------------
    // Next both ways
    //-------------------------
    let next_both_ways_start = svg.append('defs')
        .append('marker')
        .attr('id', 'next_both_ways_start')
        .attr('viewBox', '-2.5 -2.5 10 5')
        .attr('refX', -radius + 4.5)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 10)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')

    next_both_ways_start
        .append('circle')
        .attr('r', 2)
        .attr('fill', '#f4f6f8')
        .style('stroke','black')
        .style('stroke-width', '0.5')

    next_both_ways_start
        .append('svg:path')
                   // Trianlge on the bottom
        .attr('d', 'M 2.5 0 L 7.5 -2.5 L 7.5 2.5 L 2.5 0')
                //    'M 5 -2.5 L 10 -2.5 L 10 2.5 L 5 2.5' + // Outer rect
                //    'L 5.5 2 L 9.5 2 L 9.5 -2 L 5.5 -2 L 5.5 2 L 5 2.5  M 0,-2.5') // Inner rect
        .attr('fill', '#000')
        
        .style('stroke','none')
        .style('stroke-width', 'none')
        .attr('x', '7.5')
        .attr('y', '-2.25')

    let next_both_ways_end = svg.append('defs')
        .append('marker')
        .attr('id', 'next_both_ways_end')
        .attr('viewBox', '-2.5 -2.5 10 5')
        .attr('refX', radius + 1)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 10)
        .attr('markerHeight', 5)
        .attr('xoverflow', 'visible')
        .attr('yoverflow', 'visible')

    next_both_ways_end
        .append('circle')
        .attr('r', 2)
        .attr('fill', '#f4f6f8')
        .style('stroke','black')
        .style('stroke-width', '0.5')
        .attr('xoverflow', 'visible')
        .attr('cx', '5')

    next_both_ways_end
        .append('svg:path')
        // Trianlge on the bottom
        .attr('d', 'M -2.5 -2.5 L 2.5 0 L -2.5 2.5 L -2.5 -2.5')
        .attr('fill', '#000')
        .style('stroke','none')
        .style('stroke-width', 'none')

} 

