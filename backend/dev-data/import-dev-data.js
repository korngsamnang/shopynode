import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: "./frontend/.env" });
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/userModel.js";
import { connectDB } from "../config/db.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import Order from "../models/orderModel.js";

connectDB();

//READ JSON FILE
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const products = JSON.parse(
    fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);
const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);
const orders = JSON.parse(fs.readFileSync(`${__dirname}/orders.json`, "utf-8"));

//IMPORT DATA INTO DB

const importData = async () => {
    try {
        await User.create(users, { validateBeforeSave: false });
        await Product.create(products);
        await Review.create(reviews);
        await Order.create(orders);

        console.log("Data successfully loaded!");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Review.deleteMany();
        await Order.deleteMany();

        console.log("Data successfully deleted!");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}

console.log(process.argv);
