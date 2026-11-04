import {describe,it,expect} from "vitest";
import {calculateTax2026,type TaxInputs} from "./taxCalculatorV2";
const input:TaxInputs={monthlyRevenue:10000,monthlyCosts:2000,ryczaltRate:0.12,zusMode:"preferential",chorobowe:false,months:12,startMonth:1,additionalDeduction:0};
describe("2026 JDG calculator regression",()=>{
 it("returns all regimes and consistent totals",()=>{const out=calculateTax2026(input);expect(out.map(x=>x.regime)).toEqual(["skala","liniowy","ryczalt"]);for(const x of out){expect(x.annualRevenue).toBe(120000);expect(x.annualCosts).toBe(24000);expect(x.net).toBeCloseTo(x.annualRevenue-x.annualCosts-x.social-x.health-x.pit,2)}});
 it("respects the end of the calendar year",()=>{expect(calculateTax2026({...input,startMonth:11,months:12})[0].annualRevenue).toBe(20000)});
 it("has zero income tax when there is no revenue",()=>{for(const x of calculateTax2026({...input,monthlyRevenue:0,monthlyCosts:0}))expect(x.pit).toBe(0)});
 it("increases ryczalt PIT at a higher rate",()=>{expect(calculateTax2026({...input,ryczaltRate:0.17})[2].pit).toBeGreaterThan(calculateTax2026({...input,ryczaltRate:0.085})[2].pit)});
});