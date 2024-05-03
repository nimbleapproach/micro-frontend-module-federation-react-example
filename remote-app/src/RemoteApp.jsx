import React from 'react';
import { createRoot } from 'react-dom/client';
import RemoteMicroAppBody from './RemoteAppBody';

const container = document.getElementById('remote-app');
const root = createRoot(container);

root.render(<RemoteMicroAppBody />);
