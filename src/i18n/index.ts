import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 翻译资源
const resources = {
  en: {
    translation: {
      common: {
        title: 'Compound Interest Calculator',
        subtitle: 'Calculate your investment growth with compound interest',
        calculate: 'Calculate',
        reset: 'Reset',
        download: 'Download',
        share: 'Share',
        currency: 'USD',
        switchToEnglish: 'Switch to English',
        switchToChinese: '切换到中文',
      },
      scenarios: {
        title: 'Select Investment Scenario',
        bitcoin: 'Bitcoin',
        stock: 'Stock Market',
        bank: 'Bank Savings',
        bitcoinDesc: 'High volatility cryptocurrency investment',
        stockDesc: 'S&P 500 index fund investment',
        bankDesc: 'Low-risk bank savings or bonds',
      },
      inputs: {
        title: 'Set Investment Parameters',
        initialInvestment: 'Initial Investment',
        monthlyInvestment: 'Monthly Investment',
        investmentPeriod: 'Investment Period',
        years: 'years',
        annualReturnRate: 'Annual Return Rate',
        compoundFrequency: 'Compound Frequency',
        yearly: 'Yearly',
        monthly: 'Monthly',
        daily: 'Daily',
      },
      results: {
        title: 'Calculation Results',
        finalValue: 'Final Value',
        totalInvestment: 'Total Investment',
        totalInterest: 'Total Interest',
        growthChart: 'Growth Chart',
        compositionChart: 'Investment Composition',
      },
      share: {
        title: 'My Investment Calculation',
        description: 'Check out my compound interest calculation!',
        wechat: 'WeChat',
        twitter: 'Twitter',
        facebook: 'Facebook',
        saveImage: 'Save as Image',
        copyLink: 'Copy',
      },
      disclaimer: {
        title: 'Disclaimer',
        text: 'This calculator is for educational purposes only. All calculations are estimates based on historical data and assumptions. Actual investment returns may vary significantly. Past performance does not guarantee future results. Please consult with a qualified financial advisor before making investment decisions.',
      },
    },
  },
  zh: {
    translation: {
      common: {
        title: '复利计算器',
        subtitle: '计算您的投资复利增长',
        calculate: '计算',
        reset: '重置',
        download: '下载',
        share: '分享',
        currency: 'USD',
        switchToEnglish: 'Switch to English',
        switchToChinese: '切换到中文',
      },
      scenarios: {
        title: '选择投资场景',
        bitcoin: '比特币',
        stock: '美股指数',
        bank: '银行理财',
        bitcoinDesc: '高波动性加密货币投资',
        stockDesc: '标普500指数基金投资',
        bankDesc: '低风险银行理财或债券',
      },
      inputs: {
        title: '设置投资参数',
        initialInvestment: '初始投资',
        monthlyInvestment: '每月定投',
        investmentPeriod: '投资期限',
        years: '年',
        annualReturnRate: '年化收益率',
        compoundFrequency: '复利频率',
        yearly: '年复利',
        monthly: '月复利',
        daily: '日复利',
      },
      results: {
        title: '计算结果',
        finalValue: '最终价值',
        totalInvestment: '总投资',
        totalInterest: '总收益',
        growthChart: '增长图表',
        compositionChart: '投资构成',
      },
      share: {
        title: '我的投资计算',
        description: '看看我的复利计算结果！',
        wechat: '微信',
        twitter: 'Twitter',
        facebook: 'Facebook',
        saveImage: '保存图片',
        copyLink: '复制',
      },
      disclaimer: {
        title: '免责声明',
        text: '本计算器仅供教育参考使用。所有计算均基于历史数据和假设，实际投资收益可能存在显著差异。过往表现不代表未来结果。投资有风险，入市需谨慎。请在做出投资决策前咨询专业的财务顾问。',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
