app.post("/data", (req, res) => {
  const message = req.body.message;
  res.status(201).json({ msg: message.toUpperCase() });
});
