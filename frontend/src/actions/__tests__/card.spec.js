import { enableFetchMocks } from "jest-fetch-mock";
import * as cardActions from "@/actions/card";
import * as historyActions from "@/actions/history";

jest.mock("@/actions/history", () => ({
    getHistory: jest.fn(() => ({ action: "getHistory" }))
}));

enableFetchMocks();

const projectID = 445;
describe("card actions", () => {
    let dispatchMock;
    beforeEach(() => {
        fetchMock.resetMocks();
        dispatchMock = jest.fn();
    });
    describe("fetchCards()", () => {
        beforeEach(() => {
            fetchMock.mockResponse(JSON.stringify({
                data: [],
                labels: []
            }));
        });

        it("handles empty data", async () => {
            await cardActions.fetchCards(projectID)(dispatchMock);
            expect(dispatchMock)
                .toHaveBeenCalledTimes(1);
            expect(dispatchMock)
                .toHaveBeenCalledWith(cardActions.setLabel([]));

            expect(fetchMock.mock.calls[0][0])
                .toBe(`/api/get_card_deck/${projectID}/`);
        });

        it("fetches card deck", async () => {
            fetchMock.mockResponse(JSON.stringify({
                data: [{ text: "blah" }, { text: "dah" }],
                labels: []
            }));
            await cardActions.fetchCards(projectID)(dispatchMock);
            expect(dispatchMock)
                .toHaveBeenCalledTimes(3);
            expect(dispatchMock)
                .toHaveBeenCalledWith(cardActions.setLabel([]));
            expect(dispatchMock)
                .toHaveBeenCalledWith(cardActions.pushCard({
                    id: 0,
                    text: {
                        text: "blah"
                    }
                }));

            expect(dispatchMock)
                .toHaveBeenCalledWith(cardActions.pushCard({
                    id: 1,
                    text: {
                        text: "dah"
                    }
                }));
        });

        it("sets message to response.error", async () => {
            fetchMock.mockResponse(JSON.stringify({
                data: [],
                labels: [],
                error: "Some error"
            }));
            await cardActions.fetchCards(projectID)(dispatchMock);
            expect(dispatchMock)
                .toHaveBeenCalledWith(cardActions.setMessage("Some error"));
            expect(dispatchMock)
                .not
                .toHaveBeenCalledWith(cardActions.setLabel([]));

            expect(fetchMock.mock.calls[0][0])
                .toBe(`/api/get_card_deck/${projectID}/`);
        });

        it("throws error", async () => {
            fetchMock.mockReject("Rejected!");
            await cardActions.fetchCards(projectID)(dispatchMock);
            expect(dispatchMock)
                .not
                .toHaveBeenCalled();
            expect(dispatchMock)
                .not
                .toHaveBeenCalledWith(cardActions.setLabel([]));

            expect(fetchMock.mock.calls[0][0])
                .toBe(`/api/get_card_deck/${projectID}/`);
        });
    });

    describe("annotateCard()", () => {
        let card;
        let labelID;
        let num_cards_left;
        let is_admin;

        beforeEach(() => {
            labelID = 45;
            card = {
                text: {
                    pk: 451
                },
                start_time: Date.now()
            };
            num_cards_left = 2;
            is_admin = false;
            fetchMock.mockResponse(JSON.stringify({}));
        });

        it("posts new annotation with more than 1 card left", async () => {
            await cardActions.annotateCard(
                card, labelID, num_cards_left, projectID, is_admin
            )(dispatchMock);
            expect(dispatchMock)
                .toHaveBeenCalledTimes(2);

            expect(historyActions.getHistory)
                .toHaveBeenCalledWith(projectID);
            expect(dispatchMock)
                .toHaveBeenCalledWith(cardActions.popCard());

            expect(dispatchMock)
                .toHaveBeenCalledWith({ action: "getHistory" });

            expect(fetchMock)
                .toHaveBeenCalledTimes(1);
            expect(fetchMock.mock.calls[0][0])
                .toBe("/api/annotate_data/451/");
            expect(fetchMock.mock.calls[0][1].body)
                .toBe(JSON.stringify({
                    labelID,
                    labeling_time: 0
                }));
        });

        it("throws error on rejected", async () => {
            fetchMock.mockReject("Total rejected!");
            await expect(() => cardActions.annotateCard(
                card, labelID, num_cards_left, projectID, is_admin
            )(dispatchMock))
                .rejects
                .toBe("Total rejected!");
            expect(dispatchMock)
                .not
                .toHaveBeenCalled();
        });

        it("sets message to response.error", async () => {
            fetchMock.mockResponse(JSON.stringify({
                error: "Some error"
            }));
            await cardActions.annotateCard(
                card, labelID, num_cards_left, projectID, is_admin
            )(dispatchMock);
            expect(dispatchMock)
                .toHaveBeenCalledWith(cardActions.clearDeck());
            expect(dispatchMock)
                .toHaveBeenCalledWith(cardActions.setMessage("Some error"));
            expect(dispatchMock)
                .not
                .toHaveBeenCalledWith(cardActions.popCard());
        });
    });
});
