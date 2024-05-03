import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import loadComponent from '../utils/loadRemoteComponent';

const ErrorFallbackRender = () => {
	return (
		<div>
      <h1>Error in remote app</h1>
    </div>
	);
};

const SuspenseFallback = () => {
	return (
		<div>
			<h2>Loading micro app...</h2>
		</div>
	);
};

const RemoteAppWrapper = () => {
  const RemoteApp = lazy(loadComponent());

  return (
    <ErrorBoundary fallbackRender={<ErrorFallbackRender />}>
      <Suspense fallback={<SuspenseFallback />}>
        <RemoteApp />
      </Suspense>
    </ErrorBoundary>
  )
}

export default RemoteAppWrapper;
