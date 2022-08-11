import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CanvasConfetti from "canvas-confetti";
import { useEffect } from "react";
import { useStore } from "src/lib/store";

const INSPIRATION_MESSAGE_TITLES = ["Great job!", "You're almost there!", "Nice one!"];
const INSPIRATION_MESSAGES_IMAGES = ["1.svg", "2.svg", "3.svg"];

const getRandomElementFromArray = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)] as T;
};

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    p: 4,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
};

const MotivationModal = () => {
    const isMotivationModalOpen = useStore((state) => state.isMotivationModalOpen);
    const toggleMotivationModal = useStore((state) => state.toggleMotivationModal);

    // Confetti from: https://www.npmjs.com/package/canvas-confetti
    useEffect(() => {
        if (isMotivationModalOpen) CanvasConfetti();
    }, [isMotivationModalOpen]);

    return (
        <Modal
            open={isMotivationModalOpen}
            onClose={() => toggleMotivationModal(false)}
            keepMounted
            sx={{
                zIndex: 10,
            }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                    {getRandomElementFromArray(INSPIRATION_MESSAGE_TITLES)}
                </Typography>

                <img
                    src={`/images/motivation/${getRandomElementFromArray(
                        INSPIRATION_MESSAGES_IMAGES
                    )}`}
                    alt=""
                    width="400"
                    height="300"
                />

                <Typography id="modal-modal-description" sx={{ my: 2 }}>
                    You are one step closer to finishing the project. Keep going!
                </Typography>

                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => toggleMotivationModal(false)}
                >
                    Go back to projects
                </Button>
            </Box>
        </Modal>
    );
};

export default MotivationModal;
