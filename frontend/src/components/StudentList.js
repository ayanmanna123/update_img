import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/student')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {students.map(student => (
        <div key={student._id} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          width: '200px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <img
            src={`data:${student.photo.contentType};base64,${student.photo.data}`}
            alt={student.name}
            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
          />
          <h3>{student.name}</h3>
          <p>Class: {student.class}</p>
          <p>Age: {student.age}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
