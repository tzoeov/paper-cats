import {Web3ReactProvider} from '@web3-react/core'
import {ToastContainer} from "react-toastify";
import {ethers} from "ethers";

import PaperCats from "../components/paper-cats";

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss'

const getLibrary = (provider) => {
    return new ethers.providers.Web3Provider(provider)
}

function MyApp({Component, pageProps}) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <PaperCats>
                <Component {...pageProps} />
            </PaperCats>
            <ToastContainer/>
        </Web3ReactProvider>
    )
}

export default MyApp
