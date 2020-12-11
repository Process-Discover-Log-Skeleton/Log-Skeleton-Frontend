import { useState, useContext, createContext, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications';

const apiURL = process.env.REACT_APP_API_URL

const LogSkeleton = createContext()

const defaultLS = {
    id: null,
    path: null,
    logSkeleton: null,
    forbiddenActivities: [],
    requiredActivities: [],
    relationships: []
}

export const LogSkeletonProvider = ({children}) => {
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
    const {addToast} = useToasts()

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

        // Post the event-log to the backend
        const response = await fetch(`${apiURL}/event-log`, {
            method: 'POST',
            body: fd
        })

        if (response.ok) { // Response is okay
            const data = await response.json()
            
            setLogSkeleton({
                ...defaultLS,
                id: data.id
            })

            addToast('Registered event-log.', {
                appearance: 'success',
                autoDismiss: true,
            })

        } else { // Something is wrong
            const err = await response.json()

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
            addToast('Failed to load event log id.', {
                appearance: 'error',
                autoDismiss: true,
            })
            return
        }

        // Request the Log skeleton model from the backend
        const res = await fetch(`${apiURL}/log-skeleton/${id}`, {
            method: 'POST'
        })

        if (res.ok) { // Response is okay
            const data = await res.json()

            setLogSkeleton({
                ...logSkeleton,
                logSkeleton: data
            })

            addToast('Received event-log.', {
                appearance: 'success',
                autoDismiss: true,
            })
        }else { // Something is wrong
            const err = await res.json()

            addToast(err.error, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    return {
        logSkeleton,
        registerEventLog,
        fetchLogSkeleton
    }
}