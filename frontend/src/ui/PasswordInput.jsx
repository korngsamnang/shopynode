import { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInput = ({
    id,
    name = "password",
    label,
    variant,
    defaultValue,
    value,
    onChange, // Formik onChange handler
    handleOnChange, // Custom onChange handler - remove in the future
    onBlur,
    error,
    helperText,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <TextField
            type={showPassword ? "text" : "password"}
            id={id}
            label={label}
            variant={variant}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange ? onChange : e => handleOnChange(e.target.value)}
            onBlur={onBlur}
            name={name}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            error={error}
            helperText={helperText}
        />
    );
};

export default PasswordInput;
