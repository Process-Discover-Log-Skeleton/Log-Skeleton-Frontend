import { useErrors } from '../lib/util/error'
import styles from '../styles/Error.module.css'

const ErrorToast = () => {
    var ctx = useErrors()
    console.log(ctx.errors)

    if (ctx.errors.errors.length == 0) {
        return <></>
    }

    return (
        <div className={styles.toastContainer}>
            {
            ctx.errors.errors.map(err => {
                return (<h4 className={styles.toast}>{err.message}</h4>)
            })
            }
        </div>
    );
}

export default ErrorToast

