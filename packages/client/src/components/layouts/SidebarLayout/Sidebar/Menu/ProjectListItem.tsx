import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface SidebarListItemProps {
    badge?: string | number;
    title: string;
    onClick: () => void;
}

const ProjectListeItemButton = styled(Button)(
    ({ theme }) => `
        justify-content: space-between;
        width: 100%;
        font-weight: 600;
    `
);

const ProjectListItem = ({ onClick, title, badge = 5 }: SidebarListItemProps) => {
    return (
        <ProjectListeItemButton onClick={onClick}>
            {title}
            {badge && <Badge color="primary" badgeContent={badge} />}
        </ProjectListeItemButton>
    );
};

export default ProjectListItem;
