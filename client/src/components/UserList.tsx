import React, { useState } from "react";
import { User } from "../interfaces/User";
import { UserListProps } from "../interfaces/UserListProps";
import useDebounce from "../hooks/useDebounce";
import { useFetchUsers } from "../hooks/useFetchUsers";
import {
  BASE_URL,
  ITEMS_PER_PAGE,
  SEARCH_DEBOUNCE_DELAY,
} from "../constants/usersConstants";
import SearchFilters from "./SearchFilters";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import UserForm from "./UserForm";
import Modal from "./Modal";
import "../styles/UserList.css";

const UserList = ({ refresh }: UserListProps) => {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_DELAY);
  const debouncedEmail = useDebounce(email, SEARCH_DEBOUNCE_DELAY);
  const debouncedPhoneNumber = useDebounce(phoneNumber, SEARCH_DEBOUNCE_DELAY);

  const { isLoading, error, users, refetch } = useFetchUsers(
    debouncedQuery,
    debouncedEmail,
    debouncedPhoneNumber,
    refresh
  );

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = () => setPage(1);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleUserAdded = () => {
    setModalMessage("User successfully added at the end of the list.");
    setShowModal(true);
    refetch();
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setModalMessage("User deleted successfully.");
        setShowModal(true);
        refetch();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalMessage(
      "Editing user details. Go above to the form and fill out the details you want to change."
    );
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  if (isLoading) return <div className="loadingTitle">Loading...</div>;
  if (error instanceof Error)
    return <div className="error">Error: {error.message}</div>;

  return (
    <div className="userListContainer">
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
      <UserForm user={selectedUser} onUserAdded={handleUserAdded} />
      <h3 className="searchTitle">Search Users</h3>
      <SearchFilters
        query={query}
        email={email}
        phoneNumber={phoneNumber}
        onQueryChange={setQuery}
        onEmailChange={setEmail}
        onPhoneNumberChange={setPhoneNumber}
        onSearch={handleSearch}
      />
      <UserTable
        users={paginatedUsers}
        page={page}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
      />
      <Pagination
        page={page}
        totalUsers={totalUsers}
        itemsPerPage={ITEMS_PER_PAGE}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default UserList;
