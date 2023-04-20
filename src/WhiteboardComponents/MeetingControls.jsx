import React from "react";
import Box from "@mui/material/Box";
import CallIcon from "@mui/icons-material/Call";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import SettingsPopUp from "./SettingsPopUp";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useState } from "react";
import { IconButton } from "@mui/material";
import EmoticonPalette from "./EmoticonPalette";

const MeetingControls = () => {
	const [isMute, setMute] = useState(false);
	const [isCamOn, setCamOn] = useState(false);

	const handleMicIconClick = () => {
		setMute(!isMute);
	};
	const handleCamIconClick = () => {
		setCamOn(!isCamOn);
	};

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
					padding: "10px",
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					color: "white",
					position: "relative",
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
				<IconButton sx={{ color: "white" }}>
					<PersonAddAlt1Icon />
				</IconButton>
				<IconButton sx={{ color: "white" }}>
					<CallIcon color="red" />
				</IconButton>
				<IconButton onClick={handleMicIconClick} sx={{ color: "white" }}>
					{isMute ? <MicOffIcon /> : <MicIcon />}
				</IconButton>
				<IconButton onClick={handleCamIconClick} sx={{ color: "white" }}>
					{isCamOn ? <VideocamIcon /> : <VideocamOffIcon />}
				</IconButton>
				<IconButton sx={{ color: "white" }}>
					<SettingsPopUp />
				</IconButton>
			</Box>
		</>
	);
};

export default MeetingControls;
