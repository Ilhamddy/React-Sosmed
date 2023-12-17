// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slices/usersSlices'

// export default configureStore({
//     reducer: {
//         users: userReducer,
//     },
// });

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/usersSlices";

export default configureStore({
  reducer: {
    users: userReducer,
  },
});
