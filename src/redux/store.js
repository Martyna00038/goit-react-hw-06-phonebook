import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './reducers';

const store = configureStore({
  reducer: { contacts: contactsSlice.reducer },
});
export default store;
