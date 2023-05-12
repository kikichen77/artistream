import React from "react";
import { expect } from "vitest";
import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Canvas from "../Canvas/Canvas";



test("properly adds two numbers", () => {
	expect(1 + 1).toBe(2);
});
test("Canvas", () => {
	it("renders without crashing", () => {
	render(<Canvas />);
	});
});
