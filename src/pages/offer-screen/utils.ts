import { Offer } from '../../types/offer';

export const getShuffledNearby = (nearby: readonly Offer[]): Offer[] =>
  [...nearby].sort(() => Math.random() - 0.5);
