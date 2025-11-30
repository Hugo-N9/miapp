// UserDirectory.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDirectory from './UserDirectory';

describe("UserDirectory Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra mensaje de carga inicialmente", () => {
    global.fetch = jest.fn(() =>
      new Promise(() => {}) // promesa sin resolver (loading)
    );

    render(<UserDirectory />);
    expect(screen.getByText("Cargando usuarios...")).toBeInTheDocument();
  });

  test("muestra usuarios cuando la API responde correctamente", async () => {
    const mockUsers = [
      { id: 1, name: "Juan Pérez", email: "juan@test.com", website: "juan.com" },
      { id: 2, name: "Ana Lopez", email: "ana@test.com", website: "ana.com" }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers)
      })
    );

    render(<UserDirectory />);

    // Esperamos que la carga desaparezca
    await waitFor(() => {
      expect(screen.queryByText("Cargando usuarios...")).not.toBeInTheDocument();
    });

    // Validamos usuarios
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("Ana Lopez")).toBeInTheDocument();
  });

  test("muestra mensaje de error cuando fetch falla", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Fallo en la red"))
    );

    render(<UserDirectory />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });

    expect(screen.getByText("Error: Fallo en la red")).toBeInTheDocument();
  });

  test("muestra mensaje de error si response.ok es false", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false
      })
    );

    render(<UserDirectory />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });

    expect(screen.getByText("Error: La respuesta de la red no fue satisfactoria")).toBeInTheDocument();
  });

});
