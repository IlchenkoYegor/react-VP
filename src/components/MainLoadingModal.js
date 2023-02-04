import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';

 function MainLoadingModal({mainLoading}) {

  return (
    <div>

      <Modal
        show={mainLoading}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        
        <Modal.Body>
          <Spinner></Spinner>
        </Modal.Body>
      </Modal>
      </div>
  );
}

const mapStateToProps = (state) =>{
    return {
        mainLoading: state.loading.mainLoading
    }
}

export default connect(mapStateToProps, null)(MainLoadingModal)