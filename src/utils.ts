import { Offer } from './types/offer';

export const formatRating = (rate: number) => `${(rate / 5) * 100}%`;

type OfferComparator = (offerA: Offer, offerB: Offer) => number;
export const getOfferComparator = (sortType: string): OfferComparator => {
  switch (sortType) {
    case 'Popular':
      return () => 0;
    case 'Price: low to high':
      return (offerA, offerB) => offerA.price - offerB.price;
    case 'Price: high to low':
      return (offerA, offerB) => offerB.price - offerA.price;
    case 'Top rated first':
      return (offerA, offerB) => offerB.rating - offerA.rating;
    default:
      throw new Error('Unknown sort type!');
  }
};
