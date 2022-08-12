import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const AdminLayoutPlaceholder = () => {
    return (
        <Stack>
            <Typography variant="h2" component="h2" mb={10}>
                Plan your next success! Select a category from the sidebar
            </Typography>
            <img
                alt=""
                src="/images/admin/placeholder.svg"
                style={{
                    width: "50%",
                    margin: "0 auto",
                }}
            />
        </Stack>
    );
};
export default AdminLayoutPlaceholder;
