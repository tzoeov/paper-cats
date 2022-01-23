import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {toast} from "react-toastify";

import {injected} from "../wallet/connectors";
import LogOut from './log-out.svg'
import {connectorLocalStorageKey, testIds} from "../../util/constant";
import {beautifyAccount} from "../../util/utils";

import styles from './Account.module.scss'

const Account = () => {
    const {activate, deactivate, account, error} = useWeb3React()

    const connect = async () => {
        try {
            await activate(injected)
            window.localStorage.setItem(connectorLocalStorageKey, "injected")
        } catch (e) {
            toast.error(e.message)
        }
    }

    const disconnect = async () => {
        try {
            deactivate()
            window.localStorage.removeItem(connectorLocalStorageKey)
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <div data-testid={testIds.accountContainer}>
            {
                error ? <div className={styles.connectionError}>
                    {error instanceof UnsupportedChainIdError ? <>Wrong Network</> : <>Error</>}
                </div> : null
            }
            {
                (!account && !error) ?
                    <button className='yellowButton' onClick={connect}
                            data-testid={testIds.connectBtn}>Connect</button> : null
            }
            {
                account ?
                    (<div className={styles.profile}>
                        <div className={styles.profileAccount}>{beautifyAccount(account)}</div>
                        <div className={styles.logout}>
                            <LogOut color="white" onClick={disconnect} data-testid={testIds.logoutBtn}/>
                        </div>
                    </div>) : null
            }

        </div>
    )
}
export default Account
