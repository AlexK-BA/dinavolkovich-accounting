/** 2026 JDG planning estimate. Annualised, not a tax return or individual advice. */
export type Regime = "skala" | "liniowy" | "ryczalt";
export type ZusMode = "start" | "preferential" | "full";
export interface TaxInputs {
 monthlyRevenue: number;
 monthlyCosts: number;
 ryczaltRate: number;
 zusMode: ZusMode;
 chorobowe: boolean;
 months: number;
 startMonth?: number;
 additionalDeduction: number;
}
export interface TaxResult {
 regime: Regime;
 annualRevenue: number;
 annualCosts: number;
 social: number;
 health: number;
 pit: number;
 net: number;
 monthlyNet: number;
 assumptions: string[];
}
const MAX = (x:number) => Math.max(0, Number.isFinite(x) ? x : 0);
const round = (x:number) => Math.round(x*100)/100;
const SOCIAL = {
 start: {base:0, sickness:0},
 preferential:{base:420.86,sickness:35.32},
 full:{base:1788.29,sickness:138.47}
} as const;
const RYCZALT_HEALTH = {low:498.35,mid:830.58,high:1495.04};
const JANUARY_HEALTH_MIN = 314.96;
const HEALTH_MIN = 432.54; // minimum monthly health contribution February–December 2026
const LINEAR_HEALTH_DEDUCTION_LIMIT = 14100;
export function calculateTax2026(input:TaxInputs): TaxResult[] {
 const months=Math.min(12,Math.max(1,Math.round(MAX(input.months)||12)));
 const startMonth=Math.min(12,Math.max(1,Math.round(MAX(input.startMonth??1))));
 const activeMonths=Math.min(months,13-startMonth);
 const revenue=MAX(input.monthlyRevenue)*activeMonths;
 const costs=MAX(input.monthlyCosts)*activeMonths;
 const zus=SOCIAL[input.zusMode] || SOCIAL.full;
 const social=round((zus.base+(input.chorobowe?zus.sickness:0))*activeMonths);
 // Full ZUS includes FP/FS (138.47 PLN in the model); this is a business cost,
 // not a social-insurance contribution deductible from the ryczalt revenue base.
 const fpfs=round((input.zusMode==="full"?138.47:0)*activeMonths);
 const deductibleSocial=round(social-fpfs);
 const profit=MAX(revenue-costs-social);
 const additional=MAX(input.additionalDeduction);
 const healthSkala=round(Math.max((HEALTH_MIN*activeMonths-(startMonth===1?HEALTH_MIN-JANUARY_HEALTH_MIN:0)),profit*0.09));
 const healthLiniowy=round(Math.max((HEALTH_MIN*activeMonths-(startMonth===1?HEALTH_MIN-JANUARY_HEALTH_MIN:0)),profit*0.049));
 const ryczaltThresholdRevenue=MAX(revenue-deductibleSocial);
 const healthBand=ryczaltThresholdRevenue<=60000?RYCZALT_HEALTH.low:ryczaltThresholdRevenue<=300000?RYCZALT_HEALTH.mid:RYCZALT_HEALTH.high;
 const healthRyczalt=round(healthBand*activeMonths);
 const scaleBase=MAX(profit-additional);
 const pitSkala=round(Math.max(0,Math.min(scaleBase,120000)*0.12-3600)+Math.max(0,scaleBase-120000)*0.32);
 const linearBase=MAX(profit-additional-Math.min(healthLiniowy,LINEAR_HEALTH_DEDUCTION_LIMIT));
 const pitLiniowy=round(linearBase*0.19);
 const rate=Math.min(0.17,Math.max(0,Number.isFinite(input.ryczaltRate)?input.ryczaltRate:0.12));
 const ryczaltBase=MAX(revenue-deductibleSocial-healthRyczalt*0.5-additional);
 const pitRyczalt=round(ryczaltBase*rate);
 const shared=["Model zakłada kolejne miesiące od wskazanego miesiąca 2026 r. i równomierne przychody i koszty.","Nie uwzględnia wszystkich ulg, ograniczeń, rozliczeń rocznych i zmian podstaw składek.","Kwoty składek i progów według danych na 2026 r.; wymagają indywidualnej weryfikacji."];
 return ([
  {regime:"skala",health:healthSkala,pit:pitSkala},
  {regime:"liniowy",health:healthLiniowy,pit:pitLiniowy},
  {regime:"ryczalt",health:healthRyczalt,pit:pitRyczalt},
 ] as const).map(item=>{
  const net=round(revenue-costs-social-item.health-item.pit);
  return {regime:item.regime,annualRevenue:round(revenue),annualCosts:round(costs),social,health:item.health,pit:item.pit,net,monthlyNet:round(net/activeMonths),assumptions:shared};
 });
}
