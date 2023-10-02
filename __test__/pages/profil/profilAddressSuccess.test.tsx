import { fireEvent, render, screen } from "@testing-library/react";
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
  it("should fill the input address section and click on valid button", async () => {
    mockRouter.push("/");
    const { getByTestId, getAllByTestId, getByPlaceholderText, getByRole } =
      render(
        <UserProvider initialUser={user}>
          <Profil user={user} />
        </UserProvider>
      );
    const pencils = getAllByTestId("pencil");
    await userEvent.click(pencils[1]);
    const submits = getAllByTestId("submit");
    delete user.firstname;
    delete user.lastname;

    // Name section
    fireEvent.change(getByPlaceholderText(/Address/), {
      target: { value: "Avenue du test 1" },
    });
    fireEvent.change(getByPlaceholderText(/City/), {
      target: { value: "Brussels" },
    });
    const dropdownButton = screen.getByRole("button");
    await userEvent.click(dropdownButton);
    await userEvent.click(screen.getByText(/Belgium/));
    await userEvent.click(submits[0]);
    setTimeout(() => {
      expect(
        screen.getByText("Your profil has been updated")
      ).toBeInTheDocument();
    }, 1000);
  }, 7000);
});
