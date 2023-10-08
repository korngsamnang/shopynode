import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "../features/authentication/useUser.js";

const Loading = () => {
    const { isLoading } = useUser();
    return (
        <div
            className={`flex justify-center items-center  ${
                isLoading ? "h-[73vh]" : "h-[60vh]"
            }`}
        >
            <CircularProgress size={70} />
        </div>
    );
};
export default Loading;
