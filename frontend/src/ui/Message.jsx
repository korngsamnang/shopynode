import { Alert } from "@mui/material";

const Message = ({ severity, children }) => {
    return (
        <div>
            <Alert severity={severity}>{children}</Alert>
        </div>
    );
};

Message.defaultProps = {
    severity: "info",
};

export default Message;
