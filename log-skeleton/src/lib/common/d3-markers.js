
export const generateMarkers = (svg) => {

    svg.append('defs')
        .append('marker')
        .attrs({'id':'arrowend',
            'viewBox':'-0 -2.5 5 5',
            'refX':-8,
            'refY':0,
            'orient':'auto',
            'markerWidth':9,
            'markerHeight':9,
            'xoverflow':'visible'})
        .append('svg:path')
        .attr('d', 'M 0,-2.5 L 5 ,0 L 0, 2.5')
        .attr('fill', '#000')
        .style('stroke','none');



} 

