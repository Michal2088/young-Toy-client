import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbacksService";
import {
  changeIsUserAdmin,
  checkUserNum,
  deleteUser,
  getAllUsers,
} from "../services/userService";

interface UserManagementProps {}

const UserManagement: FunctionComponent<UserManagementProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [userNum, setUserNum] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkUserNum()
      .then((result) => {
        setUserNum(result.data);
      })
      .catch((err) => console.log(err));

    getAllUsers()
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, [isChanged]);

  const [value, setValue] = useState<string>("");

  let afterFilter: User[] = users.filter((user: User) => {
    return user.name?.toLowerCase().includes(value.toLowerCase());
  });

  const handleChangeIsAdmin = (user: User) => {
    changeIsUserAdmin(user._id as string)
      .then(() => {
        successMsg(`You have successfully changed the isAdmin field`);
        setIsChanged(!isChanged);
      })
      .catch((err) => {
        errorMsg(err.response.data);
      });
  };

  const handleDeleteUser = (user: User) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(user._id as string)
        .then(() => {
          successMsg(`${user.name} deleted successfully`);
          setIsChanged(!isChanged);
        })
        .catch((err) => {
          errorMsg(err.response.data);
        });
    }
  };

  return (
    <>
      <div className="d-none d-lg-block">
        <div className="container d-flex flex-column min-vh-100">
          <h3 className="headerColor">All users</h3>
          <h2 className="hToo text-center">you have {userNum} users</h2>
          <div className="input-group m-5">
            <input
              type="text"
              className="form-control"
              value={value}
              placeholder="Search for user"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Search
            </button>
          </div>

          <table className="table m-5 fs-4">
            <thead>
              <tr>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">isAdmin</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>

            <tbody>
              {afterFilter.length ? (
                afterFilter.map((user: User) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td
                      className="cursor"
                      onClick={() => handleChangeIsAdmin(user)}
                    >
                      {user.isAdmin ? "admin" : "no admin"}
                    </td>
                    <td
                      onClick={() => handleDeleteUser(user)}
                      className="text-danger"
                    >
                      <i className="fa-solid fa-trash m-1"></i>
                    </td>
                  </tr>
                ))
              ) : (
                <p>no users</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-block d-lg-none">
        <h3 className="hToo text-center">All users</h3>
        <p className="text-center fs-3">you have {userNum} users</p>
        <div className="d-flex justify-content-around flex-wrap p-5">
          {users.length
            ? users.map((user: User) => (
                <div
                  className="card text-center mb-3"
                  style={{ width: "18rem" }}
                  key={user._id}
                >
                  <div className="card-body">
                    <h5 className="card-title">Name: {user.name}</h5>
                    <p className="card-text">Email:{user.email}</p>
                    <div
                      onClick={() => handleDeleteUser(user)}
                      className="text-danger"
                    >
                      <i className="fa-solid fa-trash m-3"></i>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleChangeIsAdmin(user)}
                    >
                      {user.isAdmin ? "admin" : "no admin"}
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default UserManagement;
