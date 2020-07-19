import React from "react";
import { render, } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from './index'


describe ("login page", ()=> {

test("Input shows on renderization", () => {
const { getByPlaceholderText } = render(<LoginPage />);
const input = getByPlaceholderText(/email@email.com/);
expect(input).toBeInTheDocument()
});

test("Input password shows on renderization", () => {
const { getByPlaceholderText } = render(<LoginPage />);
const input = getByPlaceholderText(/senha/);
expect(input).toBeInTheDocument()
});

})

