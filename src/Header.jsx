import styles from "./WhiteboardStyles/HeaderStyles.module.css"
import image from './assets/imageHori.png'; 

export default function Header() {
    return (
        <header className={styles.header}>
            {/* <h1 className={styles.headerText}>{'\uD83C\uDFA8'} ARTISTREAM {'\ud83d\udd8c\ufe0f'}</h1> */}
            <img src={image}/>
        </header>
    )
}