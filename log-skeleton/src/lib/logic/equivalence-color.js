// Function to distribute random colors to equivalence classes using HSV space, then convert to RGB

// Helper function to convert to RGB
// Convention: h in [0, 360], s in [0, 1], v in [0, 1]
const funcHSV = (h,s,v) => {
    return (n) => {
        const k = (n + h/60) % 6;
        return v - v*s*Math.max(0, Math.min(k, 4-k, 1));
    }
}

// Convert from HSV to RGB, RGB in [0, 255]
const HSVtoRGB = (h,s,v) => {
    const f = funcHSV(h,s,v);
    return [Math.floor(f(5)*255), Math.floor(f(3)*255), Math.floor(f(1)*255)];
}

// Generate one "distinct" color for each equivalence class
// Each activity is assigned a tuple [R, G, B] 
export const generateColors = (equiv) => {
    // Default saturation and value
    const s = 0.8;
    const v = 0.8;

    // Pseudo random hue in [0, 1]
    let h = Math.random();
    let diff = (Math.sqrt(5)-1)/2; // Inverse of golden ratio for "equal" distribution

    // Object to be returned
    let colors = {}; 

    for (const pair of equiv){
        const [first, second] = [pair[0], pair[1]];
        if(colors.hasOwnProperty(first)){
            colors[second] = colors[first]
        } else if (colors.hasOwnProperty(second)){
            colors[first] = colors[second]
        } else {
            h = (h + diff) % 1;
            colors[first] = HSVtoRGB(Math.floor(h*360), s, v);
            colors[second] = colors[first]
        }  
    }

    return colors;
}

// Convert a [R, G, B] tuple to its hex value e.g. #AABBCC
export const toHexRGB = (tuple) => {
    const hexs = tuple.map((value) => {
        const hexValue = value.toString(16);
        while (hexValue.length < 2){
            hexValue = "0" + hexValue;
        }
        return hexValue;
    }) 
    return ("#" + hexs[0] + hexs[1] + hexs[2]).toUpperCase();
}