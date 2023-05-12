import React from "react";
import { render } from "@testing-library/react";
const { MemoryRouter } = require("react-router-dom");
import { it } from "vitest";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

test("App", () => {
	it("renders without crashing", () => {
		render(<App />);
	});
});

/**
 * Tests that, when the current path is /home, the homepage is rendered.
 */
it("renders connect page correctly", () => {
	// React Router gives us a MemoryRouter to work with, when testing code involving Routes, Links, or NavLinks.
	// It contains an initialEntries prop which we can use to supply the initial browser history stack, therefore we can simulate starting
	// the page off at any desired URL.
	const { getByPlaceholderText, getByText } = render(
		<MemoryRouter initialEntries={["/connect"]}>
			<App />
		</MemoryRouter>
	);

	// "Testing Fields in respective pages"
	expect(getByPlaceholderText("Enter room ID")).toBeInTheDocument();
	expect(getByPlaceholderText("Enter username")).toBeInTheDocument();

	expect(getByText("Join Room")).toBeInTheDocument();
});

it("renders error page correctly", () => {
	const { getByPlaceholderText, getByText } = render(
		<MemoryRouter initialEntries={["/error"]}>
			<App />
		</MemoryRouter>
	);

	// "Testing Fields in respective pages"
	expect(getByText("Oops!")).toBeInTheDocument();
});
