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
 const months=Math.min(12,Math.max(1,Math.round(Number.isFinite(input.months) ? input.months : 12)));
 const startMonth=Math.min(12,Math.max(1,Math.round(MAX(input.startMonth??1))));
 const activeMonths=Math.min(months,13-startMonth);
 const revenue=MAX(input.monthlyRevenue)*activeMonths;
 const costs=MAX(input.monthlyCosts)*activeMonths;
 // For a simplified model, assume start-up relief begins in the selected first month.
 // After six months, preferential contributions apply for the remaining months.
 const contributionMonths=Array.from({length:activeMonths},(_,i):ZusMode=>input.zusMode==="start"&&i>=6?"preferential":input.zusMode);
 const social=round(contributionMonths.reduce((sum,mode)=>{const z=SOCIAL[mode];return sum+z.base+(input.chorobowe?z.sickness:0);},0));
 // FP/FS is not deductible as a social contribution from ryczalt revenue.
 const fpfs=round(contributionMonths.filter(mode=>mode==="full").length*138.47); // FP/FS included in full ZUS total, excluded from social-insurance deduction on ryczalt.
 const deductibleSocial=round(social-fpfs);
 const profit=MAX(revenue-costs-social);
 const additional=MAX(input.additionalDeduction);
 const monthlyProfits=contributionMonths.map(mode=>MAX(MAX(input.monthlyRevenue)-MAX(input.monthlyCosts)-SOCIAL[mode].base-(input.chorobowe?SOCIAL[mode].sickness:0)));
 // Estimated liability by individual month; actual ZUS payments are based on prior-month income.
 const healthSkala=round(monthlyProfits.reduce((sum,p,i)=>sum+Math.max(startMonth+i===1?JANUARY_HEALTH_MIN:HEALTH_MIN,p*0.09),0));
 const healthLiniowy=round(monthlyProfits.reduce((sum,p,i)=>sum+Math.max(startMonth+i===1?JANUARY_HEALTH_MIN:HEALTH_MIN,p*0.049),0));
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
 const shared=["FP/FS: w wariancie pełnego ZUS 138,47 zł miesięcznie jest uwzględnione w sumie obciążeń, ale nie w odliczeniu składek społecznych od przychodu na ryczałcie.","Ulga na start: model zakłada sześć pełnych miesięcy zwolnienia od początku wskazanego okresu, następnie składki preferencyjne; rzeczywisty termin zależy od daty rozpoczęcia działalności i historii ulg.","Model zakłada kolejne miesiące od wskazanego miesiąca 2026 r. i równomierne przychody i koszty.","Nie uwzględnia wszystkich ulg, ograniczeń, rozliczeń rocznych i zmian podstaw składek.","Kwoty składek i progów według danych na 2026 r.; wymagają indywidualnej weryfikacji."];
 return ([
  {regime:"skala",health:healthSkala,pit:pitSkala},
  {regime:"liniowy",health:healthLiniowy,pit:pitLiniowy},
  {regime:"ryczalt",health:healthRyczalt,pit:pitRyczalt},
 ] as const).map(item=>{
  const net=round(revenue-costs-social-item.health-item.pit);
  return {regime:item.regime,annualRevenue:round(revenue),annualCosts:round(costs),social,health:item.health,pit:item.pit,net,monthlyNet:round(net/activeMonths),assumptions:shared};
 });
}
