import styles from "./WhiteboardStyles/HeaderStyles.module.css"


export default function Header() {
    return (
        <header>
            <h1 className={styles.headerText}>Artistream</h1>
        </header>
    )
}