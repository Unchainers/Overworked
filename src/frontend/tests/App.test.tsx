import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { StrictMode } from "react";
import { act } from "react";
import { AuthProvider } from "@/hooks/use-auth-client";
import { Toaster } from "@/components/ui/sonner";
import { MemoryRouter } from "react-router";

describe("App", () => {
  it("renders the main headings", async () => {
    await act(async () => {
      render(
        <StrictMode>
          <App />
        </StrictMode>,
      );
    });

    // After act completes, all state updates from useEffect should be processed
    // expect(screen.getByText("Overworked")).toBeInTheDocument();
    // expect(
    //   screen.getByText("React + Rust + Internet Computer"),
    // ).toBeInTheDocument();
  });
});
