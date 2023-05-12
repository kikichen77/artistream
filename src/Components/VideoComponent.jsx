import Peer from "peerjs";
import React, { useEffect } from "react";
import SocketIO from "socket.io-client";
import styles from "./MiscComponentStyles.module.css"

export default function Room({ props, socket }) {
	let ROOM_ID = props;
	console.log("Component - Room ID:" + ROOM_ID);
	let vidOn = true;
    let micOn = true;
    let selfMediaStream;

    const toggleMic = () => {
        if (micOn){
            selfMediaStream.getAudioTracks()[0].enabled = false;
            micOn = false;
        }
        else{
            selfMediaStream.getAudioTracks()[0].enabled = true;
            micOn = true;
        }
    }
    const toggleCam = () => {
        if (vidOn){
            selfMediaStream.getVideoTracks()[0].enabled = false;
            vidOn = false;
        }
        else{
            selfMediaStream.getVideoTracks()[0].enabled = true;
            vidOn = true;
        }
    }
	useEffect(() => {
		
		const videoGrid = document.getElementById("video-grid");

		const myPeer = new Peer(undefined, {
			host: "/",
			port: "3001",
		});

		const myVideo = document.createElement("video");
		myVideo.muted = true;
		const peers = {};
		const videos = new Map();
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true,
			})
			.then((stream) => {
				addVideoStream(myVideo, stream);
				selfMediaStream = stream;
				myPeer.on("call", (call) => {
					call.answer(stream);
					const video = document.createElement("video");
					call.on("stream", (userVideoStream) => {
						addVideoStream(video, userVideoStream, call.peer);
					});
				});

				socket.on("user-connected", (userId) => {
					setTimeout(() => {
						connectToNewUser(userId, stream);
					}, 300);
				});

				const videoTrack = stream.getVideoTracks()[0];
				const constraints = { width: { exact: 269 }, height: { exact: 150 } };
				videoTrack.applyConstraints(constraints);
			});

			socket.on("user-disconnected", (userId) => {
				if (peers[userId]) peers[userId].close();
			});
	

		myPeer.on("open", (id) => {
			sessionStorage.setItem("id",socket.id)
			socket.emit("join-room", ROOM_ID, id);
		});

		function connectToNewUser(userId, stream) {
			
			const call = myPeer.call(userId, stream);
			const video = document.createElement("video");
			call.on("stream", (userVideoStream) => {
				addVideoStream(video, userVideoStream, userId);
			});
			call.on("close", () => {
				video.remove();
				videos.delete(userId);
			});
			peers[userId] = call;
		}

		function addVideoStream(video, stream, userId) {
			if (videos.has(userId)) {
				return;
			}
			video.srcObject = stream;
			video.addEventListener("loadedmetadata", () => {
				video.play();
			});
			video.style.width = "95%";
			videoGrid.append(video); 
			videos.set(userId, video);
		}
		
		
		
		
		
		
	});
	return (
		<React.Fragment>
			<div className={styles.center}>
				<button className={styles.toggleButton} onClick={toggleMic}>Toggle <br/>Mic</button>
				<button className={styles.toggleButton} onClick={toggleCam}>Toggle <br/> Cam</button>
			</div>
		
			<div id="video-grid" style={{ marginLeft: "20px" }}></div>
		</React.Fragment>
	);
}
