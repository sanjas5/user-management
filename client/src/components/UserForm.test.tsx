import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "./UserForm";
import { User } from "../interfaces/User";
import { BASE_URL } from "../constants/usersConstants";

global.fetch = jest.fn();

describe("UserForm Component", () => {
  const mockOnUserAdded = jest.fn();
  let user: User | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form inputs correctly", () => {
    render(<UserForm user={user} onUserAdded={mockOnUserAdded} />);

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(
      screen.getByText("Add User", { selector: "button" })
    ).toBeInTheDocument();
  });

  test("fills the form with user data when user prop is provided", () => {
    const user = {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
    };

    render(<UserForm user={user} onUserAdded={mockOnUserAdded} />);

    // Check the pre-filled values from the "user" prop
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("john.doe@example.com")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
    expect(
      screen.getByText("Update User", { selector: "button" })
    ).toBeInTheDocument();
  });

  test("calls fetch with the correct parameters for adding a new user", async () => {
    render(<UserForm user={user} onUserAdded={mockOnUserAdded} />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "9876543210" },
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    fireEvent.click(screen.getByText("Add User", { selector: "button" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}`,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            phoneNumber: "9876543210",
          }),
        })
      );
    });

    await waitFor(() => {
      expect(mockOnUserAdded).toHaveBeenCalled();
    });
  });

  test("calls fetch with the correct parameters for updating an existing user", async () => {
    const user = {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
    };

    render(<UserForm user={user} onUserAdded={mockOnUserAdded} />);

    // Modify the form inputs
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Jonathan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe Updated" },
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    fireEvent.click(screen.getByText("Update User", { selector: "button" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/1`,
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({
            firstName: "Jonathan",
            lastName: "Doe Updated",
            email: "john.doe@example.com",
            phoneNumber: "1234567890",
          }),
        })
      );
    });

    await waitFor(() => {
      expect(mockOnUserAdded).toHaveBeenCalled();
    });
  });

  test("does not submit the form if fetch fails", async () => {
    render(<UserForm user={user} onUserAdded={mockOnUserAdded} />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Jake" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Brown" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jake.brown@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1112233445" },
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    fireEvent.click(screen.getByText("Add User", { selector: "button" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockOnUserAdded).not.toHaveBeenCalled();
    });
  });
});
