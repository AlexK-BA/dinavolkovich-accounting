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
const RYCZALT_RATE = 0.12; // Illustrative rate for qualifying IT services; actual rate depends on PKWiU
const PIT_RATE = 0.12; // 12% first bracket
const PIT_FREE = 30000; // kwota wolna od podatku
const HEALTH_OGOLNE_RATE = 0.09; // 9% of income for ogólne

export function calculateAnnual(monthlyIncome: number): AnnualResult {
  const months = 11; // Feb-Dec
  const annualIncome = monthlyIncome * months;

  // Ryczałt 3%
  const rTax = monthlyIncome * RYCZALT_RATE;
  const rZus = ZUS_PREF;
  const rHealth = HEALTH_RYCZALT_BASE;
  const rTotal = rTax + rZus + rHealth;
  const rNet = monthlyIncome - rTotal;

  // Ogólne 12%
  const oTaxableAnnual = Math.max(0, annualIncome - PIT_FREE);
  const oTaxAnnual = oTaxableAnnual * PIT_RATE;
  const oTaxMonthly = oTaxAnnual / months;
  const oZus = ZUS_PREF;
  const oHealth = monthlyIncome * HEALTH_OGOLNE_RATE;
  const oTotal = oTaxMonthly + oZus + oHealth;
  const oNet = monthlyIncome - oTotal;

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
