import styles from './AppBody.module.scss'

const AppBody = ({children}) => {
return <div className={styles.appBody}>{children}</div>
}
export default AppBody
