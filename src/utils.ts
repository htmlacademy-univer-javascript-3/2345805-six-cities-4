import { SortingType } from './const';
import { Offer } from './types/offer';

export const capitalizeFirstLetter = (word: string) => {
  if (word.length === 0) {
    return word;
  }
  const trimmed = word.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

export const formatRating = (rate: number) => `${(rate / 5) * 100}%`;

export const sortOfferFunction: Record<
  SortingType,
  (offers: Readonly<Offer[]>) => Offer[]
> = {
  [SortingType.Popular]: (offers) => [...offers],
  [SortingType.LowToHigh]: (offers) =>
    [...offers].sort((a, b) => a.price - b.price),
  [SortingType.HighToLow]: (offers) =>
    [...offers].sort((a, b) => b.price - a.price),
  [SortingType.TopRated]: (offers) =>
    [...offers].sort((a, b) => b.rating - a.rating),
};
