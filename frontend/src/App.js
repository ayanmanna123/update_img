import React from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => (
  <div style={{ padding: "20px", fontFamily: "Arial" }}>
    <h1>Student Registration</h1>
    <StudentForm />
    <hr />
    <StudentList />
  </div>
);

export default App;
