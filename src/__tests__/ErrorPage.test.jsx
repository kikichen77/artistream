import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorPage from "../ErrorPage";

test("ErrorPage", () => {
	it("renders without crashing", () => {
		render(<ErrorPage />);
	});
});

