import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const AdminLayoutPlaceholder = () => {
    const { t } = useTranslation();

    return (
        <Stack>
            <Typography variant="h2" component="h2" mb={10}>
                {t("admin.select_category")}
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
