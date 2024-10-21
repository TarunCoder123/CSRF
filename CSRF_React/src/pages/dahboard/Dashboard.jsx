import React, { useState } from 'react';
import { Row, Table, Col, Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
