import {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";

import {LoadingStatus} from "../../util/constant";
import CatBox from "../cat-box";
import {useContract} from "../../hooks/useContract";

import styles from './CatsGallery.module.scss'

const CatsGallery = () => {
    const {account, active} = useWeb3React()
    const contract = useContract()
    const [catIds, setCatIds] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.Idle)

    useEffect(() => {
        ;(async () => {
            if (!active || !contract) {
                return
            }
            setLoadingStatus(LoadingStatus.Pending)
            try {
                const ids = await contract.walletOfOwner(account)
                setCatIds(ids)
                setLoadingStatus(LoadingStatus.Resolved)
            } catch (e) {
                setLoadingStatus(LoadingStatus.Error)
            }
        })()

    }, [account, active, contract])

    return (
        <div>
            <div style={{textAlign: 'center'}}>
                {!active ? <>Please connect your wallet to see your cats 😺</> : null}
                {active && loadingStatus === LoadingStatus.Error ? <>An Error has occurred!</> : null}
                {active && (loadingStatus === LoadingStatus.Pending || loadingStatus === LoadingStatus.Idle) ? 'Loading' : null}
                {active && loadingStatus === LoadingStatus.Resolved && catIds.length === 0 ? <>You haven&apos;t adopted any
                    cats &#128148;</> : null}
            </div>


            <div className={styles.galleryContainer}>
                {active && loadingStatus === LoadingStatus.Resolved && catIds.length > 0 ? catIds.map(catId =>
                    <CatBox
                        catId={catId} key={catId}/>) : null}
            </div>
        </div>
    )
}

export default CatsGallery
