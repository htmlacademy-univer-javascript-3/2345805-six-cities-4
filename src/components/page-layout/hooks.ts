import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContextType } from './types';

export const useAppOutletContext = () => useOutletContext<OutletContextType>();

export const usePageInfo = (
  { title, description } = { title: '', description: '' }
) => {
  const [pageInfo, setPageInfo] = useState({ title, description });

  useEffect(() => {
    setPageInfo({ title, description });
  }, [description, title]);

  return { pageInfo, setPageInfo };
};
