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

-   Domain and API related files: camelCase

-   React component folders: PascalCase
-   React components: PascalCase
-   React pages: PascalCase
-   CSS files for React components: kebab-case

It's preferred to create a folder for each component that you create, with an `index.tsx` file in its root to prevent name duplication:

```tsx
// Bad
import Footer from "src/components/Footer/Footer.tsx";

//Better
import Footer from "src/components/Footer";
```

## Creating components

Use the following style when creating and exporting components:

```tsx
const SomeComponent = () => {
    return <div>Hello</div>;
};

export default SomeComponent;
```

Using class components is discouraged and frowned upon in this project! Use hooks and functional components instead.

## Styling components

This project heavily utilizes JSS solutions (mainly, [emotion](https://emotion.sh/docs/introduction)).

**So what should I use?**

Should I use styled components like this:

```tsx
import { styled } from "@mui/material/styles";

const Root = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
}));
```

Or use the `sx` prop like this:

```tsx
import { Box } from "@mui/material";

const Wrapper = () => (
    <Box
        sx={{
            color: "primary.main",
            m: 2,
        }}
    ></Box>
);
```

Or use plain old CSS?

```tsx
import styles from "./style.module.css";

const Wrapper = () => (
    <div className={styles.wrapper}></div>;
);
```

I know MUI's docs are confusing a little bit, but this table might help you make your decision:

| Use case \ Technique                             | CSS Classes/style attribute | `sx` | styled components |
| ------------------------------------------------ | --------------------------- | ---- | ----------------- |
| No interactivity                                 | ✅                          | ❌   | ✅                |
| Styling based on props                           | ✅                          | ✅   | ❌                |
| You need the `theme` variable                    | ❌                          | ✅   | ✅                |
| There are [too many elements](#performance-note) | ✅                          | ❌   | ❌                |

### Performance note

For [performance reasons](https://mui.com/system/basics/#performance-tradeoff), prefer using CSS classes to render big amounts of elements.

**Example usage:**

```tsx
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
