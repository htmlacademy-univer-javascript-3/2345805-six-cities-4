import { CityName, NameSpace, SortingType } from '../../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_SELECTED_CITY = CityName.Paris;
const DEFAULT_SELECTED_SORTING = SortingType.Popular;

type GlobalState = {
  selectedCity: CityName;
  selectedSortType: SortingType;
};

const initialState: GlobalState = {
  selectedCity: DEFAULT_SELECTED_CITY,
  selectedSortType: DEFAULT_SELECTED_SORTING,
};

export const globalState = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.selectedCity = action.payload;
    },
    changeSortingType: (state, action: PayloadAction<SortingType>) => {
      state.selectedSortType = action.payload;
    },
  },
});

export const { changeCity, changeSortingType } = globalState.actions;
