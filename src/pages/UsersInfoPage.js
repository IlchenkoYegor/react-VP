import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Pagination, Table } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { mainLoading } from "../actions/loadingActions";
import { getAllUsers } from "../actions/userInfoActions";
import UserInfo from "../components/users-info/UserInfo";
// eslint-disable-next-line no-unused-vars
import styles from "../heights.module.css";

const USERS_PER_PAGE = 20;

function UsersInfoPage({ userList }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [usersCount, setUsersCount] = useState(0);
  const useFetchingDispatch = (e) =>
    useEffect(() => {
      dispatch(e(page - 1));
    }, [page]);
  const useFetching = (e) =>
    useEffect(() => {
      e();
    }, []);

  useFetchingDispatch(getAllUsers);

  useFetching(() => {
    dispatch(mainLoading(true));
    axios.get("/admin/getUserCount").then((onF) => {
      setUsersCount(onF.data);
    });
    dispatch(mainLoading(false));
  });

  const amountOfPages = Math.floor(usersCount / USERS_PER_PAGE) + 1;

  return (
    <div>
      <div className="text-center display-3 pt-2 pb-4 text-bg-primary">
        Users list
      </div>
      <div className={styles["page-height-userlist"]}>
        <Container className=" d-flex flex-column justify-content-between">
          <Table className="fs-5">
            <thead>
              <tr>
                <td scope="col">First Name</td>
                <td scope="col">Second Name</td>
                <td scope="col">Email</td>
                <td scope="col">Blocked</td>
                <td scope="col">Role</td>
                <td scope="col">Update User</td>
                <td scope="col">City</td>
              </tr>
            </thead>

            <tbody>
              {userList.map((user, ind) => {
                return <UserInfo user={user} key={ind}></UserInfo>;
              })}
            </tbody>
          </Table>
          <Pagination className="text-center align-self-center">
            <Pagination.First
              onClick={() => {
                setPage(1);
              }}
              disabled={page - 2 < 1}
            >
              {page - 2 < 1 ? 0 : 1}
            </Pagination.First>
            <Pagination.Prev
              disabled={page - 1 < 1}
              onClick={() => {
                setPage((page) => page - 1);
              }}
            >
              {page - 1 < 1 ? 0 : page - 1}
            </Pagination.Prev>
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next
              disabled={page > amountOfPages - 1}
              onClick={() => {
                setPage((page) => page + 1);
              }}
            >
              {page > amountOfPages - 1 ? 0 : page + 1}
            </Pagination.Next>
            <Pagination.Last
              onClick={() => {
                setPage(amountOfPages);
              }}
              disabled={page > amountOfPages - 2}
            >
              {page > amountOfPages - 2 ? 0 : amountOfPages}
            </Pagination.Last>
          </Pagination>
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ userList: state.userList });

export default connect(mapStateToProps, null)(UsersInfoPage);
