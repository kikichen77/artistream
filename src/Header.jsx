import styles from "./WhiteboardStyles/HeaderStyles.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerText}>{'\uD83C\uDFA8'} Artistream {'\ud83d\udd8c\ufe0f'}</h1>
        </header>
    )
}