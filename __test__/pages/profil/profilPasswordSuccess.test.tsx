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
  it("should fill the input name section and click on valid button", async () => {
    mockRouter.push("/");
    const { getAllByTestId, getByPlaceholderText } = render(
      <UserProvider initialUser={user}>
        <Profil user={user} />
      </UserProvider>
    );
    const pencils = getAllByTestId("pencil");
    await userEvent.click(pencils[2]);
    const submits = getAllByTestId("submit");

    // Password section
    fireEvent.change(getByPlaceholderText(/Password/), {
      target: { value: "Password456" },
    });
    await userEvent.click(submits[2]);

    setTimeout(() => {
      expect(
        screen.getByText("Your profil has been updated")
      ).toBeInTheDocument();
    }, 500);
  });
});
