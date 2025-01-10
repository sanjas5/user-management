import { useState, useEffect } from "react";
import { UserFormProps } from "../interfaces/UserFormProps";
import { BASE_URL } from "../constants/usersConstants";
import "../styles/UserForm.css";

const UserForm = ({ user, onUserAdded }: UserFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonTitle, setButtonTitle] = useState("Add User");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setButtonTitle("Update User");
    } else {
      setButtonTitle("Add User");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { firstName, lastName, email, phoneNumber };

    if (user) {
      const response = await fetch(`${BASE_URL}/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        onUserAdded();
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setButtonTitle("Add User");
      }
    } else {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        onUserAdded();
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setButtonTitle("Add User");
      }
    }
  };

  return (
    <div className="userFormContainer">
      <h3 className="addUserTitle">{buttonTitle}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="inputForm"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="inputForm"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="inputForm"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="inputForm"
          required
        />
        <button type="submit" className="submitForm">
          {buttonTitle}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
