import { List } from "@mui/material";
import { styled } from "@mui/material/styles";

const ItemsList = styled(List)(
    ({ theme }) => `
    margin-bottom: ${theme.spacing(1)};
    padding: 0;

    & > .MuiList-root {
      padding: 0;
    }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemHeadingColor};
      padding: ${theme.spacing(0.8, 0)};
      line-height: 1.4;
    }
`
);

export default ItemsList;
