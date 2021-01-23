import "./DeleteModal.css";
//Material UI
import Button from "@material-ui/core/Button";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import CancelIcon from "@material-ui/icons/Cancel";
import Divider from "@material-ui/core/Divider";
//Firebase
import { db } from "../firebase/Firebase";

const DeleteModal = ({ onClose, id, empId, name }) => {
  const DeleteDepartment = () => {
    db.collection("Departments").doc(id).delete();
    onClose();
  };

  const DeleteEmployee = () => {
    db.collection("Employees").doc(empId).delete();
    onClose();
  };

  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className='modal-title'>Sure you want to delete {name}?</h3>
          <Divider />
          <h5 className='modal-descritpion'>
            You will not be able to undo this action!
          </h5>
        </div>

        <div className='modal-buttons'>
          <Button
            onClick={onClose}
            color='inherit'
            startIcon={<CancelIcon style={{ color: "#303030" }} />}
          >
            Disagree
          </Button>
          <Button
            onClick={id ? DeleteDepartment : DeleteEmployee}
            color='inherit'
            startIcon={<DeleteSharpIcon style={{ color: "#E84216" }} />}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
