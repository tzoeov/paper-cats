import useEagerConnect from "../../hooks/useEagerConnect";
import Header from "../header";
import AppBody from "../app-body";

const PaperCats = ({children}) => {
    useEagerConnect()
    return (
        <>
            <Header/>
            <AppBody>
                {children}
            </AppBody>
        </>
    )
}
export default PaperCats
