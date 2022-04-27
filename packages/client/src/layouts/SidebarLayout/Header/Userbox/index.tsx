import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import {
	Avatar,
	Box,
	Button,
	Divider,
	lighten,
	List,
	ListItem,
	ListItemText,
	Popover,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const UserBoxButton = styled(Button)(
	({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
	({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
	({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
	({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
	({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
	const user = {
		name: "Hisham",
		avatar: "/static/images/avatars/hisham.png",
		jobtitle: "Project Manager",
	};

	const ref = useRef<any>(null);
	const [isOpen, setOpen] = useState<boolean>(false);

	const handleOpen = (): void => {
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
	};

	return (
		<>
			<UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
				<Avatar variant="rounded" alt={user.name} src={user.avatar} />
				<Box
					sx={{
						display: {
							md: "block",
							xs: "none",
						},
					}}
				>
					<UserBoxText>
						<UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
						<UserBoxDescription variant="body2">
							{user.jobtitle}
						</UserBoxDescription>
					</UserBoxText>
				</Box>
				<Box
					sx={{
						display: {
							sm: "block",
							xs: "none",
						},
					}}
				>
					<ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
				</Box>
			</UserBoxButton>
			<Popover
				anchorEl={ref.current}
				onClose={handleClose}
				open={isOpen}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<MenuUserBox sx={{ minWidth: 210 }} display="flex">
					<Avatar
						variant="rounded"
						alt={user.name}
						src={user.avatar}
					/>
					<UserBoxText>
						<UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
						<UserBoxDescription variant="body2">
							{user.jobtitle}
						</UserBoxDescription>
					</UserBoxText>
				</MenuUserBox>
				<Divider sx={{ mb: 0 }} />
				<List sx={{ p: 1 }} component="nav">
					<ListItem
						button
						to="/management/profile/details"
						component={NavLink}
					>
						<AccountBoxTwoToneIcon fontSize="small" />
						<ListItemText primary="My Profile" />
					</ListItem>
					<ListItem
						button
						to="/management/profile/settings"
						component={NavLink}
					>
						<AccountTreeTwoToneIcon fontSize="small" />
						<ListItemText primary="Account Settings" />
					</ListItem>
				</List>
				<Divider />
				<Box sx={{ m: 1 }}>
					<Button color="primary" fullWidth>
						<LockOpenTwoToneIcon sx={{ mr: 1 }} />
						Sign out
					</Button>
				</Box>
			</Popover>
		</>
	);
}

export default HeaderUserbox;
