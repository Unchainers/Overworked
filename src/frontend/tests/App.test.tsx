import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { StrictMode } from "react";
import { act } from "react";
import { AuthProvider } from "@/hooks/use-auth-client";
import { Toaster } from "@/components/ui/sonner";

describe("App", () => {
  it("renders the main headings", async () => {
    await act(async () => {
      render(
        <StrictMode>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </StrictMode>,
      );
    });

    // After act completes, all state updates from useEffect should be processed
    expect(screen.getByText("Vibe Coding Template")).toBeInTheDocument();
    expect(
      screen.getByText("React + Rust + Internet Computer"),
    ).toBeInTheDocument();
  });
});
