import React, { Component } from "react";
import DeleteModal from "../Modals/DeleteModal";
import EditModal from "../Modals/EditModal";

class StudentGrade extends Component {
  state = {
    name: "",
    subject: "",
    percentage: "",
    status: "",
    students: [],
    deleteId: null,
    isDeleteOpen: false,
    editStudent: null,
    isEditOpen: false,
  };
  handleEditClick = (student) => {
    this.setState({
      editStudent: { ...student },
      isEditOpen: true,
    });
  };
  handleEditChange = (e) => {
    this.setState({
      editStudent: {
        ...this.state.editStudent,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleSaveEdit = () => {
    const updatedStudents = this.state.students.map((s) =>
      s.id === this.state.editStudent.id
        ? {
            ...this.state.editStudent,
            status:
              Number(this.state.editStudent.percentage) >= 33 ? "Pass" : "Fail",
          }
        : s,
    );

    this.setState({
      students: updatedStudents,
      isEditOpen: false,
      editStudent: null,
    });
  };
  handleDeleteClick = (id) => {
    this.setState({
      deleteId: id,
      isDeleteOpen: true,
    });
  };
  handleConfirmDelete = () => {
    const updateStatus = this.state.students.filter(
      (s) => s.id !== this.state.deleteId,
    );
    this.setState({
      students: updateStatus,
      deleteId: null,
      isDeleteOpen: false,
    });
  };
  handleChnage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { percentage, name, subject, students } = this.state;
    let status = Number(percentage) >= 33 ? "Pass" : "Fail";
    const newStudent = {
      id: Date.now(),
      name,
      subject,
      percentage,
      status,
    };

    this.setState({
      students: [...students, newStudent],
      name: "",
      subject: "",
      percentage: "",
      status: "",
    });
  };
  componentDidMount() {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      this.setState({
        students: JSON.parse(savedStudents),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.students !== this.state.students) {
      localStorage.setItem("students", JSON.stringify(this.state.students));
    }
  }
  render() {
    return (
      <>
        <DeleteModal
          open={this.state.isDeleteOpen}
          onClose={() => this.setState({ isDeleteOpen: false })}
          onConfirm={this.handleConfirmDelete}
          student={this.state.students.find(
            (s) => s.id === this.state.deleteId,
          )}
        />
        <EditModal
          open={this.state.isEditOpen}
          onClose={() =>
            this.setState({ isEditOpen: false, editStudent: null })
          }
          onChange={this.handleEditChange}
          onSave={this.handleSaveEdit}
          student={this.state.editStudent}
        />
        <div
          style={{ fontFamily: "poppins, sans-serif" }}
          className="md:grid-cols-4 gap-12 flex flex-col lg:grid px-6 overflow-x-hidden"
        >
          <div className="col-span-1">
            <form onSubmit={this.handleSubmit}>
              <div className="flex flex-col bg-blue-300 rounded-2xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                <div>
                  <h1 className="text-2xl font-bold items-center text-center tracking-wider text-white">
                    Let's fail students
                  </h1>
                </div>
                <div className="p-3 flex-col flex gap-2">
                  <label className="text-xl text-white font-medium" htmlFor="">
                    Student Name:
                  </label>
                  <input
                    value={this.state.name}
                    type="text"
                    onChange={this.handleChnage}
                    placeholder="enter student's name"
                    required
                    name="name"
                    className="focus:border-0 focus:outline-2 px-3 text-xl py-1 transition-border rounded-xl text-white border-2 placeholder:text-blue-100 outline-white border-blue-100"
                  />
                </div>
                <div className="flex flex-col gap-2 p-3">
                  <label className="text-xl text-white font-medium" htmlFor="">
                    Subject:
                  </label>
                  <select
                    placeholder="select "
                    required
                    className="focus:border-0 focus:outline-2 px-3 text-xl py-1 transition-border rounded-xl text-blue-300 bg-white border-2 placeholder:text-white outline-white border-blue-100"
                    name="subject"
                    value={this.state.subject}
                    onChange={this.handleChnage}
                    id=""
                  >
                    <option value="" className="text-blue-300">
                      Select a subject
                    </option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Physics">Physics</option>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Hindi">Hindi</option>
                    <option value="History">History</option>
                    <option value="Civics">Civics</option>
                    <option value="German">German</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 p-3">
                  <label htmlFor="" className="text-xl text-white font-medium">
                    Percentage:
                  </label>
                  <input
                    type="number"
                    onChange={this.handleChnage}
                    placeholder="70"
                    name="percentage"
                    min="0"
                    max="100"
                    value={this.state.percentage}
                    className="focus:border-0 focus:outline-2 px-3 text-xl py-1 transition-border rounded-xl text-white bg-blue-300 border-2 placeholder:text-blue-100 outline-white border-blue-100"
                  />
                </div>
                <button
                  className="rounded-full items-center cursor-pointer my-3 justify-center text-center py-2 px-4 bg-white text-blue-300 system-ui font-medium text-2xl"
                  type="submit"
                >
                  button
                </button>
              </div>
            </form>
          </div>

          <div className="col-span-3 flex gap-4 justify-center overflow-y-hidden">
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] px-4 py-4 w-full items-center">
              {this.state.students.length === 0 ? (
                <div className="text-6xl items-center flex text-center justify-center font-bold text-blue-400">
                  <div>No Tasks Found</div>
                </div>
              ) : (
                this.state.students.map((student) => (
                  <div
                    key={student.id}
                    className="w-full max-w-[900px] p-5 rounded-2xl bg-blue-300 shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                  >
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => this.handleDeleteClick(student.id)}
                        className="px-2 py-1 rounded-xl font-bold text-white bg-red-500  my-3 hover:scale-[102%] transition-all duration-500 hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => this.handleEditClick(student)}
                        className="px-2 py-1 rounded-xl font-bold text-blue-400 bg-white my-3 hover:scale-[102%] transition-all duration-500"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="lg:grid lg:grid-cols-4 gap-8 flex flex-col px-4 max-w-[1400px] mx-auto overflow-x-hidden">
                      <div className="col-span-1 flex flex-col justify-center items-center text-blue-400 font-bold bg-white rounded-2xl px-6 py-6 text-center shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                        <div className="text-3xl font-bold bg-white rounded-2xl">
                          Name
                        </div>
                        <div className="text-blue-500">{student.name}</div>
                      </div>
                      <div className="col-span-1 flex flex-col justify-center items-center text-blue-400 font-bold bg-white rounded-2xl px-6 py-6 text-center shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                        <div className="text-3xl font-bold rounded-2xl">
                          Subject
                        </div>
                        <div className="text-blue-500">{student.subject}</div>
                      </div>
                      <div className="col-span-1 flex flex-col justify-center items-center bg-white rounded-2xl px-6 py-6 text-center shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                        <div className="text-blue-400 text-3xl font-bold rounded-2xl">
                          Percentage
                        </div>
                        <div className="text-blue-500 font-bold">
                          {student.percentage}%
                        </div>
                      </div>
                      <div className="col-span-1 flex flex-col justify-center items-center bg-white rounded-2xl px-6 py-6 text-center shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                        <div className="text-blue-400 text-3xl font-bold rounded-2xl">
                          Status
                        </div>
                        <div className="text-blue-500 font-bold">
                          {student.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StudentGrade;
