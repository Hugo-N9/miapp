import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import ThemeContext from './ThemeContext';

// Componente simple de prueba que usa el contexto
const TestComponent = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  
  return (
    <div>
      <div data-testid="theme-value">{theme}</div>
      <button onClick={toggleTheme} data-testid="toggle-theme">
        Cambiar Tema
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  test('provee el tema inicial como "light"', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });

  test('cambia el tema de light a dark al llamar toggleTheme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Tema inicial es light
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    
    // Hacer clic en el botón para cambiar tema
    fireEvent.click(screen.getByTestId('toggle-theme'));
    
    // Ahora debe ser dark
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });

  test('cambia el tema de dark a light al llamar toggleTheme nuevamente', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Cambiar a dark
    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    
    // Cambiar de vuelta a light
    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });
});