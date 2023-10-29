import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetUserById } from "./useGetUserById.js";
import { useUpdateUser } from "./useUpdateUser.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../../ui/Loading.jsx";
import LoadingMini from "../../ui/LaodingMini.jsx";

const UpdateUser = () => {
    const { id } = useParams();

    const { user, isLoading } = useGetUserById();
    const { updateUser, isLoading: isUpdating } = useUpdateUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");

    const submitHandler = async e => {
        e.preventDefault();
        if (!name || !email) return;
        updateUser({ id, name, email, role });
    };

    useEffect(() => {
        if (user) {
            setName(user.data.user.name);
            setEmail(user.data.user.email);
            setRole(user.data.user.role);
        }
    }, [user]);

    if (isLoading) return <Loading />;

    return (
        <Container maxWidth="md">
            <Box my={3}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    component={Link}
                    to="/admin/users"
                    sx={{ mb: 2 }}
                >
                    Go back
                </Button>
                <Typography variant="h5" component="h1" gutterBottom>
                    Update User
                </Typography>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup
                                row
                                value={role}
                                onChange={e => setRole(e.target.value)}
                            >
                                <FormControlLabel
                                    control={<Radio />}
                                    value="user"
                                    label="User"
                                />
                                <FormControlLabel
                                    control={<Radio />}
                                    value="admin"
                                    label="Admin"
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Box mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
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

export default UpdateUser;
