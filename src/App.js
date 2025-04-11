import React, { useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import "./App.css";
import bannerImage from "./assets/banner.png"; // Make sure banner.png is placed correctly

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshList = () => setRefresh((prev) => !prev);

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={bannerImage} alt="Student Job Tracker Banner" className="banner-image" />
        <h1>Student Job Tracker</h1>
        <p className="description">
          Track and manage all your job applications in one place. Filter by status and date, update easily, and stay on top of your job hunt!
        </p>
      </header>

      <JobForm onJobAdded={refreshList} />
      <JobList key={refresh} />
    </div>
  );
}

export default App;
