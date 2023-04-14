import { render, fireEvent } from "@testing-library/react";
import Home from "..";
import Providers from "../providers";
import "@testing-library/jest-dom";

import { data } from "../mocks/products.mock.js";

describe("Home", () => {
  let screen: any;

  beforeEach(() => {
    screen = render(
      <Providers>
        <Home data={data} />
      </Providers>
    );
  });

  it("should getServerSideProps returns a list of products from the api", () => {
    const { getByText } = screen;
    expect(getByText("001")).toBeInTheDocument();
    expect(getByText("Produto 1")).toBeInTheDocument();

    expect(getByText("002")).toBeInTheDocument();
    expect(getByText("Produto 2")).toBeInTheDocument();
  });

  it("should show modal when clicking in the register product button", async () => {
    const { getByRole, queryByText } = screen;
    const registerButton = getByRole("button", { name: "Cadastrar novo produto" });

    const modalElement = queryByText("Cadastrar produto");
    expect(modalElement).not.toBeInTheDocument();

    fireEvent.click(registerButton);

    const modalTitle = queryByText("Cadastrar produto");
    expect(modalTitle).toBeInTheDocument();
  });

  it("should close the modal when clicking in the close button or outside modal", async () => {
    const { getByRole, queryByText, getByTestId } = screen;
    const registerButton = getByRole("button", { name: "Cadastrar novo produto" });

    fireEvent.click(registerButton);

    const modalTitle = queryByText("Cadastrar produto");
    const closeModalButton = getByTestId("close-modal");

    fireEvent.click(closeModalButton);

    expect(modalTitle).not.toBeInTheDocument();

    fireEvent.click(registerButton);

    const backdrop = getByRole("presentation");
    fireEvent.click(backdrop);

    expect(modalTitle).not.toBeInTheDocument();
  });

  // TODO: should appear an error when entering less than five characters in the "codigo" field
  // TODO: should appear an error when entering more than fifty characters in the "descricao" field
  // TODO: should convert the number to currency when filling in the "preco" field
  // TODO: should appear notification when trying to register an existing product
  // TODO: should open modal with product information when clicking product edit button
  // TODO: should disappear the product card when clicking the delete button
  // TODO: should appear notification when the product is created, edited and deleted
});
