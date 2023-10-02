import { render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import Profil from "../../../pages/profil";
import { user } from "../../data/user";
import { UserProvider } from "../../../contexts/user-context";

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

describe("ReserveModal", () => {
  it("should fill the input with an empty string and click on valid button (error required)", async () => {
    mockRouter.push("/");
    const { getAllByTestId } = render(
      <UserProvider initialUser={user}>
        <Profil user={user} />
      </UserProvider>
    );
    const pencils = getAllByTestId("pencil");
    await userEvent.click(pencils[0]);
    const submits = getAllByTestId("submit");

    // Name section
    const lastname = screen.getByPlaceholderText(/Lastname/);
    const firstname = screen.getByPlaceholderText(/Firstname/);
    await userEvent.clear(lastname);
    await userEvent.clear(firstname);
    await userEvent.click(submits[0]);

    expect(
      await screen.findByText("Firstname is required")
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Firstname is required")).toBeInTheDocument();
      expect(screen.getByText("Lastname is required")).toBeInTheDocument();
    });
  });

  it("should fill address with an empty string and click on valid button (error required)", async () => {
    mockRouter.push("/");
    const { getAllByTestId } = render(
      <UserProvider initialUser={user}>
        <Profil user={user} />
      </UserProvider>
    );
    delete user.firstname;
    delete user.lastname;
    const pencils = getAllByTestId("pencil");
    await userEvent.click(pencils[1]);
    const submits = getAllByTestId("submit");

    // Address section
    const address = screen.getByPlaceholderText(/Address/);
    const city = screen.getByPlaceholderText(/City/);
    await userEvent.clear(address);
    await userEvent.clear(city);

    await userEvent.click(submits[1]);
    await waitFor(() => {
      expect(
        screen.getByText("Address must be contain at least 2 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("City must be contain at least 2 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Country must be contain at least 1 character")
      ).toBeInTheDocument();
    });
  });
  it("should fill password with an empty string and click on valid button (error required)", async () => {
    mockRouter.push("/");
    const { getAllByTestId } = render(
      <UserProvider initialUser={user}>
        <Profil user={user} />
      </UserProvider>
    );
    const pencils = getAllByTestId("pencil");
    await userEvent.click(pencils[2]);
    const submits = getAllByTestId("submit");

    // // Password section
    await userEvent.click(submits[2]);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });
});
