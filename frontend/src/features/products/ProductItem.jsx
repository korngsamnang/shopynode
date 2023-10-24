import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { RatingBar } from "../../ui/RatingBar.jsx";

const ProductItem = ({ product }) => {
    return (
        <Card>
            <CardActionArea component={Link} to={`/product/${product._id}`}>
                <CardMedia
                    sx={{ height: 200 }}
                    component="img"
                    image={`images/${product.image}`}
                    alt={product.productName}
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle2">
                        {product.productName}
                    </Typography>
                    <RatingBar
                        value={product.ratingAverage}
                        text={`${product.numReviews} reviews`}
                    />
                    <Typography variant="h5">{product.price} $</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductItem;
