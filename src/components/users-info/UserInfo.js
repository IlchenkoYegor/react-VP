import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  blockUser,
  downgradeUser,
  upgradeUser,
} from "../../actions/userInfoActions";

export default function UserInfo({ user }) {
  const dispatch = useDispatch();
  const [isBlocked, setIsBlocked] = useState(user.blocked);
  const [isVolunteer, setIsVolunteer] = useState(
    user.roles.find((e) => e.authority == "VOLUNTEER")
  );
  const blockCallback = useCallback(() => {
    dispatch(blockUser(user.username, true));
    setIsBlocked(true);
  }, [user]);
  const unblockCallback = useCallback(() => {
    dispatch(blockUser(user.username, false));
    setIsBlocked(false);
  }, [user]);

  const roleGainedCallback = useCallback(() => {
    dispatch(upgradeUser(user.username));
    setIsVolunteer(true);
  }, [user]);
  const roleTakenCallback = useCallback(() => {
    dispatch(downgradeUser(user.username));
    setIsVolunteer(false);
  }, [user]);
  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.secondName}</td>
      <td>{user.username}</td>
      <td>
        {!isBlocked ? (
          <Button onClick={() => blockCallback()}>Block</Button>
        ) : (
          <Button onClick={() => unblockCallback()}>Unblock</Button>
        )}
      </td>
      <td>{user.roles.map((e) => e.authority).join(", ")}</td>
      <td>
        {!isVolunteer ? (
          <Button
            onClick={() => {
              roleGainedCallback();
            }}
          >
            UPGRADE
          </Button>
        ) : (
          <Button
            onClick={() => {
              roleTakenCallback();
            }}
          >
            DOWNGRADE
          </Button>
        )}{" "}
      </td>
      <td>{user.cityName}</td>
    </tr>
  );
}

UserInfo.propTypes = { user: {} };
