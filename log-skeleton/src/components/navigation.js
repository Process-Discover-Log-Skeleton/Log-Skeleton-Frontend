import React, { useEffect, useRef, useState } from 'react'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import styles from '../styles/Navigation.module.css'
import { ReactComponent as LogSkeletonIcon } from '../assets/menu.svg'
import { ReactComponent as BellIcon } from '../assets/bell.svg'
import { ReactComponent as CheckmarkIcon } from '../assets/checkmark.svg'
import { ReactComponent as ErrorIcon } from '../assets/errorCross.svg'

const NavigationBar = () => {
    const logSkeleton = useLogSkeleton()
    const dropDown = useRef(null)
    const filePicker = useRef(null)
    const [showMenu, setShowMenu] = useState(null)

    function closeMenu(event) {
        console.log(dropDown)
        // if (dropDown.current.childNodes.length != 0 && !dropDown.current.contains(event.target)) {
        if (!dropDown.current.contains(event.target)) {
            setShowMenu(false)
        }
    }

    const onLoad = (event) => {
        const file = event.target.files

        logSkeleton.registerEventLog(file[0])
    }

    const clearLogSkeleton = (event) => {
        logSkeleton.clear()
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
            <div className={styles.title}>
                <div>
                    Log Skeleton
                </div>
            </div>
            <ul className={styles.navContainer}>
                <LogSkeletonStatus></LogSkeletonStatus>
                <NavItem
                    icon={<BellIcon className={styles.icon} />}>

                </NavItem>
                <NavItem
                    icon={<LogSkeletonIcon className={styles.icon} />}>
                    <DropDown>
                        <DropDownTitle>
                            Log Skeleton
                        </DropDownTitle>
                        <DropDownItem>
                            <input type="file" ref={filePicker} style={{ display: "none" }} onChange={onLoad} />
                            <div onClick={handleNewEventLog} id="itemNew">
                                ✨ New event log
                            </div>
                        </DropDownItem>
                        <DropDownItem>
                            <div onClick={clearLogSkeleton} id="itemClear">
                                <span> <ErrorIcon className={styles.checkmark} /> </span>
                                Clear
                            </div>
                        </DropDownItem>
                        <DropDownItem>
                            <div id="itemReset">
                                🔄 Reset
                            </div>
                        </DropDownItem>
                    </DropDown>
                </NavItem>
            </ul>
        </nav>
    )
}

const NavItem = (props) => {
    const [open, setOpen] = useState()
    const item = useRef(null)
    const dropDown = useRef(null)

    const closeMenu = (event) => {

        if (item.current && !item.current.contains(event.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        if (open) {
            document.addEventListener('click', closeMenu)
        } else {
            document.removeEventListener('click', closeMenu)
        }
    }, [open])

    return (
        <li className={styles.navItem} ref={item}>
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

const LogSkeletonStatus = () => {

    const model = useLogSkeleton()

    if (model.ok()) {
        return (
            <NavItem icon={<>
                <CheckmarkIcon className={styles.checkmark} />
                {model.logSkeleton.file}
            </>}>
                <DropDown>
                    <DropDownTitle>
                        Status
                </DropDownTitle>
                    <DropDownItem>
                        <span>
                            <CheckmarkIcon className={styles.checkmark} />
                        </span>
                    Event log successfully uploaded.
                </DropDownItem>
                </DropDown>
            </NavItem>
        )
    } else if (model.hasErrors()) {
        return (
            <NavItem icon={<>
                <ErrorIcon className={styles.checkmark} />
                {model.logSkeleton.file}
            </>}>
                <DropDown>
                    <DropDownTitle>
                        Status
                </DropDownTitle>
                    <DropDownItem>
                        <span> <ErrorIcon className={styles.checkmark} /> </span>
                        {model.logSkeleton.errors}
                    </DropDownItem>
                </DropDown>
            </NavItem>)
    }

    return <></>
}

export default NavigationBar
