import {useMemo} from "react";
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {toast} from "react-toastify";

import PaperCatsContract from '../abis/PaperCatsContract.json'
import {contractAddress} from "../util/constant";

export const useContract = () => {
    const {active, library} = useWeb3React()

    return useMemo(() => {
        if (active) {
            try {
                return new ethers.Contract(contractAddress, PaperCatsContract, library.getSigner())
            } catch (e) {
                toast.error(e.message)
                return null
            }
        }
        return null
    }, [library, active]);
}

