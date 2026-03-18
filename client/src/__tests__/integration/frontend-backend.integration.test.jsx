import { createRequire } from "module";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import App from "../../App";

const require = createRequire(import.meta.url);
const app = require("../../../../server/src/app");

let server;
let originalApiUrl;

beforeAll(async () => {
  originalApiUrl = import.meta.env.VITE_API_URL;

  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });

  const { port } = server.address();
  import.meta.env.VITE_API_URL = `http://127.0.0.1:${port}`;
});

afterAll(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

  if (originalApiUrl === undefined) {
    delete import.meta.env.VITE_API_URL;
  } else {
    import.meta.env.VITE_API_URL = originalApiUrl;
  }
});

afterEach(() => {
  cleanup();
});

describe("Frontend + Backend integration", () => {
  it("loads health data from the running backend service", async () => {
    render(<App />);

    expect(screen.getByText(/Loading backend status/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("ok")).toBeInTheDocument();
    });

    expect(
      screen.getByText(/ShopSmart Backend is running/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Loading backend status/i),
    ).not.toBeInTheDocument();
  });
});
