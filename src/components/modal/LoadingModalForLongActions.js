import React, { useCallback } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { longLoading } from "../../actions/loadingActions";

function LoadingModalForLongActions({ waitingForLongResponse }) {
  const dispatch = useDispatch();

  const handleClose = useCallback((e) => {
    e.preventDefault();
    dispatch(longLoading(false, ""));
  });
  return (
    <div>
      <Modal show={waitingForLongResponse !== ""} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Wait!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Container>
            {waitingForLongResponse !== "" && waitingForLongResponse}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { waitingForLongResponse: state.loading.textOfLongLoading };
};
export default connect(mapStateToProps)(LoadingModalForLongActions);
