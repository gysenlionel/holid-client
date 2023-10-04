import { render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import ReserveModal from "../../components/Modal/ReserveModal";
import { rooms } from "../data/room";
import { hotel } from "../data/hotel";

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
const days = 1;
const startDate = new Date();
startDate.setHours(0, 0, 0, 0);
const date = new Date();
date.setHours(0, 0, 0, 0);
const endDateTime = date.setDate(date.getDate() + 1);
const endDate = new Date(endDateTime);
describe("ReserveModal", () => {
  it("should selected room and click on reserved button", async () => {
    mockRouter.push("/");
    const { getByTestId } = render(
      <ReserveModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        days={days}
        endDate={endDate}
        optionsSate='{"adult":1,"children":0,"room":1}'
        property={hotel}
        rooms={rooms}
        startDate={startDate}
        userId="62ab369d278fb8a149f4f037"
      />
    );
    const roomCheckbox = screen.getByLabelText(
      rooms[0].roomNumbers[0].number.toString()
    );
    const roomCheckboxChecked = screen.getByLabelText(
      rooms[1].roomNumbers[0].number.toString()
    );

    expect(roomCheckboxChecked).toBeDisabled();
    const reservedButton = screen.getByRole("button", {
      name: "Reserved here",
    });

    await userEvent.click(reservedButton);
    await waitFor(() => {
      expect(screen.getByText("* Please select a room.")).toBeInTheDocument();
    });

    await userEvent.click(roomCheckbox);
    await waitFor(() => {
      expect(roomCheckbox).toBeChecked();
    });
    await userEvent.click(reservedButton);
  });
});
