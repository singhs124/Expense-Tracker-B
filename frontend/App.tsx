import React from 'react';
import { BankProvider } from './src/contexts/BankContext';
import { ErrorProvider } from './src/contexts/ErrorContext';
import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { OTPProvider } from './src/contexts/OTPContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import Navigation from './src/navigation/Navigation';

const App = () => (
  <ErrorProvider>
    <OTPProvider>
      <BankProvider>
        <ExpenseProvider>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </ExpenseProvider>
      </BankProvider>
    </OTPProvider>
  </ErrorProvider>
);

export default App;
