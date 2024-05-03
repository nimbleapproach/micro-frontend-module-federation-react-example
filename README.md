<div class="header" align="center">
  <img src=".config/logo.png" />
  <h1 align="center">Micro Frontend Module Federation React Example</h1>
</div>

This repo demonstrates how to use Webpack's Module Federation to lazy load a react SPA from one domain into another React SPA running on another domain.

The remote app is wrapper with an error boundary to catch any errors from within this app, and a Suspense component to show a loading state whilst the remote app is loaded.

## Domain Language

### Webpack Module Federation
A Webpack plugin that allows us to load in and share node modules across remote micro-frontend's.

Docs: https://webpack.js.org/concepts/module-federation/

### Container
The container app runs on the root domain and loads in a remotely running application or "micro frontend" hosted on a separate domain.

### Remote
The remote app is a smaller part of a larger application that can be loaded into another application.

## To Run

```
cd ./container-app
npm i 
npm run start
```

in another terminal

```
cd ./remote-app
npm i 
npm run start
```

Open `https://localhost:3030` to view the container app that loads in the remote micro frontend app.

