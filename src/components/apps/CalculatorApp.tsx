import React, { useState, useEffect, useCallback } from 'react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const handleNumber = useCallback((digit: string) => {
    setDisplay((prevDisplay) => {
      if (prevDisplay === '0' || shouldResetDisplay) {
        setShouldResetDisplay(false);
        return digit;
      } else {
        return prevDisplay.length < 12 ? prevDisplay + digit : prevDisplay;
      }
    });
  }, [shouldResetDisplay]);

  const handleDecimal = useCallback(() => {
    setDisplay((prevDisplay) => {
      if (shouldResetDisplay) {
        setShouldResetDisplay(false);
        return '0.';
      }
      return prevDisplay.includes('.') ? prevDisplay : prevDisplay + '.';
    });
  }, [shouldResetDisplay]);

  const handleOperator = useCallback((op: string) => {
    setDisplay((currentDisplay) => {
      setEquation(`${currentDisplay} ${op}`);
      setShouldResetDisplay(true);
      return currentDisplay;
    });
  }, []);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  }, []);

  const handleBackspace = useCallback(() => {
    setDisplay((prevDisplay) => {
      if (shouldResetDisplay || prevDisplay.length <= 1 || prevDisplay === 'Error') {
        setShouldResetDisplay(false);
        return '0';
      }
      return prevDisplay.slice(0, -1);
    });
  }, [shouldResetDisplay]);

  const handleToggleSign = useCallback(() => {
    setDisplay((prevDisplay) => {
      if (prevDisplay === '0') return prevDisplay;
      return prevDisplay.startsWith('-') ? prevDisplay.slice(1) : '-' + prevDisplay;
    });
  }, []);

  const handlePercentage = useCallback(() => {
    setDisplay((prevDisplay) => {
      const val = parseFloat(prevDisplay);
      return isNaN(val) ? prevDisplay : (val / 100).toString();
    });
  }, []);

  const handleEvaluate = useCallback(() => {
    setEquation((currentEquation) => {
      if (!currentEquation) return currentEquation;
      const parts = currentEquation.split(' ');
      const firstNum = parseFloat(parts[0]);
      const operator = parts[1];

      setDisplay((currentDisplay) => {
        const secondNum = parseFloat(currentDisplay);
        if (isNaN(firstNum) || isNaN(secondNum)) return currentDisplay;

        let result = 0;
        switch (operator) {
          case '+':
            result = firstNum + secondNum;
            break;
          case '-':
            result = firstNum - secondNum;
            break;
          case '×':
            result = firstNum * secondNum;
            break;
          case '÷':
            if (secondNum === 0) {
              setShouldResetDisplay(true);
              return 'Error';
            }
            result = firstNum / secondNum;
            break;
          default:
            return currentDisplay;
        }

        const resultStr = Number.isInteger(result)
          ? result.toString()
          : result.toFixed(4).replace(/\.?0+$/, '');

        setShouldResetDisplay(true);
        return resultStr;
      });

      return '';
    });
  }, []);

  const handleButtonClick = useCallback((btn: string) => {
    setActiveBtn(btn);
    setTimeout(() => setActiveBtn(null), 150);

    if (btn >= '0' && btn <= '9') {
      handleNumber(btn);
    } else if (btn === '.') {
      handleDecimal();
    } else if (btn === 'C') {
      handleClear();
    } else if (btn === '±') {
      handleToggleSign();
    } else if (btn === '%') {
      handlePercentage();
    } else if (btn === '=') {
      handleEvaluate();
    } else {
      handleOperator(btn);
    }
  }, [handleNumber, handleDecimal, handleClear, handleToggleSign, handlePercentage, handleEvaluate, handleOperator]);

  // Full Keyboard & Numpad Listener Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an open input/textarea field elsewhere
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      const key = e.key;

      if (key >= '0' && key <= '9') {
        e.preventDefault();
        handleButtonClick(key);
      } else if (key === '.' || key === ',') {
        e.preventDefault();
        handleButtonClick('.');
      } else if (key === '+' || key === '-') {
        e.preventDefault();
        handleButtonClick(key);
      } else if (key === '*' || key.toLowerCase() === 'x') {
        e.preventDefault();
        handleButtonClick('×');
      } else if (key === '/') {
        e.preventDefault();
        handleButtonClick('÷');
      } else if (key === '=' || key === 'Enter') {
        e.preventDefault();
        handleButtonClick('=');
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        e.preventDefault();
        handleButtonClick('C');
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (key === '%') {
        e.preventDefault();
        handleButtonClick('%');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleButtonClick, handleBackspace]);

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <div className="flex flex-col h-full w-full bg-cosmos-bg/95 p-4 text-cosmos-text-primary select-none">
      {/* Calculator Display Screen */}
      <div className="h-24 bg-black/60 border border-white/10 rounded-lg p-3 flex flex-col justify-between items-end mb-4 font-mono">
        <span className="text-xs text-cosmos-text-muted">{equation || 'CALCULATOR'}</span>
        <span className="text-3xl font-bold text-cosmos-lime-bright tracking-tight truncate max-w-full">
          {display}
        </span>
      </div>

      {/* Calculator Keypad with Active Keyboard Feedback */}
      <div className="flex-1 grid grid-cols-4 gap-2">
        {buttons.map((row, rIdx) =>
          row.map((btn, bIdx) => {
            const isOperator = ['÷', '×', '-', '+', '='].includes(btn);
            const isControl = ['C', '±', '%'].includes(btn);
            const isZero = btn === '0';
            const isActive = activeBtn === btn;

            return (
              <button
                key={`${rIdx}-${bIdx}`}
                onClick={() => handleButtonClick(btn)}
                className={`rounded-md font-mono text-sm font-semibold transition-all active:scale-95 flex items-center justify-center ${
                  isZero ? 'col-span-2' : ''
                } ${
                  isActive ? 'ring-2 ring-cosmos-lime scale-95 brightness-125' : ''
                } ${
                  isOperator
                    ? 'bg-cosmos-lime text-black shadow-lime-glow hover:bg-cosmos-lime-bright'
                    : isControl
                    ? 'bg-white/15 text-white hover:bg-white/25'
                    : 'bg-cosmos-container-high/60 border border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {btn}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
