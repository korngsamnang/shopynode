import Typography from "@mui/material/Typography";
import Message from "../../ui/Message.jsx";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { TableContainer } from "@mui/material";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useUsers } from "./useUsers.js";
import Loading from "../../ui/Loading.jsx";
import { useDeleteUser } from "./useDeleteUser.js";

const UserList = () => {
    const { allUsers, isLoading, error } = useUsers();
    const { deleteUser, isDeleting } = useDeleteUser();

    const handleDeleteUser = id => {
        if (window.confirm("Are you sure?")) {
            deleteUser(id);
        }
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>
            {isLoading ? (
                <Loading />
            ) : error ? (
                <Message severity="error">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>NAME</TableCell>
                                <TableCell>EMAIL</TableCell>
                                <TableCell>ADMIN</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allUsers.data.users.map(user => (
                                <TableRow key={user._id}>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>
                                        <a href={`mailto:${user.email}`}>
                                            {user.email}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        {user.role === "admin" ? (
                                            <FaCheck
                                                style={{ color: "green" }}
                                            />
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {user.role !== "admin" && (
                                            <>
                                                <IconButton
                                                    component={Link}
                                                    to={`/admin/user/${user._id}/edit`}
                                                    aria-label="Edit"
                                                >
                                                    <FaEdit />
                                                </IconButton>
                                                <IconButton
                                                    variant="danger"
                                                    aria-label="Delete"
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            user._id,
                                                        )
                                                    }
                                                    disabled={isDeleting}
                                                >
                                                    <FaTrash
                                                        style={{
                                                            color: "red",
                                                        }}
                                                    />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default UserList;
