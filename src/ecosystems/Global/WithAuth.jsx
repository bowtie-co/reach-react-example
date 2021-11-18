import React, { useState, useEffect } from 'react';
import { storage } from '../../lib';
import { WithChildren } from '.';

export const WithAuth = ({ children, ...props }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!storage.get('token'));

  const logout = () => {
    storage.remove('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const setAuthWithToken = (token) => setIsAuthenticated(!!token);
    const setAuthFalse = () => setIsAuthenticated(true);

    storage.on('token_changed', setAuthWithToken);
    storage.on('token_removed', setAuthFalse);

    return () => {
      storage.off('token_changed', setAuthWithToken);
      storage.off('token_removed', setAuthFalse);
    };
  }, [ setIsAuthenticated ]);

  const authProps = { isAuthenticated, setIsAuthenticated, logout };

  console.log('Using authProps', authProps);

  return (
    <WithChildren {...props} {...authProps} children={children} />
  );
};