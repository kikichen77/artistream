import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChatBody from "../Chat/ChatBody";

test("ChatBody", () => {
	it("renders without crashing", () => {
		render(<ChatBody />);
	});
});
