const fs = require("fs")
const express = require("express")
const app = express();

const { product } = require('./models')

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Application is running good...",
    });
});

app.get("/nanda", (req, res) => {
    res.status(200).json({
        message: "Ping Successfully !",
    });
});


// const cars = JSON.parse(
//     fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
// );

app.get("/api/v1/cars", async (req, res) => {
    const cars = await product.findAll();

    res.status(200).json({
        status: "success",
        message: "Success get cars data!",
        IsSuccess: true,
        totalData: cars.length,
        data: {
            cars,
        },
    });
});

app.get("/api/v1/cars/:id", (req, res) => {
    const id = req.params.id * 1;
    console.log("typeof id: ");
    console.log(id);

    const car = cars.find((i) => i.id === id);
    console.log(car);

    if (!car) {
        console.log("data kosong cuy")
        return res.status(404).json({
            status: "Filed",
            message: `Filed get cars data from this id: ${id}`,
            IsSuccess: false,
            data: null,
        });
    }

    res.status(200).json({
        status: "success",
        message: "Success get cars data!",
        IsSuccess: true,
        data: {
            car,
        },
    });
});

app.post("/api/v1/cars", (req, res) => {
    const newCar = req.body;
    cars.push(newCar);

    fs.writeFile(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            status: "success",
            message: "Success get cars data!",
            IsSuccess: true,
            totalData: cars.length,
            data: {
                car: newCar,
            },
        });
    });

    res.status(200).json({
        status: "success",
        message: "Succes get cars data!",
        isSuccess: true,
        data: cars,
    });
});

app.patch("/api/v1/cars/:id", (req, res) => {
    const id = req.params.id * 1;
    const car = cars.find((i) => i.id === id);
    const carIndex = cars.findIndex((car) => car.id === id)

    cars[carIndex] = { ...cars[carIndex], ...req.body };

    if (!car) {
        console.log("data kosong cuy")
        return res.status(404).json({
            status: "Filed",
            message: `Filed get cars data from this id: ${id}`,
            IsSuccess: false,
            data: null,
        });
    }

    console.log(cars);

    const newCar = cars.find((i) => i.id === id);

    fs.writeFile(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            status: "Success",
            message: `Success update cars data from id: ${id}`,
            isSuccess: true,
            data: {
                newCar,
            },
        });
    });
});

app.delete("/api/v1/cars/:id", (req, res) => {
    const id = req.params.id * 1;
    const car = cars.find((i) => i.id === id);
    const carIndex = cars.findIndex((car) => car.id === id)

    cars[carIndex] = { ...cars[carIndex], ...req.body };

    if (!car) {
        console.log("data kosong cuy")
        return res.status(404).json({
            status: "Filed",
            message: `Filed to delete cars data from this id: ${id}`,
            IsSuccess: false,
            data: null,
        });
    }

    cars.splice(carIndex, 1);

    fs.writeFile(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(200).json({
            status: "Success",
            message: `Success delete cars data from this id: ${id}`,
            isSuccess: true,
            data: {
                car,
            },
        });
    });

})

app.use((req, res, next) => {
    res.status(404).json({
        status: "Failed",
        message: "API not exist !!!",
    });
});

app.listen("3000", () => {
    console.log("start aplikasi kita di port 3000")
});