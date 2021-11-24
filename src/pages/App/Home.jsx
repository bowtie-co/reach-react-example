import React from 'react';
import { WithApp, WithAuth } from '../../ecosystems';
import { DebugProps, AppHome } from '../../organisms';

export const PageHome = (props) => {
  return (
    <WithAuth>
      <WithApp {...props}>
        <AppHome />
        <DebugProps debug {...props} />
      </WithApp>
    </WithAuth>
  );
};
