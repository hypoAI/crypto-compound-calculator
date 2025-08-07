import type { InvestmentScenario } from '../types';

export const investmentScenarios: InvestmentScenario[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    icon: '₿',
    defaultReturnRate: 15,
    minReturnRate: -50,
    maxReturnRate: 100,
    description: 'High volatility cryptocurrency investment',
  },
  {
    id: 'stock',
    name: 'Stock Market',
    icon: '📈',
    defaultReturnRate: 8,
    minReturnRate: -20,
    maxReturnRate: 25,
    description: 'S&P 500 index fund investment',
  },
  {
    id: 'bank',
    name: 'Bank Savings',
    icon: '🏦',
    defaultReturnRate: 3,
    minReturnRate: 0.5,
    maxReturnRate: 5,
    description: 'Low-risk bank savings or bonds',
  },
];
