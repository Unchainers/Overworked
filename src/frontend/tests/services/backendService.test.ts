import { describe, it, expect, vi, beforeEach } from "vitest";
import { sharedService } from "../../src/services/sharedService";
import { shared } from "../../../declarations/shared";

// Mock the backend canister
vi.mock("../../../declarations/shared", () => ({
  shared: {
    greet: vi.fn().mockResolvedValue("Hello, Test User!"),
    get_count: vi.fn().mockResolvedValue(BigInt(42)),
    increment: vi.fn().mockResolvedValue(BigInt(43)),
    prompt: vi.fn().mockResolvedValue("This is a mock LLM response"),
  },
}));

describe("sharedService", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe("greet", () => {
    it("should call shared.greet with the provided name", async () => {
      // Execute
      const result = await sharedService.greet("Test User");

      // Assert
      expect(shared.greet).toHaveBeenCalledWith("Test User");
      expect(result).toBe("Hello, Test User!");
    });
  });

  describe("getCount", () => {
    it("should call shared.get_count", async () => {
      // Execute
      const result = await sharedService.getCount();

      // Assert
      expect(shared.get_count).toHaveBeenCalled();
      expect(result).toBe(BigInt(42));
    });
  });

  describe("incrementCounter", () => {
    it("should call backend.increment", async () => {
      // Execute
      const result = await sharedService.incrementCounter();

      // Assert
      expect(shared.increment).toHaveBeenCalled();
      expect(result).toBe(BigInt(43));
    });
  });

  describe("sendLlmPrompt", () => {
    it("should call backend.prompt with the provided prompt", async () => {
      // Execute
      const result = await sharedService.sendLlmPrompt("Test prompt");

      // Assert
      expect(shared.prompt).toHaveBeenCalledWith("Test prompt");
      expect(result).toBe("This is a mock LLM response");
    });
  });
});
