// 投资场景类型
export type InvestmentType = 'bitcoin' | 'stock' | 'bank';

// 复利频率类型
export type CompoundFrequency = 'yearly' | 'monthly' | 'daily';

// 投资场景配置
export interface InvestmentScenario {
  id: InvestmentType;
  name: string;
  icon: string;
  defaultReturnRate: number;
  minReturnRate: number;
  maxReturnRate: number;
  description: string;
}

// 计算参数
export interface CalculationParams {
  initialInvestment: number;
  monthlyInvestment: number;
  years: number;
  annualReturnRate: number;
  compoundFrequency: CompoundFrequency;
  investmentType: InvestmentType;
}

// 计算结果
export interface CalculationResult {
  totalInvestment: number;
  totalInterest: number;
  finalValue: number;
  yearlyData: YearlyData[];
}

// 年度数据
export interface YearlyData {
  year: number;
  totalInvestment: number;
  totalValue: number;
  interestEarned: number;
}

// 图表数据
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

// 分享数据
export interface ShareData {
  title: string;
  description: string;
  imageUrl?: string;
  calculationParams: CalculationParams;
  result: CalculationResult;
}

// 语言类型
export type Language = 'zh' | 'en';
