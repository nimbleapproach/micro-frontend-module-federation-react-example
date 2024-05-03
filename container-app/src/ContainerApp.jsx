import React from 'react';
import { createRoot } from 'react-dom/client';
import RemoteAppWrapper from './RemoteAppWrapper';

const container = document.getElementById('container-app');
const root = createRoot(container);

root.render(
  <div>
    <h1>Container App</h1>
    <RemoteAppWrapper />
  </div>
);
