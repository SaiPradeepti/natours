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

app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newId,
    ...req.body,
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

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
