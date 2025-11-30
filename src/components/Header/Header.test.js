import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
  const renderHeader = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

  test("muestra el componente Header", () => {
    renderHeader();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("muestra los links de navegación", () => {
    renderHeader();
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Tareas")).toBeInTheDocument();
    expect(screen.getByText("Directorio")).toBeInTheDocument();
  });

  test("muestra el logo SVG", () => {
    renderHeader();
    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toBeInTheDocument();
  });

  test("muestra el ThemeSwitcher", () => {
    renderHeader();
    expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
  });
});
