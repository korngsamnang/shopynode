import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductItem from "./ProductItem.jsx";
import { useProducts } from "./useProducts.js";
import Loading from "../../ui/Loading.jsx";

const ProductList = () => {
    const { products, isLoading } = useProducts();
    if (isLoading) return <Loading />;
    return (
        <Grid container direction="row">
            <Typography
                variant="h5"
                sx={{ marginBottom: "20px" }}
                color="primary"
            >
                Latest Products
            </Typography>
            <Grid container spacing={3}>
                {products.data.products.map(product => (
                    <Grid item xs={12} sm={6} lg={3} key={product._id}>
                        <ProductItem product={product} />
                    </Grid>
                ))}
                {/*<Grid item xs={12}>*/}
                {/*    <Paginate*/}
                {/*        pages={pages}*/}
                {/*        page={page}*/}
                {/*        keyword={keyword ? keyword : ""}*/}
                {/*    />*/}
                {/*</Grid>*/}
            </Grid>
        </Grid>
    );
};

export default ProductList;
