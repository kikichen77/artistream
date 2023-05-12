const express = require("express");
const app = express();
const cors = require('cors');
const server = require("http").Server(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:5173",
	},
});

app.use(cors());
//key:socket.id  value:user.id
const userMap = new Map();

//store the canvas data
let canvasData = {};

//store the roomnumber and users data
let room={};
let usernameList={}

app.get('/room/:roomid',(req,res)=>{
	const {roomid}=req.params;
	if(!room[roomid]){
		return res.send({roomExist:false})
	}else if(room[roomid].length>7){
		return res.send({roomExist:true,roomFull:true})
	}else{
		return res.send({roomExist:true,roomFull:false})
	}
})
io.on("connection", (socket) => {
	socket.on("message", (data) => {
		io.in(socket.roomId).emit("messageResponse", data);
	});

	socket.on("join-room", (roomId, userId) => {
		socket.join(roomId);
		
		if(!room[roomId]){
			room[roomId]=[]
			room[roomId].push(userId)
		}else{
			room[roomId].push(userId)
		}
		
		userMap.set(socket.id,userId)
	
		socket.roomId = roomId;
		
		socket.to(roomId).emit("user-connected", userId);
		//init canvas data
		if (canvasData[roomId]) {
			socket.emit("init-canvas", canvasData[roomId]);
		} else {
			canvasData[roomId] = [];
		}

	});
	socket.on("disconnect", () => {
		socket.leave(socket.roomId)
		const userId = userMap.get(socket.id);
		if(room[socket.roomId].length==1){
			delete room[socket.roomId]	
			userMap.delete(socket.id)
		}else{
			room[socket.roomId]=room[socket.roomId].filter((r)=>r!==userId)
			userMap.delete(socket.id)
			socket.to(socket.roomId).emit("user-disconnected", userId);

		}
	});
	//canvas backend
	socket.on("canvas-data", (data) => {
		canvasData[socket.roomId].push(data);
		socket.to(socket.roomId).emit("canvas-data", data);
	});
	socket.on("add-rectangle", (data) => {
		canvasData[socket.roomId].push(data);
		socket.to(socket.roomId).emit("add-rectangle", data);
	});

	socket.on("add-circle", (data) => {
		canvasData[socket.roomId].push(data);
		socket.to(socket.roomId).emit("add-circle", data);
	});

	socket.on("add-triangle", (data) => {
		canvasData[socket.roomId].push(data);
		socket.to(socket.roomId).emit("add-triangle", data);
	});

	socket.on("add-text", (data) => {
		canvasData[socket.roomId].push(data);
		socket.to(socket.roomId).emit("add-text", data);
	});

	socket.on("text-updated", (data) => {
		const index = canvasData[socket.roomId].findIndex(
			(obj) => obj.id === data.id
		);
		if (index !== -1) {
			canvasData[socket.roomId][index].text = data.text;
		}
		socket.to(socket.roomId).emit("text-updated", data);
	});

	socket.on("undo", (data) => {
		const index = canvasData[socket.roomId].findIndex((object) => {
			return object.id === data.objectId;
		});
		if (index !== -1) {
			canvasData[socket.roomId].splice(index, 1);
		}
		socket.to(socket.roomId).emit("undo", data);
	});

	socket.on("clear", () => {
		canvasData[socket.roomId] = [];
		socket.to(socket.roomId).emit("clear");
	});

	socket.on("object-moving", (data) => {
		const index = canvasData[socket.roomId].findIndex((obj) => {
			return obj.id === data.id;
		});
		if (index != -1) {
			canvasData[socket.roomId][index].top = data.top;
			canvasData[socket.roomId][index].left = data.left;
		}
		console.log(data)
		socket.to(socket.roomId).emit("object-moving", data);
	});

	
	socket.on("object-scaling", (data) => {
		const index = canvasData[socket.roomId].findIndex((obj) => {
			return obj.id === data.id;
		});
		if (index != -1) {
			canvasData[socket.roomId][index].scaleX = data.scaleX;
			canvasData[socket.roomId][index].scaleY = data.scaleY;
			canvasData[socket.roomId][index].top = data.top;
			canvasData[socket.roomId][index].left = data.left;
			canvasData[socket.roomId][index].angle = data.angle;
			canvasData[socket.roomId][index].flipY = data.flipY;
		}
		socket.to(socket.roomId).emit("object-scaling", data);
	});
	socket.on("object-rotating", (data) => {
		const index = canvasData[socket.roomId].findIndex((obj) => {
			return obj.id === data.id;
		});
		if (index != -1) {
			canvasData[socket.roomId][index].scaleX = data.scaleX;
			canvasData[socket.roomId][index].scaleY = data.scaleY;
			canvasData[socket.roomId][index].top = data.top;
			canvasData[socket.roomId][index].left = data.left;
			canvasData[socket.roomId][index].angle = data.angle;
		}
		socket.to(socket.roomId).emit("object-rotating", data);
	});

	socket.on("canvas-resize", (data) => {
		socket.to(socket.roomId).emit("canvas-resize", data);
	});
});

server.listen(3000, () => {
	console.log(`Server listening on 3000`);
});
