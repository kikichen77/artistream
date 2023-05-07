import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { Margin, VolumeDown, VolumeUp } from "@mui/icons-material";
import { Slider } from "@mui/material";

const SettingsPopUp = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const [inputVolume, setInputVolume] = React.useState(30);
	const [outputVolume, setOutputVolume] = React.useState(50);

	const handleInputVolumeChange = (event, newValue) => {
		setInputVolume(newValue);
		const audioTracks = stream.getAudioTracks();
		audioTracks.forEach((track) => (track.volume = newValue / 100));
	};

	const handleOutputVolumeChange = (event, newValue) => {
		setOutputVolume(newValue);
		const audioElements = document.querySelectorAll("audio");
		audioElements.forEach((element) => (element.volume = newValue / 100));
	};
	return (
		<>
			<SettingsIcon
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			/>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				sx={{
					width: 320,
					maxWidth: "100%",
					marginLeft: "25px",
					marginTop: "-100px",
				}}
			>
				{/* <MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem> */}
				<Paper sx={{ width: 320, maxWidth: "100%", alignContent: "right" }}>
					<MenuList>
						<MenuItem>
							<ListItemIcon>
								<ListItemText primary="Input" />
								<VolumeDown />
							</ListItemIcon>
							<Slider
								value={inputVolume}
								onChange={handleInputVolumeChange}
								aria-labelledby="input-volume-slider"
								sx={{ width: "150px" }}
							/>
							<ListItemIcon>
								<VolumeUp />
							</ListItemIcon>
						</MenuItem>
						<MenuItem>
							<ListItemIcon>
								<ListItemText primary="Output" />
								<VolumeDown />
							</ListItemIcon>
							<Slider
								value={outputVolume}
								onChange={handleOutputVolumeChange}
								aria-labelledby="output-volume-slider"
								sx={{ width: "150px" }}
							/>
							<ListItemIcon>
								<VolumeUp />
							</ListItemIcon>
						</MenuItem>
						<Divider />
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<Margin fontSize="small" />
							</ListItemIcon>
							<ListItemText primary="Audio Source" />
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<Margin fontSize="small" />
							</ListItemIcon>
							<ListItemText primary="Video Source" />
						</MenuItem>
					</MenuList>
				</Paper>
			</Menu>
		</>
	);
};

export default SettingsPopUp;
