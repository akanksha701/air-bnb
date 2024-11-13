'use client';

import { useEffect } from 'react';
import EmptyState from './components/navbar/EmptyState';

interface ErrorProps {
    error: Error;
}
export  function ErrorState({ error }: ErrorProps) {
   useEffect(() => {
    console.error(error);
   }, [error]);
    return <EmptyState title='Uh oh' subtitle='Something went wrong!' />
}
export default ErrorState;
