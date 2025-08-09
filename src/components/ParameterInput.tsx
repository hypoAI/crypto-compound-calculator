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
    <div className={`space-y-3 lg:space-y-6 ${className}`}>
      {/* 移动端：两列布局 */}
      <div className="lg:hidden space-y-3">
        {/* 第一行：初始投资 + 每月定投 */}
        <div className="grid grid-cols-2 gap-3">
          {/* 初始投资 */}
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-1 leading-tight">
              {t('inputs.initialInvestment')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10 font-medium text-sm">
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                min="0"
                step="100"
                value={params.initialInvestment}
                onChange={e => {
                  const value = e.target.value;
                  // 只允许数字，处理特殊情况
                  if (
                    value === '' ||
                    value === '0' ||
                    /^0*[1-9]\d*$/.test(value) ||
                    /^[1-9]\d*$/.test(value)
                  ) {
                    // 去除前导0
                    const cleanValue = value.replace(/^0+/, '') || '0';
                    handleInputChange(
                      'initialInvestment',
                      cleanValue === '' ? 0 : Math.max(0, Number(cleanValue))
                    );
                  }
                }}
                onBlur={e => {
                  // 失去焦点时确保数值有效
                  const value = Math.max(0, Number(e.target.value) || 0);
                  handleInputChange('initialInvestment', value);
                }}
                className="w-full pl-8 pr-3 py-2 border-2 border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 hover:shadow-md text-sm"
                placeholder="10000"
              />
            </div>
          </div>

          {/* 每月定投 */}
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-1 leading-tight">
              {t('inputs.monthlyInvestment')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10 font-medium text-sm">
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                min="0"
                step="50"
                value={params.monthlyInvestment}
                onChange={e => {
                  const value = e.target.value;
                  // 只允许数字，处理特殊情况
                  if (
                    value === '' ||
                    value === '0' ||
                    /^0*[1-9]\d*$/.test(value) ||
                    /^[1-9]\d*$/.test(value)
                  ) {
                    // 去除前导0
                    const cleanValue = value.replace(/^0+/, '') || '0';
                    handleInputChange(
                      'monthlyInvestment',
                      cleanValue === '' ? 0 : Math.max(0, Number(cleanValue))
                    );
                  }
                }}
                onBlur={e => {
                  // 失去焦点时确保数值有效
                  const value = Math.max(0, Number(e.target.value) || 0);
                  handleInputChange('monthlyInvestment', value);
                }}
                className="w-full pl-8 pr-3 py-2 border-2 border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 hover:shadow-md text-sm"
                placeholder="500"
              />
            </div>
          </div>
        </div>

        {/* 第二行：投资期限 + 年化收益率 */}
        <div className="grid grid-cols-2 gap-3">
          {/* 投资期限 */}
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-1 leading-tight">
              {t('inputs.investmentPeriod')}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="50"
                value={params.years}
                onChange={e =>
                  handleInputChange('years', Math.max(1, Math.min(50, Number(e.target.value))))
                }
                className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 hover:shadow-md text-sm"
              />
              <span className="text-xs font-medium text-slate-600 whitespace-nowrap">
                {t('inputs.years')}
              </span>
            </div>
          </div>

          {/* 年化收益率 */}
          <div>
            <label className="block text-sm font-semibold text-card-foreground mb-1 leading-tight">
              {t('inputs.annualReturnRate')}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                min="-100"
                max="100"
                value={params.annualReturnRate}
                onChange={e =>
                  handleInputChange(
                    'annualReturnRate',
                    Math.max(-100, Math.min(100, Number(e.target.value)))
                  )
                }
                className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 hover:shadow-md text-sm"
              />
              <span className="text-xs font-medium text-slate-600 whitespace-nowrap">%</span>
            </div>
          </div>
        </div>

        {/* 复利频率 */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-1 leading-tight">
            {t('inputs.compoundFrequency')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['yearly', 'monthly', 'daily'] as CompoundFrequency[]).map(frequency => (
              <button
                key={frequency}
                type="button"
                onClick={() => setParams({ compoundFrequency: frequency })}
                className={`
                  px-3 py-2 text-sm font-semibold border-2 rounded-lg transition-all duration-200 transform hover:scale-105
                  ${
                    params.compoundFrequency === frequency
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-purple-500 shadow-lg shadow-purple-500/30'
                      : 'bg-white/80 backdrop-blur-sm text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50'
                  }
                `}
              >
                {t(`inputs.${frequency}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PC端：恢复原有垂直布局 */}
      <div className="hidden lg:block space-y-6">
        {/* 初始投资 */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-2">
            {t('inputs.initialInvestment')}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10 font-medium">
              $
            </span>
            <input
              type="text"
              inputMode="numeric"
              min="0"
              step="100"
              value={params.initialInvestment}
              onChange={e => {
                const value = e.target.value;
                // 只允许数字，处理特殊情况
                if (
                  value === '' ||
                  value === '0' ||
                  /^0*[1-9]\d*$/.test(value) ||
                  /^[1-9]\d*$/.test(value)
                ) {
                  // 去除前导0
                  const cleanValue = value.replace(/^0+/, '') || '0';
                  handleInputChange(
                    'initialInvestment',
                    cleanValue === '' ? 0 : Math.max(0, Number(cleanValue))
                  );
                }
              }}
              onBlur={e => {
                // 失去焦点时确保数值有效
                const value = Math.max(0, Number(e.target.value) || 0);
                handleInputChange('initialInvestment', value);
              }}
              className="w-full pl-10 pr-4 py-4 border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
              placeholder="10000"
            />
          </div>
        </div>

        {/* 每月定投 */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-2">
            {t('inputs.monthlyInvestment')}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10 font-medium">
              $
            </span>
            <input
              type="text"
              inputMode="numeric"
              min="0"
              step="50"
              value={params.monthlyInvestment}
              onChange={e => {
                const value = e.target.value;
                // 只允许数字，处理特殊情况
                if (
                  value === '' ||
                  value === '0' ||
                  /^0*[1-9]\d*$/.test(value) ||
                  /^[1-9]\d*$/.test(value)
                ) {
                  // 去除前导0
                  const cleanValue = value.replace(/^0+/, '') || '0';
                  handleInputChange(
                    'monthlyInvestment',
                    cleanValue === '' ? 0 : Math.max(0, Number(cleanValue))
                  );
                }
              }}
              onBlur={e => {
                // 失去焦点时确保数值有效
                const value = Math.max(0, Number(e.target.value) || 0);
                handleInputChange('monthlyInvestment', value);
              }}
              className="w-full pl-10 pr-4 py-4 border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
              placeholder="500"
            />
          </div>
        </div>

        {/* 投资期限 */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-2">
            {t('inputs.investmentPeriod')} ({t('inputs.years')})
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="1"
              max="50"
              value={params.years}
              onChange={e =>
                handleInputChange('years', Math.max(1, Math.min(50, Number(e.target.value))))
              }
              className="w-24 px-4 py-4 border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
            />
            <span className="text-sm font-medium text-slate-600">{t('inputs.years')}</span>
          </div>
          {/* 滑动条 */}
          <div className="mt-3">
            <input
              type="range"
              min="1"
              max="50"
              value={params.years}
              onChange={e => handleInputChange('years', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700 transition-colors"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1年</span>
              <span>25年</span>
              <span>50年</span>
            </div>
          </div>
        </div>

        {/* 年化收益率 */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-2">
            {t('inputs.annualReturnRate')}
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              step="0.1"
              min="-100"
              max="100"
              value={params.annualReturnRate}
              onChange={e =>
                handleInputChange(
                  'annualReturnRate',
                  Math.max(-100, Math.min(100, Number(e.target.value)))
                )
              }
              className="w-24 px-4 py-4 border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
            />
            <span className="text-sm font-medium text-slate-600">%</span>
          </div>
          {/* 滑动条 */}
          <div className="mt-3">
            <input
              type="range"
              step="0.1"
              min="-100"
              max="100"
              value={params.annualReturnRate}
              onChange={e => handleInputChange('annualReturnRate', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700 transition-colors"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>-100%</span>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* 复利频率 */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-1 leading-tight">
            {t('inputs.compoundFrequency')}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['yearly', 'monthly', 'daily'] as CompoundFrequency[]).map(frequency => (
              <button
                key={frequency}
                type="button"
                onClick={() => setParams({ compoundFrequency: frequency })}
                className={`
                  px-4 py-4 text-sm font-semibold border-2 rounded-xl transition-all duration-200 transform hover:scale-105
                  ${
                    params.compoundFrequency === frequency
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-purple-500 shadow-lg shadow-purple-500/30'
                      : 'bg-white/80 backdrop-blur-sm text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50'
                  }
                `}
              >
                {t(`inputs.${frequency}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 错误显示 */}
      {errors.length > 0 && (
        <div className="p-3 lg:p-4 glass-morphism rounded-lg lg:rounded-2xl border-2 border-red-200/50 backdrop-blur-sm shadow-lg">
          <p className="text-sm text-red-700 flex items-center gap-2">
            <svg
              className="w-4 lg:w-5 h-4 lg:h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors[0]}
          </p>
        </div>
      )}
    </div>
  );
};
