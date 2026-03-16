import React from "react";

function DeleteModal({ open, onClose, onConfirm, student }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.45)] flex items-center justify-center z-50">
      <div className="relative m-4 p-5 w-1/3 min-w-[350px] rounded-lg bg-white shadow-lg">

        <div className="text-xl font-semibold text-slate-800 pb-3">
          Delete Student
        </div>

        <div className="border-t border-slate-200 py-4 text-slate-600">
          Are you sure you want to delete
          <span className="font-bold"> {student?.name}</span> ?
          <br />
          This action is irreversible.
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteModal;