import React from "react";
import { expect } from "vitest";
import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Room from "../Components/VideoComponent";


test("Room", () => {
	it("renders without crashing", () => {
		render(<Room />);
	});
});

