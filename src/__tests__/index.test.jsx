// // import { createServer } from "http";
// // import { Server } from "socket.io";
// // import Client from "socket.io-client";
// // import {test, beforeAll, afterAll} from "vitest";

// // describe("my awesome project", () => {
// // 	let io, serverSocket, clientSocket;

// // 	beforeAll((done) => {
// // 		const httpServer = createServer();
// // 		io = new Server(httpServer);
// // 		httpServer.listen(3000,() => {
// // 			// const port = httpServer.address().port;
// // 			clientSocket = new Client(`http://localhost:3000`);
// // 			io.on("connection", (socket) => {
// // 				serverSocket = socket;
// // 			});
// // 			clientSocket.on("connect", done);
// // 		});
// // 	});

// // 	afterAll(() => {
// // 		io.close();
// // 		clientSocket.close();
// // 	});

// // 	test("should work", (done) => {
// // 		clientSocket.on("hello", (arg) => {
// // 			expect(arg).toBe("world");
// // 			done();
// // 		});
// // 		serverSocket.emit("hello", "world");
// // 	});

// // 	test("should work (with ack)", (done) => {
// // 		serverSocket.on("hi", (cb) => {
// // 			cb("hola");
// // 		});
// // 		clientSocket.emit("hi", (arg) => {
// // 			expect(arg).toBe("hola");
// // 			done();
// // 		});
// // 	});
// // });
// import { fireEvent } from "@testing-library/react";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import Client from "socket.io-client";
// import { test, beforeAll, afterAll } from "vitest";

// describe("Socket Room Joining", () => {
// 	let io, serverSocket, clientSocket;

// 	// beforeAll(() => {
// 	// 		return new Promise((resolve) => {
// 	// 			const httpServer = createServer();
// 	// 			io = new Server(httpServer);
// 	// 			httpServer.listen(3000, () => {
// 	// 				clientSocket = new Client("http://localhost:3000");
// 	// 				io.on("connection", (socket) => {
// 	// 					serverSocket = socket;
// 	// 					resolve();
// 	// 				});
// 	// 			});
// 	// 		});
// 	// 	});

// 	beforeAll((done) => {
// 		const httpServer = createServer();
// 		io = new Server(httpServer);

// 		io.on("connection", (socket) => {
// 			serverSocket = socket;
// 			clientSocket.on("connect", done);
// 		});

// 		httpServer.listen(3000, () => {
// 			clientSocket = new Client("http://localhost:3000");
// 		});
// 	});
// 	afterAll(() => {
// 		io.close();
// 		clientSocket.close();
// 	});

// 	test("should join a room and emit user-connected event", (done) => {
// 		const roomId = "room1";
// 		const userId = "user1";
// 		console.log("roomId", roomId);
// 		clientSocket.emit("join-room", roomId, userId);

// 		// Mock the user-connected event
// 		// fireEvent(clientSocket, "join-room", userId);
// 		io.on("connection", (socket) => {
// 			console.log("roomId", roomId);
// 			socket.on("join-room", (recievedRoomId, recievedUserId) => {
// 				console.log("recievedRoomId", recievedRoomId);
// 				expect(recievedRoomId).not.to.equal(userId);
// 				expect(recievedUserId).not.to.equal(userId);
// 				// Emit user-connected event from server after user has joined the room
// 				socket.emit("user-connected", recievedUserId);
// 				console.log("recievedUserId", recievedUserId);
// 			});
// 		});
// 		clientSocket.on("user-connected", (recievedUserId) => {
// 			expect(recievedUserId).not.toEqual(userId);
// 			done();
// 		});

// 		// Emit the join-room event
// 		// serverSocket.emit("join-room", roomId, userId);
// 	});
// });
import { createServer } from "http";
import { Server } from "socket.io";
import Client from "socket.io-client";
import { test, beforeAll, afterAll } from "vitest";
import { expect } from "chai";

describe("Socket Room Joining", () => {
	let io, serverSocket, clientSocket;

	beforeAll((done) => {
		const httpServer = createServer();
		io = new Server(httpServer);
		httpServer.listen(3100, () => {
			clientSocket = new Client("http://localhost:3100");
			
			io.on("connection", (socket) => {
				serverSocket = socket;
				console.log("serverSocket", serverSocket);
				serverSocket.on("join-room", (roomId, userId) => {
					console.log("roomId", roomId);
					serverSocket.emit("user-connected", userId);
				});
			});
			clientSocket.on("connect", done);
		});
	});

	afterAll(() => {
		io.close();
		clientSocket.close();
	});

	test("should join a room and emit user-connected event", (done) => {
		const roomId = "room1";
		const userId = "user1";
		clientSocket.emit("join-room", roomId, userId);

		clientSocket.on("user-connected", (connectedUserId) => {
			expect(connectedUserId).to.equal(userId);
			done();
		});
	});
});