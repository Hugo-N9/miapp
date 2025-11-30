// ThemeSwitcher.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSwitcher from './ThemeSwitcher';
import ThemeContext from '../../context/ThemeContext';

// Mock de los íconos (para evitar errores por SVG)
jest.mock('../Icons/IconMoon', () => () => <div data-testid="icon-moon" />);
jest.mock('../Icons/IconSun', () => () => <div data-testid="icon-sun" />);

describe("ThemeSwitcher Component", () => {

  test("muestra el icono de luna cuando el tema es 'light'", () => {
    const mockToggleTheme = jest.fn();

    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: mockToggleTheme }}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-sun")).not.toBeInTheDocument();
  });

  test("muestra el icono de sol cuando el tema es 'dark'", () => {
    const mockToggleTheme = jest.fn();

    render(
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme: mockToggleTheme }}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-moon")).not.toBeInTheDocument();
  });

  test("ejecuta toggleTheme al hacer clic en el botón", () => {
    const mockToggleTheme = jest.fn();

    render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: mockToggleTheme }}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

});
