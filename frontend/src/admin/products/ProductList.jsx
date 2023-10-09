import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pagination } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useProducts } from "../../features/products/useProducts.js";
import { useDeleteProduct } from "./useDeleteProduct.js";
import Loading from "../../ui/Loading.jsx";

const ProductList = () => {
    const { products, isLoading } = useProducts();
    const { deleteProduct, isDeleting } = useDeleteProduct();

    const handleDelete = id => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id);
        }
    };

    if (isLoading) return <Loading />;

    // if (error)
    //     return (
    //         <Message variant="danger">
    //             {error?.data?.message || error.error}
    //         </Message>
    //     );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Product</Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FaEdit />}
                    // onClick={createProductHandler}
                >
                    Create Product
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>NAME</TableCell>
                                <TableCell>PRICE</TableCell>
                                <TableCell>CATEGORY</TableCell>
                                <TableCell>BRAND</TableCell>
                                <TableCell>ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.data.products.map(product => (
                                <TableRow key={product._id}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            component={Link}
                                            to={`/admin/product/${product._id}/edit`}
                                            aria-label="Edit"
                                        >
                                            <FaEdit />
                                        </IconButton>
                                        <IconButton
                                            aria-label="Delete"
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            disabled={isDeleting}
                                        >
                                            <FaTrash style={{ color: "red" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                {/*<Pagination*/}
                {/*    pages={data.pages}*/}
                {/*    page={data.page}*/}
                {/*    isAdmin={true}*/}
                {/*/>*/}
            </Grid>
        </Grid>
    );
};

export default ProductList;
