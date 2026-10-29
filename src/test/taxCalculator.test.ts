import { describe, expect, it } from "vitest";
import { calculateAnnual } from "@/lib/taxCalculator";

describe("tax calculator baseline", () => {
  it("uses a full 12-month year", () => {
    const result = calculateAnnual(10000, 0.12);
    expect(result.ryczalt.annualNet).toBeCloseTo(result.ryczalt.net * 12);
  });
  it("reflects different ryczalt rates", () => {
    expect(calculateAnnual(10000, 0.17).ryczalt.tax).toBeGreaterThan(calculateAnnual(10000, 0.03).ryczalt.tax);
  });
  it("accounts for expenses in both net outcomes", () => {
    expect(calculateAnnual(10000, 0.12, 24000).ryczalt.annualNet).toBeLessThan(calculateAnnual(10000, 0.12, 0).ryczalt.annualNet);
  });
});
