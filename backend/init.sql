CREATE TABLE issues (
  id VARCHAR(36) PRIMARY KEY,
  description TEXT,
  severity VARCHAR(20),
  assigned_to VARCHAR(255),
  assigned_from VARCHAR(255),
  status VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO issues (id, description, severity, assigned_to, assigned_from, status, created_at)
VALUES ('e6ed6101-9865-5c3a-9f97-8fce767ec366', 'Teszt issue', 'Low', 'JohnDoe@gmail.com', 'BobMarcus@gmail.com', 'Open', '2019-01-01 00:00:00');
