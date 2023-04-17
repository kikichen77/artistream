import styles from "./WhiteboardStyles/ChatBoxStyles.module.css"
import TextField from '@mui/material/TextField';

export default function ChatBox() {
    return (
        <div className={styles.chatboxBox}>
            
            <div className={styles.chatDisplay}>
                <p className={styles.chatboxText}>Chat Box</p>
            </div>
            <TextField className={styles.textField} label="Enter text here..." variant="filled" size="small"/>
        </div>
    )
}