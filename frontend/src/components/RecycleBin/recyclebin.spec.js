import React from "react";
import { render } from "@testing-library/react";
import RecycleBin from "./index";

describe("<RecycleBin />", () => {
    let comp;

    it("renders properly if all props provided", () => {
        const fn = () => {};
        const data = [];

        comp = render(
            <RecycleBin
                getDiscarded = {fn}
                discarded_data = {data}
                restoreData = {fn}
            />
        );
        expect(comp).not.toBeNull();
    });
});
