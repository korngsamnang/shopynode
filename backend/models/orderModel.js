import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Order must belong to a user"],
            ref: "User",
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: [true, "Order item must belong to a product"],
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    required: [true, "Order item quantity is required"],
                },
            },
        ],
        shippingAddress: {
            address: {
                type: String,
                required: [true, "Shipping address is required"],
            },
            city: {
                type: String,
                required: [true, "Shipping city is required"],
            },
            postalCode: {
                type: String,
                required: [true, "Shipping postal code is required"],
            },
            country: {
                type: String,
                required: [true, "Shipping country is required"],
            },
        },
        itemsPrice: {
            type: Number,
            required: [true, "Items price is required"],
        },
        taxPrice: {
            type: Number,
            required: [true, "Tax price is required"],
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: [true, "Shipping price is required"],
        },
        totalPrice: {
            type: Number,
            required: [true, "Total price is required"],
        },
        isPaid: {
            type: Boolean,
            required: [true, "Payment status is required"],
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: [true, "Delivery status is required"],
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        paymentMethod: {
            type: String,
            required: [true, "Payment method is required"],
            default: "PayPal",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
