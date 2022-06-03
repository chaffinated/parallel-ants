
# Setup
First, make sure you have [Node installed](https://nodejs.org/en/download/). You'll need version 16 or greater.

Next, you'll need to have either [Yarn](https://classic.yarnpkg.com/lang/en/docs/install) or NPM installed before attempting to set up or run this project.

After those are installed run either:
```bash
yarn install
```

or:
```bash
npm install
```

# Run
First, you'll need to build a version of the site with the command:
```bash
yarn build
```

Once that is complete, run:
```bash
yarn start
```

You will be able to access [http://localhost:3000](http://localhost:3000) from a browser. If you already have a process running on port 3000, you can change the port to whatever you like by running:
```bash
yarn start --port <port_number>
```
