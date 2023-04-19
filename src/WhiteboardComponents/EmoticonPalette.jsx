import {
	Popover,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { InsertEmoticon } from "@mui/icons-material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { AddReaction } from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";

export default function EmoticonPalette() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const id = open ? "simple-popover" : undefined;

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
		setOpen(false);
	};

	const handleEmojiClick = (_, emojiObject) => {
		console.log(emojiObject);
		handlePopoverClose();
	};
	return (
		<div>
			<AddReaction onClick={handlePopoverOpen} />
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handlePopoverClose}
				anchorReference="anchorPosition"
				anchorPosition={{ top: 750, left: 800 }} // change this to the desired position
			>
				<EmojiPicker theme="dark" onEmojiClick={handleEmojiClick} />
			</Popover>
		</div>
	);
}
