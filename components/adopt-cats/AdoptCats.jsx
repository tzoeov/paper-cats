import {useState} from "react";
import {toast} from 'react-toastify';
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";

import {useContract} from "../../hooks/useContract";
import {basePrice, LoadingStatus, testIds} from "../../util/constant";

import styles from './AdoptCats.module.scss'

const AdoptCats = () => {
    const {active} = useWeb3React()
    const contract = useContract()
    const [count, setCount] = useState(1)
    const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.Idle)

    const increment = () => {
        if (count < 3) {
            setCount(count + 1)
        }
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const adopt = async () => {
        if (loadingStatus !== LoadingStatus.Pending) {
            setLoadingStatus(LoadingStatus.Pending)
            try {
                await contract.adopt(count, {value: ethers.utils.parseUnits((basePrice * count).toString(), 'ether')})
                toast('Congrats on adopting!', {icon: '😺'})
            } catch (e) {
                toast.error(e.message)
            } finally {
                setLoadingStatus(LoadingStatus.Idle)
            }
        }
    }

    return (
        <div className={styles.adoptCatsContainer}>
            {
                active ?
                    <>
                        <div className={styles.adoptCats}>
                            <button className={styles.countButton} onClick={decrement} disabled={count === 0} data-testid={testIds.decrementBtn}>-</button>
                            <div className={styles.counter} data-testid={testIds.amount}>{count}</div>
                            <button className={styles.countButton} onClick={increment} disabled={count === 3} data-testid={testIds.incrementBtn}>+</button>
                        </div>
                        <button className="yellowButton" onClick={adopt} data-testid={testIds.adoptBtn}
                                disabled={count === 0 || loadingStatus === LoadingStatus.Pending}>Adopt
                        </button>
                        <p>You can adopt a maximum of 3 cats.</p></> :
                    <>
                        <div>Please connect your wallet</div>
                    </>
            }

        </div>
    )
}

export default AdoptCats
