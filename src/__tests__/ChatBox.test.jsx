import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChatBox from "../Chat/ChatBox";

test("ChatBox", () => {
	it("renders without crashing", () => {
		render(<ChatBox />);
	});
});
