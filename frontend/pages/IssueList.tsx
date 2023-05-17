import { useState, useEffect, useCallback } from "react";

interface Issue {
  id: number;
  description: string;
  severity: string;
  assigned_to: string;
  assigned_from: string;
  status: string;
  created_at: string;
}

export default function IssueList() {
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    let isCancelled = false;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/issues`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.rows[0].id);
        if (!isCancelled) {
          setIssues(res.rows);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Betöltés befejeződött
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3 className="form-title">Issues</h3>
      {issues?.map((issue) => (
        <div className="card" key={issue.id}>
          <div className="card-title">
            <h2 className="badge badge-info">{issue.description}</h2>
            {/* <span className="badge badge-pill badge-secondary ml-2">
              {issue.severity}
            </span> */}
          </div>
          <div className="card-body">
            {/* <h6 className="card-subtitle mb-2 text-muted">
              {issue.description}
            </h6> */}
            <h3 className="card-text">
              Assigned To: <strong>{issue.assigned_to}</strong>
            </h3>
            <h3 className="card-text">
              Assigned From: <strong>{issue.assigned_from}</strong>
            </h3>
            <h4 className="card-text">
              Created At: <strong>{issue.created_at}</strong>
            </h4>
            <a href="#" className="card-link">
              Close
            </a>
          </div>
        </div>
      ))}
    </>
  );
}
