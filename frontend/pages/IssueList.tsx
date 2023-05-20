import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Issue {
  id: string;
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

  const handleDelete = useCallback(
    (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          toast.success(res.message);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [issues]
  );
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
      {issues &&
        issues?.map((issue) => (
          <div className="card" key={issue.id}>
            {/* need a delete button */}
            <div className="card-title">
              <div>
                <h2 className="badge badge-info">{issue.description}</h2>
              </div>
              <div className="actions">
                <button className="pencil">
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button
                  className="trashcan"
                  onClick={() => handleDelete(issue.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <div className="card-status">
              <h2>{issue.status}</h2>
            </div>
            <div className="card-body">
              <h3 className="card-text">Assigned To:{issue.assigned_to}</h3>
              <h3 className="card-text">
                Assigned From: {issue.assigned_from}
              </h3>
              <h4 className="card-text">
                Created At:{" "}
                {moment(issue.created_at).format("YYYY. MMMM DD., HH:mm")}
              </h4>
              {/* <a href="#" className="card-link">
              Close
            </a> */}
            </div>
            <ToastContainer />
          </div>
        ))}
    </>
  );
}
