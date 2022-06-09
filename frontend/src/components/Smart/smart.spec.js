import React from "react";
import { render } from "@testing-library/react";
import Smart from "./index";

describe("<Smart />", () => {
    let comp;
    let adminCounts;
    beforeEach(() => {
        adminCounts = [];
    });

    it("renders properly if all props provided", () => {
        const fn = () => {};
        comp = render(
            <Smart
                adminTabsAvailable = {false}
                getAdminTabsAvailable = {fn}
                admin_counts = {adminCounts}
                getAdminCounts = {fn}
            />
        );
        expect(comp).not.toBeNull();
    });
});
