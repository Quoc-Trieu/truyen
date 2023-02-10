import { createSelector } from '@reduxjs/toolkit';

const nav = state => state.navRes;

export const navRes = createSelector([nav],(nav) => nav.navTran )
export const isOpen = createSelector([nav],(nav) => nav.isOpen )