import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.scss";
const Dashboard = ({ updateHandler }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userExist = !localStorage.getItem("currentUser")
      ? ""
      : JSON.parse(localStorage.getItem("currentUser"));
    if (!userExist) {
      navigate("/");
    }
    setCurrentUser(userExist);
  }, []);

  const updateCurrentUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  const handleUpdateUser = () => {
    updateHandler(currentUser);
    setEditing(false);
    updateCurrentUser(currentUser);
  };
  return (
    <div className="dash">
      <div className="dash__title">Welcome to the Dashboard</div>
      <div className="dash__info">
        {!editing ? (
          <>
            <div className="dash__name">
              <div className="dash__tab">
                <div className="dash__label">First Name</div>
                <div className="dash__field --first-name">
                  {currentUser.first_name}
                </div>
              </div>
              <div className="dash__tab">
                <div className="dash__label">Last Name</div>
                <div className="dash__field --last-name">
                  {currentUser.last_name}
                </div>
              </div>
            </div>
            <div className="dash__tab">
              <div className="dash__label">Email</div>
              <div className="dash__field --email">{currentUser.email}</div>
            </div>
            <div className="dash__tab">
              <div className="dash__label">Date of Birth</div>
              <div className="dash__field --dob">{currentUser.dob}</div>
            </div>
          </>
        ) : (
          <>
            <div className="dash__name">
              <div className="dash__tab">
                <label className="dash__label">First Name</label>
                <input
                  type="text"
                  value={currentUser.first_name}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      first_name: e.target.value,
                    })
                  }
                  className="dash__field --first-name"
                />
              </div>
              <div className="dash__tab">
                <div className="dash__label">Last Name</div>
                <input
                  type="text"
                  value={currentUser.last_name}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      last_name: e.target.value,
                    })
                  }
                  className="dash__field --last-name"
                />
              </div>
            </div>
            <div className="dash__tab">
              <div className="dash__label">Date of Birth</div>
              <input
                type="text"
                value={currentUser.dob}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, dob: e.target.value })
                }
                className="dash__field --dob"
              />
            </div>
            <div className="dash__tab">
              <div className="dash__label">Password</div>
              <input
                type="text"
                value={currentUser.password}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, password: e.target.value })
                }
                className="dash__field --password"
              />
            </div>
          </>
        )}
        <div className="dash__buttons">
          {!editing && (
            <button className="primary" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
          {editing && (
            <>
              <button className="primary" onClick={handleUpdateUser}>
                Submit
              </button>
              <button className="sec" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
