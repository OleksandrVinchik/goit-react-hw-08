import { createSelector } from "@reduxjs/toolkit";
export const selectFilter = (state) => state.filters;

export const selectFilteredContacts = createSelector(
  [(state) => state.contacts.items, selectFilter],
  (contacts, filter) => {
    if (!filter.trim()) {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
