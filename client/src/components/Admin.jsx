import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveToJsonFile = () => {
    const jsonData = JSON.stringify(formData, null, 2);

    const blob = new Blob([jsonData], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "member.json";
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
      />

      <button onClick={saveToJsonFile}>
        Save JSON File
      </button>
    </div>
  );
}

export default App;