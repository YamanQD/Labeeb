import { Box, Container, Typography } from "@mui/material";

function Footer() {
	return (
		<Container maxWidth="lg" sx={{ my: 3 }}>
			<Box
				py={3}
				display={{ xs: "block", md: "flex" }}
				alignItems="center"
				textAlign={{ xs: "center", md: "left" }}
				justifyContent="space-between"
			>
				<Box>
					<Typography variant="subtitle1">
						&copy; 2022 - Labeeb TMS
					</Typography>
				</Box>
				<Typography sx={{ pt: { xs: 2, md: 0 } }} variant="subtitle1">
					Crafted by the <strong>Hawks' Team</strong>
				</Typography>
			</Box>
		</Container>
	);
}

export default Footer;
