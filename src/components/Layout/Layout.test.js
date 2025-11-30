// Layout.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './Layout';

// Mock del componente Header
jest.mock('../Header/Header', () => () => <div data-testid="header" />);

// Mock de Outlet de react-router-dom
jest.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet" />
}));

describe("Layout Component", () => {

  test("renderiza el componente Header", () => {
    render(<Layout />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("renderiza el Outlet dentro del main", () => {
    render(<Layout />);
    
    const outlet = screen.getByTestId("outlet");
    expect(outlet).toBeInTheDocument();

    // asegurar que está dentro de <main>
    const main = screen.getByRole("main");
    expect(main).toContainElement(outlet);
  });

});
