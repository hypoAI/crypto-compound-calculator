import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCalculationStore } from '../store/calculationStore';
import { formatCurrency } from '../utils/calculations';

/**
 * 格式化ROI百分比显示
 * @param roiPercentage ROI百分比字符串
 * @returns 格式化后的ROI字符串
 */
function formatROI(roiPercentage: string): string {
  const roi = parseFloat(roiPercentage);
  if (isNaN(roi)) return roiPercentage + '%';

  if (roi >= 1000) {
    return `${(roi / 1000).toFixed(1)}K%`;
  } else if (roi >= 100) {
    return `${Math.round(roi)}%`;
  }

  return `${roi}%`;
}

interface ResultsDisplayProps {
  className?: string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { result } = useCalculationStore();

  if (!result) return null;

  const { finalValue, totalInvestment, totalInterest } = result;
  const roiPercentage =
    totalInvestment > 0 ? ((totalInterest / totalInvestment) * 100).toFixed(1) : '0.0';

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-bold text-card-foreground mb-4">{t('results.finalValue')}</h3>
        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          {formatCurrency(finalValue, 'USD', 'en-US', true)}
        </div>
        <p className="text-sm text-slate-600">
          {t('results.totalInvestment')}: {formatCurrency(totalInvestment, 'USD', 'en-US', true)} •
          {t('results.totalInterest')}: {formatCurrency(totalInterest, 'USD', 'en-US', true)}
        </p>
      </div>

      {/* 移动端：一行显示三个指标 */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div className="glass-morphism rounded-xl p-3 text-center card-hover border border-white/20">
          <div className="text-lg font-bold text-slate-800">
            {formatCurrency(totalInvestment, 'USD', 'en-US', true)}
          </div>
          <div className="text-xs text-slate-600 mt-1 font-medium">
            {t('results.totalInvestment')}
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-3 text-center card-hover border border-white/20">
          <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {formatCurrency(totalInterest, 'USD', 'en-US', true)}
          </div>
          <div className="text-xs text-slate-600 mt-1 font-medium">
            {t('results.totalInterest')}
          </div>
        </div>

        <div className="glass-morphism rounded-xl p-3 text-center card-hover border border-white/20">
          <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {formatROI(roiPercentage)}
          </div>
          <div className="text-xs text-slate-600 mt-1 font-medium">ROI</div>
        </div>
      </div>

      {/* PC端：保持原有布局 */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        <div className="glass-morphism rounded-2xl p-6 text-center card-hover border border-white/20">
          <div className="text-3xl font-bold text-slate-800">
            {formatCurrency(totalInvestment, 'USD', 'en-US', true)}
          </div>
          <div className="text-sm text-slate-600 mt-2 font-medium">
            {t('results.totalInvestment')}
          </div>
        </div>

        <div className="glass-morphism rounded-2xl p-6 text-center card-hover border border-white/20">
          <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {formatCurrency(totalInterest, 'USD', 'en-US', true)}
          </div>
          <div className="text-sm text-slate-600 mt-2 font-medium">
            {t('results.totalInterest')}
          </div>
        </div>

        <div className="glass-morphism rounded-2xl p-6 text-center card-hover border border-white/20">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {formatROI(roiPercentage)}
          </div>
          <div className="text-sm text-slate-600 mt-2 font-medium">ROI</div>
        </div>
      </div>
    </div>
  );
};
