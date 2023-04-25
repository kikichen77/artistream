import React from "react";
import Box from "@mui/material/Box";
import CallIcon from "@mui/icons-material/Call";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import SettingsPopUp from "./SettingsPopUp";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import EmoticonPalette from "./EmoticonPalette";
import { Link } from "react-router-dom";

const MeetingControls = () => {
	const [cameraEnabled, setCameraEnabled] = useState(true);
	const [micEnabled, setMicEnabled] = useState(true);
	const [localStream, setLocalStream] = useState(null);

	useEffect(() => {
		async function getMediaStream() {
			try {
				const constraints = { video: true, audio: true };
				const stream = await navigator.mediaDevices.getUserMedia(constraints);
				setLocalStream(stream);
				console.log("meeting stream", stream);
			} catch (error) {
				console.error(error);
			}
		}
		getMediaStream();
	}, []);
	useEffect(() => {
		if (localStream) {
			const videoTrack = localStream.getVideoTracks()[0];
			const audioTrack = localStream.getAudioTracks()[0];
			console.log("videoTrack", videoTrack);
			if (videoTrack) {
				videoTrack.enabled = cameraEnabled;
			}
			if (audioTrack) {
				audioTrack.enabled = micEnabled;
			}
		}
	}, [localStream, cameraEnabled, micEnabled]);

	const handleCameraClick = () => {
		setCameraEnabled(!cameraEnabled);
	};

	const handleMicClick = () => {
		setMicEnabled(!micEnabled);
	};

	// const handleCameraClick = () => {
	// 	setCameraEnabled(!cameraEnabled);
	// 	toggleCamera(localStream, setCameraEnabled);
	// };
	// const handleMicClick = () => {
	// 	setMicEnabled(!micEnabled);
	// 	toggleMic(localStream, setMicEnabled);
	// };
	// const toggleCamera = (localStream, setCameraEnabled) => {
	// 	let videoTrack = localStream
	// 		.getTracks()
	// 		.find((track) => track.kind === "video");

	// 	if (videoTrack.enabled) {
	// 		videoTrack.enabled = false;
	// 	} else {
	// 		videoTrack.enabled = true;
	// 	}
	// 	setCameraEnabled(!cameraEnabled);
	// };
	// const toggleMic = (localStream, setMicEnabled) => {
	// 	let audioTrack = localStream
	// 		.getTracks()
	// 		.find((track) => track.kind === "audio");

	// 	if (audioTrack.enabled) {
	// 		audioTrack.enabled = false;
	// 	} else {
	// 		audioTrack.enabled = true;
	// 	}
	// 	setMicEnabled(!micEnabled);
	// };

	return (
		<>
			<Box
				sx={{
					"& > :not(style)": {
						m: 2,
					},
					backgroundColor: "rgb(37, 42, 69)",
					borderRadius: "20px",
					bottom: "0",
					position: "flex",
					marginTop: "20px",
					marginRight: "20px",
					marginBottom: "20px",
					padding: "10px",
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					color: "white",
				}}
			>
				{/* <IconButton sx={{ color: "white" }}>
					<ArrowDropUpIcon />
				</IconButton>
				<IconButton sx={{ color: "white" }}>
					<HomeIcon />
				</IconButton> */}
				<IconButton sx={{ color: "white" }}>
					<EmoticonPalette />
				</IconButton>
				{/* <IconButton sx={{ color: "white" }}>
					<PersonAddAlt1Icon />
				</IconButton> */}
				<IconButton onClick={handleMicClick} sx={{ color: "white" }}>
					{micEnabled ? <MicIcon /> : <MicOffIcon />}
				</IconButton>
				<Link to="/">
					<IconButton sx={{ color: "red" }}>
						<CallIcon color="red" />
					</IconButton>
				</Link>
				<IconButton onClick={handleCameraClick} sx={{ color: "white" }}>
					{cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
				</IconButton>
				<IconButton sx={{ color: "white" }}>
					<SettingsPopUp />
				</IconButton>
			</Box>
		</>
	);
};

export default MeetingControls;
