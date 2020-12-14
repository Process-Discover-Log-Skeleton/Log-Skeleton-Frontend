import { useState, useContext, createContext, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications';

// URL to the API server
const apiURL = process.env.REACT_APP_API_URL

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
    // Original log-skeleton model from the backend
    logSkeleton: null,
    // Filtered version of the log-skeleton model
    filteredLogSkeleton: null,
    // List of forbidden activities
    forbiddenActivities: [],
    // List of required activities
    requiredActivities: [],
    // List of selected relationships
    relationships: []
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
    const { addToast } = useToasts()

    // Update the log skeleton model
    useEffect(() => {
        // Fetch log skeleton in case a new id was set.
        if (logSkeleton.id != null && logSkeleton.logSkeleton == null) {
            fetchLogSkeleton()
        }
    }, [logSkeleton])

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
            const data = await response.json()

            setLogSkeleton({
                ...defaultLS,
                id: data.id,
                file: file.name,
                status: 'ok'
            })
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

        try {
            let forbidden = ''
            if (logSkeleton.forbiddenActivities.length > 0) {
                forbidden = logSkeleton.forbiddenActivities.reduce((prev, val) => {
                    return `${prev}forbidden=${val}&`
                }, '')
            }

            let required = ''
            if (logSkeleton.requiredActivities.length > 0) {
                required = logSkeleton.requiredActivities.reduce((prev, val) => {
                    return `${prev}required=${val}&`
                }, '')
            }

            // Request the Log skeleton model from the backend
            var res = await fetch(`${apiURL}/log-skeleton/${id}?${forbidden}${required}`, {
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

            setLogSkeleton({
                ...logSkeleton,
                logSkeleton: data,
                filteredLogSkeleton: data,
                status: 'ok'
            })

            addToast('Received event-log.', {
                appearance: 'success',
                autoDismiss: true,
            })
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

    const setRequiredActivities = (required) => {
        setLogSkeleton({
            ...logSkeleton,
            requiredActivities: required
        })
    }

    const setForbiddenActivities = (forbidden) => {
        setLogSkeleton({
            ...logSkeleton,
            forbiddenActivities: forbidden
        })
    }

    return {
        logSkeleton, // The model object
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
        setForbiddenActivities,
    }
}