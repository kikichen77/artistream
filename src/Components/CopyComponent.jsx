import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from "./MiscComponentStyles.module.css"


export default function CopyID({props}){
    const [copied, setCopied] = useState(''); 
    let ROOM_ID = props;   

    return (
        <div className={styles.copyComponent}>
            <input value={ROOM_ID} className={styles.idText} readOnly/>

            <CopyToClipboard 
                text={ROOM_ID}
                onCopy={() => setCopied(true)}
            >
                <button>Copy room ID</button>
            </CopyToClipboard>

            {copied ? <span className={styles.copied}>Copied {'\u2714'}</span> : null}
        </div>
    );
};
