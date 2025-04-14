import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    age: '',
    photo: null
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('class', formData.class);
    data.append('age', formData.age);
    data.append('photo', formData.photo);

    try {
      const res = await axios.post('http://localhost:5000/api/student', data);
      onStudentAdded(res.data.student);
      setFormData({ name: '', class: '', age: '', photo: null });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Student Registration</h2>
      <div style={styles.inputGroup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          accept="image/*"
          required
          style={styles.fileInput}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px'
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minWidth: '150px'
  },
  fileInput: {
    border: 'none'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default StudentForm;
