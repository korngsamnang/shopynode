import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Product name is required"],
        },
        image: {
            type: String,
            default: "sample.jpg",
        },
        brand: {
            type: String,
            required: [true, "Product brand is required"],
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        ratingAverage: {
            type: Number,
            required: [true, "Product rating is required"],
            default: 0,
        },
        numReviews: {
            type: Number,
            required: [true, "Product number of reviews is required"],
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
        },
        stockQuantity: {
            type: Number,
            required: [true, "Product stock quantity is required"],
            default: 0,
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual populate
productSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "product",
    localField: "_id",
});

const Product = mongoose.model("Product", productSchema);

export default Product;
