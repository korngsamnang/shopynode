import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Review must belong to a user"],
            ref: "User",
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Review must belong to a product"],
            ref: "Product",
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
        },
        review: {
            type: String,
            required: [true, "Review text is required"],
        },
        date: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name",
    });
    next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
