app.get("/", (req, res) => {
    res.send(`
    <h1>Opstrack Healthcare Portal</h1>
    <p>Welcome to the Opstrack Healthcare Portal API.</p>
    <p>This Sprint 1 MVP demonstrates the backend architecture and API endpoints for managing healthcare cases.</p>

    <h3>Available Endpoints</h3>
    <ul>
      <li>/api/auth</li>
      <li>/api/cases</li>
    </ul>

    <p>Status: API Running Successfully</p>
  `);
});