const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json()); //middleware

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello from the server side", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint...");
// });

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
const tours = JSON.parse(fs.readFileSync(`tours-simple.json`));
// const tours = JSON.parse(fs.readFileSync("tours-simple.json"));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours: tours,
    },
    app: "Natours",
  });
});

// RESPONDING TO URL Parameters
// define route using get to accept requests which need info of particular tour
// for example: /api/v1/tours/5
// add /:id at the end of the route /api/v1/tours
// add /:id? at the end of the route /api/v1/tours to make the parameter optional
// req.params is where all the Url parameters are stored
app.get("/api/v1/tours/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newId,
    ...req.body, //need to add the middleware for data to be on request "app.use(express.json());"
  };
  tours.push(newTour);
  fs.writeFile(`tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
});

app.patch("/api/v1/tours/:id", (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  tours.map((tour) => {
    if (tour.id === parseInt(req.params.id)) {
      const updatedTour = Object.assign(tour, req.body);
      return updatedTour;
    }
  });
  fs.writeFile(`tours-simple.json`, JSON.stringify(tours), (err) => {
    if (err) console.log(err);
    res.status(200).json({
      status: "success",
      data: tours,
    });
  });
});

app.delete("/api/v1/tours/:id", (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  const newTours = tours.filter((tour) => tour.id != parseInt(req.params.id));
  fs.writeFile(`tours-simple.json`, JSON.stringify(newTours), (err) => {
    if (err) console.log(err);
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
