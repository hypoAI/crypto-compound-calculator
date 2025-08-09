import type { CalculationParams, CalculationResult, YearlyData, CompoundFrequency } from '../types';

/**
 * 计算复利增长
 * @param principal 初始投资金额
 * @param rate 年利率（小数形式，如0.08表示8%）
 * @param frequency 复利频率
 * @returns 复利因子
 */
function getCompoundFactor(frequency: CompoundFrequency): number {
  switch (frequency) {
    case 'yearly':
      return 1;
    case 'monthly':
      return 12;
    case 'daily':
      return 365;
    default:
      return 1;
  }
}

/**
 * 计算复利投资
 * @param params 计算参数
 * @returns 计算结果
 */
export function calculateCompoundInvestment(params: CalculationParams): CalculationResult {
  const { initialInvestment, monthlyInvestment, years, annualReturnRate, compoundFrequency } =
    params;

  // 边界条件验证
  if (years <= 0 || years > 50) {
    throw new Error('Investment period must be between 1 and 50 years');
  }

  if (initialInvestment < 0 || monthlyInvestment < 0) {
    throw new Error('Investment amounts cannot be negative');
  }

  if (annualReturnRate < -100 || annualReturnRate > 100) {
    throw new Error('Annual return rate must be between -100% and 100%');
  }

  const rate = annualReturnRate / 100;
  const compoundFactor = getCompoundFactor(compoundFrequency);
  const periodsPerYear = compoundFactor;
  const ratePerPeriod = rate / periodsPerYear;
  const totalPeriods = years * periodsPerYear;

  // 计算定投的未来价值
  let futureValue = 0;
  const yearlyData: YearlyData[] = [];

  // 计算初始投资的未来价值
  const initialFutureValue = initialInvestment * Math.pow(1 + ratePerPeriod, totalPeriods);

  // 计算每月定投的未来价值（处理0利率情况）
  let monthlyFV = 0;
  if (monthlyInvestment > 0) {
    if (rate === 0) {
      // 0利率时，简单累加
      monthlyFV = monthlyInvestment * 12 * years;
    } else {
      const monthlyRate = rate / 12; // 月利率
      monthlyFV =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, years * 12) - 1) / monthlyRate) *
        (1 + monthlyRate); // 期初投资
    }
  }

  futureValue = initialFutureValue + monthlyFV;

  // 计算总投资金额
  const totalInvestment = initialInvestment + monthlyInvestment * 12 * years;

  // 计算总收益
  const totalInterest = futureValue - totalInvestment;

  // 生成年度数据
  for (let year = 1; year <= years; year++) {
    const periodsSoFar = year * periodsPerYear;
    const initialValueAtYear = initialInvestment * Math.pow(1 + ratePerPeriod, periodsSoFar);

    const monthlyInvestmentsSoFar = monthlyInvestment * 12 * year;
    let monthlyValueAtYear = monthlyInvestmentsSoFar; // 0利率时的默认值

    if (monthlyInvestment > 0 && rate !== 0) {
      const monthlyRate = rate / 12;
      monthlyValueAtYear =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, year * 12) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }

    const yearTotalValue = initialValueAtYear + monthlyValueAtYear;
    const yearInterest = yearTotalValue - (initialInvestment + monthlyInvestmentsSoFar);

    yearlyData.push({
      year,
      totalInvestment: initialInvestment + monthlyInvestmentsSoFar,
      totalValue: yearTotalValue,
      interestEarned: yearInterest,
    });
  }

  return {
    totalInvestment,
    totalInterest,
    finalValue: futureValue,
    yearlyData,
  };
}

/**
 * 格式化大数字为简洁格式
 * @param amount 金额
 * @returns 简洁格式字符串（如 $1.5M, $2.3B）
 */
function formatLargeNumber(amount: number): string {
  const abs = Math.abs(amount);

  if (abs >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`;
  } else if (abs >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (abs >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  } else {
    return `$${Math.round(amount).toLocaleString()}`;
  }
}

/**
 * 格式化货币数字
 * @param amount 金额
 * @param currency 货币代码
 * @param locale 地区
 * @param useShortFormat 是否使用简洁格式
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
  useShortFormat: boolean = false
): string {
  if (useShortFormat && Math.abs(amount) >= 100000) {
    return formatLargeNumber(amount);
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * 格式化百分比
 * @param value 百分比值
 * @param locale 地区
 * @returns 格式化后的百分比字符串
 */
export function formatPercentage(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

/**
 * 验证计算参数
 * @param params 计算参数
 * @returns 验证结果
 */
export function validateCalculationParams(params: CalculationParams): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (params.initialInvestment < 0) {
    errors.push('Initial investment must be positive');
  }

  if (params.monthlyInvestment < 0) {
    errors.push('Monthly investment must be positive');
  }

  if (params.years < 1 || params.years > 50) {
    errors.push('Investment period must be between 1 and 50 years');
  }

  if (params.annualReturnRate < -100 || params.annualReturnRate > 100) {
    errors.push('Annual return rate must be between -100% and 100%');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
