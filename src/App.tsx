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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 float-animation"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 float-animation"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 float-animation"
          style={{ animationDelay: '4s' }}
        ></div>

        {/* 几何装饰元素 */}
        <div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-lg opacity-10 float-animation"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-lg opacity-10 float-animation"
          style={{ animationDelay: '3s' }}
        ></div>

        {/* 网格装饰 */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>
      </div>

      {/* 头部 */}
      <header className="glass-morphism border-b border-white/20 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
            <div className="mt-4 md:mt-0">
              <div className="flex items-center gap-3">
                {/* 现代金融图标 */}
                <div className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center shadow-lg glow-animation">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {t('common.title')}
                  </h1>
                  <p className="text-slate-600 mt-1">{t('common.subtitle')}</p>
                </div>
              </div>
            </div>
            <div className="self-start md:self-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* 移动端：优化布局，所有内容展开 */}
        <div className="lg:hidden space-y-4">
          {/* 投资场景 - 紧凑布局 */}
          <section
            className="glass-morphism rounded-xl border border-white/20 shadow-lg p-4 slide-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className="text-lg font-bold text-card-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-6 gradient-bg-1 rounded-full"></div>
              {t('scenarios.title')}
            </h2>
            <div className="scale-90 origin-top">
              <ScenarioSelector />
            </div>
          </section>

          {/* 参数设置 - 紧凑布局 */}
          <section
            className="glass-morphism rounded-xl border border-white/20 shadow-lg p-4 slide-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <h2 className="text-lg font-bold text-card-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-6 gradient-bg-2 rounded-full"></div>
              {t('inputs.title')}
            </h2>
            <div className="scale-90 origin-top space-y-3">
              <ParameterInput />
            </div>
          </section>

          {/* 详细结果 - 标准布局 */}
          <section
            className="glass-morphism rounded-xl border border-white/20 shadow-lg p-4 slide-in-up card-hover"
            style={{ animationDelay: '0.3s' }}
          >
            <h2 className="text-lg font-bold text-card-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-6 gradient-bg-3 rounded-full"></div>
              {t('results.title')}
            </h2>
            <ResultsDisplay />
          </section>

          {/* 图表 - 优化高度 */}
          <section
            className="glass-morphism rounded-xl border border-white/20 shadow-lg p-4 slide-in-up card-hover"
            style={{ animationDelay: '0.4s' }}
          >
            <InvestmentCharts />
          </section>

          {/* 分享按钮 - 紧凑布局 */}
          <section
            className="glass-morphism rounded-xl border border-white/20 shadow-lg p-4 slide-in-up card-hover"
            style={{ animationDelay: '0.5s' }}
          >
            <ShareButtons />
          </section>
        </div>

        {/* 桌面端：保持原有布局 */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
          {/* 左侧：输入区域 */}
          <div className="space-y-8">
            <section className="glass-morphism rounded-2xl border border-white/20 shadow-xl p-6 slide-in-left card-hover">
              <h2 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-3">
                <div className="w-3 h-8 gradient-bg-1 rounded-full"></div>
                {t('scenarios.title')}
              </h2>
              <ScenarioSelector />
            </section>

            <section
              className="glass-morphism rounded-2xl border border-white/20 shadow-xl p-6 slide-in-left card-hover"
              style={{ animationDelay: '0.1s' }}
            >
              <h2 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-3">
                <div className="w-3 h-8 gradient-bg-2 rounded-full"></div>
                {t('inputs.title')}
              </h2>
              <ParameterInput />
            </section>
          </div>

          {/* 右侧：结果区域 */}
          <div className="space-y-8">
            <section
              className="glass-morphism rounded-2xl border border-white/20 shadow-xl p-6 slide-in-right card-hover"
              style={{ animationDelay: '0.2s' }}
            >
              <h2 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-3">
                <div className="w-3 h-8 gradient-bg-3 rounded-full"></div>
                {t('results.title')}
              </h2>
              <ResultsDisplay />
            </section>

            <section
              className="glass-morphism rounded-2xl border border-white/20 shadow-xl p-6 slide-in-right card-hover"
              style={{ animationDelay: '0.3s' }}
            >
              <InvestmentCharts />
            </section>

            <section
              className="glass-morphism rounded-2xl border border-white/20 shadow-xl p-6 slide-in-right card-hover"
              style={{ animationDelay: '0.4s' }}
            >
              <ShareButtons />
            </section>
          </div>
        </div>
      </main>

      {/* 免责声明 */}
      <section className="border-t border-slate-200/50 mt-8 lg:mt-16 bg-slate-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
          <div className="bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl p-4 lg:p-6 shadow-lg">
            <h3 className="text-base lg:text-lg font-semibold text-slate-800 mb-2 lg:mb-3 flex items-center gap-2">
              <svg
                className="w-4 lg:w-5 h-4 lg:h-5 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {t('disclaimer.title')}
            </h3>
            <p className="text-slate-600 text-xs lg:text-sm leading-relaxed">
              {t('disclaimer.text')}
            </p>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-slate-200/50 bg-slate-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-600">
          <p>© 2024 Compound Interest Calculator. Built with ❤️ for financial planning.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
