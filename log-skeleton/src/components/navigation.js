import React, {useEffect, useRef, useState} from 'react'
import { useLogSkeleton } from '../lib/api/log-skeleton'
import { useErrors } from '../lib/util/error'
import styles from '../styles/Navigation.module.css'
import { ReactComponent as LogSkeletonIcon } from '../assets/menu.svg'
import { ReactComponent as BellIcon } from '../assets/bell.svg'

const NavigationBar = () => {
    const errors = useErrors()
    const logSkeleton = useLogSkeleton()
    const dropDown = useRef(null)
    const dropDownIcon = useRef(null)
    const [showMenu, setShowMenu] = useState(null)

    const load = () => {
        console.log('Load')
        logSkeleton.fetchLogSkeleton()
    }

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

    const handleShowMenu = (event) => {
        event.preventDefault()

        setShowMenu(true)
    }

    useEffect(() => {
        console.log('effect ' + showMenu)
        if (showMenu) {
            document.addEventListener('click', closeMenu)
        } else {
            document.removeEventListener('click', closeMenu)
        }
    }, [showMenu])

    return (
        <nav className={styles.navigation}>
            <ul className={styles.navContainer}>
                <NavItem
                icon={<BellIcon></BellIcon>}>
                    
                </NavItem>
                <NavItem
                icon={<LogSkeletonIcon></LogSkeletonIcon>}>
                    <DropDown>
                        <DropDownItem>
                            Event Log
                        </DropDownItem>
                        <DropDownItem>
                            Reset
                        </DropDownItem>
                    </DropDown>
                </NavItem>
            </ul>
            {/* <div className={styles.navContainer}>

                
                <div ref={dropDown}>
                    <div ref={dropDownIcon} className={styles.dropDown} onClick={handleShowMenu}>
                        <ReactComponent width="60" height="23">
                        </ReactComponent>
                    </div>
                    <div>
                    {
                    showMenu ?
                        (<div className={styles.dropDownContainer}>
                            <div>
                                <span>Event-log</span>
                            </div>
                            <div>
                                <span>Reset</span>
                            </div>
                            <div>
                                <span>Help</span>
                            </div>
                        </div>) : (null)
                    }
                    </div>
                </div>
            </div> */}
        </nav>
    )
}

const NavItem = (props) => {
    const [open, setOpen] = useState()
    return (
        <li className={styles.navItem}>
            <a className={styles.navButton} onClick={() => setOpen(!open)}>
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
        <a className={styles.menuItem}>
            {props.children}
        </a>
    );
}

export default NavigationBar
