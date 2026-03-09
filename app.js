app.get("/", (req, res) => {
    res.send(`
    <h1>OpsTrack Healthcare Portal</h1>
    <p>Sprint 1 MVP Backend API</p>

    <h3>Available Endpoints</h3>
    <ul>
      <li>/api/auth</li>
      <li>/api/cases</li>
    </ul>

    <p>Status: API Running Successfully</p>
  `);
});