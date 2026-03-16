import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="bg-blue-300 py-1 m-6 px-5 rounded-full items-center flex justify-between shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <div className="">
          <lord-icon
          className=""
            src="https://cdn.lordicon.com/wjdlpfml.json"
            trigger="loop"
            stroke="bold"
            colors="primary:#FFFFFF,secondary:#FFFFFF"
            style={{ width: 70, height: 70 }}
          ></lord-icon>
        </div>
        <h1 style={{fontFamily:"poppins, san-serif"}} className=" uppercase tracking-wider font-serif   text-center font-semibold text-white text-2xl sm:text-5xl">
          Score Sync
        </h1>
        <div>
          <lord-icon
            src="https://cdn.lordicon.com/wjdlpfml.json"
            trigger="loop"
            stroke="bold"
            colors="primary:#FFFFFF,secondary:#FFFFFF"
            style={{ width: 70, height: 70 }}
          ></lord-icon>
        </div>
      </div>
    );
  }
}

export default Navbar;
