import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import { MouseEvent, ReactNode, useState } from "react";

interface ProjectItemProps {
    children: ReactNode;
    open?: boolean;
    isActive: boolean;
    title: string;
    onClick: () => void;
}

const ProjectTitle = styled("span")(
    ({ theme }) => `
        &:hover {
            border-bottom: 1px dashed ${theme.palette.primary.main};
        }
    `
);

const ProjectItemButton = styled(Button)(
    ({ theme }) => `
        color: ${theme.sidebar.menuItemColor};
        background-color: ${theme.sidebar.menuItemBg};
        width: 100%;
        justify-content: space-between;
        font-size: ${theme.typography.pxToRem(13)};
        padding-top: ${theme.spacing(0.8)};
        padding-bottom: ${theme.spacing(0.8)};
    `
);

const ProjectItem = ({
    children,
    open = false,
    title,
    onClick,
    isActive = false,
}: ProjectItemProps) => {
    const [isMenuExpanded, setIsMenuExpanded] = useState(open);

    const toggleMenu = (event: MouseEvent) => {
        setIsMenuExpanded((open) => !open);
        event.stopPropagation();
    };

    return (
        <div>
            <ProjectItemButton
                className={isActive ? "active" : ""}
                onClick={onClick}
                endIcon={
                    isMenuExpanded ? (
                        <ExpandLessTwoToneIcon style={{ fontSize: 24 }} onClick={toggleMenu} />
                    ) : (
                        <ExpandMoreTwoToneIcon style={{ fontSize: 24 }} onClick={toggleMenu} />
                    )
                }
            >
                <ProjectTitle>{title}</ProjectTitle>
            </ProjectItemButton>
            <Collapse sx={{ width: "100%", pr: 1 }} in={isMenuExpanded}>
                {children}
            </Collapse>
        </div>
    );
};

export default ProjectItem;
