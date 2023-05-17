import { useState } from "react";
import axios from "../utils/axios.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function IssueTrackerForm() {
  const initialFormState = {
    description: "",
    severity: "",
    assignedTo: "",
    assignedFrom: "",
  };
  const [form, setForm] = useState(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 201) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
          setForm(initialFormState);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h3 className="form-title">Add New Issue</h3>
      <form className="issueInputForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe the issue ..."
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Severity</label>
          <select
            id="severity"
            name="severity"
            value={form.severity}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To</label>
          <input
            id="assignedTo"
            type="text"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignedFrom">Assigned From</label>
          <input
            id="assignedFrom"
            type="text"
            name="assignedFrom"
            value={form.assignedFrom}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add</button>
        <ToastContainer />
      </form>
    </>
  );
}
