import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCalculationStore } from '../store/calculationStore';
import { formatCurrency } from '../utils/calculations';

interface ShareButtonsProps {
  className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ className = '' }) => {
  const { t, i18n } = useTranslation();
  const { params, result } = useCalculationStore();
  const [copied, setCopied] = useState(false);
  const [generatingPoster, setGeneratingPoster] = useState(false);
  const currentLang = i18n.language || 'en';

  if (!result) return null;

  const generateShareText = () => {
    const roi = ((result.totalInterest / result.totalInvestment) * 100).toFixed(1);
    return `
      💰 ${t('common.title')}\

      🎯 ${t('scenarios.' + params.investmentType)}: ${formatCurrency(result.finalValue)}
      💵 ${t('results.totalInvestment')}: ${formatCurrency(result.totalInvestment)}
      📈 ROI: ${roi}%

      ${t('share.description')} 
    `;
  };

  const generatePoster = async () => {
    setGeneratingPoster(true);

    try {
      // Create poster canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set poster dimensions (1080x1350 - Instagram recommended size)
      canvas.width = 1080;
      canvas.height = 1350;

      // Background color
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#f8fafc');
      gradient.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Use current language to ensure correct translation
      const isChinese = currentLang === 'zh';

      // Title
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        isChinese ? '复利计算器' : 'Compound Interest Calculator',
        canvas.width / 2,
        120
      );

      // Subtitle
      ctx.fillStyle = '#475569';
      ctx.font = '28px system-ui, -apple-system, sans-serif';
      ctx.fillText(
        isChinese
          ? '计算您的投资复利增长'
          : 'Calculate your investment growth with compound interest',
        canvas.width / 2,
        170
      );

      // Separator line
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, 200);
      ctx.lineTo(canvas.width - 100, 200);
      ctx.stroke();

      // Investment type
      const scenarioMap = {
        bitcoin: isChinese ? '比特币' : 'Bitcoin',
        stock: isChinese ? '美股指数' : 'Stock Market',
        bank: isChinese ? '银行理财' : 'Bank Savings',
      };

      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${isChinese ? '投资场景' : 'Investment Scenario'}:`, 100, 280);

      ctx.fillStyle = '#3b82f6';
      ctx.font = '32px system-ui, -apple-system, sans-serif';
      ctx.fillText(scenarioMap[params.investmentType as keyof typeof scenarioMap], 100, 330);

      // Parameters section
      const paramsStartY = 400;
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.fillText(isChinese ? '设置投资参数' : 'Set Investment Parameters', 100, paramsStartY);

      const paramY = paramsStartY + 60;
      ctx.font = '28px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText(
        `${isChinese ? '初始投资' : 'Initial Investment'}: ${formatCurrency(params.initialInvestment)}`,
        120,
        paramY
      );
      ctx.fillText(
        `${isChinese ? '每月定投' : 'Monthly Investment'}: ${formatCurrency(params.monthlyInvestment)}`,
        120,
        paramY + 50
      );
      ctx.fillText(
        `${isChinese ? '投资期限' : 'Investment Period'}: ${params.years} ${isChinese ? '年' : 'years'}`,
        120,
        paramY + 100
      );
      ctx.fillText(
        `${isChinese ? '年化收益率' : 'Annual Return Rate'}: ${params.annualReturnRate}%`,
        120,
        paramY + 150
      );

      // Results section
      const resultsStartY = paramY + 220;
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.fillText(isChinese ? '计算结果' : 'Calculation Results', 100, resultsStartY);

      const resultY = resultsStartY + 60;
      ctx.font = '28px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#059669';
      ctx.fillText(
        `${isChinese ? '最终价值' : 'Final Value'}: ${formatCurrency(result.finalValue)}`,
        120,
        resultY
      );

      ctx.fillStyle = '#475569';
      ctx.fillText(
        `${isChinese ? '总投资' : 'Total Investment'}: ${formatCurrency(result.totalInvestment)}`,
        120,
        resultY + 50
      );

      ctx.fillStyle = '#dc2626';
      ctx.fillText(
        `${isChinese ? '总收益' : 'Total Interest'}: ${formatCurrency(result.totalInterest)}`,
        120,
        resultY + 100
      );

      // ROI
      const roi = ((result.totalInterest / result.totalInvestment) * 100).toFixed(1);
      ctx.fillStyle = '#7c3aed';
      ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${isChinese ? '收益率' : 'ROI'}: ${roi}%`, canvas.width / 2, resultY + 180);

      // Bottom decoration
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

      ctx.fillStyle = '#64748b';
      ctx.font = '24px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        isChinese ? '由复利计算器生成' : 'Generated by Compound Interest Calculator',
        canvas.width / 2,
        canvas.height - 50
      );

      // Download image
      const link = document.createElement('a');
      link.download = `${isChinese ? '复利计算器' : 'compound-calculator'}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating poster:', error);
      alert('生成海报失败，请重试');
    } finally {
      setGeneratingPoster(false);
    }
  };

  const handleShare = async (platform: string) => {
    const shareText = generateShareText();
    const url = window.location.href;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}&hashtags=Investment, compound interest, financial management`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    switch (platform) {
      case 'twitter': {
        window.open(twitterUrl, '_blank');
        break;
      }

      case 'facebook': {
        window.open(facebookUrl, '_blank');
        break;
      }

      case 'wechat': {
        alert('微信分享功能需要后端支持，敬请期待！');
        break;
      }

      case 'copy': {
        try {
          await navigator.clipboard.writeText(shareText);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
        break;
      }

      case 'save': {
        await generatePoster();
        break;
      }
    }
  };

  // 检测用户地区
  const isChineseUser = () => {
    const lang =
      navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage || '';
    return lang.toLowerCase().includes('zh');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t('share.title')}</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {isChineseUser() && (
          <button
            onClick={() => handleShare('wechat')}
            className="flex items-center justify-center px-4 py-3 bg-[#07C160] text-white rounded-md hover:bg-[#06ad56] transition-colors text-base"
          >
            <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.03 2 11.005c0 2.624 1.204 4.99 3.19 6.696L4 22l4.694-2.262C10.04 19.97 11.008 20 12 20c5.514 0 10-4.02 10-8.995C22 6.03 17.514 2 12 2zm4.039 10.766c.248.54.389 1.138.389 1.767 0 2.485-2.017 4.5-4.5 4.5-.632 0-1.236-.13-1.779-.366l-1.106.531-1.099-.42-1.101.42-1.106-.531c-.543.236-1.147.366-1.779.366-2.483 0-4.5-2.015-4.5-4.5 0-2.485 2.017-4.5 4.5-4.5.632 0 1.236.13 1.779.366l1.106-.531 1.099.42 1.101-.42 1.106.531c.543-.236 1.147-.366 1.779-.366 2.483 0 4.5 2.015 4.5 4.5 0 .629-.141 1.227-.389 1.767z" />
            </svg>
            {t('share.wechat')}
          </button>
        )}

        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center justify-center px-4 py-3 bg-[#1DA1F2] text-white rounded-md hover:bg-[#1a8cd8] transition-colors text-base"
        >
          <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
          </svg>
          {t('share.twitter')}
        </button>

        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center px-4 py-3 bg-[#1877F2] text-white rounded-md hover:bg-[#166fe5] transition-colors text-base"
        >
          <svg className="w-14 h-14 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          {t('share.facebook')}
        </button>

        <button
          onClick={() => handleShare('copy')}
          className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-base"
        >
          <svg
            className="w-6 h-6 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
          </svg>
          {copied ? (currentLang === 'zh' ? '已复制!' : 'Copied!') : t('share.copyLink')}
        </button>

        <button
          onClick={() => handleShare('save')}
          disabled={generatingPoster}
          className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          <svg
            className="w-8 h-8 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {generatingPoster
            ? currentLang === 'zh'
              ? '生成中...'
              : 'Generating...'
            : t('share.saveImage')}
        </button>
      </div>
    </div>
  );
};
