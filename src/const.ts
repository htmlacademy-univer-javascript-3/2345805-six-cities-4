export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Routes {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '/*',
}

export enum NameSpace {
  App = 'APP',
  User = 'USER',
  MultipleOffersData = 'MULTIPLE_OFFERS_DATA',
  SingleOfferData = 'SINGLE_OFFER_DATA',
  FavouritesData = 'FAVOURITES_DATA',
  NearbyOffersData = 'NEARBY_OFFERS_DATA',
  ReviewsData = 'REVIEWS_DATA',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export enum TitlePage {
  Main = 'Home',
  Favorites = 'Favorites',
  Login = 'Login',
}

export enum DescriptionPage {
  Main = 'Description main',
  Favorites = 'Description favorites',
  Login = 'Description login',
}

export enum FavouriteStatus {
  Add = 1,
  Remove = 0,
}

export enum CardType {
  favourites = 'favorites__card',
  nearest = 'near-places__card',
  regular = 'cities__card',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum APIRoute {
  Offers = '/offers',
  Review = '/comments',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby',
  Favorite = '/favorite',
}

export enum SortingType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const routeNameToPageInfoMap: Record<
  string,
  { title: string; description: string }
> = {
  [Routes.Main]: {
    title: TitlePage.Main,
    description: DescriptionPage.Main,
  },
  [Routes.Favorites]: {
    title: TitlePage.Favorites,
    description: DescriptionPage.Favorites,
  },
  [Routes.Login]: {
    title: TitlePage.Login,
    description: DescriptionPage.Login,
  },
};
