import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import SignUpModal from "../../components/Modal/SignUpModal";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { mockMatchMedia } from "../../utils/helpers/setupTest";

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
describe("Sign up Modal", () => {
  it("should enter user data and click on sign button", async () => {
    mockRouter.push("/");
    const { getByPlaceholderText } = render(
      <SignUpModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    );
    fireEvent.change(getByPlaceholderText(/Lastname/), {
      target: { value: "Bond" },
    });
    fireEvent.change(getByPlaceholderText(/Firstname/), {
      target: { value: "James" },
    });
    fireEvent.change(getByPlaceholderText(/Email/), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText(/Username/), {
      target: { value: "test" },
    });
    fireEvent.change(getByPlaceholderText(/Password/), {
      target: { value: "password123" },
    });
    const SignButton = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(SignButton);
  });

  const original = console.error;
  beforeEach(() => {
    mockMatchMedia();
    console.error = jest.fn();
  });

  it("should enter empty data. Return 400 fields required", async () => {
    mockRouter.push("/");
    const { getByPlaceholderText } = render(
      <SignUpModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    );
    fireEvent.change(getByPlaceholderText(/Lastname/), {
      target: { value: " " },
    });
    fireEvent.change(getByPlaceholderText(/Firstname/), {
      target: { value: " " },
    });
    fireEvent.change(getByPlaceholderText(/Email/), {
      target: { value: " " },
    });
    fireEvent.change(getByPlaceholderText(/Username/), {
      target: { value: " " },
    });
    fireEvent.change(getByPlaceholderText(/Password/), {
      target: { value: "password123" },
    });
    const SignButton = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(SignButton);

    await waitFor(() => {
      expect(
        screen.getByText("Lastname must be contain at least 2 characters")
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText("Firstname must be contain at least 2 characters")
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  it("should enter empty password. Return 400 Password is required", async () => {
    mockRouter.push("/");
    const { getByPlaceholderText } = render(
      <SignUpModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    );
    fireEvent.change(getByPlaceholderText(/Lastname/), {
      target: { value: "Bond" },
    });
    fireEvent.change(getByPlaceholderText(/Firstname/), {
      target: { value: "James" },
    });
    fireEvent.change(getByPlaceholderText(/Email/), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText(/Username/), {
      target: { value: "test" },
    });
    fireEvent.change(getByPlaceholderText(/Password/), {
      target: { value: " " },
    });
    const SignButton = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(SignButton);
    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should enter username in used. Return 400 Username is used", async () => {
    mockRouter.push("/");
    const { getByPlaceholderText } = render(
      <SignUpModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    );
    fireEvent.change(getByPlaceholderText(/Lastname/), {
      target: { value: "Bond" },
    });
    fireEvent.change(getByPlaceholderText(/Firstname/), {
      target: { value: "James" },
    });
    fireEvent.change(getByPlaceholderText(/Email/), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText(/Username/), {
      target: { value: "used" },
    });
    fireEvent.change(getByPlaceholderText(/Password/), {
      target: { value: "passowrd123" },
    });
    const SignButton = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(SignButton);
    await waitFor(() => {
      expect(screen.getByText("Username is used")).toBeInTheDocument();
    });
  });

  it("should enter invalid email. Return 400 Email is not valid", async () => {
    mockRouter.push("/");
    const { getByPlaceholderText } = render(
      <SignUpModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    );
    fireEvent.change(getByPlaceholderText(/Lastname/), {
      target: { value: "Bond" },
    });
    fireEvent.change(getByPlaceholderText(/Firstname/), {
      target: { value: "James" },
    });
    fireEvent.change(getByPlaceholderText(/Email/), {
      target: { value: "email@" },
    });
    fireEvent.change(getByPlaceholderText(/Username/), {
      target: { value: "test" },
    });
    fireEvent.change(getByPlaceholderText(/Password/), {
      target: { value: "passowrd123" },
    });
    const SignButton = screen.getByRole("button", { name: "Sign Up" });
    await userEvent.click(SignButton);
    await waitFor(() => {
      expect(screen.getByText("Email is not valid")).toBeInTheDocument();
    });
  });
  afterEach(() => {
    console.error = original;
  });
});
