import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScenarioSelector } from './components/ScenarioSelector';
import { ParameterInput } from './components/ParameterInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { InvestmentCharts } from './components/InvestmentCharts';
import { ShareButtons } from './components/ShareButtons';
import { LanguageSelector } from './components/LanguageSelector';
import { useCalculationStore } from './store/calculationStore';
import { initAntiDebug } from './utils/antiDebug';
import './i18n';

function App() {
  const { t } = useTranslation();
  const { calculate } = useCalculationStore();

  // 初始化反调试保护（仅生产环境）
  useEffect(() => {
    initAntiDebug();
  }, []);

  // 初始化计算 - 只在首次加载时计算
  useEffect(() => {
    calculate();
  }, []); // 空依赖数组，只运行一次

  return (
    <div className="min-h-screen bg-background">
      {/* 头部 */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* 移动端：语言选择器在标题上方 */}
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
            <div className="mt-4 md:mt-0">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('common.title')}
              </h1>
              <p className="text-muted-foreground mt-1">{t('common.subtitle')}</p>
            </div>
            {/* 移动端：语言选择器在顶部，桌面端：右侧 */}
            <div className="self-start md:self-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t('scenarios.title')}</h2>
              <ScenarioSelector />
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t('inputs.title')}</h2>
              <ParameterInput />
            </section>
          </div>

          {/* 右侧：结果区域 */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t('results.title')}</h2>
              <ResultsDisplay />
            </section>

            <section>
              <InvestmentCharts />
            </section>

            <section>
              <ShareButtons />
            </section>
          </div>
        </div>
      </main>

      {/* 免责声明 */}
      <section className="border-t mt-16 bg-amber-50 border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-amber-100 border border-amber-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">{t('disclaimer.title')}</h3>
            <p className="text-amber-800 text-sm leading-relaxed">{t('disclaimer.text')}</p>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2024 Compound Interest Calculator. </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
