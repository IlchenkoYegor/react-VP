import React from "react";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import style from "./modal.module.css";

function MainLoadingModal({ mainLoading }) {
  return (
    <div>
      <Modal
        show={mainLoading}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
        contentClassName={style["modal-content"]}
        style={{ background: "" }}
        centered
      >
        <Modal.Body className="text-center" style={{ color: "white" }}>
          <Spinner size="3x"></Spinner>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mainLoading: state.loading.mainLoading,
  };
};

export default connect(mapStateToProps, null)(MainLoadingModal);
