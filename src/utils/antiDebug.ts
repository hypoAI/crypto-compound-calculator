/**
 * Anti-debugging protection for production environments
 * Only activates in production builds, allows debugging in development
 */

// Check if we're in production environment
const isProduction = import.meta.env.PROD;

// Anti-debugging functions
const disableConsole = () => {
  if (!isProduction) return;

  const methods = ['log', 'warn', 'error', 'info', 'debug', 'table', 'clear'];
  methods.forEach(method => {
    (console as Recordable)[method] = () => {};
  });
};

const disableContextMenu = () => {
  if (!isProduction) return;

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    return false;
  });
};

const disableKeyboardShortcuts = () => {
  if (!isProduction) return;

  document.addEventListener('keydown', e => {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'U') ||
      (e.metaKey && e.altKey && ['I', 'J'].includes(e.key))
    ) {
      e.preventDefault();
      return false;
    }
  });
};

const disableSelection = () => {
  if (!isProduction) return;

  document.addEventListener('selectstart', e => {
    e.preventDefault();
    return false;
  });

  // Disable text selection via CSS
  const style = document.createElement('style');
  style.textContent = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
  `;
  document.head.appendChild(style);
};

const detectDevTools = () => {
  if (!isProduction) return;

  const threshold = 160;

  const detect = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      // Redirect or show warning
      window.location.href = 'about:blank';
    }
  };

  window.addEventListener('resize', detect);
  setInterval(detect, 1000);
};

const disableDebugger = () => {
  if (!isProduction) return;

  Object.defineProperty(window, 'debugger', {
    set: () => {},
    get: () => () => {},
    configurable: false,
    enumerable: false,
  });
};

const createObfuscationLayer = () => {
  if (!isProduction) return;

  // Create a transparent overlay to prevent right-click inspection
  const overlay = document.createElement('div');
  overlay.id = 'anti-debug-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    pointer-events: none;
    background: transparent;
    display: none;
  `;
  document.body.appendChild(overlay);
};

// Initialize all protections
export const initAntiDebug = () => {
  if (!isProduction) {
    console.log('Anti-debugging disabled in development');
    return;
  }

  // Run protections after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyProtections);
  } else {
    applyProtections();
  }
};

const applyProtections = () => {
  try {
    disableConsole();
    disableContextMenu();
    disableKeyboardShortcuts();
    disableSelection();
    detectDevTools();
    disableDebugger();
    createObfuscationLayer();
  } catch (error) {
    // Silently fail if any protection fails
    console.error('Anti-debug protection failed:', error);
  }
};

// Re-export for easier access
export default {
  init: initAntiDebug,
  isProduction,
};
