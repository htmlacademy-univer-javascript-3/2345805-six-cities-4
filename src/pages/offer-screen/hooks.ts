import { useEffect } from 'react';
import { useAppOutletContext } from '../../components/page-layout/hooks';
import { ExtendedOffer } from '../../types/offer';
import {
  fetchNearbyAction,
  fetchOfferAction,
  fetchReviewsAction,
} from '../../store';

import { useAppDispatch } from '../../hooks';

export function useOfferData(id: string) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferAction(id));
    dispatch(fetchReviewsAction(id));
    dispatch(fetchNearbyAction(id));
  }, [dispatch, id]);
}

export function usePageInfo(offer: ExtendedOffer | null) {
  const { setPageInfo } = useAppOutletContext();

  useEffect(() => {
    setPageInfo({
      title: offer?.title || '',
      description: offer?.description || '',
    });
  }, [offer?.description, offer?.title, setPageInfo]);
}
