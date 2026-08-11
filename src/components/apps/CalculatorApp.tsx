import React, { useState } from 'react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (digit: string) => {
    if (display === '0' || shouldResetDisplay) {
      setDisplay(digit);
      setShouldResetDisplay(false);
    } else {
      if (display.length < 12) {
        setDisplay(display + digit);
      }
    }
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op: string) => {
    setEquation(`${display} ${op}`);
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const handleToggleSign = () => {
    if (display === '0') return;
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
  };

  const handlePercentage = () => {
    const val = parseFloat(display);
    if (!isNaN(val)) {
      setDisplay((val / 100).toString());
    }
  };

  const handleEvaluate = () => {
    if (!equation) return;
    const parts = equation.split(' ');
    const firstNum = parseFloat(parts[0]);
    const operator = parts[1];
    const secondNum = parseFloat(display);

    if (isNaN(firstNum) || isNaN(secondNum)) return;

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
          setDisplay('Error');
          setEquation('');
          setShouldResetDisplay(true);
          return;
        }
        result = firstNum / secondNum;
        break;
      default:
        return;
    }

    const resultStr = Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, '');
    setDisplay(resultStr);
    setEquation('');
    setShouldResetDisplay(true);
  };

  const handleButtonClick = (btn: string) => {
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
  };

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

      {/* Calculator Keypad */}
      <div className="flex-1 grid grid-cols-4 gap-2">
        {buttons.map((row, rIdx) =>
          row.map((btn, bIdx) => {
            const isOperator = ['÷', '×', '-', '+', '='].includes(btn);
            const isControl = ['C', '±', '%'].includes(btn);
            const isZero = btn === '0';

            return (
              <button
                key={`${rIdx}-${bIdx}`}
                onClick={() => handleButtonClick(btn)}
                className={`rounded-md font-mono text-sm font-semibold transition-all active:scale-95 flex items-center justify-center ${
                  isZero ? 'col-span-2' : ''
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
