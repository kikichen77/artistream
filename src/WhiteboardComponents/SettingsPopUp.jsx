import * as React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

const SettingsPopUp = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
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
				sx={{ width: 320, maxWidth: "100%" }}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
				<Paper sx={{ width: 320, maxWidth: "100%" }}>
					<MenuList>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<ContentCut fontSize="small" />
							</ListItemIcon>
							<ListItemText>Cut</ListItemText>
							<Typography variant="body2" color="text.secondary">
								⌘X
							</Typography>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<ContentCopy fontSize="small" />
							</ListItemIcon>
							<ListItemText>Copy</ListItemText>
							<Typography variant="body2" color="text.secondary">
								⌘C
							</Typography>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<ContentPaste fontSize="small" />
							</ListItemIcon>
							<ListItemText>Paste</ListItemText>
							<Typography variant="body2" color="text.secondary">
								⌘V
							</Typography>
						</MenuItem>
						<Divider />
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<Cloud fontSize="small" />
							</ListItemIcon>
							<ListItemText>Web Clipboard</ListItemText>
						</MenuItem>
					</MenuList>
				</Paper>
			</Menu>
		</>
	);
};

export default SettingsPopUp;
