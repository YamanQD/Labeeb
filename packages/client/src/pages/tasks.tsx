import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Tasks = () => {
	const { t } = useTranslation();
	return (
		<Container maxWidth="lg" sx={{ pt: 4 }}>
			<Typography variant="h4">{t("tasks.remaining")}</Typography>
		</Container>
	);
};

export default Tasks;
