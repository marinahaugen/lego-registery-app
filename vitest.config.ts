import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom", // This provides a DOM environment
        setupFiles: ["./src/test-setup.ts"],
        globals: true,
    },
});
