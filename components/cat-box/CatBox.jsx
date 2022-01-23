import {useEffect, useState} from "react";

import {LoadingStatus as RequestState, proxyUrl} from "../../util/constant";
import {useContract} from "../../hooks/useContract";

import styles from "./CatBox.module.scss"

const CatBox = ({catId}) => {
    const [cat, setCat] = useState(null)
    const contract = useContract()
    const [loadingState, setLoadingState] = useState(RequestState.Idle)

    useEffect(() => {
        ;(async () => {
            setLoadingState(RequestState.Pending)
            try {
                const catUrl = await contract.tokenURI(catId)
                fetch(`${proxyUrl}/${catUrl}`)
                    .then(async response => {
                        if (!response.ok) {
                            return Promise.reject(response)
                        }
                        setCat(await response.json())
                        setLoadingState(RequestState.Resolved)
                    }).catch(e => {
                    setLoadingState(RequestState.Error)
                })
            } catch (e) {
                setLoadingState(RequestState.Error)
            }
        })()
    }, [contract, catId])

    return (
        <div className={styles.catBoxContainer}>
            {
                loadingState === RequestState.Pending ? <div className={styles.placeHolder}>Loading</div> : null
            }
            {
                loadingState === RequestState.Error ? <div className={styles.placeHolder}>Ups</div> : null
            }
            {
                loadingState === RequestState.Resolved ?
                    (<div>
                        <img src={cat.image} width="250px" height="250px" alt={cat.description}/>
                        <div className={styles.info}>
                            <h3>{cat.name}</h3>
                            <p>{cat.description}</p>
                        </div>
                    </div>) : null
            }
        </div>
    )
}

export default CatBox
