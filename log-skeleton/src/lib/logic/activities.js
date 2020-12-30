
const keys = [
    'always_after',
    'always_before',
    'equivalence',
    'never_together',
    'next_both_ways',
    'next_one_way'
]

export const filterActivities = (logSkeleton, activities) => {
    var filteredLogSkeleton = {}

    // // Set the filtered set of activities
    // filteredLogSkeleton['activities'] = activities
    // // Set the parameters
    // filteredLogSkeleton['parameters'] = logSkeleton['parameters']

    // Map all the relationships to filter the activities
    for (let key of keys) {
        filteredLogSkeleton[key] =
            logSkeleton[key].filter(item => {
                return activities.includes(item[0]) && activities.includes(item[1])
            })
    }

    // Map the counter
    filteredLogSkeleton['counter'] = logSkeleton['counter']

    // Return the filtered log skeleton model
    return filteredLogSkeleton
}
