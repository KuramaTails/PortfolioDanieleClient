import AddModal from "./AddModal/AddModal";
import EditModal from "./EditModal/EditModal";

function ModalComponent({ state, hide, type, modalType, clickedProject }) {
  if (modalType === "add") {
    return <AddModal state={state} hide={hide} type={type} />;
  } else {
    return (
      <EditModal
        state={state}
        hide={hide}
        type={type}
        clickedProject={clickedProject}
      />
    );
  }
}

export default ModalComponent;
