import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("renders button text", () => {
    render(<Button>Press me</Button>);
    const buttonElement = screen.getByText("Press me");
    expect(buttonElement).toBeTruthy();
  });
});
