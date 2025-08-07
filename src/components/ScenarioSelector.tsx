import React from 'react';
import { useTranslation } from 'react-i18next';
import { investmentScenarios } from '../constants/scenarios';
import { useCalculationStore } from '../store/calculationStore';

interface ScenarioSelectorProps {
  className?: string;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { params, setScenario } = useCalculationStore();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {investmentScenarios.map(scenario => (
        <button
          key={scenario.id}
          onClick={() => setScenario(scenario.id)}
          className={`
            relative p-6 rounded-lg border-2 transition-all duration-200
            ${
              params.investmentType === scenario.id
                ? 'border-primary bg-primary/5 shadow-lg scale-105'
                : 'border-border hover:border-primary/50 hover:shadow-md'
            }
          `}
        >
          <div className="text-center space-y-3">
            <div className="text-4xl mx-auto w-fit">{scenario.icon}</div>
            <h3 className="text-lg font-semibold text-foreground">
              {t(`scenarios.${scenario.id}`)}
            </h3>
            <p className="text-sm text-muted-foreground">{t(`scenarios.${scenario.id}Desc`)}</p>
            <div className="text-xs text-primary font-medium">
              {scenario.defaultReturnRate}% {t('inputs.annualReturnRate')}
            </div>
          </div>

          {/* 选中指示器 */}
          {params.investmentType === scenario.id && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};
