// TodoItem.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

// Mock del ícono para evitar fallos al renderizar SVG
jest.mock('../Icons/IconTrash', () => () => <div data-testid="icon-trash" />);

describe("TodoItem Component", () => {

  const mockTask = {
    id: "123",
    text: "Tarea de prueba",
    isComplete: false
  };

  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza el texto de la tarea", () => {
    render(<TodoItem task={mockTask} onToggleComplete={mockToggle} onDeleteTask={mockDelete} />);
    
    expect(screen.getByText("Tarea de prueba")).toBeInTheDocument();
  });

  test("el checkbox refleja el estado de la tarea", () => {
    render(<TodoItem task={mockTask} onToggleComplete={mockToggle} onDeleteTask={mockDelete} />);
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("llama a onToggleComplete al cambiar el checkbox", () => {
    render(<TodoItem task={mockTask} onToggleComplete={mockToggle} onDeleteTask={mockDelete} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test("llama a onDeleteTask con el id correcto al darle clic en el botón", () => {
    render(<TodoItem task={mockTask} onToggleComplete={mockToggle} onDeleteTask={mockDelete} />);

    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith("123");
  });

  test("renderiza el ícono de la basura", () => {
    render(<TodoItem task={mockTask} onToggleComplete={mockToggle} onDeleteTask={mockDelete} />);
    
    expect(screen.getByTestId("icon-trash")).toBeInTheDocument();
  });

});
