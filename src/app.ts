import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
res.status(200).json({
success: true,
message: "Vehicle Rental Management API is running",
});
});

export default app;
