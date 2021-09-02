import { React, useEffect, useState } from "react";
import { setSelectedTag } from "../../actions/TagController";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import "./ListUserTable.css";
import API from "axios";
import { useHistory } from "react-router";

export default function ListUserTable() {
  const dispatch = useDispatch();
  const history = useHistory();
  const usersApiUrl =
    "https://p4gp6vy8c1.execute-api.us-east-2.amazonaws.com/dev/users";

  const userApiUrl =
    "https://p4gp6vy8c1.execute-api.us-east-2.amazonaws.com/dev/user";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiResult = await API.get(usersApiUrl);
      setUsers(apiResult.data.users);
      setLoading(false);
    } catch (error) {
      console.log(`List users fail : ${error}`);
    }
  };

  const handleDelete = async (userId) => {
    const userIdObj = { userId: userId };
    try {
      const apiResult = await API.delete(userApiUrl, userIdObj);
      if (apiResult) {
        console.log(`Delete success!`);
      }
    } catch (error) {
      console.log(`Delete fail :  ${error}`);
    }
  };

  const handleEdit = (userId) => {
    dispatch(setSelectedTag(0));
    history.push(`/createUser/${userId}`);
  };

  return (
    <div className="listUserTable__container">
      <TableContainer>
        <Table>
          <TableBody>
            {loading || !users ? (
              <TableRow>
                <TableCell>Loading</TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                return (
                  <TableRow key={user.userId}>
                    <TableCell component="th" scope="row">
                      <h4 className="userName">{user.name}</h4>
                      <p className="userDetails">
                        {user.email} | ({user.phone.slice(0, 3)})
                        {user.phone.slice(3, 7)}-{user.phone.slice(7)}
                        <br />
                        {user.address}
                      </p>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        style={{
                          color: "blueviolet",
                          backgroundColor: "white",
                        }}
                        className="cancel__btn"
                        variant="outlined"
                        onClick={() => handleEdit(user.userId)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        style={{
                          color: "blueviolet",
                          backgroundColor: "white",
                        }}
                        className="cancel__btn"
                        variant="outlined"
                        onClick={() => {
                          handleDelete(user.userId);
                        }}
                        type="submit"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
