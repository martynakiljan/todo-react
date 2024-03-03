/** @format */
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import "../App.css";

const ConfirmationModal = ({ closeModalandDelete, closeModalandDoNothing }) => {
  return (
    <>
      <div className="confirmation-modal__bg"></div>
      <div className="confirmation-modal">
        <Alert
          variant="outlined"
          severity="warning"
          sx={{ bgcolor: "background.paper" }}
        >
          this operation is irreversible. Are you sure ?
          <div>
            <Button
              sx={{ m: 2 }}
              variant="contained"
              onClick={closeModalandDoNothing}
            >
              NO
            </Button>
            <Button
              sx={{ m: 2 }}
              variant="outlined"
              onClick={closeModalandDelete}
            >
              YES
            </Button>
          </div>
        </Alert>
      </div>
    </>
  );
};

export default ConfirmationModal;
