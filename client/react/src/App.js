import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCriteria, setFilterCriteria] = useState({
    age: '',
    active: '',
    sortBy: '',
    searchName: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:7092/user');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams(filterCriteria).toString();
      const response = await fetch(`https://localhost:7092/user?${queryParams}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria((prevFilterCriteria) => ({
      ...prevFilterCriteria,
      [name]: value
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      <div>
        <label>
          Age:
          <input type="number" name="age" value={filterCriteria.age} onChange={handleChange} />
        </label>
        <label>
          Active:
          <select name="active" value={filterCriteria.active} onChange={handleChange}>
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>
          Sort By:
          <select name="sortBy" value={filterCriteria.sortBy} onChange={handleChange}>
            <option value="">None</option>
            <option value="lastlogin">Last Login</option>
            <option value="active">Active</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
          </select>
        </label>
        <label>
          Search Name:
          <input type="text" name="searchName" value={filterCriteria.searchName} onChange={handleChange} />
        </label>
        <button onClick={handleFilter}>Filter Users</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - Age: {user.age}, Active: {user.active ? 'Yes' : 'No'}, Last Login: {user.last_login}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
