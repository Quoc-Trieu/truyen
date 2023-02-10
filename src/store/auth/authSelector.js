import { createSelector } from "@reduxjs/toolkit";

const selectAuth = (state) => state.auth;

export const selectAuthUser = createSelector([selectAuth], (auth) => auth.user);

export const selectAuthUserPermissions = createSelector(
  [selectAuthUser],
  (auth) => auth.permission
);

export const selectAuthToken = createSelector(selectAuth, (auth) => auth.token);

export const selectAuthIsLoading = createSelector(
  selectAuth,
  (auth) => auth.isLoading
);
