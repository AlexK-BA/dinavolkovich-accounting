export interface MonthlyResult {
  income: number;
  tax: number;
  zus: number;
  health: number;
  totalDeductions: number;
  net: number;
  annualNet: number;
}

export interface AnnualResult {
  ryczalt: MonthlyResult;
  ogolne: MonthlyResult;
}

// 2026 approximate values for JDG
const ZUS_PREF = 402.65; // preferential ZUS (first 24 months)
const HEALTH_RYCZALT_BASE = 419.46; // health for ryczalt (income < 60k)
const DEFAULT_RYCZALT_RATE = 0.12; // illustrative default only; actual rate depends on activity
const PIT_RATE = 0.12; // 12% first bracket
const PIT_FREE = 30000; // kwota wolna od podatku
const HEALTH_OGOLNE_RATE = 0.09; // 9% of income for ogólne

export function calculateAnnual(monthlyIncome: number, ryczaltRate = DEFAULT_RYCZALT_RATE, annualCosts = 0): AnnualResult {
  const months = 12; // full calendar year
  const annualIncome = monthlyIncome * months;

  // Ryczałt 3%
  const rTax = Math.max(0, monthlyIncome * ryczaltRate);
  const rZus = ZUS_PREF;
  const rHealth = HEALTH_RYCZALT_BASE;
  const rTotal = rTax + rZus + rHealth;
  const rNet = monthlyIncome - Math.max(0, annualCosts) / months - rTotal;

  // Ogólne 12%
  const oTaxableAnnual = Math.max(0, annualIncome - Math.max(0, annualCosts) - PIT_FREE);
  const oTaxAnnual = Math.min(oTaxableAnnual, 120000 - PIT_FREE) * PIT_RATE + Math.max(0, oTaxableAnnual - (120000 - PIT_FREE)) * 0.32;
  const oTaxMonthly = oTaxAnnual / months;
  const oZus = ZUS_PREF;
  const oHealth = Math.max(0, monthlyIncome - Math.max(0, annualCosts) / months) * HEALTH_OGOLNE_RATE;
  const oTotal = oTaxMonthly + oZus + oHealth;
  const oNet = monthlyIncome - Math.max(0, annualCosts) / months - oTotal;

  return {
    ryczalt: {
      income: monthlyIncome,
      tax: rTax,
      zus: rZus,
      health: rHealth,
      totalDeductions: rTotal,
      net: rNet,
      annualNet: rNet * months,
    },
    ogolne: {
      income: monthlyIncome,
      tax: oTaxMonthly,
      zus: oZus,
      health: oHealth,
      totalDeductions: oTotal,
      net: oNet,
      annualNet: oNet * months,
    },
  };
}
