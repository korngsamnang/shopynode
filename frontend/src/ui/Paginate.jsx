import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";

const Paginate = ({ count, page }) => {
    const [_, setSearchParams] = useSearchParams();
    const handleChange = (event, value) => {
        setSearchParams({ page: value });
    };
    return (
        <Stack spacing={2}>
            <Pagination
                count={count}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
        </Stack>
    );
};

export default Paginate;
