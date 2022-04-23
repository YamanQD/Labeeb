# Labeeb Server

The back-end server for Labeeb, an arabic-first task management system

## Requirements

  * [Node.js x16 or later](https://nodejs.org/)
  * [Yarn](https://yarnpkg.com/)
  * [MariaDB](https://mariadb.org/)

## Installation

1. Clone the git repository locally:
    ```bash
    # https
    $ git clone https://codeberg.org/YamanQD/labeeb-server.git

    # ssh
    $ git clone git@codeberg.org:YamanQD/labeeb-server.git
    ```
    or download the source-code and extract it.

2. Install the dependencies:

    ```bash
    $ yarn
    ```
3. Copy `.env.example` to `.env` and edit it to match your database info.

## Running the app

First, start your MariaDB server.

Then, start the app:

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Build Instructions

After following the installation instructions run:

```
yarn build
```

The build can be then accessed at `/dist`.


## License

Labeeb-Server is [MIT licensed](LICENSE).
