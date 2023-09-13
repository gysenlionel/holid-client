import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import * as React from "react";
import { Provider } from "react-redux";
import { format } from "date-fns";
import { PersistGate } from "redux-persist/integration/react";
import BookingBar from "../../components/BookingBar";
import { makeStore } from "../../store/store";

jest.mock("next/router", () => ({
  push: jest.fn(),
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
describe("Sign up Modal", () => {
  const store = makeStore();
  it("should click on composition familial audut/children/room and check their values", async () => {
    mockRouter.push("/");

    const { getAllByTestId, getByTestId } = render(
      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={null}>
          <BookingBar variant="bookingBarClassic" />
        </PersistGate>
      </Provider>
    );
    await userEvent.click(getByTestId("compFam"));
    const adultsPlus = getAllByTestId("adult-plus");
    const adultsMin = getAllByTestId("adult-min");
    const childrenPlus = getAllByTestId("children-plus");
    const childrenMin = getAllByTestId("children-min");
    const roomsMin = getAllByTestId("room-min");
    const roomsPlus = getAllByTestId("room-plus");
    await userEvent.click(adultsPlus[0]);
    await userEvent.click(childrenPlus[0]);
    await userEvent.click(roomsPlus[0]);
    await waitFor(() => {
      expect(
        screen.getByText("2 Adults • 1 children • 2 rooms")
      ).toBeInTheDocument();
    });
    await userEvent.click(adultsMin[0]);
    await userEvent.click(childrenMin[0]);
    await userEvent.click(roomsMin[0]);
    await waitFor(() => {
      expect(
        screen.getByText("1 Adult • 0 children • 1 room")
      ).toBeInTheDocument();
    });
  });

  it("should click on date picker and check their values", async () => {
    mockRouter.push("/");
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={null}>
          <BookingBar variant="bookingBarClassic" />
        </PersistGate>
      </Provider>
    );
    await userEvent.click(getByTestId("date-picker"));
    fireEvent.change(getByPlaceholderText(/Early/), {
      target: { value: "Sep 8, 2023" },
    });
    fireEvent.change(getByPlaceholderText(/Continuous/), {
      target: { value: "Sep 9, 2023" },
    });
    await waitFor(() => {
      expect(getByPlaceholderText(/Early/)).toHaveValue("Sep 8, 2023");
      expect(getByPlaceholderText(/Continuous/)).toHaveValue("Sep 9, 2023");
    });
  });

  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  it("should all data in booking bar click on search and check their values in router", async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);
    const { getAllByTestId, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={null}>
          <BookingBar variant="bookingBarClassic" />
        </PersistGate>
      </Provider>
    );
    await userEvent.click(getByTestId("compFam"));
    const adultsPlus = getAllByTestId("adult-plus");
    const childrenPlus = getAllByTestId("children-plus");
    const roomsPlus = getAllByTestId("room-plus");
    await userEvent.click(adultsPlus[0]);
    await userEvent.click(childrenPlus[0]);
    await userEvent.click(roomsPlus[0]);

    await userEvent.click(getByTestId("date-picker"));
    let date = new Date();
    const dateResponse = format(date, "dd-MM-yyyy");
    const tomorrow = date.setDate(date.getDate() + 1);
    const tomorrowDateResponse = format(tomorrow, "dd-MM-yyyy");
    const dateString = format(date, "PPpp").split(",").splice(0, 2).toString();
    const tomorrowString = format(tomorrow, "PPpp")
      .split(",")
      .splice(0, 2)
      .toString();

    fireEvent.change(getByPlaceholderText(/Where are you going\?/), {
      target: { value: "Brussels" },
    });
    fireEvent.change(getByPlaceholderText(/Early/), {
      target: { value: dateString },
    });
    fireEvent.change(getByPlaceholderText(/Continuous/), {
      target: { value: tomorrowString },
    });

    const SearchButton = screen.getByRole("button", { name: "Search" });
    await userEvent.click(SearchButton);
    expect(router.push).toHaveBeenCalledWith({
      pathname: "/stays",
      query: {
        dates: `{"startDate":${JSON.stringify(
          dateResponse
        )},"endDate":${JSON.stringify(
          tomorrowDateResponse
        )},"key":"selection"}`,
        destination: "Brussels",
        options: '{"adult":2,"children":1,"room":2}',
      },
    });
  });
});
