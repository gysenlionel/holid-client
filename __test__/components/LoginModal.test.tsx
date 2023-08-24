import { useState } from "react";
import { render, screen } from "@testing-library/react";
import LoginModal from "../../components/Modal/LoginModal";

describe("LoginModal", () => {
  const [isShowModal, setIsShowModal] = useState(true);
  it("should enter username and password and click on login button", () => {
    render(
      <LoginModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    );
  });
});
