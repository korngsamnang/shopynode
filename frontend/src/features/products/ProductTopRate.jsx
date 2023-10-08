import Message from "../../ui/Message.jsx";
import Typography from "@mui/material/Typography";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { useProductTopRate } from "./useProductTopRate.js";

const ProductTopRate = () => {
    const { products, isLoading, error } = useProductTopRate();

    return isLoading ? null : error ? (
        <Message severity="error">
            {error?.data?.message || error.error}
        </Message>
    ) : (
        <div className="bg-primary mb-4">
            <Typography variant="h5" component="h2" className="py-2">
                Top Products
            </Typography>
            <Carousel
                infiniteLoop
                autoPlay
                interval={5000}
                showArrows={true}
                showThumbs={false}
                emulateTouch={true}
                width="50%"
                className="flex flex-row"
            >
                {products.data.products.map(product => (
                    <div className="w-[50%]" key={product._id}>
                        <div>
                            <Link to={`/product/${product._id}`}>
                                <img
                                    src={`/images/${product.image}`}
                                    alt={product.productName}
                                    style={{ maxWidth: "100%", height: "auto" }}
                                />
                                <p className="legend">
                                    {product.productName} (${product.price})
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ProductTopRate;
