import { createAction } from "redux-actions";
import moment from "moment";

import { getConfig, postConfig } from "../utils/fetch_configs";
import { getHistory } from "./history";
import { getAdmin } from "./adminTables";
import { getLabelCounts } from "./skew";
import { getAdminCounts } from "./smart";

export const POP_CARD = "POP_CARD";
export const PUSH_CARD = "PUSH_CARD";
export const SET_LABEL = "SET_LABEL";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_DECK = "CLEAR_DECK";

export const popCard = createAction(POP_CARD);
export const pushCard = createAction(PUSH_CARD);
export const setLabel = createAction(SET_LABEL);
export const setMessage = createAction(SET_MESSAGE);
export const clearDeck = createAction(CLEAR_DECK);

const firstResponseHandler = async (res) => {
    if (res.ok) {
        return res.json();
    }
    const error = new Error(res.statusText);
    error.response = res;
    throw error;

};

// Create cards by reading from a queue
export const fetchCards = (projectID) => dispatch => {
    const apiURL = `/api/get_card_deck/${projectID}/`;
    return fetch(apiURL, getConfig())
        .then(firstResponseHandler)
        .then(response => {
            // If error was in the response then set that message
            if ("error" in response) {
                return dispatch(setMessage(response.error));
            }
            dispatch(setLabel(response.labels));

            response.data.forEach((item, i) => {
                const card = {
                    id: i,
                    text: item
                };
                dispatch(pushCard(card));
            });
        })
        .catch(err => console.error("Error: ", err));
};

export const annotateCard = (card, labelID, num_cards_left, projectID, is_admin) => {
    const payload = {
        labelID: labelID,
        labeling_time: moment().diff(card["start_time"], "seconds") // now - start_time rounded to whole seconds
    };
    const apiURL = `/api/annotate_data/${card.text.pk}/`;
    return dispatch => {
        return fetch(apiURL, postConfig(payload))
            .then(firstResponseHandler)
            .then(response => {
                if ("error" in response) {
                    dispatch(clearDeck());
                    return dispatch(setMessage(response.error));
                } else {
                    dispatch(popCard());
                    dispatch(getHistory(projectID));

                    if (is_admin) {
                        dispatch(getAdmin(projectID));
                        dispatch(getAdminCounts(projectID));
                        dispatch(getLabelCounts(projectID));
                    }
                    if (num_cards_left <= 1) dispatch(fetchCards(projectID));
                }
            });
    };
};

//skip a card and put it in the admin table
export const passCard = (card, num_cards_left, is_admin, projectID ) => {
    const apiURL = `/api/skip_data/${card.text.pk}/`;
    return dispatch => {
        return fetch(apiURL, postConfig())
            .then(firstResponseHandler)
            .then(response => {
                if ("error" in response) {
                    dispatch(clearDeck());
                    return dispatch(setMessage(response.error));
                } else {
                    dispatch(popCard());
                    dispatch(getHistory(projectID));
                    if (is_admin) {
                        dispatch(getAdmin(projectID));
                        dispatch(getAdminCounts(projectID));
                    }
                    if (num_cards_left <= 1) dispatch(fetchCards(projectID));
                }
            });
    };
};
