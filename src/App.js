import React, { useState, useEffect } from "react";
import "./App.css";
import { EmployeeData } from "./EmployeeData";

function App() {
  const [data, setData] = useState([]);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this item"));
      const dt = data.filter((item) => item.id !== id);
      setData(dt);
    }
  };

  const handleSave = (e) => {
    let error = "";
    if (firstname === "") error += "First name is required,  ";
    if (lastname === "") error += "Last name is required,  ";
    if (age <= 0) error += "Age is required";

    if (error === "") {
      e.preventDefault();
      const dt = [...data];
      const newObject = {
        id: EmployeeData.length + 1,
        firstName: firstname,
        lastName: lastname,
        age: age,
      };

      dt.push(newObject);
      setData(dt);
    } else {
      alert(error);
    }
  };

  const handleClear = () => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setId(0);
      setFirstName("");
      setLastName("");
      setAge("");
      setIsUpdate(false);
    }
  };

  const handleUpdate = () => {
    const index = data
      .map((item, index) => {
        return item.id;
      })
      .indexOf(id);
    const dt = [...data];
    dt[index].firstName = firstname;
    dt[index].lastName = lastname;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <label>
            First Name:
            <input
              type="text"
              placeholder="Enter First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstname}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              placeholder="Enter Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastname}
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              placeholder="EnterAge"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
              Save
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => handleUpdate()}>
              Update
            </button>
          )}
          &nbsp; &nbsp;
          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
