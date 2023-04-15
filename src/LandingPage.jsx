import React from 'react';
import './landingPage.css';
import { Settings, AddCircle } from '@mui/icons-material';

const LandingPage = () => {

    return (
        <div className="landingPage">
            <form action="" method="POST">
                {/* Set an image space */}
                <div className="imageSpaceContainer">
                    <div className="imageSpaceDiv">
                        <img src="vite.svg" alt="" className="userImage"/>
                    </div>
                    <span className="addCircleIconContainer">
                        <AddCircle className="addCircleIcon" />
                    </span>
                    
                </div>

                {/* Input username to display on the main page*/}
                <p className="usernameText">Username</p>
                <input type="text" id="username" placeholder="Enter username" className="usernameInput"/><br/>
        
                {/* Input a room code and join a room */}
                <input type="text" id="roomCode" placeholder="Enter room code" className="roomCodeInput"/>
                <button className="joinRoomButton" onClick={() => joinRoom(roomCode)}>Join room</button><br/>

                {/* Create a new room */}
                <button className="createRoomButton" onClick={() => createRoom(username)}>Create Room </button>
            </form>            
            <Settings className="settingsIcon" />
        </div>
    );
}



export default LandingPage;
