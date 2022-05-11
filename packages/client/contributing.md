# Labeeb's Frontend styleguide

## Code quality automation

TODO: Set up husky for pre-commit hooks (eslint and prettier).
TODO: Organize imports

## Props

It's highly recommended to document your components' props using the `prop-types` package, in addition to the usual TypeScript types.

## Localization

TODO: choose where translations should live. choose better names for json files.

Please be aware of commiting static (untraslated) text into the package, unless for a very good reason.

## Naming conventions

-   React component folders: PascalCase
-   React components: PascalCase
-   React pages: kebab-case
-   Non-React component folders: kebab-case

It's preferred to create a folder for each component that you create, with an `index.tsx` file in its root to prevent name duplication:

```js
// Bad
import Footer from "src/components/Footer/Footer.tsx";

//Better
import Footer from "src/components/Footer";
```

## Creating components

Use the following style when creating and exporting components:

```js
const SomeComponent = () => {
	return <div>Hello</div>;
};

export default SomeComponent;
```

Using class components is discouraged and frowned upon in this project! Use hooks and functional components instead.

## Styling components

This project heavily utilizes JSS solutions (mainly, [emotion](https://emotion.sh/docs/introduction)). I recommend avoiding writing CSS or SASS stylsheets in favor of using JS components (unless for a [specific reason](#performance-note)).

## Separation of concerns

I believe that (artificially) separating styled components as in the example below will only create more concerns and not save the developer any precious time.

You will spend half of your life switching context between the return statement and 100 lines above it. Moreover, you can't style these components based on the parent component's state unless you pass props to these components, as a result of which things will get ugly pretty fast.

**Example usage:**

```js
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

// Bad example
const LogoWrapper = styled(Link)(
	({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoText = styled("div")(
	({ theme }) => `
        color: green;
        background-color: yellow;
    `
);

const BadLogo = () => {
	return (
		<LogoWrapper>
			<LogoText>Text here</LogoText>
		</LogoWrapper>
	);
};

// Good example
const GoodLogo = () => {
	return (
		<Box
			sx={{
				display: "block",
				p: 2,
			}}
		>
			<Typography variant="h2">Text</Typography>
		</Box>
	);
};
```

_Note: There are some components that follow the bad style in this codebase. Refactoring them would take a big amount of time, so ignore them for now._

### Performance note

When there are many similar styled components that don't rely on the `theme` object, I recommened using plain HTML elements and writing a CSS stylesheet instead of JS components. This is much better for [performance reasons](https://mui.com/system/basics/#performance-tradeoff).

**Example usage:**

```js
const List = () => {
    const items = []; // 1000 items.

    // Bad example
    return (
        {
            items.map((item) => (<Box sx={{}}></Box>))
        }
    )

    // Better example
    return (
        {
            items.map((item) => <div className="item"></div>)
        }
    )
};
```
