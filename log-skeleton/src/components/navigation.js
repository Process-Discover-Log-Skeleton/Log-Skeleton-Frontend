import React, {useEffect, useRef, useState} from 'react'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import styles from '../styles/Navigation.module.css'
import { ReactComponent as LogSkeletonIcon } from '../assets/menu.svg'
import { ReactComponent as BellIcon } from '../assets/bell.svg'

const NavigationBar = () => {
    const logSkeleton = useLogSkeleton()
    const dropDown = useRef(null)
    const filePicker = useRef(null)
    const [showMenu, setShowMenu] = useState(null)

    const onLoad = (event) => {
        const file = event.target.files

        logSkeleton.registerEventLog(file[0])
    }

    function closeMenu (event) {
        console.log(dropDown)
        // if (dropDown.current.childNodes.length != 0 && !dropDown.current.contains(event.target)) {
        if (!dropDown.current.contains(event.target)) {
            setShowMenu(false)
        }
    }

    useEffect(() => {
        console.log('effect ' + showMenu)
        if (showMenu) {
            document.addEventListener('click', closeMenu)
        } else {
            document.removeEventListener('click', closeMenu)
        }
    }, [showMenu])

    const handleNewEventLog = () => {
        filePicker.current.click()
    }

    return (
        <nav className={styles.navigation}>
            <ul className={styles.navContainer}>
                <NavItem
                icon={<BellIcon></BellIcon>}>
                    
                </NavItem>
                <NavItem
                icon={<LogSkeletonIcon></LogSkeletonIcon>}>
                    <DropDown>
                        <DropDownTitle>
                            Log Skeleton
                        </DropDownTitle>
                        <DropDownItem>
                            <input type="file" ref={filePicker} style={{display: "none"}} onChange={onLoad}/>
                            <div onClick={handleNewEventLog}>
                                ✨ New event log
                            </div>
                        </DropDownItem>
                        <DropDownItem>
                            🔄 Reset
                        </DropDownItem>
                    </DropDown>
                </NavItem>
            </ul>
        </nav>
    )
}

const NavItem = (props) => {
    const [open, setOpen] = useState()
    return (
        <li className={styles.navItem}>
            <a href="#" className={styles.navButton} onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}

const DropDown = (props) => {
    return (
        <div className={styles.dropDown}>
            <div className={styles.menu}>
                {props.children}
            </div>
        </div>
    );
}

const DropDownItem = (props) => {
    return (
        <a href="#" className={styles.menuItem}>
            {props.children}
        </a>
    );
}

const DropDownTitle = (props) => {
    return (
        <a href="#" className={styles.menuTitle}>
            {props.children}
        </a>
    );
}

export default NavigationBar
