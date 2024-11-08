import React, { useState } from 'react';
import { Row, Table, Col, Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteName, setDeleteName] = useState("");

  const fetchUsers = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      
      const response = await fetch(`http://localhost:5000/api/users?name=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization token
        },
      });
      const result = await response.json();
      setUsers(result.users);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteUser = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    const userToDelete=users.find((user)=>user.name===deleteName);

    try {

      const csrfMetaTag=document.querySelector("meta[name='csrf-token']");
      const csrfToken = csrfMetaTag ? csrfMetaTag.getAttribute("content") : null;

      const response = await fetch(`http://localhost:5000/api/delete/${userToDelete.name}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Authorization token
          "X-CSRF-Token": csrfToken, 
        },
      });

      if (response.ok) {
        console.log(`User ${deleteName} deleted successfully`);
        setUsers(users.filter((user) => user.name !== deleteName));
        setDeleteName(""); // Clear the input after deletion
      } else {
        console.log(`Failed to delete user ${deleteName}`);
      }
    } catch (error) {
      console.log(error);
      console.log("An error occurred while deleting the user.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteInput = (e) => {
    setDeleteName(e.target.value);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Dashboard</h1>

          {/* Search input */}
          <Form className="mb-3 text-center">
            <Form.Group controlId="searchUser">
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearch}
                className="w-50 mx-auto"
              />
            </Form.Group>
          </Form>

          <div className="text-center mb-3">
            <Button variant="primary" onClick={fetchUsers} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Fetch Users'}
            </Button>
          </div>

          <Form className="mb-3 text-center">
            <Form.Group controlId="deleteUser">
              <Form.Control
                type="text"
                placeholder="Enter name to delete"
                value={deleteName}
                onChange={handleDeleteInput}
                className="w-50 mx-auto"
              />
            </Form.Group>
          </Form>

          <div className="text-center mb-3">
            <Button
              variant="primary"
              onClick={deleteUser}
            >
              Delete User
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No users found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
