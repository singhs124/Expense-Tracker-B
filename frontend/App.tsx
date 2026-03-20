import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { BankProvider } from './src/contexts/BankContext';
import { ErrorProvider } from './src/contexts/ErrorContext';
import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { OTPProvider } from './src/contexts/OTPContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { UserProvider } from './src/contexts/UserContext';
import Navigation from './src/navigation/Navigation';

const App = () => (
  <ErrorProvider>
    <OTPProvider>
      <UserProvider>
        <BankProvider>
          <ExpenseProvider>
            <ThemeProvider>
              <AuthProvider>
                <Navigation />
              </AuthProvider>
            </ThemeProvider>
          </ExpenseProvider>
        </BankProvider>
      </UserProvider>
    </OTPProvider>
  </ErrorProvider>
);

export default App;
