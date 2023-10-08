import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Product name is required"],
        },
        image: {
            type: String,
            required: [true, "Product image is required"],
        },
        brand: {
            type: String,
            required: [true, "Product brand is required"],
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        rating: {
            type: Number,
            required: [true, "Product rating is required"],
        },
        numReviews: {
            type: Number,
            required: [true, "Product number of reviews is required"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
        },
        stockQuantity: {
            type: Number,
            required: [true, "Product stock quantity is required"],
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
