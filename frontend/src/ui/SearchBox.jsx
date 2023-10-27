import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { alpha, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProducts } from "../features/products/useProducts.js";

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
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

const SearchBox = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlKeyword = searchParams.get("search") || "";

    const [keyword, setKeyword] = useState(urlKeyword || "");

    const submitHandler = e => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?search=${keyword.trim()}`);
            setKeyword("");
        } else {
            navigate("/");
        }
    };

    return (
        <form className="mr-1.5 flex-grow-1/10" onSubmit={submitHandler}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search products..."
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
            </Search>
        </form>
    );
};

export default SearchBox;
