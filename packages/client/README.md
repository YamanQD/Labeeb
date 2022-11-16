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
-   https://github.com/nanosoftonline/clean-architecture-express-contacts
-   https://github.com/devbootstrap/SOLID-Principles-Examples-using-Typescript
-   https://github.com/Zenika/grenoble-hands-on-front-clean-architecture
-   https://github.com/alan2207/bulletproof-react
-   https://boom.co/blogs/complex-react-architecture/

**Edit**: After 5 months, I think applying the 'Clean Architecture' concept in this app was a total failure. I wrote tons of boilerplate code that I knew wasn't going to benefit from. In my opinion, you can't always apply the same architecture concepts of backend directly to frontend, but you can instead learn from them and create what suits your application.

On the Internet, you'll find lots of people sharing posts about 'Frontend Clean Architecture', claiming that adding 2-3 levels of absolutely unnecessary indirection in code will make your app more decoupled and clean.

I honestly fell into that trap and tried to apply the principles that I found here in this project.

You can read more from people who share this opinion with me here:

- https://stackoverflow.com/questions/71525521/how-to-use-separation-of-concern-with-react-query-in-a-clean-architecture-conte
- https://dev.to/rubemfsv/clean-architecture-applying-with-react-40h6 (comments)

That is not to say that applying clean architecture is generally bad: Just make sure you have a valid reason for what you're doing.

## API Mocking

-   This project uses [MirageJS](https://miragejs.com/) to mock the backend API. You can inspect the `src/lib/mock-server` folder to learn more.

## Credits

### Icons

You can borrow SVG icons from here: https://www.svgrepo.com

### Design files

https://www.figma.com/community/file/1009844794585513376
