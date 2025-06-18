import React, { useState } from "react";
import "./App.css";

/**
 * Main Container for BasicCalc
 * A responsive calculator UI with basic arithmetic, light theme, and grid arrangement.
 */
// PUBLIC_INTERFACE
function App() {
  // Calculator state
  const [display, setDisplay] = useState("0");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [value, setValue] = useState(null);

  // Handle digit or dot
  // PUBLIC_INTERFACE
  function inputDigit(digit) {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" && digit !== "." ? digit : display + digit);
    }
  }

  // PUBLIC_INTERFACE
  function inputDot() {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  // PUBLIC_INTERFACE
  function clearAll() {
    setDisplay("0");
    setWaitingForOperand(false);
    setOperator(null);
    setValue(null);
  }

  // PUBLIC_INTERFACE
  function toggleSign() {
    setDisplay((display[0] === "-" ? display.slice(1) : "-" + display));
  }

  // PUBLIC_INTERFACE
  function inputPercent() {
    const num = parseFloat(display);
    setDisplay(String(num / 100));
    setValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }

  // PUBLIC_INTERFACE
  function performOperation(nextOperator) {
    const inputValue = parseFloat(display);

    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value;
      let newValue = currentValue;

      switch (operator) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "*":
          newValue = currentValue * inputValue;
          break;
        case "÷":
          newValue = inputValue !== 0 ? currentValue / inputValue : "Error";
          break;
        default:
          break;
      }
      setValue(newValue === "Error" ? null : newValue);
      setDisplay(String(newValue));
      if (newValue === "Error") {
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
    }
    setOperator(nextOperator !== "=" ? nextOperator : null);
    setWaitingForOperand(true);
  }

  // Button configuration for grid layout
  const buttons = [
    [
      { label: "C", handler: clearAll, type: "secondary" },
      { label: "+/-", handler: toggleSign, type: "secondary" },
      { label: "%", handler: inputPercent, type: "secondary" },
      { label: "÷", handler: () => performOperation("÷"), type: "accent" }
    ],
    [
      { label: "7", handler: () => inputDigit("7"), type: "number" },
      { label: "8", handler: () => inputDigit("8"), type: "number" },
      { label: "9", handler: () => inputDigit("9"), type: "number" },
      { label: "*", handler: () => performOperation("*"), type: "accent" }
    ],
    [
      { label: "4", handler: () => inputDigit("4"), type: "number" },
      { label: "5", handler: () => inputDigit("5"), type: "number" },
      { label: "6", handler: () => inputDigit("6"), type: "number" },
      { label: "-", handler: () => performOperation("-"), type: "accent" }
    ],
    [
      { label: "1", handler: () => inputDigit("1"), type: "number" },
      { label: "2", handler: () => inputDigit("2"), type: "number" },
      { label: "3", handler: () => inputDigit("3"), type: "number" },
      { label: "+", handler: () => performOperation("+"), type: "accent" }
    ],
    [
      { label: "0", handler: () => inputDigit("0"), type: "number", style: { gridColumn: "span 2" } },
      { label: ".", handler: inputDot, type: "number" },
      { label: "=", handler: () => performOperation("="), type: "primary" }
    ]
  ];

  return (
    <div className="basiccalc-app">
      <header className="bc-header">
        <span className="bc-logo" style={{ color: "#4CAF50" }}>BasicCalc</span>
      </header>
      <main className="bc-main">
        <section className="bc-calculator-container">
          <div className="bc-display" data-testid="bc-display">{display.length > 12 ? Number(display).toExponential(5) : display}</div>
          <div className="bc-buttons-grid">
            {/* Render buttons in grid */}
            {buttons.map((row, i) => (
              <React.Fragment key={i}>
                {row.map((btn, j) => (
                  <button
                    key={btn.label}
                    className={`bc-btn bc-btn-${btn.type}`}
                    onClick={btn.handler}
                    style={btn.style}
                    aria-label={btn.label}
                  >{btn.label}</button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>
      <footer className="bc-footer">
        <span className="bc-footer-text">A simple calculator &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

export default App;