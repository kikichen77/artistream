import styles from "./WhiteboardStyles/HeaderStyles.module.css"
import CopyID from "./Components/CopyComponent"


export default function Header({ROOM_ID}) {
    return (
        <header>
            <CopyID props={ROOM_ID}/>
            <h1 className={styles.headerText}>Artistream</h1>
        </header>
    )
}