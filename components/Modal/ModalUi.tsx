import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

interface IModalUi {
  showModal: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: JSX.Element | JSX.Element[];
}

const style = {
  // position: "absolute" as "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // width: 400,
  // boxShadow: 24,
  // p: 4,
};

const ModalUi: React.FunctionComponent<IModalUi> = ({
  showModal,
  onClose,
  title,
  children,
}) => {
  return (
    <div className="absolute">
      <Modal
        open={showModal}
        onClose={() => onClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="absolute top-2/4 left-2/4 w-96 -translate-x-2/4 -translate-y-2/4 
        transform rounded-2xl bg-grayX p-4 shadow-sm outline-none"
        >
          <XMarkIcon
            className="absolute -right-2 top-0 h-6 w-6 -translate-y-2/4 cursor-pointer rounded-full border-grayX bg-white text-grayX"
            onClick={() => onClose(false)}
          />
          <h1 className="title1 text-center">{title}</h1>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalUi;
