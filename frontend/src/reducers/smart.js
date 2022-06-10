import { handleActions } from "redux-actions";
import update from "immutability-helper";

import { SET_AVAILABLE, SET_ADMIN_COUNTS } from "../actions/smart";

const initialState = {
    adminTabsAvailable: false,
    admin_counts: {},
    isAdminOrCreator: window.SMART_IS_ADMIN_OR_CREATOR
};

const smart = handleActions({
    [SET_AVAILABLE]: (state, action) => {
        console.log({ state });
        return update(state, { adminTabsAvailable: { $set: action.payload } } );
    },
    [SET_ADMIN_COUNTS]: (state, action) => {
        console.log({ state });
        return update(state, { admin_counts: { $set: action.payload } } );
    }
}, initialState);

export default smart;
