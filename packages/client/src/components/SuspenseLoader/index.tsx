import  CircularProgress from "@mui/material/CircularProgress";

const SuspenseLoader = () => {
    return (
        <div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <CircularProgress size={64} disableShrink thickness={3} />
        </div>
    );
};

export default SuspenseLoader;
