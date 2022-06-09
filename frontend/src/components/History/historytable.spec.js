import React from "react";
import createSmartStore from "@/store";
import { renderWithStore } from "#test-utils";
import History from "./index";

const initialState = {};

describe("<History />", () => {
    /** @type {import('redux').Store} */
    let store;
    let comp;
    let labels;
    beforeEach(() => {
        store = createSmartStore(initialState);
        labels = [];
    });

    it("renders properly if all props provided", () => {
        const fn = () => {};
        const data = [];

        comp = renderWithStore(
            <History
                getHistory = {fn}
                history_data={data}
                changeLabel = {fn}
                changeToSkip= {fn}
                labels={labels}
            />,
            { store }
        );

        expect(comp).not.toBeNull();
    });
});
