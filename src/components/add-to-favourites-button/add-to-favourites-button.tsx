import { useNavigate } from 'react-router-dom';

import { Routes, FavouriteStatus } from '../../const';

import {
  getIsFavoriteStatusSubmitting,
  changeFavouriteStatusAction,
  getAuthCheckedStatus,
} from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';

type AddToFavouritesButtonProps = {
  isFavorite: boolean;
  id: string;
  iconWidth: number;
  iconHeight: number;
  buttonText: string;
  buttonClass: string;
  activeClass: string;
  iconClass: string;
};

function AddToFavouritesButton(props: AddToFavouritesButtonProps): JSX.Element {
  const {
    isFavorite,
    id,
    buttonText,
    iconHeight,
    iconWidth,
    buttonClass,
    activeClass,
    iconClass,
  } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const hasUserAuth = useAppSelector(getAuthCheckedStatus);
  const disabledBookmarkButton = useAppSelector(getIsFavoriteStatusSubmitting);

  const handleBookmarkClick = () => {
    if (!hasUserAuth) {
      navigate(Routes.Login);
      return;
    }

    dispatch(
      changeFavouriteStatusAction({
        offerId: id,
        status: isFavorite ? FavouriteStatus.Remove : FavouriteStatus.Add,
      })
    );
  };

  return (
    <button
      className={`bookmark-button button ${buttonClass} ${
        isFavorite ? activeClass : ''
      }`}
      type="button"
      disabled={disabledBookmarkButton}
      onClick={handleBookmarkClick}
    >
      <svg
        className={`bookmark-icon ${iconClass}`}
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{buttonText}</span>
    </button>
  );
}

export default AddToFavouritesButton;
