import React from "react";
import axios from "axios";
import "./JobItem.css";

const JobItem = ({ job, onUpdate, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/jobs/${job._id}`);
      onDelete();
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  const handleUpdate = async () => {
    const updatedStatus = prompt("Update Status (Applied, Interview, Offer, Rejected):", job.status);
    if (updatedStatus && updatedStatus !== job.status) {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/jobs/${job._id}`, {
          ...job,
          status: updatedStatus
        });
        onUpdate();
      } catch (err) {
        console.error("Error updating job:", err);
      }
    }
  };

  return (
    <div className="job-item">
      <h3>{job.company}</h3>
      <p><strong>Position:</strong> {job.role || "Not specified"}</p>
      <p><strong>Date:</strong> {job.date}</p>
      <p><strong>Status:</strong> {job.status}</p>
      {job.link && (
        <p>
          <strong>Link:</strong>{" "}
          <a href={job.link} target="_blank" rel="noopener noreferrer">
            View Job Application
          </a>
        </p>
      )}
      <div className="btn-group">
        <button className="btn-update" onClick={handleUpdate}>Update</button>
        <button className="btn-delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default JobItem;
