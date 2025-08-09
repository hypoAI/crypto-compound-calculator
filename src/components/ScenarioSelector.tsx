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
    <div className={`grid grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-4 ${className}`}>
      {investmentScenarios.map(scenario => (
        <button
          key={scenario.id}
          onClick={() => setScenario(scenario.id)}
          className={`
            relative p-2 lg:p-6 rounded-lg border-2 transition-all duration-200
            ${
              params.investmentType === scenario.id
                ? 'border-primary bg-primary/5 shadow-lg scale-105'
                : 'border-border hover:border-primary/50 hover:shadow-md'
            }
          `}
        >
          <div className="text-center space-y-1 lg:space-y-3">
            <div className="text-xl lg:text-4xl mx-auto w-fit">{scenario.icon}</div>
            <h3 className="text-xs lg:text-lg font-semibold text-foreground line-clamp-1">
              {t(`scenarios.${scenario.id}`)}
            </h3>
            <p className="hidden lg:block text-sm text-muted-foreground line-clamp-2">
              {t(`scenarios.${scenario.id}Desc`)}
            </p>
            <div className="text-xs lg:text-sm text-primary font-medium">
              {scenario.defaultReturnRate}%
            </div>
          </div>

          {/* 选中指示器 */}
          {params.investmentType === scenario.id && (
            <div className="absolute top-1 lg:top-2 right-1 lg:right-2 w-2 lg:w-3 h-2 lg:h-3 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};
