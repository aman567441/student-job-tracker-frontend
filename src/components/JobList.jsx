import React, { useEffect, useState } from "react";
import axios from "axios";
import JobItem from "./JobItem";
import "./JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchStatus = statusFilter ? job.status.toLowerCase().trim() === statusFilter.toLowerCase().trim() : true;
    const matchDate = dateFilter ? job.date === dateFilter : true;
    return matchStatus && matchDate;
  });

  return (
    <div className="job-list-container">
      <h2>All Job Applications</h2>
      <div className="filter-section">
        <div>
          <label>Status: </label>
          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
            <option value="">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label>Date: </label>
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </div>
      </div>

      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobItem key={job._id} job={job} onUpdate={fetchJobs} onDelete={fetchJobs} />
          ))
        ) : (
          <p className="no-jobs">No jobs found for selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
