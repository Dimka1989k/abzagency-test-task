import { useDispatch } from "react-redux";

import { bindActionCreators } from "@reduxjs/toolkit";
import { usersAction } from "./agency/usersSlice";

const actions = {
  ...usersAction,
};

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
