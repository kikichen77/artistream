import styles from "./WhiteboardStyles/HeaderStyles.module.css"
import image from './assets/imageHori.png'; 

// Header of the application
export default function Header() {
    return (
        <header className={styles.header}>
            <img src={image}/>
        </header>
    )
}