import {
    Divider,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    Rating,
    Select,
    TextareaAutosize,
} from "@mui/material";
import Message from "../../ui/Message.jsx";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { RatingBar } from "../../ui/RatingBar.jsx";
import { useProductDetail } from "./useProductDetail.js";
import { useCart } from "../../contexts/CartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useUser } from "../authentication/useUser.js";
import { useState } from "react";
import { useCreateReview } from "../reviews/useCreateReview.js";
import Loading from "../../ui/Loading.jsx";
import LoadingMini from "../../ui/LaodingMini.jsx";

const ProductDetail = () => {
    const { product, isLoading } = useProductDetail();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");

    const navigate = useNavigate();

    const { createReview, isCreating } = useCreateReview();

    const { addToCart } = useCart();
    const { user } = useUser();

    const handleCreateReview = e => {
        e.preventDefault();
        if (!rating || !review) return;
        const productId = product.data.product._id;
        createReview(
            { productId, rating, review },
            {
                onSettled: () => {
                    setRating("");
                    setReview("");
                },
            },
        );
    };
    const handleAddToCart = (product, qty) => {
        addToCart(product.data.product, qty);
        navigate("/cart");
    };

    if (isLoading) return <Loading />;

    return (
        <div>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={12} lg={12}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ArrowBackIcon />}
                        component={Link}
                        to="/"
                    >
                        Go back
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <img
                        src={`/images/${product.data.product.image}`}
                        alt={product.data.product.productName}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <List>
                        <ListItemText>
                            <h2>{product.data.product.productName}</h2>
                        </ListItemText>

                        <ListItemText>
                            <RatingBar
                                value={product.data.product.ratingAverage}
                                text={`${product.data.product.numReviews} reviews`}
                            />
                        </ListItemText>
                        <ListItemText>
                            {product.data.product.description}
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item xs={12} md={3}>
                    <ListItem>
                        <ListItemText
                            primary="Price"
                            secondary={
                                <strong>{product.data.product.price} $</strong>
                            }
                        />
                    </ListItem>
                    <Divider variant="middle" />
                    {product.data.product.stockQuantity > 0 && (
                        <ListItem>
                            <ListItemText
                                secondary={
                                    <FormControl>
                                        <InputLabel>Quantity</InputLabel>
                                        <Select
                                            value={qty}
                                            onChange={e =>
                                                setQty(e.target.value)
                                            }
                                            variant="standard"
                                        >
                                            {[
                                                ...Array(
                                                    product.data.product
                                                        .stockQuantity > 5
                                                        ? 5
                                                        : product.data.product
                                                              .stockQuantity,
                                                ).keys(),
                                            ].map(q => (
                                                <MenuItem key={q} value={q + 1}>
                                                    {q + 1} items
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                }
                            />
                        </ListItem>
                    )}
                    <>
                        <ListItem>
                            <ListItemText
                                primary="Status"
                                secondary={
                                    <span>
                                        {product.data.product.stockQuantity > 0
                                            ? "In Stock"
                                            : "Out Of Stock"}
                                    </span>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <span
                                        style={{
                                            cursor: "not-allowed",
                                        }}
                                    >
                                        <Button
                                            p={4}
                                            variant="contained"
                                            color="primary"
                                            // disabled={addToCartBtnDisabled}
                                            startIcon={<ShoppingBasketIcon />}
                                            onClick={() =>
                                                handleAddToCart(product, qty)
                                            }
                                            type="submit"
                                        >
                                            Add To Cart
                                        </Button>
                                    </span>
                                }
                            />
                        </ListItem>
                    </>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h4">Reviews</Typography>
                    {product.data.product.reviews.length === 0 ? (
                        <Message>No Reviews</Message>
                    ) : (
                        <List>
                            {product.data.product.reviews.map(review => (
                                <ListItem key={review._id}>
                                    <ListItemText
                                        primary={review.user.name}
                                        secondary={
                                            <>
                                                <Rating
                                                    name={`review-rating-${review._id}`}
                                                    value={review.rating}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                                <Typography variant="caption">
                                                    {review.date.substring(
                                                        0,
                                                        10,
                                                    )}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {review.review}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h4">Write a Review</Typography>
                    {user ? (
                        <form onSubmit={handleCreateReview}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="rating">Rating</InputLabel>
                                <Select
                                    labelId="rating"
                                    id="rating"
                                    required
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                >
                                    <MenuItem value="">Select...</MenuItem>
                                    <MenuItem value="1">1 - Poor</MenuItem>
                                    <MenuItem value="2">2 - Fair</MenuItem>
                                    <MenuItem value="3">3 - Good</MenuItem>
                                    <MenuItem value="4">4 - Very Good</MenuItem>
                                    <MenuItem value="5">5 - Excellent</MenuItem>
                                </Select>
                            </FormControl>
                            <TextareaAutosize
                                id="comment"
                                placeholder="Write your review here"
                                required
                                minRows={3}
                                value={review}
                                onChange={e => setReview(e.target.value)}
                                style={{
                                    border: "1px solid #ccc",
                                    width: "100%",
                                    marginTop: "10px",
                                    padding: "10px",
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: "10px" }}
                                disabled={isCreating}
                            >
                                {isCreating ? <LoadingMini /> : "Submit"}
                            </Button>
                        </form>
                    ) : (
                        <Message>
                            Please{" "}
                            <Link to="/login" className="underline">
                                sign in
                            </Link>{" "}
                            to write a review
                        </Message>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductDetail;

// import { useProductDetail } from "./useProductDetail.js";
// import { useCart } from "../../contexts/CartContext.jsx";
// import {
//     Card,
//     CardContent,
//     FormControl,
//     Grid,
//     InputLabel,
//     List,
//     ListItem,
//     ListItemAvatar,
//     ListItemText,
//     Rating,
//     Select,
//     Typography,
// } from "@mui/material";
//
// import { Link } from "react-router-dom";
// import Button from "@mui/material/Button";
// import Message from "../../ui/Message.jsx";
// import Avatar from "@mui/material/Avatar";
// import MenuItem from "@mui/material/MenuItem";
//
// const ProductDetail = () => {
//     const { product, isLoading } = useProductDetail();
//
//     const { qty, setQty, addToCart } = useCart();
//
//     if (isLoading) return <div>Loading...</div>;
//     return (
//         <>
//             <Link to="/" style={{ textDecoration: "none" }}>
//                 <Button
//                     variant="outlined"
//                     color="primary"
//                     style={{ marginBottom: "20px" }}
//                 >
//                     Go Back
//                 </Button>
//             </Link>
//
//             <Grid container spacing={3}>
//                 <Grid item md={6}>
//                     <img
//                         src={`/images/${product.image}`}
//                         alt={product.productName}
//                         style={{ width: "100%" }}
//                     />
//                 </Grid>
//                 <Grid item md={3}>
//                     <Typography variant="h4" gutterBottom>
//                         {product.productName}
//                     </Typography>
//                     <Rating
//                         name="product-rating"
//                         value={product.rating}
//                         precision={0.5}
//                         readOnly
//                     />
//                     <Typography variant="h6" gutterBottom>
//                         Price: ${product.price}
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                         Description: {product.description}
//                     </Typography>
//                 </Grid>
//                 <Grid item md={3}>
//                     <Card>
//                         <CardContent>
//                             <Typography variant="h6">
//                                 Price: ${product.price}
//                             </Typography>
//                             <Typography variant="h6">
//                                 Status:{" "}
//                                 {product.stockQuantity > 0
//                                     ? "In Stock"
//                                     : "Out Of Stock"}
//                             </Typography>
//
//                             {product.stockQuantity > 0 && (
//                                 <FormControl fullWidth>
//                                     <InputLabel htmlFor="qty">Qty</InputLabel>
//                                     <Select
//                                         labelId="qty"
//                                         id="qty"
//                                         value={qty}
//                                         onChange={e => setQty(e.target.value)}
//                                     >
//                                         {[
//                                             ...Array(
//                                                 product.stockQuantity,
//                                             ).keys(),
//                                         ].map(x => (
//                                             <MenuItem key={x + 1} value={x + 1}>
//                                                 {x + 1}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             )}
//
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 fullWidth
//                                 disabled={product.stockQuantity === 0}
//                                 onClick={() => addToCart(product, qty)}
//                             >
//                                 Add To Cart
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//
//             {/*<Grid container spacing={3} style={{ marginTop: "20px" }}>*/}
//             {/*    <Grid item md={6}>*/}
//             {/*        <Typography variant="h4">Reviews</Typography>*/}
//             {/*        {product.reviews.length === 0 ? (*/}
//             {/*            <Message>No Reviews</Message>*/}
//             {/*        ) : (*/}
//             {/*            <List>*/}
//             {/*                {product.reviews.map(review => (*/}
//             {/*                    <ListItem key={review._id}>*/}
//             {/*                        <ListItemAvatar>*/}
//             {/*                            <Avatar>{review.name[0]}</Avatar>*/}
//             {/*                        </ListItemAvatar>*/}
//             {/*                        <ListItemText*/}
//             {/*                            primary={review.name}*/}
//             {/*                            secondary={*/}
//             {/*                                <>*/}
//             {/*                                    <Rating*/}
//             {/*                                        name={`review-rating-${review._id}`}*/}
//             {/*                                        value={review.rating}*/}
//             {/*                                        precision={0.5}*/}
//             {/*                                        readOnly*/}
//             {/*                                    />*/}
//             {/*                                    <Typography variant="caption">*/}
//             {/*                                        {review.createdAt.substring(*/}
//             {/*                                            0,*/}
//             {/*                                            10,*/}
//             {/*                                        )}*/}
//             {/*                                    </Typography>*/}
//             {/*                                    <Typography variant="body2">*/}
//             {/*                                        {review.comment}*/}
//             {/*                                    </Typography>*/}
//             {/*                                </>*/}
//             {/*                            }*/}
//             {/*                        />*/}
//             {/*                    </ListItem>*/}
//             {/*                ))}*/}
//             {/*            </List>*/}
//             {/*        )}*/}
//             {/*    </Grid>*/}
//             {/*<Grid item md={6}>*/}
//             {/*    <Typography variant="h4">*/}
//             {/*        Write a Customer Review*/}
//             {/*    </Typography>*/}
//             {/*    {loadingProductReview && <Loader />}*/}
//             {/*    {userInfo ? (*/}
//             {/*        <form onSubmit={submitHandler}>*/}
//             {/*            <FormControl fullWidth>*/}
//             {/*                <InputLabel htmlFor="rating">Rating</InputLabel>*/}
//             {/*                <Select*/}
//             {/*                    labelId="rating"*/}
//             {/*                    id="rating"*/}
//             {/*                    required*/}
//             {/*                    value={rating}*/}
//             {/*                    onChange={e => setRating(e.target.value)}*/}
//             {/*                >*/}
//             {/*                    <MenuItem value="">Select...</MenuItem>*/}
//             {/*                    <MenuItem value="1">1 - Poor</MenuItem>*/}
//             {/*                    <MenuItem value="2">2 - Fair</MenuItem>*/}
//             {/*                    <MenuItem value="3">3 - Good</MenuItem>*/}
//             {/*                    <MenuItem value="4">4 - Very Good</MenuItem>*/}
//             {/*                    <MenuItem value="5">5 - Excellent</MenuItem>*/}
//             {/*                </Select>*/}
//             {/*            </FormControl>*/}
//             {/*            <TextareaAutosize*/}
//             {/*                id="comment"*/}
//             {/*                placeholder="Write your review here"*/}
//             {/*                rowsMin={3}*/}
//             {/*                required*/}
//             {/*                value={comment}*/}
//             {/*                onChange={e => setComment(e.target.value)}*/}
//             {/*                style={{*/}
//             {/*                    width: "100%",*/}
//             {/*                    marginTop: "10px",*/}
//             {/*                }}*/}
//             {/*            />*/}
//             {/*            <Button*/}
//             {/*                type="submit"*/}
//             {/*                variant="contained"*/}
//             {/*                color="primary"*/}
//             {/*                style={{ marginTop: "10px" }}*/}
//             {/*            >*/}
//             {/*                Submit*/}
//             {/*            </Button>*/}
//             {/*        </form>*/}
//             {/*    ) : (*/}
//             {/*        <Message>*/}
//             {/*            Please <Link to="/login">sign in</Link> to write a*/}
//             {/*            review*/}
//             {/*        </Message>*/}
//             {/*    )}*/}
//             {/*</Grid>*/}
//         </>
//     );
// };
//
// export default ProductDetail;
