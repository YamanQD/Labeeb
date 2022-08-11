import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainContent = styled(Box)(
    ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const Status404 = () => {
    return (
        <>
            <MainContent>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <img alt="404" height={180} src="/images/status/404.svg" />
                        <Typography variant="h2" sx={{ my: 2 }}>
                            The page you were looking for doesn't exist.
                        </Typography>

                        <Button href="/" variant="contained">
                            Go to homepage
                        </Button>
                    </Box>
                </Container>
            </MainContent>
        </>
    );
};

export default Status404;
