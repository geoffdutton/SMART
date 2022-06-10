import React from "react";
import createSmartStore from "@/store";
import { renderWithStore } from "#test-utils";
import Skew from "./index";

const initialState = {};

describe("<Skew />", () => {
    /** @type {import('redux').Store} */
    let store;
    let comp;
    let labels;
    let labelCounts;
    beforeEach(() => {
        store = createSmartStore(initialState);
        labels = [];
        labelCounts = [];
    });

    it("renders properly if all props provided", () => {
        const fn = () => {};

        comp = renderWithStore(
            <Skew
                getUnlabeled = {fn}
                unlabeled_data={labelCounts}
                labels={labels}
                skewLabel={fn}
                getLabelCounts={fn}
                label_counts={labelCounts}
            />,
            { store }
        );
        expect(comp).not.toBeNull();
    });
});
