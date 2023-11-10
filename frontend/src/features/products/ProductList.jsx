import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductItem from "./ProductItem.jsx";
import { useProducts } from "./useProducts.js";
import Loading from "../../ui/Loading.jsx";
import { Link, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paginate from "../../ui/Paginate.jsx";

const ProductList = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("search") || "";
    const { products, isLoading } = useProducts();
    if (isLoading) return <Loading />;
    return (
        <>
            {keyword && (
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    component={Link}
                    to="/"
                >
                    Go back
                </Button>
            )}
            <Grid container direction="row">
                {keyword ? null : (
                    <Typography
                        variant="h5"
                        sx={{ marginBottom: "20px" }}
                        color="primary"
                    >
                        Latest Products
                    </Typography>
                )}

                <Grid container spacing={3}>
                    {products.data.products.map(product => (
                        <Grid item xs={12} sm={6} lg={3} key={product._id}>
                            <ProductItem product={product} />
                        </Grid>
                    ))}
                    <Grid item xs={12} className="flex justify-center pb-8">
                        <Paginate
                            count={products.totalPages}
                            page={products.currentPage}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductList;
