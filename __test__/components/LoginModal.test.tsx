import { render, screen, waitFor } from "@testing-library/react";
import LoginModal from "../../components/Modal/LoginModal";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
  usePathname() {
    return "";
  },
}));
const setIsShowModal = jest.fn();
const isShowModal = true;
describe("LoginModal", () => {
  it("should enter username and password and click on login button", async () => {
    mockRouter.push("/");
    render(
      <LoginModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    );
    const loginButton = screen.getByRole("button", { name: "Log In" });
    await userEvent.type(screen.getByPlaceholderText(/Username/), "test");
    await userEvent.type(
      screen.getByPlaceholderText(/Password/),
      "password123"
    );
    await userEvent.click(loginButton);
  });

  const original = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  it("should enter username and empty password. Return 400 wrong password or username", async () => {
    mockRouter.push("/");
    render(
      <LoginModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    );
    const loginButton = screen.getByRole("button", { name: "Log In" });
    await userEvent.type(screen.getByPlaceholderText(/Username/), "test");
    await userEvent.type(screen.getByPlaceholderText(/Password/), " ");
    await userEvent.click(loginButton);
    await waitFor(() => {
      expect(
        screen.getByText("Wrong password or username")
      ).toBeInTheDocument();
    });
  });

  it("should enter empty username and password. Return 400 wrong password or username", async () => {
    mockRouter.push("/");
    render(
      <LoginModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    );
    const loginButton = screen.getByRole("button", { name: "Log In" });
    await userEvent.type(screen.getByPlaceholderText(/Username/), " ");
    await userEvent.type(screen.getByPlaceholderText(/Password/), "password");
    await userEvent.click(loginButton);
    await waitFor(() => {
      expect(
        screen.getByText("Wrong password or username")
      ).toBeInTheDocument();
    });
  });
  afterEach(() => {
    console.error = original;
  });
});
