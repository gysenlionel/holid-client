import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

interface IModalUi {
  isShowModal: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const ModalUi: React.FunctionComponent<IModalUi> = ({
  isShowModal,
  onClose,
  title,
  className,
  children,
}) => {
  return (
    <div className={`absolute`}>
      <Modal
        open={isShowModal}
        onClose={() => onClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={`absolute top-2/4 left-2/4 w-96 -translate-x-2/4 -translate-y-2/4 
        transform rounded-2xl bg-grayX p-4 shadow-sm outline-none ${className}`}
        >
          <XMarkIcon
            className="absolute -right-2 top-0 h-6 w-6 -translate-y-2/4 cursor-pointer rounded-full border-grayX bg-white text-grayX"
            onClick={() => onClose(false)}
          />
          <h1 className="title1 text-center">{title}</h1>

          <div id="modal-modal-description" className="mt-2">
            {children}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalUi;
