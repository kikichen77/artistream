import { expect, test } from "vitest";
import SocketMock from "socket.io-mock";

let mockServer, clientSocket;

beforeAll(() => {
	mockServer = new SocketMock();
	clientSocket = mockServer.socketClient;
});

afterAll(() => {
	clientSocket = null;
	mockServer = null;
});

test("server store the roomdata", async () => {
	let room = {};
	clientSocket.on("user-connected", (userId) => {
		expect(userId).toBe("user123");
	});

	mockServer.on("join-room", (roomid, userid) => {
		expect(roomid).toBe("123456");
		expect(userid).toBe("user123");
		if (!room[roomid]) {
			room[roomid] = [];
			room[roomid].push(userid);
		}
		expect(room).toEqual({ [roomid]: [userid] });
		console.log(room);
		mockServer.emit("user-connected", userid);
	});
	clientSocket.emit("join-room", "123456", "user123");
});

test("check undo method on canvas", () => {
	let canvasData = { 1234567: [{ id: "654321", id: "789" }] };
	mockServer.on("undo", (data) => {
		expect(data.userId).toEqual("123456");
		expect(data.objectId).toEqual("654321");
		const index = canvasData["1234567"].findIndex((object) => {
			return object.id === data.objectId;
		});
		if (index !== -1) {
			canvasData["1234567"].splice(index, 1);
		}
		console.log(canvasData["1234567"]);
		expect(canvasData["1234567"]).toEqual([{ id: "789" }]);
	});
	clientSocket.emit("undo", { userId: "123456", objectId: "654321" });
});
