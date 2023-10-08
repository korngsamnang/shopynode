import { Grid, Rating } from "@mui/material";
import Typography from "@mui/material/Typography";

export const RatingBar = ({ value, text }) => {
    return (
        <Grid container>
            <Rating name="read-only" value={value || 0} readOnly size="small" />
            <Typography variant="caption" color="textSecondary" component="p">
                {text}
            </Typography>
        </Grid>
    );
};
