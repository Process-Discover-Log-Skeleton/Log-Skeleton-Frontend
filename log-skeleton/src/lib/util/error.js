import { useState, useContext, createContext } from 'react'

export const ErrorContext = createContext()

export const ErrorProvider = ({children}) => {
    const err = useProvideErrors()
    return <ErrorContext.Provider value={err}>{children}</ErrorContext.Provider>
}

export const useErrors = () => {
    return useContext(ErrorContext)
}

const useProvideErrors = () => {
    const [errors, setErrors] = useState({
        errors: []
    })

    const pushError = (message) => {
        const errs = errors.errors
        const id = uuidv4()

        errs.push({
            message: message,
            id: id
        })

        setErrors({
            errors: errs
        })

        function removeError() {
            console.log('removing id ' + id);
            const errs = errors.errors.filter(val => val.id != id)
            setErrors({
                errors: errs
            })
        }

        setTimeout(removeError, 5000)
    }

    return {
        errors,
        setErrors,
        pushError
    }
}


function uuidv4() {
    return 'xxxxxxxx'.replace(/[x]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
  