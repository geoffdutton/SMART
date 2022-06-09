import React from "react";
import createSmartStore from "@/store";
import { renderWithStore } from "#test-utils";
import Smart from "./index";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

const initialState = undefined;

describe("<Smart />", () => {
    /** @type {import("redux").Store} */
    let store;
    let comp;
    let adminCounts;
    beforeEach(() => {
        fetchMock.resetMocks();
        store = createSmartStore(initialState);
        adminCounts = {};
    });

    it("renders properly if all props provided", () => {
        fetchMock.mockAbort();
        const fn = () => {
        };
        comp = renderWithStore(
            <Smart
                adminTabsAvailable={false}
                getAdminTabsAvailable={fn}
                admin_counts={adminCounts}
                getAdminCounts={fn}
            />,
            { store }
        );

        expect(comp)
            .not
            .toBeNull();
        expect(fetchMock)
            .toHaveBeenCalledTimes(1);

        expect(fetchMock)
            .toHaveBeenCalledWith(
                "/api/get_card_deck/3443/",
                { credentials: "same-origin",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "X-CSRFToken": null
                    },
                    method: "GET"
                }
            );
    });
});
