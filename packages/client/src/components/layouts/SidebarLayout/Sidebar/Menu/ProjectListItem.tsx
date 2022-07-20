import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
interface SidebarListItemProps {
    id: number;
    badge?: string | number;
    title: string;
    onClick: () => void;
    isActive: boolean;
}

const ProjectListeItemButton = styled(Button)(
    ({ theme }) => `
        justify-content: space-between;
        width: 100%;
        font-weight: 600;
        color: ${theme.sidebar.menuItemColor};

        &.active {
            color: ${theme.sidebar.menuItemColorActive};
            background-color: ${theme.sidebar.menuItemBgActive};
        }
    `
);

const ProjectListItem = ({ id, onClick, title, badge = 5, isActive = false}: SidebarListItemProps) => {
    return (
        <ProjectListeItemButton onClick={onClick} className={isActive ? "active" : ""}>
            {title}
            {badge && <Badge color="primary" badgeContent={badge} sx={{right: "8px"}} />}
        </ProjectListeItemButton>
    );
};

export default ProjectListItem;
