import React from "react";
import { render } from "@testing-library/react";
import Room from "../Components/VideoComponent";

test("Room", () => {
	it("renders without crashing", () => {
		render(<Room />);
	});
});
