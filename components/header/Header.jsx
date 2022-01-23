import {useEffect, useState} from "react";

import Account from "../account";
import NavLink from "../nav-link";

import styles from './Header.module.scss'

const Header = () => {
    const [showAccount, setShowAccount] = useState(false)

    useEffect(() => {
        setShowAccount(!!window.ethereum)
    }, [])

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.innerHeader}>
                    <div className={styles.headerLogo}>
                        Paper Cats
                    </div>
                    {showAccount ? <Account/> : null}
                </div>
            </div>
            <div className={styles.headerNavigation}>
                <div className={styles.innerHeaderNavigation}>
                    <NavLink href="/" activeClassName={styles.active}><a>Home</a></NavLink>
                    <NavLink href="/cats" activeClassName={styles.active}><a>Your Cats</a></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header

