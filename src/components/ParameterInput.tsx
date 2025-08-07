import React from 'react';
import { useTranslation } from 'react-i18next';
import type { CompoundFrequency } from '../types';
import { useCalculationStore } from '../store/calculationStore';

interface ParameterInputProps {
  className?: string;
}

export const ParameterInput: React.FC<ParameterInputProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { params, setParams, errors } = useCalculationStore();

  const handleInputChange = (field: keyof typeof params, value: number) => {
    setParams({ [field]: value });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 初始投资 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('inputs.initialInvestment')}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <input
            type="number"
            min="0"
            step="100"
            value={params.initialInvestment}
            onChange={e => handleInputChange('initialInvestment', Number(e.target.value))}
            className="w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="10000"
          />
        </div>
      </div>

      {/* 每月定投 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('inputs.monthlyInvestment')}
        </label>
        <div className="space-y-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <input
              type="number"
              min="0"
              step="50"
              value={params.monthlyInvestment}
              onChange={e => handleInputChange('monthlyInvestment', Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="500"
            />
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="50"
            value={params.monthlyInvestment}
            onChange={e => handleInputChange('monthlyInvestment', Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* 投资期限 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('inputs.investmentPeriod')} ({t('inputs.years')})
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max="50"
              value={params.years}
              onChange={e => handleInputChange('years', Number(e.target.value))}
              className="w-20 px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <span className="text-sm text-muted-foreground">{t('inputs.years')}</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={params.years}
            onChange={e => handleInputChange('years', Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* 年化收益率 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('inputs.annualReturnRate')}
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              step="0.1"
              min="-100"
              max="100"
              value={params.annualReturnRate}
              onChange={e => handleInputChange('annualReturnRate', Number(e.target.value))}
              className="w-20 px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <input
            type="range"
            min="-50"
            max="100"
            step="0.1"
            value={params.annualReturnRate}
            onChange={e => handleInputChange('annualReturnRate', Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* 复利频率 */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('inputs.compoundFrequency')}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['yearly', 'monthly', 'daily'] as CompoundFrequency[]).map(frequency => (
            <button
              key={frequency}
              type="button"
              onClick={() => setParams({ compoundFrequency: frequency })}
              className={`
                px-3 py-2 text-sm border rounded-md transition-colors
                ${
                  params.compoundFrequency === frequency
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:border-primary/50'
                }
              `}
            >
              {t(`inputs.${frequency}`)}
            </button>
          ))}
        </div>
      </div>

      {/* 错误显示 */}
      {errors.length > 0 && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{errors[0]}</p>
        </div>
      )}
    </div>
  );
};
