import { useState, useContext, createContext, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications';
import { filterActivities } from '../logic/activities'
import { filterRelationships } from '../logic/relationships'

// URL to the API server
const apiURL = process.env.REACT_APP_API_URL

const relationships = [
    "always_after",
    "always_before",
    "equivalence"
]

// Context for the log skeleton data
const LogSkeleton = createContext()

const defaultConfig = {
    // ID of the event log in the backend
    id: null,
    // File name
    file: null,
    // The actual file
    fileContent: null,
    // Status returned by the backend
    status: null,
    // Potential errors from the backend
    errors: null,
    // Parameters of the LS model
    parameters: null
}

const defaultLS = {
    activities: null,
    // Original log-skeleton model from the backend
    logSkeleton: null
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
    const [config, setConfig] = useState(defaultConfig)
    const [logSkeleton, setLogSkeleton] = useState(defaultLS)
    const [filteredLogSkeleton, setFilteredLogSkeleton] = useState(defaultLS)
    const [activeActivities, setActiveActivities] = useState([])
    const [activeRelationships, setActiveRelationships] = useState(relationships)
    const [forbiddenActivities, setForbiddenActivities] = useState([])
    const [requiredActivities, setRequiredActivities] = useState([])

    const { addToast } = useToasts()


    const filterLogSkelton = (log) => {
        if (log == null){
            return null
        }

        // Filter based on the activities
        var filtered = filterActivities(log, activeActivities)

        
        // Filter based on the activities
        filtered = filterRelationships(filtered, activeRelationships)

        return {
            logSkeleton: filtered,
            activities: activeActivities
        }
    }

    // Filter the logSkeleton as soon as it changes
    useEffect(() => {
        const filtered = filterLogSkelton(logSkeleton.logSkeleton)

        setFilteredLogSkeleton(filtered)
        // eslint-disable-next-line
    }, [logSkeleton])

    // Fetch as soon as something changes in the config
    useEffect(() => {
        // Fetch log skeleton in case a new id was set.
        if (hasEventLog() && ok() && logSkeleton.logSkeleton == null) {
            fetchLogSkeleton()
        }
        // eslint-disable-next-line
    }, [config])

    // Refilter the filteredLogSkeleton
    // as soon as any active items changed.
    useEffect(() => {
        // In case there is no event log
        if (!modelIsLoaded()) {
            return
        }

        const filtered = filterLogSkelton(logSkeleton.logSkeleton)

        setFilteredLogSkeleton(filtered)
        // eslint-disable-next-line
    }, [activeActivities, activeRelationships])

    // Refetch the log skeleton as soons as the forbidden/ required activties change.
    useEffect(() => {
        // In case there is no log id -> return
        if (!modelIsLoaded() || !ok()) {
            return
        }

        fetchLogSkeleton()
        // eslint-disable-next-line
    }, [forbiddenActivities, requiredActivities])


    const handleEventLogRegistration = async (response, file) => {
        if (response.ok) { // Response is okay
            const {id, activities} = await response.json()

            if (!hasEventLog()) {
                addToast('Registered event-log.', {
                    appearance: 'success',
                    autoDismiss: true,
                })
            }

            // Set original log skeleton
            setLogSkeleton({
                ...defaultLS,
                activities: activities
            })
            
            // Set config
            setConfig({
                id: id,
                file: file.name,
                fileContent: file,
                status: 'ok'
            })

            setFilteredLogSkeleton({
                ...defaultLS,
                activities: activities
            })

            setActiveActivities(activities)

        } else { // Something is wrong
            const err = await response.json()

            setConfig({
                ...config,
                file: file.name,
                fileContent: file,
                status: 'failure',
                errors: err.error
            })

            setLogSkeleton(defaultLS)

            addToast(err.error, {
                appearance: 'error',
                autoDismiss: false,
            })
        }
    }

    const registerExampleEventLog = async () => {
        try {
            // Post the event-log to the backend
            var response = await fetch(`${apiURL}/event-log/example`, {
                method: 'POST'
            })
        } catch (e) {
            // In case of any errors
            addToast(e.message, {
                appearance: 'error',
                autoDismiss: false,
            })
            return
        }

        await handleEventLogRegistration(response, {name: 'Example'})
    }

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
                autoDismiss: false,
            })
            return
        }
 
        await handleEventLogRegistration(response, file)

    }

    // Log Skeleton model fetching
    const fetchLogSkeleton = async () => {
        let id = config.id

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

            let extension = 'extended-trace=1&'

            // Request the Log skeleton model from the backend
            var res = await fetch(`${apiURL}/log-skeleton/${id}?${extension}${forbidden}${required}`, {
                method: 'POST'
            })
        } catch (e) {
            // In case of any errors
            addToast(e.message, {
                appearance: 'error',
                autoDismiss: false,
            })
            return
        }

        console.log(`Code: ${res.status}`);

        if (res.ok) { // Response is okay
            const { activities, parameters, model } = await res.json()
            console.log(activities);
            console.log(model);
            console.log(parameters);

            // Something must be wrong
            // -> Just for safety since setting the logSkeleton with an null object 
            //    after the API call would cause an infite API call loop.
            if (model == null) {
                failure(['Something is wrong!'])
                console.log('null');
                return
            }

            setLogSkeleton({
                activities: activities,
                logSkeleton: model
            })

            setConfig({
                ...config,
                parameters: parameters,
                status: 'ok'
            })

            setActiveActivities(activities)
        } else if (res.status == '410') { // Missing resource
            // At this point potentially the server 
            // shut down during the session and the 
            // event log has to get reregistered

            // Check whether an event log is registered locally
            if (hasEventLog() && config.fileContent != null) {
                addToast('Ooops! This may take longer than expected.', {
                    appearance: 'info',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                })

                registerEventLog(config.fileContent)

                return
            }

            const err = await res.json()
            console.log('else');

            failure([err.error])

            setLogSkeleton(defaultLS)

            addToast(err.error, {
                appearance: 'error',
                autoDismiss: true,
            })
        } else { // Something is wrong
            const err = await res.json()
            console.log('else');

            failure([err.error])

            setLogSkeleton(defaultLS)

            addToast(err.error, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    const failure = (errors) => {
        setConfig({
            ...config,
            status: 'failure',
            errors: errors
        })
    }

    const clear = () => {
        setConfig(defaultConfig)
        setLogSkeleton(defaultLS)
        setFilteredLogSkeleton(defaultConfig)
        setActiveActivities([])
        setActiveRelationships(relationships)
        setForbiddenActivities([])
        setRequiredActivities([])
    }

    const hasEventLog = () => {
        return config.id !== null
    }

    const modelIsLoaded = () => {
        console.log(logSkeleton);
        return hasEventLog() && logSkeleton.logSkeleton != null
    }

    const ok = () => {
        return config.status === 'ok'
    }

    const hasErrors = () => {
        return !ok() && config.errors != null
    }

    const resetFilteredLogSkeleton = () => {
        setActiveActivities(logSkeleton.activities)
        setActiveRelationships(relationships)
        setForbiddenActivities([])
        setRequiredActivities([])
    }

    return {
        logSkeleton, // The model object
        filteredLogSkeleton,
        config,
        activeActivities,
        activeRelationships,
        forbiddenActivities,
        requiredActivities,
        setActiveActivities,
        setActiveRelationships,
        // setFilteredLogSkeleton, // Sets the filtered log skeleton
        registerEventLog, // Registers a new event log
        registerExampleEventLog, // Fetch example event log
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