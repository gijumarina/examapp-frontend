import React from "react";
import "./ActiveUsers.css";
import { useAppContext } from "./AppContext";

const ActiveUsers = () => {
  const { isLoggedIn, activeUsers } = useAppContext();

  return (
    <div className="right-sidebar">
      <h3>Active users</h3>
      {activeUsers?.data?.length !== 0
        ? activeUsers.data?.map((user) => {
            return <p key={user}>{user}</p>;
          })
        : "No active users"}
    </div>
  );
};

export default ActiveUsers;
