import DeleteModal from "./DeleteModal/DeleteModal";
import EditModal from "./EditModal/EditModal";

function ModalComponent({
  state,
  hide,
  category,
  modalType,
  clickedImage,
  images,
  setImages,
}) {
  if (modalType === "delete") {
    return (
      <DeleteModal
        state={state}
        hide={hide}
        category={category}
        clickedImage={clickedImage}
        images={images}
        setImages={setImages}
      />
    );
  } else {
    return (
      <EditModal
        state={state}
        hide={hide}
        category={category}
        clickedImage={clickedImage}
        images={images}
        setImages={setImages}
      />
    );
  }
}

export default ModalComponent;
