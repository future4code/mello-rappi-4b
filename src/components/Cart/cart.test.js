import React from "react";
import { render, wait, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
afterEach(cleanup);
