import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CloudUpload } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { useProductDetail } from "../../features/products/useProductDetail.js";
import Loading from "../../ui/Loading.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUpdateProduct } from "./useUpdateProduct.js";
import LoadingMini from "../../ui/LaodingMini.jsx";

const ProductUpdate = () => {
    const { id } = useParams();
    const { product, isLoading } = useProductDetail();
    const { updateProduct, isLoading: isUpdating } = useUpdateProduct();

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [stockQuantity, setStockQuantity] = useState(0);
    const [description, setDescription] = useState("");

    const [loadingUpload, setLoadingUpload] = useState(false);

    const submitHandler = e => {
        e.preventDefault();
        if (
            !productName ||
            !price ||
            !image ||
            !brand ||
            !category ||
            !stockQuantity ||
            !description
        ) {
            alert("Please fill in all fields");
            return;
        }
        const productUpdated = {
            productName,
            price,
            image,
            brand,
            category,
            stockQuantity,
            description,
        };
        updateProduct({ id, product: productUpdated });
    };

    const uploadFileHandler = async e => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            // Your file upload logic here
            setLoadingUpload(true);
            // After successful upload, update the image state and show a success message
            setImage("your-uploaded-image-url");
        } catch (err) {
            console.error(err);
            // Handle the error
        } finally {
            setLoadingUpload(false);
        }
    };

    useEffect(() => {
        if (!isLoading && product) {
            setProductName(product.data.product.productName);
            setPrice(product.data.product.price);
            setImage(product.data.product.image);
            setBrand(product.data.product.brand);
            setCategory(product.data.product.category);
            setStockQuantity(product.data.product.stockQuantity);
            setDescription(product.data.product.description);
        }
    }, [isLoading, product]);

    if (isLoading) return <Loading />;

    return (
        <Container maxWidth="md">
            <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                component={Link}
                to="/admin/productlist"
            >
                Go back
            </Button>
            <Box my={3}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Edit Product
                </Typography>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                value={productName}
                                onChange={e => setProductName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Image"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                            <input
                                type="file"
                                id="image-file"
                                onChange={uploadFileHandler}
                                hidden
                            />
                            <label htmlFor="image-file">
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<CloudUpload />}
                                >
                                    Upload Image
                                </Button>
                            </label>
                            {loadingUpload && (
                                <CircularProgress size={20} thickness={5} />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Brand"
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Count In Stock"
                                type="number"
                                value={stockQuantity}
                                onChange={e => setStockQuantity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disableElevation
                            disabled={isUpdating}
                        >
                            {isUpdating ? <LoadingMini /> : "Update"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default ProductUpdate;
