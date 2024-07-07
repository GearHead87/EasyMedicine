"use client"
import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

interface Props {
	children: React.ReactNode;
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
