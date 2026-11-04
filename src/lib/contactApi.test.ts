import { describe, expect, it, vi } from "vitest";
// The Vercel handler is plain JavaScript outside the TypeScript source tree.
// @ts-expect-error no TypeScript declaration for the serverless JavaScript entrypoint
import handler from "../../api/contact.js";

function invoke(body: Record<string, unknown>, method = "POST") {
  let code = 200;
  let payload: Record<string, unknown> = {};
  const req = { method, headers: { origin: "https://finbizcentrum.pl", host: "finbizcentrum.pl" }, body };
  const res = {
    setHeader: vi.fn(),
    status(value: number) { code = value; return this; },
    json(value: Record<string, unknown>) { payload = value; return this; },
  };
  return Promise.resolve(handler(req, res)).then(() => ({ code, payload }));
}

describe("FINBIZ contact endpoint validation", () => {
  it("rejects missing consent", async () => {
    const result = await invoke({ name: "Jan", phone: "511183644", type: "JDG", privacyAccepted: false });
    expect(result.code).toBe(422);
  });
  it("rejects invalid email", async () => {
    const result = await invoke({ name: "Jan", phone: "511183644", type: "JDG", privacyAccepted: true, email: "not-an-email" });
    expect(result.code).toBe(422);
  });
  it("rejects invalid phone", async () => {
    const result = await invoke({ name: "Jan", phone: "abcdef", type: "JDG", privacyAccepted: true });
    expect(result.code).toBe(422);
  });
  it("rejects unsupported methods", async () => {
    const result = await invoke({}, "GET");
    expect(result.code).toBe(405);
  });
  it("rejects requests from an unexpected origin", async () => {
    let code = 200;
    const req = { method: "POST", headers: { origin: "https://attacker.example", host: "finbizcentrum.pl" }, body: { name: "Jan", phone: "511183644", type: "JDG", privacyAccepted: true } };
    const res = { setHeader: vi.fn(), status(value: number) { code = value; return this; }, json: vi.fn() };
    await handler(req, res);
    expect(code).toBe(403);
  });
  it("silently accepts honeypot submissions without sending mail", async () => {
    const result = await invoke({ website: "spam.example" });
    expect(result.code).toBe(200);
    expect(result.payload.ok).toBe(true);
  });
});
