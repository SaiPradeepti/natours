const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./Routes/tourRoutes");
const userRouter = require("./Routes/userRoutes");

const app = express();

//1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); //middleware

app.use(express.static("./"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello from the server side", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint...");
// });

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// 3) ROUTES
app.use("/api/v1/tours", tourRouter); // creating sub application for the routes
app.use("/api/v1/users", userRouter); // creating sub application for the routes

module.exports = app;
