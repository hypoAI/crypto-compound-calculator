import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCalculationStore } from '../store/calculationStore';
import { formatCurrency } from '../utils/calculations';

interface ResultsDisplayProps {
  className?: string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { result } = useCalculationStore();

  if (!result) return null;

  const { finalValue, totalInvestment, totalInterest } = result;
  const roiPercentage = ((totalInterest / totalInvestment) * 100).toFixed(1);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t('results.finalValue')}</h3>
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
          {formatCurrency(finalValue)}
        </div>
        <p className="text-sm text-muted-foreground">
          {t('results.totalInvestment')}: {formatCurrency(totalInvestment)} •
          {t('results.totalInterest')}: {formatCurrency(totalInterest)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(totalInvestment)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">{t('results.totalInvestment')}</div>
        </div>

        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalInterest)}</div>
          <div className="text-sm text-muted-foreground mt-1">{t('results.totalInterest')}</div>
        </div>

        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{roiPercentage}%</div>
          <div className="text-sm text-muted-foreground mt-1">ROI</div>
        </div>
      </div>
    </div>
  );
};
