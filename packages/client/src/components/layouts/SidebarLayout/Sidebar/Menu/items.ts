import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import { SvgIcon } from "@mui/material";

export interface IMenuProject {
    id: number;
    link?: string;
    icon?: typeof SvgIcon;
    badge?: string;
    children?: IMenuProjectGroup[];
    title: string;
}

interface IMenuProjectGroup {
    id: number;
    title: string;
}

export const projects: IMenuProject[] = [
    {
        id: 1,
        title: "Satellite Simulator",
        link: "/tasks",
        icon: TableChartTwoToneIcon,
        children: [
            {
                id: 1,
                title: "Frontend",
            },

            {
                id: 2,
                title: "Backend",
            },
        ],
    },
];

