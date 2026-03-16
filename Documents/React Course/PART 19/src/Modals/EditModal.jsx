import React from "react";

function EditModal({ open, onClose, onChange, onSave, student }) {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.45)] flex items-center justify-center z-50">
      <div className="relative m-4 p-5 w-1/3 min-w-[350px] rounded-lg bg-white shadow-lg">
        <div className="text-xl font-semibold text-slate-800 pb-3">
          Edit Student
        </div>

        <div className="border-t border-slate-200 py-4 text-slate-600 flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input
              name="name"
              value={student.name}
              onChange={onChange}
              className="outline-none text-base bg-white p-2 border border-slate-300 rounded-md focus:border-slate-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700" htmlFor="">
              Subject:
            </label>
            <select
              placeholder="select "
              required
              className="outline-none text-base bg-white p-2 border border-slate-300 rounded-md focus:border-slate-500"
              name="subject"
              value={student.subject}
              onChange={onChange}
              id=""
            >
              <option value="" className="text-gray-800">
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

          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700">
              Percentage
            </label>
            <input
              type="number"
              name="percentage"
              min="0"
              max="100"
              value={student.percentage}
              onChange={onChange}
              className="outline-none text-base bg-white p-2 border border-slate-300 rounded-md focus:border-slate-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
