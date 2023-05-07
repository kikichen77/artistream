import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function CopyID({props}){
    const [copied, setCopied] = useState(''); 
    let ROOM_ID = props;   

    return (
        <>
            <input value={ROOM_ID} />

            <CopyToClipboard 
                text={ROOM_ID}
                onCopy={() => setCopied(true)}
            >
                <button>Copy room ID</button>
            </CopyToClipboard>

            {copied ? <span>Copied</span> : null}
        </>
    );
};
