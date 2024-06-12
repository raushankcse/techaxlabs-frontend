import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";

const EditTaskModal = ({show, handleClose, handleSave, task}) => {
  const [title, setTitle]  = useState(task.title);

  const onSave = () => {
    handleSave(task.id, title);
    handleClose();
  };

  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      onSave();
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onSave}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;