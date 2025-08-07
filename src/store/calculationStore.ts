import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CalculationParams, CalculationResult, InvestmentType } from '../types';
import { calculateCompoundInvestment, validateCalculationParams } from '../utils/calculations';
import { investmentScenarios } from '../constants/scenarios';

interface CalculationState {
  // 计算参数
  params: CalculationParams;
  // 计算结果
  result: CalculationResult | null;
  // 加载状态
  isCalculating: boolean;
  // 错误信息
  errors: string[];

  // 动作
  setParams: (params: Partial<CalculationParams>) => void;
  calculate: () => void;
  reset: () => void;
  setScenario: (scenarioId: InvestmentType) => void;

  // UI状态
  selectedChart: 'growth' | 'composition';
  setSelectedChart: (chart: 'growth' | 'composition') => void;
}

const defaultParams: CalculationParams = {
  initialInvestment: 10000,
  monthlyInvestment: 500,
  years: 5,
  annualReturnRate: 8,
  compoundFrequency: 'yearly',
  investmentType: 'stock',
};

export const useCalculationStore = create<CalculationState>()(
  persist(
    (set, get) => ({
      params: defaultParams,
      result: null,
      isCalculating: false,
      errors: [],
      selectedChart: 'growth',

      setParams: newParams => {
        const currentParams = get().params;
        const updatedParams = { ...currentParams, ...newParams };

        set({ params: updatedParams });

        // 验证并重新计算
        const validation = validateCalculationParams(updatedParams);
        if (validation.valid) {
          const newResult = calculateCompoundInvestment(updatedParams);
          set({ result: newResult, errors: [] });
        } else {
          set({ errors: validation.errors });
        }
      },

      calculate: () => {
        const params = get().params;
        set({ isCalculating: true });

        try {
          const validation = validateCalculationParams(params);
          if (validation.valid) {
            const result = calculateCompoundInvestment(params);
            set({ result, errors: [], isCalculating: false });
          } else {
            set({ errors: validation.errors, isCalculating: false });
          }
        } catch (error) {
          console.error('Calculation failed:', error);
          set({
            errors: ['Calculation error occurred'],
            isCalculating: false,
          });
        }
      },

      reset: () => {
        set({
          params: defaultParams,
          result: calculateCompoundInvestment(defaultParams),
          errors: [],
        });
      },

      setScenario: (scenarioId: InvestmentType) => {
        const scenario = investmentScenarios.find(s => s.id === scenarioId);
        if (scenario) {
          // 重置到初始状态，只更新投资类型和对应收益率
          const newParams = {
            ...defaultParams,
            investmentType: scenarioId,
            annualReturnRate: scenario.defaultReturnRate,
          };

          set({
            params: newParams,
            result: calculateCompoundInvestment(newParams),
            errors: [],
          });
        }
      },

      setSelectedChart: chart => {
        set({ selectedChart: chart });
      },
    }),
    {
      name: 'calculation-store',
      partialize: state => ({
        params: state.params,
        selectedChart: state.selectedChart,
      }),
    }
  )
);

// 初始化时计算一次
const initialResult = calculateCompoundInvestment(defaultParams);
useCalculationStore.setState({ result: initialResult });
