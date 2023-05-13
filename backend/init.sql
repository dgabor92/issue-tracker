CREATE TABLE issues (
  id VARCHAR(36) PRIMARY KEY,
  description TEXT,
  severity VARCHAR(255),
  assigned_to VARCHAR(255),
  status VARCHAR(255)
);

INSERT INTO issues (id, description, severity, assigned_to, status)
VALUES ('1', 'Teszt issue', 'Low', 'John Doe', 'Open');
