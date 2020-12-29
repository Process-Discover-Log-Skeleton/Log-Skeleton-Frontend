/**
 * Trims the given string to the maximum length specified.
 * In case the given string is longer than allowed '...' will
 * be attached to the string. Otherwise the input will be returned.
 * @param {String} str 
 * @param {Number} maxLen 
 */
export const trimString = (str, maxLen = 19, dots = true) => {
    return str.length > maxLen ? 
                    str.substring(0, maxLen - (dots ? 3 : 0)) + (dots ? "..." : "") : 
                    str
}