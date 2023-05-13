export default function IssueTrackerForm() {
  return (
    <>
      <h3 className="form-title">Add New Issue</h3>
      <form className="issueInputForm">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" placeholder="Describe the issue ..." />
        </div>
        <div className="form-group">
          <label htmlFor="status">Severity</label>
          <select id="status">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To</label>
          <input id="assignedTo" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="assignedFrom">Assigned From</label>
          <input id="assignedFrom" type="text" />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
