import { useState, useContext, createContext } from 'react'
import { useToasts } from 'react-toast-notifications';

const apiURL = 'http://localhost:5000'//process.env.REACT_APP_API_URL

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

    const registerEventLog = (file) => {
        const fd = new FormData()
        fd.append('file', file)

        fetch(`${apiURL}/event-log`, {
            method: 'POST',
            body: fd
        }).then(res => {
            if (!res.ok) {
                res.json().then(res => {
                    addToast(res.error, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                })
                return
            }

            console.log('S');
            return res.json()
        }).then( res => {
            console.log('S2');
            console.log(res);
            setLogSkeleton({
                ...defaultLS,
                id: res.id
            })
            addToast('Registered event-log.', {
                appearance: 'success',
                autoDismiss: true,
            })
        }).catch(err => {
            console.log('Error');
            console.log(err)
            // addToast('Check your network', {
            //     appearance: 'error',
            //     autoDismiss: true,
            // })
        })
    }

    const fetchLogSkeleton = () => {
        let id = logSkeleton.id

        if (id == null) {
            console.log('No id');
            return
        }

        fetch(`${apiURL}/log-skeleton/${id}`, {
            method: 'POST'
        }).then(res => {
            if (!res.ok) {
                res.json().then(res => {
                    addToast(res.error, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                })
                return
            }

            console.log('S');
            return res.json()
        }).then( res => {
            console.log('S2');
            console.log(res);
            addToast('Received log-skeleton model.', {
                appearance: 'success',
                autoDismiss: true,
            })
        }).catch(err => {
            console.log('Error');
            console.log(err)
            // addToast('Check your network', {
            //     appearance: 'error',
            //     autoDismiss: true,
            // })
        })
    }

    return {
        logSkeleton,
        registerEventLog,
        fetchLogSkeleton
    }
}