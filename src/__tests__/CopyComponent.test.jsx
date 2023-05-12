import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CopyID from "../Components/CopyComponent";

test("CopyID", () => {
	render(<CopyID />);
});
