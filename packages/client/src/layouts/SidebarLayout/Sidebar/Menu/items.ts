import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import { SvgIcon } from "@mui/material";

export interface MenuItem {
	link?: string;
	icon?: typeof SvgIcon;
	badge?: string;
	items?: MenuItem[];
	name: string;
}

export interface MenuItems {
	items: MenuItem[];
	heading: string;
}

const menuItems: MenuItems[] = [
	{
		heading: "",
		items: [
			{
				name: "Tasks",
				link: "/tasks",
				icon: TableChartTwoToneIcon,
			},
		],
	},
];

export default menuItems;
