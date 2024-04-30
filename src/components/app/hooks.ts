import { useEffect } from 'react';

import { fetchFavouritesAction, getAuthCheckedStatus } from '../../store';

import { useAppDispatch, useAppSelector } from '../../hooks';

const useFetchFavorites = () => {
  const dispatch = useAppDispatch();
  const authCheckedStatus = useAppSelector(getAuthCheckedStatus);

  useEffect(() => {
    if (authCheckedStatus) {
      dispatch(fetchFavouritesAction());
    }
  }, [dispatch, authCheckedStatus]);
};

export { useFetchFavorites };
