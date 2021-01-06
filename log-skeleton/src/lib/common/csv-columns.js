import LineNavigator from 'line-navigator'

export const extractCSVColumns = (file, handler) => {
    var navigator = new LineNavigator(file)

    // Read the first line
    navigator.readLines(0, 1, (err, index, lines, isEof, progress) => {
        var first = lines[0]

        if (first != null) {
            // Split the first line by ','
            var items = first.split(',')

            handler(items, null)

        } else {
            handler(null, err)
        }
    })
}

