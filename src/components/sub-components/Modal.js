const Modal = ({ showDetailsModal, setIsShowDetailsModal, overview }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={() => setIsShowDetailsModal(!showDetailsModal)}
        >
          &times;
        </span>
        <p>{overview ? overview : "Some text"}</p>
      </div>
    </div>
  );
};

export default Modal;
