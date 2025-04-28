import React, { useState } from "react";
import axios from "axios";
import "./JobForm.css";

const JobForm = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    link: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/jobs`, {
        ...formData,
        status: formData.status.trim(),
        role: formData.role.trim(),
        company: formData.company.trim(),
        link: formData.link.trim()
      });
      onJobAdded(); // Refresh job list
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        date: "",
        link: ""
      }); // Clear form after submit
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
      <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" required />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input name="link" value={formData.link} onChange={handleChange} placeholder="Application Link" required />
      <button type="submit">Add</button>
    </form>
  );
};

export default JobForm;
