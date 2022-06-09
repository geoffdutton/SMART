import React from "react";
import { render } from "@testing-library/react";
import Skew from "./index";

describe("<Skew />", () => {
    let comp;
    let labels;
    let labelCounts;
    beforeEach(() => {
        labels = [];
        labelCounts = [];
    });

    it("renders properly if all props provided", () => {
        const fn = () => {};

        comp = render(
            <Skew
                getUnlabeled = {fn}
                unlabeled_data={labelCounts}
                labels={labels}
                skewLabel={fn}
                getLabelCounts={fn}
                label_counts={labelCounts}
            />
        );
        expect(comp).not.toBeNull();
    });
});
