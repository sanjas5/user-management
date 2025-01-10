import { useState } from "react";
import UserList from "../components/UserList";
import "../styles/UserPage.css";

const UserPage = () => {
  const [refresh] = useState(false);

  return (
    <div>
      <h1 className="userPageContainerTitle">User Management</h1>
      <UserList refresh={refresh} />
    </div>
  );
};

export default UserPage;
