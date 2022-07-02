# Labeeb's Frontend

Please refer to the `contributing.md` file before contributing code to this package.

**Labeeb on Figma:** https://www.figma.com/files/project/27496554/Labeeb-TMS

> Please contact Hasan Mothaffar if you don't have access to files on Figma

## Architecture

This is my first attempt at applying a clean architecture in the frontend domain. I tried to learn from other people's repositories and articles on clean architecture and apply this knowledge where I think it fits in this project.

These are the resources that I learned from:

-   https://github.com/huy-ta/flexible-counter-app
-   https://github.com/bespoyasov/frontend-clean-architecture
-   https://github.com/andoshin11/clean-architecture-example-vue (CHECK OUT ITS NETWORK FOLDER)
-   https://github.com/slipstream00/reactjs-functions
-   https://github.com/nanosoftonline/clean-architecture-express-contacts
-   https://github.com/devbootstrap/SOLID-Principles-Examples-using-Typescript
-   https://github.com/Zenika/grenoble-hands-on-front-clean-architecture

In short, there are two main concepts I applied in this project:

1. Splitting the app's files by features. Each feature has its own files grouped together under one folder.
2. Create three de-coupled layers: UI, Application, and Domain.

The application layer contains the app's specific implementation of the domain's requirements, and has ports so that the UI layer can access the data. This layered architecture allows you to change one aspect of your program (for example, the http client or some state management library) without affecting other modules.

> Note: The above GitHub repositories should only serve as an example of applying clean architecture, and not a one-and-only template that you have to strictly follow. If you think your design decision isn't compliant with "XYZ" architecture, but serves the project well and is maintainable, then by all means go for it.

## Testing

## Credits

### Icons

You can borrow SVG icons from here: https://www.svgrepo.com

### Design files

https://www.figma.com/community/file/1009844794585513376
