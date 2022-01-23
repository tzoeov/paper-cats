import {useWeb3React} from "@web3-react/core";
import {useEffect} from "react";
import {injected} from "../components/wallet/connectors";
import {connectorLocalStorageKey} from "../util/constant";

const useEagerConnect = () => {
    const {activate} = useWeb3React()

    useEffect(() => {
        ;(async () => {
            const connectorId = window.localStorage.getItem(connectorLocalStorageKey)
            if (connectorId) {
                try {
                    activate(injected)
                } catch (e) {
                    console.log(e)
                }
            }
        })()
    }, [activate])
}

export default useEagerConnect
