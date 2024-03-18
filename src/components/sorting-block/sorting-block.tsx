import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortType } from '../../store/action';

const SORT_TYPES = {
  0: 'Popular',
  1: 'Price: low to high',
  2: 'Price: high to low',
  3: 'Top rated first',
};

function SortingBlock() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSortType = useAppSelector((state) => state.selectedSortType);

  const dispatch = useAppDispatch();
  const handleSortTypeChange = (sortType: string) => {
    dispatch(setSortType(sortType));
  };
  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {Object.entries(SORT_TYPES).map(([key, sortType]) => (
          <li
            key={key}
            className={`places__option ${
              selectedSortType === sortType ? 'places__option--active' : ''
            }`}
            onClick={() => handleSortTypeChange(sortType)}
            tabIndex={0}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingBlock;
