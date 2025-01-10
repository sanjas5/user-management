import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../interfaces/User";
import { BASE_URL } from "../constants/usersConstants";
import "../styles/UserDetails.css";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };
  if (!user) return <div className="loadingTitle">Loading...</div>;

  return (
    <div className="userDetailsContainer">
      <button onClick={handleBack} className="backButton">
        Back
      </button>
      <h3>User Details</h3>
      <p>
        <strong>Name:</strong> {user.firstName} {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {user.phoneNumber}
      </p>
    </div>
  );
};

export default UserDetails;
