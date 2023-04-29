import { Box } from "@mui/material";
import React, { useRef, useEffect, useLayoutEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { IconButton } from "@mui/material";
import { fabric } from "fabric";
import BackHandIcon from "@mui/icons-material/BackHand";

const Canvas = () => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);

	let canvas = null;

	useEffect(() => {
		const container = containerRef.current;
		const { width } = container.getBoundingClientRect();

		canvas = new fabric.Canvas(canvasRef.current, {
			width,
		});

		canvas.freeDrawingBrush.width = 5;

		canvas.on("object:added", () => {
			console.log("Object added");
		});
		canvas.on("object:moving", function (e) {
			const obj = e.target;
			// keep object inside canvas bounds
			if (
				obj.getBoundingRect().top < 0 ||
				obj.getBoundingRect().left < 0 ||
				obj.getBoundingRect().top + obj.getBoundingRect().height >
					canvas.getHeight() ||
				obj.getBoundingRect().left + obj.getBoundingRect().width >
					canvas.getWidth()
			) {
				obj.top = Math.min(
					Math.max(obj.top, obj.height / 2),
					canvas.getHeight() - obj.height / 2
				);
				obj.left = Math.min(
					Math.max(obj.left, obj.width / 2),
					canvas.getWidth() - obj.width / 2
				);
			}
		});

		canvas.on("object:scaling", function (e) {
			const obj = e.target;
			// keep object inside canvas bounds
			if (
				obj.getBoundingRect().top < 0 ||
				obj.getBoundingRect().left < 0 ||
				obj.getBoundingRect().top + obj.getBoundingRect().height >
					canvas.getHeight() ||
				obj.getBoundingRect().left + obj.getBoundingRect().width >
					canvas.getWidth()
			) {
				obj.scaleX = obj.lastScaleX || 1;
				obj.scaleY = obj.lastScaleY || 1;
			} else {
				obj.lastScaleX = obj.scaleX;
				obj.lastScaleY = obj.scaleY;
			}
		});
		const handleWindowResize = () => {
			const { width } = container.getBoundingClientRect();
			canvas.setDimensions({ width });
		};

		window.addEventListener("resize", handleWindowResize);
		return () => {
			canvas.dispose();
			canvas = null;
		};
	}, []);

	const handleUndo = () => {
		const objects = canvas.getObjects();
		if (objects.length > 0) {
			canvas.remove(objects[objects.length - 1]);
		}
	};
	const handleDraw = () => {
		canvas.isDrawingMode = true;
	};
	const handleSelector = () => {
		canvas.isDrawingMode = false;
	};
	const handleClear = () => {
		canvas.clear();
	};
	const handleAddText = () => {
		const text = new fabric.IText("Type text here", {
			left: 50,
			top: 50,
			fontFamily: "Arial",
			fontSize: 16,
			fill: "#000000",
		});

		canvas.add(text);
		canvas.setActiveObject(text);
		text.enterEditing();
	};

	const handleBrushSizeChange = (e) => {
		canvas.freeDrawingBrush.width = parseInt(e.target.value, 10);
	};
	const handleBrushColorChange = (e) => {
		canvas.freeDrawingBrush.color = e.target.value;
	};
	const handleAddRectangle = () => {
		const rect = new fabric.Rect({
			left: 100,
			top: 100,
			fill: "transparent",
			stroke: "black",
			strokeWidth: 2,
			width: 100,
			height: 100,
		});
		canvas.add(rect);
	};
	const handleAddCircle = () => {
		const circle = new fabric.Circle({
			left: 100,
			top: 100,
			fill: "transparent",
			stroke: "black",
			strokeWidth: 2,
			radius: 50,
		});
		canvas.add(circle);
	};

	const handleAddTriangle = () => {
		const triangle = new fabric.Triangle({
			left: 100,
			top: 100,
			fill: "transparent",
			stroke: "black",
			strokeWidth: 2,
			width: 100,
			height: 100,
		});
		canvas.add(triangle);
	};

	const handleSaveImage = () => {
		const dataURL = canvas.toDataURL();
		const link = document.createElement("a");
		link.download = "canvas.png";
		link.href = dataURL;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const handleExportAsPDF = () => {
		const dataUrl = canvas.toDataURL("image/jpeg");
		const docDefinition = {
			content: [
				{
					image: dataUrl,
					width: canvas.width / 4,
					height: canvas.height / 4,
				},
			],
		};
		pdfMake.createPdf(docDefinition).download("canvas.pdf");
	};

	return (
		<Box
			sx={{
				backgroundColor: "rgb(37, 42, 69)",
				borderRadius: "20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				marginRight: "20px",
			}}
		>
			<div
				style={{
					position: "relative",
					justifyContent: "center",
					alignItems: "center",
					width: "90%",
				}}
			>
				<div
					ref={containerRef}
					style={{
						borderRadius: "20px",
						marginTop: "10px",
						backgroundColor: "#ffffff",
					}}
				>
					<canvas
						ref={canvasRef}
						height={600}
						style={{
							width: "100%",

							borderRadius: "20px",
						}}
					/>
				</div>
				<div
					style={{
						backgroundColor: "rgb(37, 42, 69)",
						margin: "20px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<button
						onClick={handleAddRectangle}
						style={{
							borderRadius: "20px",
							backgroundColor: "darkgray",
							height: "35px",
							color: "white",
							margin: ".5vh",
						}}
					>
						Add Rectangle
					</button>
					<button
						onClick={handleAddCircle}
						style={{
							borderRadius: "20px",
							backgroundColor: "darkgray",
							height: "35px",
							width: "120px",
							color: "white",
							margin: "2px",
						}}
					>
						Add Circle
					</button>
					<button
						onClick={handleAddTriangle}
						style={{
							borderRadius: "20px",
							backgroundColor: "darkgray",
							height: "35px",
							color: "white",
							margin: "2px",
						}}
					>
						Add Triangle
					</button>
					<button
						onClick={handleUndo}
						style={{
							borderRadius: "20px",
							backgroundColor: "darkgray",
							height: "35px",
							color: "white",
							margin: "2px",
						}}
					>
						Undo
					</button>
					<button
						onClick={handleDraw}
						style={{
							borderRadius: "20px",
							backgroundColor: "darkgray",
							height: "35px",
							color: "white",
							margin: "2px",
						}}
					>
						Draw
					</button>
					<IconButton sx={{ color: "white" }} onClick={handleSelector}>
						<BackHandIcon />
					</IconButton>
					<input
						type="range"
						min="1"
						max="50"
						defaultValue="5"
						onChange={handleBrushSizeChange}
					/>
					<input
						type="color"
						defaultValue="#000000"
						onChange={handleBrushColorChange}
						style={{
							borderRadius: "10px",
							backgroundColor: "darkgray",
							width: "30px",
							color: "white",
							margin: "2px",
						}}
					/>

					<button
						onClick={handleClear}
						style={{
							borderRadius: "20px",
							backgroundColor: "darkgray",
							height: "35px",
							color: "white",
							margin: "2px",
						}}
					>
						Clear
					</button>
					<button
						onClick={handleAddText}
						style={{
							borderRadius: "20px",
							backgroundColor: "darkgray",
							height: "35px",
							color: "white",
							margin: "2px",
						}}
					>
						Add Text
					</button>

					<button
						onClick={handleSaveImage}
						style={{
							borderRadius: "20px",
							backgroundColor: "darkgray",
							height: "35px",
							color: "white",
							margin: "2px",
						}}
					>
						Save Image
					</button>
					<button
						onClick={handleExportAsPDF}
						style={{
							borderRadius: "20px",
							backgroundColor: "darkgray",
							height: "35px",
							color: "white",
							margin: "2px",
						}}
					>
						Export as PDF
					</button>
				</div>
			</div>
		</Box>
	);
};

export default Canvas;
