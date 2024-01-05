import { createSelector } from 'reselect'

export const AdminDataSelector = createSelector(
   (state) => state.dashBoardData,
  (data) => data
);
