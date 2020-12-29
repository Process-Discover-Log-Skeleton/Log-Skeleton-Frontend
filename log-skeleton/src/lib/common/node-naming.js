



// Convert a list of activities to a the 
export const shortestUniquePrefix = (activity, activities, maxWordCount = 2) => {

    var activityWords = 
        activities
            .filter(item => item !== activity)
            .map(item => item.split(' '))

    // Split the name into the words
    var words = activity.split(' ')

    var prefixes = words.map(word => word.split('')[0])

    


}

