import React from "react";
import { render } from "@testing-library/react";
import History from "./index";

describe("<History />", () => {
    let comp;
    let labels;
    beforeEach(() => {
        labels = [];
    });

    it("renders properly if all props provided", () => {
        const fn = () => {};
        const data = [];

        comp = render(
            <History
                getHistory = {fn}
                history_data={data}
                changeLabel = {fn}
                changeToSkip= {fn}
                labels={labels}
            />
        );

        expect(comp).not.toBeNull();
    });
});
