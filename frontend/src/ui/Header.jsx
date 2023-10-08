import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { alpha, Badge, InputBase, styled } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import SearchIcon from "@mui/icons-material/Search";
import { AddShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { useLogout } from "../features/authentication/useLogout.js";
import { useUser } from "../features/authentication/useUser.js";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "20ch",
            "&:focus": {
                width: "25ch",
            },
        },
    },
}));

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const { logout } = useLogout();
    const { user } = useUser();
    const { cart } = useCart();

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = event => {
        if (user) {
            setAnchorElUser(event.currentTarget);
        }
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        handleCloseUserMenu();
    };

    return (
        <AppBar position="static" sx={{ marginBottom: "20px" }}>
            <Container sx={{ width: { xs: "100%", sm: "94%" } }} maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "flex" },
                        }}
                    >
                        <Box component={Link} to="/">
                            <img
                                src={`/White logo - no background.svg`}
                                alt="shopynode logo"
                                width="180"
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", sm: "none" },
                        }}
                    >
                        <Box component={Link} to="/">
                            <img
                                src={`/White logo - no background.png`}
                                alt="shopynode logo"
                                width="200"
                            />
                        </Box>
                    </Box>

                    <Box sx={{ mr: 1.5, flexGrow: 0.1 }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search products..." />
                        </Search>
                    </Box>

                    <Typography component={Link} to="/cart">
                        <IconButton sx={{ marginRight: user ? "10px" : "" }}>
                            <Badge
                                badgeContent={cart.cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0,
                                )}
                                color="error"
                            >
                                <AddShoppingCart />
                            </Badge>
                        </IconButton>
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={user ? "Profile" : "Sign In"}>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                {user ? (
                                    <Avatar
                                        alt={user.data.user.name}
                                        src="/static/images/avatar/2.jpg"
                                    />
                                ) : (
                                    <Typography
                                        component={Link}
                                        to="/login"
                                        sx={{ p: 0.8 }}
                                    >
                                        <LoginIcon />
                                    </Typography>
                                )}
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user && (
                                <div>
                                    <MenuItem
                                        onClick={handleCloseUserMenu}
                                        component={Link}
                                        to="/profile"
                                    >
                                        <Typography textAlign="center">
                                            Profile
                                        </Typography>
                                    </MenuItem>
                                    {user.data.user.role === "admin" && (
                                        <div>
                                            <MenuItem
                                                onClick={handleCloseUserMenu}
                                                component={Link}
                                                to="/admin/productlist"
                                            >
                                                <Typography textAlign="center">
                                                    Products
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseUserMenu}
                                                component={Link}
                                                to="/admin/orderlist"
                                            >
                                                <Typography textAlign="center">
                                                    Orders
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseUserMenu}
                                                component={Link}
                                                to="/admin/users"
                                            >
                                                <Typography textAlign="center">
                                                    Users
                                                </Typography>
                                            </MenuItem>
                                        </div>
                                    )}
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </div>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
