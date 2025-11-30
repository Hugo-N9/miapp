import { render, screen } from "@testing-library/react";
import Error404 from "./Error404";

describe("Error404 Component", () => {
  test("muestra el mensaje 404", () => {
    render(<Error404 />);
    expect(screen.getByText("404 - Página no encontrada")).toBeInTheDocument();
  });

  test("muestra el texto de explicación", () => {
    render(<Error404 />);
    expect(
      screen.getByText("Lo sentimos, no pudimos encontrar la página que estás buscando.")
    ).toBeInTheDocument();
  });
});
