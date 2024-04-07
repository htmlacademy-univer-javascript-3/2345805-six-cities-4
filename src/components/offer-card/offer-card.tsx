import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';

import { formatRating } from '../../utils';
import { useAppDispatch } from '../../hooks';
import { setSelectedPoint } from '../../store/action';
import { CardType } from '../../const';

type CityCardProps = {
  cardInfo: Offer;
  typeClassName: CardType;
};

function OfferCard({ cardInfo, typeClassName }: CityCardProps): JSX.Element {
  const {
    id,
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    previewImage,
  } = cardInfo;
  const dispatch = useAppDispatch();
  return (
    <Link to={`/offer/${id}`}>
      <article
        className={`${typeClassName} place-card`}
        onPointerEnter={() => {
          if (typeClassName === CardType.regular) {
            dispatch(setSelectedPoint({ id }));
          }
        }}
        onPointerLeave={() => {
          if (typeClassName === CardType.regular) {
            dispatch(setSelectedPoint(null));
          }
        }}
        onClick={() => window.scrollTo(0, 0)}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button ${
                isFavorite ? 'place-card__bookmark-button--active' : ''
              } button`}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                {<use xlinkHref="#icon-bookmark"></use>}
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: formatRating(rating) }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">{title}</h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </Link>
  );
}

export default OfferCard;
