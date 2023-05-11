import { Box } from "@mui/material";
import React, { useRef, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import styles from "./ToolsStyles.module.css"

const Canvas = ({ socket, theme }) => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);

	let canvas = null;
	// Extend fabric.Object.prototype.toObject to include the 'id' property
	fabric.Object.prototype.toObject = (function (toObject) {
		return function () {
			return fabric.util.object.extend(toObject.call(this), {
				id: this.id,
			});
		};
	})(fabric.Object.prototype.toObject);
	// Extend fabric.circle include id and radius property
	fabric.Circle.prototype.toObjectWithRadius = function () {
		const baseObject = this.toObject();
		return {
			...baseObject,
			id: this.id,
			radius: this.radius,
		};
	};
	// Extend fabric.IText include id and text property
	fabric.IText.prototype.toObjectText = function () {
		const baseObject = this.toObject();
		return {
			...baseObject,
			id: this.id,
			fontFamily: this.fontFamily,
			fontSize: this.fontSize,
			text: this.text,
		};
	};

	useEffect(() => {
		const container = containerRef.current;
		const { width } = container.getBoundingClientRect();

		canvas = new fabric.Canvas(canvasRef.current, {
			width,
		});
		
canvas.selection = false;

		canvas.freeDrawingBrush.width = 5;
		//init canvas data
		socket.on(
			"init-canvas",
			(data) => {
				setTimeout(() => {
					data.forEach((objectData) => {
						const klass = fabric.util.getKlass(objectData.type);
						klass.fromObject(objectData, (obj) => {
							canvas.add(obj);
						});
					});
				});
			},
			1000
		);

		canvas.on("object:added", (e) => {
			console.log("Object added");
		});

		canvas.on("object:moving", function (e) {
			const obj= e.target	
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
				
				const movingData = {
					id: obj.id,
					top: obj.top,
					left: obj.left,
				};
				console.log(movingData)
				socket.emit("object-moving", movingData);
			
			
		
		});
		
		
		canvas.on("object:rotating", function (e) {
			const obj = e.target;
			const rotatingData = {
				id: obj.id,
				angle: obj.angle,
				scaleX: obj.scaleX,
				scaleY: obj.scaleY,
				left: obj.left,
				top: obj.top,
				flipY: obj.flipY,
			};
			socket.emit("object-rotating", rotatingData);
		});

		socket.on("object-rotating", (data) => {
			const object = canvas.getObjects().find((obj) => obj.id === data.id);
			if (object) {
				object.set({
					scaleX: data.scaleX,
					scaleY: data.scaleY,
					left: data.left,
					top: data.top,
					angle: data.angle,
					flipY: data.flipY,
				});
				canvas.renderAll();
			}
		});

		socket.on("object-moving", (data) => {
			console.log(data)
			const object = canvas.getObjects().find((obj) => obj.id === data.id);
			if (object) {
				object.set({
					left: data.left,
					top: data.top,
				});
				canvas.renderAll();
			}
		});
	
	
		const handleCanvasChange = (e) => {
			const path = e.path || e.target;
			path.id = uuidv4();
			const pathData = path.toObject();
			socket.emit("canvas-data", pathData);
		};

		canvas.on("path:created", handleCanvasChange);
		socket.on("clear", () => {
			canvas.clear();
		});

		socket.on("canvas-data", (data) => {
			const path = new fabric.Path(data.path);
			path.set({ ...data });
			path.id = data.id;
			canvas.add(path);
			canvas.renderAll();
		});

		socket.on("add-rectangle", (data) => {
			const rect = new fabric.Rect(data);
			canvas.add(rect);
		});

		socket.on("add-circle", (data) => {
			const circle = new fabric.Circle(data);
			canvas.add(circle);
		});
		socket.on("add-triangle", (data) => {
			const triangle = new fabric.Triangle(data);
			canvas.add(triangle);
		});
		socket.on("undo", (data) => {
			const object = canvas
				.getObjects()
				.find((obj) => obj.id === data.objectId);
			console.log(canvas.getObjects());
			console.log(data.objectId);

			if (object) {
				canvas.remove(object);
				canvas.renderAll();
			}
		});

		socket.on("add-text", (data) => {
			const text = new fabric.IText("", data);
			canvas.add(text);
		});
		socket.on("text-updated", (data) => {
			const textObject = canvas.getObjects().find((obj) => obj.id === data.id);
			if (textObject) {
				textObject.set("text", data.text);
				canvas.renderAll();
			}
		});

		socket.on("clear", () => {
			canvas.clear();
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
			const scalingData = {
				id: obj.id,
				angle: obj.angle,
				scaleX: obj.scaleX,
				scaleY: obj.scaleY,
				left: obj.left,
				top: obj.top,
				flipY: obj.flipY,
			};
			console.log(scalingData);
			socket.emit("object-scaling", scalingData);
		});

		socket.on("object-scaling", (data) => {
			const object = canvas.getObjects().find((obj) => obj.id === data.id);
			if (object) {
				object.set({
					scaleX: data.scaleX,
					scaleY: data.scaleY,
					left: data.left,
					top: data.top,
					angle: data.angle,
					flipY: data.flipY,
				});

				canvas.renderAll();
			}
		});

		const handleWindowResize = () => {
			const { width } = container.getBoundingClientRect();
			canvas.setDimensions({ width });
			socket.emit("canvas-resize", { width });
		};

		window.addEventListener("resize", handleWindowResize);
		return () => {
			canvas.dispose();
			canvas = null;
		};
	}, []);
	socket.on("canvas-resize", (data) => {
		canvas.setDimensions({ width: data.width });
	});

	const handleUndo = () => {
		const objects = canvas.getObjects();
		if (objects.length > 0) {
			const lastObject = objects[objects.length - 1];
			//console.log('Last object:', lastObject);
			canvas.remove(lastObject);
			//const undoData = { userId: socket.id, objectId: lastObject.id };
			// console.log('Sending undo data:', undoData);
			socket.emit("undo", { userId: socket.id, objectId: lastObject.id });
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
		socket.emit("clear");
	};
	const handleAddText = () => {
		const text = new fabric.IText("Type text here", {
			left: 50,
			top: 50,
			fontFamily: "Arial",
			fontSize: 16,
			fill: "#000000",
			id: uuidv4(),
		});
		//default value
		text.set("text", "Type text here");
		canvas.add(text);
		canvas.setActiveObject(text);
		text.enterEditing();
		text.on("changed", () => {
			const newValue = text.text;
			socket.emit("text-updated", { id: text.id, text: newValue });
		});

		socket.emit("add-text", text.toObjectText());
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
			id: uuidv4(),
		});
		canvas.add(rect);
		socket.emit("add-rectangle", rect.toObject());
	};
	const handleAddCircle = () => {
		const circle = new fabric.Circle({
			left: 100,
			top: 100,
			fill: "transparent",
			stroke: "black",
			strokeWidth: 2,
			radius: 50,
			id: uuidv4(),
		});
		canvas.add(circle);
		socket.emit("add-circle", circle.toObjectWithRadius());
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
			id: uuidv4(),
		});
		canvas.add(triangle);
		socket.emit("add-triangle", triangle.toObject());
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
				backgroundColor: `${theme ? "rgb(132, 132, 143)" : "rgb(37, 42, 69)"}`,
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
						height={700}
						style={{
							width: "100%",
							borderRadius: "20px",
						}}
					/>
				</div>
				<div className={styles.toolArea}>
					<button
						onClick={handleAddRectangle}
						className={styles.toolButton}
					>
						Add Rectangle
					</button>
					<button
						onClick={handleAddCircle}
						className={styles.toolButton}
					>
						Add Circle
					</button>
					<button
						onClick={handleAddTriangle}
						className={styles.toolButton}
					>
						Add Triangle
					</button>
					<button
						onClick={handleUndo}
						className={styles.toolButton}
					>
						Undo
					</button>
					<button
						onClick={handleDraw}
						className={styles.toolButton}
					>
						Draw
					</button>
					<button
						onClick={handleSelector}
						className={styles.toolButton}
					>
						Selector
					</button>
					
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
						className={styles.brushColourChange}
					/>

					<button
						onClick={handleClear}
						className={styles.toolButton}
					>
						Clear
					</button>
					<button
						onClick={handleAddText}
						className={styles.toolButton}
					>
						Add Text
					</button>

					<button
						onClick={handleSaveImage}
						className={styles.toolButton}
					>
						Save Image
					</button>
					<button
						onClick={handleExportAsPDF}
						className={styles.toolButton}
					>
						Export as PDF
					</button>
				</div>
			</div>
		</Box>
	);
};

export default Canvas;
