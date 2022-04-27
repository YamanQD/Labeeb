import { Container, Typography } from "@mui/material";

const Tasks = () => {
	return (
		<Container maxWidth="lg" sx={{ pt: 4 }}>
			<Typography variant="h4">
				Hello you have 99 remaining tasks
			</Typography>
		</Container>
	);
};

export default Tasks;
