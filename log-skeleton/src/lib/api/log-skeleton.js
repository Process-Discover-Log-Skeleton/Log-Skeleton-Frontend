import { useState, useContext, createContext, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications';
import { filterActivities } from '../logic/activities'
import { filterRelationships } from '../logic/relationships'

// URL to the API server
const apiURL = process.env.REACT_APP_API_URL

const relationships = [
    "always_after",
    "always_before"
]

// Context for the log skeleton data
const LogSkeleton = createContext()

const defaultLS = {
    // ID of the event log in the backend
    id: null,
    // File name
    file: null,
    // Status returned by the backend
    status: null,
    // Potential errors from the backend
    errors: null,
    activities: null,
    // Original log-skeleton model from the backend
    logSkeleton: null,
    // Filtered version of the log-skeleton model
    filteredLogSkeleton: null
}

export const LogSkeletonProvider = ({ children }) => {
    const logSkeleton = useProvideLogSkeleton()


    return (
        <LogSkeleton.Provider value={logSkeleton}>
            {children}
        </LogSkeleton.Provider>)
}

export const useLogSkeleton = () => {
    return useContext(LogSkeleton)
}

const useProvideLogSkeleton = () => {
    const [logSkeleton, setLogSkeleton] = useState(defaultLS)
    const [activeActivities, setActiveActivities] = useState([])
    const [activeRelationships, setActiveRelationships] = useState(relationships)
    const [forbiddenActivities, setForbiddenActivities] = useState([])
    const [requiredActivities, setRequiredActivities] = useState([])

    const { addToast } = useToasts()


    const filterLogSkelton = (log) => {
        // Filter based on the activities
        var filtered = filterActivities(log, activeActivities)

        
        // Filter based on the activities
        filtered = filterRelationships(filtered, activeRelationships)

        return filtered
    }

    // Update the log skeleton model
    useEffect(() => {
        // Fetch log skeleton in case a new id was set.
        if (hasEventLog() && logSkeleton.logSkeleton == null) {
            fetchLogSkeleton()
        }
    }, [logSkeleton])

    useEffect(() => {
        if (!modelIsLoaded()) {
            return
        }

        setFilteredLogSkeleton(filterLogSkelton(logSkeleton.logSkeleton))
    }, [activeActivities, activeRelationships])

    useEffect(() => {
        if (!modelIsLoaded()) {
            return
        }

        fetchLogSkeleton()

    }, [forbiddenActivities, requiredActivities])

    // Api event-log registration
    const registerEventLog = async (file) => {
        // Attach the file to a FormData
        const fd = new FormData()
        fd.append('file', file)

        try {
            // Post the event-log to the backend
            var response = await fetch(`${apiURL}/event-log`, {
                method: 'POST',
                body: fd
            })
        } catch (e) {
            // In case of any errors
            addToast(e.message, {
                appearance: 'error',
                autoDismiss: true,
            })
            return
        }

        if (response.ok) { // Response is okay
            const {id, activities} = await response.json()

            setLogSkeleton({
                ...defaultLS,
                id: id,
                activities: activities,
                file: file.name,
                status: 'ok'
            })
            setActiveActivities(activities)
            console.log(file.name)
            addToast('Registered event-log.', {
                appearance: 'success',
                autoDismiss: true,
            })

        } else { // Something is wrong
            const err = await response.json()

            setLogSkeleton({
                ...defaultLS,
                file: file.name,
                status: 'failure',
                errors: err.error
            })

            addToast(err.error, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    // Log Skeleton model fetching
    const fetchLogSkeleton = async () => {
        let id = logSkeleton.id

        // There is no id
        if (id == null) {
            addToast('Please register an event log.', {
                appearance: 'warning',
                autoDismiss: true,
            })
            return
        }

        console.log('Fetching log skeleton')

        try {
            let forbidden = ''
            if (forbiddenActivities.length > 0) {
                forbidden = forbiddenActivities.reduce((prev, val) => {
                    return `${prev}forbidden=${val}&`
                }, '')
            }

            let required = ''
            if (requiredActivities.length > 0) {
                required = requiredActivities.reduce((prev, val) => {
                    return `${prev}required=${val}&`
                }, '')
            }

            let extension = 'extended-trace=0&'

            // Request the Log skeleton model from the backend
            var res = await fetch(`${apiURL}/log-skeleton/${id}?${extension}${forbidden}${required}`, {
                method: 'POST'
            })
        } catch (e) {
            // In case of any errors
            addToast(e.message, {
                appearance: 'error',
                autoDismiss: true,
            })
            return
        }

        if (res.ok) { // Response is okay
            const data = await res.json()
            console.log(data);
            // if (!modelIsLoaded()) {
            setLogSkeleton({
                ...logSkeleton,
                logSkeleton: data,
                filteredLogSkeleton: filterLogSkelton(data),
                status: 'ok'
            })

            setActiveActivities(data.activities)
        } else { // Something is wrong
            const err = await res.json()

            setLogSkeleton({
                ...defaultLS,
                status: 'failure',
                errors: err.error
            })

            addToast(err.error, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    const clear = () => {
        setLogSkeleton(defaultLS)
    }

    const hasEventLog = () => {
        return logSkeleton.id != null
    }

    const modelIsLoaded = () => {
        return hasEventLog() && logSkeleton.logSkeleton != null
    }

    const ok = () => {
        return logSkeleton.status == 'ok'
    }

    const hasErrors = () => {
        return !ok() && logSkeleton.errors != null
    }

    const setFilteredLogSkeleton = (filteredLogSkeleton) => {
        setLogSkeleton({
            ...logSkeleton,
            filteredLogSkeleton: filteredLogSkeleton
        })
    }

    const resetFilteredLogSkeleton = () => {
        setLogSkeleton({
            ...logSkeleton,
            filteredLogSkeleton: logSkeleton.logSkeleton
        })
    }

    return {
        logSkeleton, // The model object
        activeActivities,
        activeRelationships,
        forbiddenActivities,
        requiredActivities,
        setActiveActivities,
        setActiveRelationships,
        setFilteredLogSkeleton, // Sets the filtered log skeleton
        registerEventLog, // Registers a new event log
        resetFilteredLogSkeleton, // Resets the filtered log to the original state
        fetchLogSkeleton, // Fetches the log skeleton model from the api
        hasEventLog, // Returns if an event log is loaded
        clear, // Clears the current event log
        ok, // Returns if the status is 'ok'
        hasErrors, // Returns if there are any errors
        modelIsLoaded, // Returns if the model has been loaded from the backend
        setRequiredActivities,
        setForbiddenActivities
    }
}