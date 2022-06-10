import React from "react";
import createSmartStore from "@/store";
import { renderWithStore } from "#test-utils";
import RecycleBin from "./index";

const initialState = {};

describe("<RecycleBin />", () => {
    /** @type {import('redux').Store} */
    let store;
    let comp;
    beforeEach(() => {
        store = createSmartStore(initialState);
    });

    it("renders properly if all props provided", () => {
        const fn = () => {};
        const data = [];

        comp = renderWithStore(
            <RecycleBin
                getDiscarded = {fn}
                discarded_data = {data}
                restoreData = {fn}
            />,
            { store }
        );
        expect(comp).not.toBeNull();
    });
});
