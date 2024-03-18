import { Review } from '../../types/review';
import { formatRating } from '../../utils';
const USER_AVATAR_SIZES = {
  height: '54',
  width: '54',
};

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const { date, user, rating, comment } = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={USER_AVATAR_SIZES.height}
            height={USER_AVATAR_SIZES.height}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: formatRating(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time
          className="reviews__time"
          dateTime={new Date(date).toDateString()}
        >
          {new Date(date).toDateString()}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
