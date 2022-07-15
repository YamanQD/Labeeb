# Labeeb

An Arabic-first Tasks Management System.

## Installation

Since the project has not been released yet, you have to install it from source.
And for now instructions will be only provided for development purposes.

### Installation for Development

1. Download the source-code into your machine.
   - Either by downloading it as a .zip and extracting it.
   - Or by cloning the repository using git (SSH recommended).
2. Install Node.js 16.x or later versions on your machine.
3. Enable `corepack`:

   ```bash
   # Use an elevated shell (Administrator shell on Windows, sudo on Unix).
   corepack enable
   ```

4. Install all the workspace dependencies

   ```bash
   # Use a shell open at the root of the source-code.
   yarn
   ```

## Starting the development servers

> You can also use the vs-code tasks.

```bash
# Start frontend (client) development server and watch for changes.
yarn frontend

# Start backend server for development and watch for changes.
# Make sure to set up the database before doing this.
yarn backend
```

### Setting up the database

Before starting the backend server, make sure that your MariaDB instance is running.

On Windows, the easiest way is to use [XAMPP](https://www.apachefriends.org/). Here are the details steps:

1. Download XAMPP from the website provided above.
2. Install it on your machine.
3. Open the `xampp-control.exe` file and start the MySQL and Apache services.
4. Navigate to `localhost/phpmyadmin` in any browser.
5. Log in (username: root, password: '')
6. Create a new Database called 'Labeeb'
7. Spin up the backend server using `yarn backend`.

> Note: It isn't necessary to start the Apache service unless you want to access phpmyadmin.

> Although XAMPP calls it MySQL, it actualy uses MariaDB.

## Developing with Visual Studio Code

Open the workspace using the `labeeb.code-workspace` file from the root of the repository.
So vs-code can recognize the workspaces configuration properly.

### Focusing on a workspace

Collapse all the other workspaces you don't care about in the files panel,
and only expand the one you want.

### Tasks

Some tasks have been setup for basic operations.

They run commands properly at the right working directories so you can take advantage of them.

### Working with terminals

When starting a terminal, vs-code either opens it at the root of the **workspace** of the currently open file, or asks which workspace to use.

Pay attention to the working directory:

- It could be the project root `/labeeb/`.
- It could be the root of the backend `/labeeb/packages/server/`.
- It could be the root of the frontend `/labeeb/packages/client/`.
- It could be the root of any other package `/labeeb/packages/<package>/`.

Yarn commands work properly here:

- It will look for the command first at the closest package.json.
- Then will look for it at the project-level package.json.
- If the command has the format `<package>:<command>`, it'll look for it at the corresponding package.

You can also use the following format to run any command at workspace root:

```bash
yarn workspace <package> <command>
```