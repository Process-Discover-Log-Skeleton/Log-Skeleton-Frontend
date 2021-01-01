// Check if a relationship contains a pair of activities and return the index if found
const contains = (relationship, pair) => {
    for(let i = 0, l = relationship.length; i < l; i++){
        if(relationship[i][0] === pair[0] && relationship[i][1] === pair[1]){
            return i;
        }
    }
    return -1;
}

export const relationshipsHierarchy = (logSkeleton) => {
    // Clone log skeleton
    let resLogSkeleton = JSON.parse(JSON.stringify(logSkeleton));

    for(const rel of ['always_after', 'next_both_ways']){
        if (resLogSkeleton[rel] != null && resLogSkeleton['next_one_way'] != null){
            for (const pair of resLogSkeleton[rel]){
                let index = contains(resLogSkeleton['next_one_way'], pair);
                if (index >= 0){
                    resLogSkeleton['next_one_way'].splice(index, 1);
                }
            }
        }
    }

    if (resLogSkeleton['always_before'] != null && resLogSkeleton['next_one_way'] != null){
        for (const pair of resLogSkeleton['always_before']){
            let index = contains(resLogSkeleton['next_one_way'], [pair[0], pair[1]]);
            if (index >= 0){
                resLogSkeleton['next_one_way'].splice(index, 1);
            }
        }
    }

    return resLogSkeleton;
}