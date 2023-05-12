import React from "react";
import { render } from "@testing-library/react";
import ErrorPage from "../ErrorPage";

test("ErrorPage", () => {
	it("renders without crashing", () => {
		render(<ErrorPage />);
	});
});

