import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import { SvgIcon } from "@mui/material";

export interface IMenuItem {
    link?: string;
    icon?: typeof SvgIcon;
    badge?: string;
    children?: IMenuItem[];
    name: string;
}

export const menuItems: IMenuItem[] = [
    {
        name: "Satellite Simulator",
        link: "/tasks",
        icon: TableChartTwoToneIcon,
        children: [
            {
                name: "Frontend",
                link: "/tasks",
            },

            {
                name: "Backend",
                link: "/tasks",
            },
        ],
    },
];

