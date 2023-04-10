# Zenith

The new front end for seventwentyseven.xyz. Written using Next.js, Typescript and Tailwind CSS.

## How to use

If you use npm:

```bash
git clone https://github.com/seventwentyseven/zenith
cd zenith

# Install dependencies
npm install

# Configure server
cp .env.local.example .env.local
nano .env.local

cp config.json.example config.json
nano config.json

# For development purposes. Has hot reload on every file save, and compiles every page every time the server is opened.
npm run dev

# When you are ready to go to production, do this:
npm run build
npm run start

# It will compile all the pages and start a server at localhost:3000
```

If you use yarn:

```bash
git clone https://github.com/seventwentyseven/zenith
cd zenith

# Install dependencies
yarn

# Configure server
cp .env.local.example .env.local
nano .env.local

cp config.json.example config.json
nano config.json

# For development purposes. Has hot reload on every file save, and compiles every page every time the server is opened.
yarn dev

# When you are ready to go to production, do this:
yarn build
yarn start

# It will compile all the pages and start a server at localhost:3000
```
