import Peer from "peerjs";
import React, { useEffect,useRef } from "react";


export default function Room({ props, socket }) {
	let ROOM_ID = props;
	//const  mediaStreamNameMap =useRef( new Map());
	console.log("Component - Room ID:" + ROOM_ID);
	//let socket = SocketIO("http://localhost:3000")
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
		<button onClick={toggleMic}>Toggle Mic</button>;
		<button onClick={toggleCam}>Toggle Cam</button>;
		<div id="video-grid" style={{ marginLeft: "20px" }}></div>
		</React.Fragment>
	);
}
