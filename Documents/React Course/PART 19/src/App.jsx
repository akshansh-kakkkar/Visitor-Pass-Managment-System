import React, { Component } from "react";
import Navbar from "./components/Navbar";
import StudentGrade from "./components/StudentGradeForm";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div>
          <StudentGrade />
        </div>
      </>
    );
  }
}

export default App;
