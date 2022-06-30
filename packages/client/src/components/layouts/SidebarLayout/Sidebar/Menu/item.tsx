import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { Badge, Button, Collapse, ListItem } from "@mui/material";
import PropTypes from "prop-types";
import { FC, ReactNode, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";

interface SidebarMenuItemProps {
	children?: ReactNode;
	link?: string;
	icon?: any;
	badge?: string;
	open?: boolean;
	active?: boolean;
	name: string;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
	children,
	link,
	icon: Icon,
	badge,
	open: openParent,
	active,
	name,
	...rest
}) => {
	const [menuToggle, setMenuToggle] = useState(openParent);

	const toggleMenu = (): void => {
		setMenuToggle((Open) => !Open);
	};

	if (children) {
		return (
			<ListItem
				component="div"
				className="Mui-children"
				key={name}
				{...rest}
			>
				<Button
					className={`${menuToggle ? "Mui-active" : ""}`}
					startIcon={Icon && <Icon />}
					endIcon={
						menuToggle ? (
							<ExpandLessTwoToneIcon />
						) : (
							<ExpandMoreTwoToneIcon />
						)
					}
					onClick={toggleMenu}
				>
					{name}
				</Button>
				<Collapse in={menuToggle}>{children}</Collapse>
			</ListItem>
		);
	}

	return (
		<ListItem component="div" key={name} {...rest}>
			<Button
				component={RouterLink}
				to={link as string}
				startIcon={Icon && <Icon />}
			>
				{name}
				{badge && <Badge badgeContent={badge} />}
			</Button>
		</ListItem>
	);
};

SidebarMenuItem.propTypes = {
	children: PropTypes.node,
	active: PropTypes.bool,
	link: PropTypes.string,
	icon: PropTypes.elementType,
	badge: PropTypes.string,
	open: PropTypes.bool,
	name: PropTypes.string.isRequired,
};

SidebarMenuItem.defaultProps = {
	open: false,
	active: false,
};

export default SidebarMenuItem;
