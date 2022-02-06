import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore as reduxCreateStore,
} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import loginStatusReducer from "./login/LoginStatusReducer";
import appointmentsReducer from "./appointments/AppointmentsReducer";
import coordinatorReducer from "./coordinator/CoordinatorReducer";

const combinedReducers = combineReducers({
  appointments: appointmentsReducer,
  loginStatus: loginStatusReducer,
  coordinator: coordinatorReducer,
});

export const store = reduxCreateStore(
  combinedReducers,
  applyMiddleware(thunkMiddleware)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type ThunkAction = (
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
  getState: () => RootState,
  extraArgument: unknown
) => void;

export default store;
