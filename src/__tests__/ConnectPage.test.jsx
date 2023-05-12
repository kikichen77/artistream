import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import ConnectPage from "../ConnectPage";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let mock;

beforeAll(() => {
	mock = new MockAdapter(axios);
});

afterEach(() => {
	mock.reset();
});

test("checkRoom function", async () => {
	const roomId = "12345";

	// Define the expected response data
	const responseData = {
		roomExist: true,
		roomFull: false,
	};

	// Configure the mock to return the expected response
	mock.onGet(`http://localhost:3000/room/${roomId}`).reply(200, responseData);

	render(
		<Router>
			<ConnectPage />
		</Router>
	);
	const usernameInput = screen.getByPlaceholderText("Enter username");
	const roomIdInput = screen.getByPlaceholderText("Enter room ID");
	const joinButton = screen.getByText("Join Room");

	fireEvent.change(usernameInput, { target: { value: "TestUser" } });
	fireEvent.change(roomIdInput, { target: { value: "12345" } });
	fireEvent.click(joinButton);
});

test("Room doesn't exist function", async () => {
	const roomId = "56789";

	// Define the expected response data
	const responseData = {
		roomExist: false,
		roomFull: true,
	};

	const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
	// Configure the mock to return the expected response
	mock.onGet(`http://localhost:3000/room/${roomId}`).reply(200, responseData);

	render(
		<Router>
			<ConnectPage />
		</Router>
	);
	const usernameInput = screen.getByPlaceholderText("Enter username");
	const roomIdInput = screen.getByPlaceholderText("Enter room ID");
	const joinButton = screen.getByText("Join Room");

	fireEvent.change(usernameInput, { target: { value: "TestUser" } });
	fireEvent.change(roomIdInput, { target: { value: "56789" } });
	fireEvent.click(joinButton);
	await waitFor(() => {
		expect(alertMock).toHaveBeenCalledWith("Check the right room number");
	});
	//Clear mock after test
	alertMock.mockRestore();
});

test("Room is full function", async () => {
	const roomId = "56789";

	// Define the expected response data
	const responseData = {
		roomExist: true,
		roomFull: true,
	};

	const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
	// Configure the mock to return the expected response
	mock.onGet(`http://localhost:3000/room/${roomId}`).reply(200, responseData);

	render(
		<Router>
			<ConnectPage />
		</Router>
	);
	const usernameInput = screen.getByPlaceholderText("Enter username");
	const roomIdInput = screen.getByPlaceholderText("Enter room ID");
	const joinButton = screen.getByText("Join Room");

	fireEvent.change(usernameInput, { target: { value: "TestUser" } });
	fireEvent.change(roomIdInput, { target: { value: "56789" } });
	fireEvent.click(joinButton);
	await waitFor(() => {
		expect(alertMock).toHaveBeenCalledWith("The room is full, please wait");
	});
	//Clear mock after test
	alertMock.mockRestore();
});
