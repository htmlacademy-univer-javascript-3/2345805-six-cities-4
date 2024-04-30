import { ExtendedOffer } from '../../types/offer';

const MAX_IMAGES = 6;

type OfferPicturesProps = {
  images: ExtendedOffer['images'];
};

function OfferPictures({ images }: OfferPicturesProps): JSX.Element {
  if (!images.length) {
    return <div></div>;
  }

  return (
    <div
      className="offer__gallery-container container"
      data-testid={'container'}
    >
      <div className="offer__gallery">
        {images.slice(0, MAX_IMAGES).map((image) => (
          <div
            key={image}
            className="offer__image-wrapper"
            data-testid={'value'}
          >
            <img className="offer__image" src={image} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferPictures;
