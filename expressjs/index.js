import express from "express";
const app = express(); // application object
// Define a route
app.get("/", (req, res) => {
 res.send("Hello, Express!");
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
