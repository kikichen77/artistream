import React from "react";
import Box from "@mui/material/Box";
import CallIcon from "@mui/icons-material/Call";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MicIcon from "@mui/icons-material/Mic";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import HomeIcon from "@mui/icons-material/Home";
import SettingsPopUp from "./SettingsPopUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useState } from "react";
import { IconButton } from "@mui/material";

const MeetingControls = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [isMute, setMute] = useState(true);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Box
				sx={{
					"& > :not(style)": {
						m: 5,
					},
					backgroundColor: "rgb(37, 42, 69)",
					borderRadius: "20px",
					position: "absolute",
					width: "83%",
					bottom: 0,
					left: 0,
					right: 0,
					display: "flex",
					marginLeft: "auto",
					marginRight: "30px",
					marginBottom: "30px",
					padding: "10px",
					justifyContent: "center",
					color: "white",
				}}
			>
				<ArrowDropUpIcon onClick={handleClick} />

				<HomeIcon />
				<AddReactionIcon />
				<PersonAddAlt1Icon />
				<CallIcon color="red" />
				<MicIcon onClick={() => setMute(!isMute)}>
					{isMute ? <MicIcon /> : <MicOffIcon />}
				</MicIcon>
				<CameraAltIcon />
				<SettingsPopUp />
			</Box>
		</>
	);
};

export default MeetingControls;
