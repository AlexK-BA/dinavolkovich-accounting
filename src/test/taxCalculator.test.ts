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

describe("independent numerical reference scenarios",()=>{
 const scenario=(overrides:Partial<TaxInputs>)=>calculateTax2026({...base,...overrides});
 it("full ZUS and chorobowe reference",()=>{
   const r=scenario({});
   expect(r[0].social).toBe(23121.12);
   expect(r[1].social).toBe(23121.12);
   expect(r[2].social).toBe(23121.12);
 });
 it("preferential ZUS with and without chorobowe",()=>{
   expect(scenario({zusMode:"preferential",chorobowe:true})[0].social).toBe(5474.16);
   expect(scenario({zusMode:"preferential",chorobowe:false})[0].social).toBe(5050.32);
 });
 it("ulga na start does not remove health",()=>{
   const r=scenario({zusMode:"start",monthlyRevenue:0,monthlyCosts:0});
   expect(r[0].social).toBe(0);
   expect(r[0].health).toBeGreaterThan(0);
   expect(r[2].health).toBe(5980.2);
 });
 it("skala: zero tax until 30k taxable income",()=>{
   expect(scenario({zusMode:"start",monthlyRevenue:2500,monthlyCosts:0})[0].pit).toBe(0);
   expect(scenario({zusMode:"start",monthlyRevenue:5000,monthlyCosts:0})[0].pit).toBe(3600);
 });
 it("skala: 32 percent marginal above 120k",()=>{
   expect(scenario({zusMode:"start",monthlyRevenue:15000,monthlyCosts:0})[0].pit).toBe(30000);
 });
 it("liniowy: 19 percent after eligible health deduction",()=>{
   const r=scenario({zusMode:"start",monthlyRevenue:10000,monthlyCosts:0})[1];
   expect(r.health).toBe(5880);
   expect(r.pit).toBe(21682.8);
 });
 it("ryczalt: 60k and 300k bands after social",()=>{
   expect(scenario({zusMode:"start",monthlyRevenue:5000})[2].health).toBe(5980.2);
   expect(scenario({zusMode:"start",monthlyRevenue:5000.01})[2].health).toBe(9966.96);
   expect(scenario({zusMode:"start",monthlyRevenue:25000})[2].health).toBe(9966.96);
   expect(scenario({zusMode:"start",monthlyRevenue:25000.01})[2].health).toBe(17940.48);
 });
 it("deducts 50 percent health from ryczalt PIT base",()=>{
   const r=scenario({zusMode:"start",monthlyRevenue:5000,monthlyCosts:0,ryczaltRate:0.12})[2];
   expect(r.pit).toBe(6841.19);
 });
 it("all three regimes satisfy net accounting identity",()=>{
   for(const rev of [0,1000,5000,12000,25000,40000]){
    for(const cost of [0,2000,8000]){
     for(const zusMode of ["start","preferential","full"] as const){
      for(const r of scenario({monthlyRevenue:rev,monthlyCosts:cost,zusMode})){
       expect(r.net).toBeCloseTo(r.annualRevenue-r.annualCosts-r.social-r.health-r.pit,2);
       expect(Number.isFinite(r.net)).toBe(true);
       expect(r.pit).toBeGreaterThanOrEqual(0);
      }
     }
    }
   }
 });
});

describe("start month boundaries",()=>{
 it("February start excludes January minimum",()=>{
  const r=calculateTax2026({...base,startMonth:2,months:1,zusMode:"start",monthlyRevenue:0,monthlyCosts:0});
  expect(r[0].health).toBe(432.54);
  expect(r[0].annualRevenue).toBe(0);
 });
 it("January start uses January minimum",()=>{
  const r=calculateTax2026({...base,startMonth:1,months:1,zusMode:"start",monthlyRevenue:0,monthlyCosts:0});
  expect(r[0].health).toBe(314.96);
 });
 it("December caps annualised months to one",()=>{
  const r=calculateTax2026({...base,startMonth:12,months:12,zusMode:"start"});
  expect(r[0].annualRevenue).toBe(10000);
  expect(r[0].annualCosts).toBe(2000);
  expect(r[0].health).toBe(720);
 });
});
