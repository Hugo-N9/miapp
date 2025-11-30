// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

describe("Home Component", () => {

  test("muestra el título de bienvenida", () => {
    render(<Home />);
    expect(
      screen.getByText("Bienvenido a la Aplicación de Demostración")
    ).toBeInTheDocument();
  });

  test("muestra el mensaje explicativo", () => {
    render(<Home />);
    expect(
      screen.getByText(/Usa la navegación de arriba para visitar/i)
    ).toBeInTheDocument();
  });

});
