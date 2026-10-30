import {describe,it,expect} from "vitest";
import {calculateTax2026,type TaxInputs} from "@/lib/taxCalculator";
const base:TaxInputs={monthlyRevenue:10000,monthlyCosts:2000,ryczaltRate:0.12,zusMode:"full",chorobowe:true,months:12,additionalDeduction:0};
describe("2026 JDG estimator",()=>{
 it("returns three regimes",()=>expect(calculateTax2026(base).map(r=>r.regime)).toEqual(["skala","liniowy","ryczalt"]));
 it("uses twelve months",()=>expect(calculateTax2026(base)[0].annualRevenue).toBe(120000));
 it("uses official full ZUS amount",()=>expect(calculateTax2026(base)[0].social).toBeCloseTo(1926.76*12,2));
 it("changes social contributions without sickness insurance",()=>expect(calculateTax2026({...base,chorobowe:false})[0].social).toBeCloseTo(1788.29*12,2));
 it("selects middle ryczalt health band at 120k annual revenue",()=>expect(calculateTax2026(base)[2].health).toBeCloseTo(830.58*12,2));
 it("applies 2026 tax-free amount on skala",()=>expect(calculateTax2026({...base,monthlyRevenue:2000,monthlyCosts:0,zusMode:"start"})[0].pit).toBe(0));
 it("increases ryczalt tax when rate rises",()=>expect(calculateTax2026({...base,ryczaltRate:0.17})[2].pit).toBeGreaterThan(calculateTax2026({...base,ryczaltRate:0.03})[2].pit));
 it("does not produce negative PIT",()=>expect(calculateTax2026({...base,monthlyRevenue:0})[0].pit).toBe(0));
});
