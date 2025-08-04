import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock environment variables
Object.defineProperty(import.meta, "env", {
    value: {
        VITE_SUPABASE_URL: "https://test.supabase.co",
        VITE_SUPABASE_ANON_KEY: "test-key",
    },
    writable: true,
});

// Set up global test environment
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
