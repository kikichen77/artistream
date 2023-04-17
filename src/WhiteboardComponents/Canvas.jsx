import { Box } from "@mui/material";
import React, { useRef, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { fabric } from "fabric";

const Canvas = () => {
	const canvasRef = useRef(null);
	let canvas = null;

	useEffect(() => {
		canvas = new fabric.Canvas(canvasRef.current);
		canvas.isDrawingMode = true;
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

	const handleErase = () => {
		canvas.isDrawingMode = !canvas.isDrawingMode;
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
		<Box sx={{ display: "flex", justifyContent: "flex-end", height: "100vh" }}>
			<Box
				sx={{
					backgroundColor: "rgb(37, 42, 69)",
					borderRadius: "20px",
					width: "84%",
					height: "70%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginRight: "30px",
					marginTop: "30px",
				}}
			>
				<div>
					<canvas ref={canvasRef} width={800} height={800} />
					<button onClick={handleAddRectangle}>Add Rectangle</button>
					<button onClick={handleAddCircle}>Add Circle</button>
					<button onClick={handleAddTriangle}>Add Triangle</button>
					<button onClick={handleUndo}>Undo</button>
					<button onClick={handleErase}>Erase</button>
					<button onClick={handleAddText}>Add Text</button>
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
					/>
					<button onClick={handleSaveImage}>Save Image</button>
					<button onClick={handleExportAsPDF}>Export as PDF</button>
				</div>
			</Box>
		</Box>
	);
};

export default Canvas;
