import React from "react";
import createSmartStore from "@/store";
import { renderWithStore } from "#test-utils";
import Smart from "./index";

const initialState = undefined;

describe.skip("<Smart />", () => {
    /** @type {import('redux').Store} */
    let store;
    let comp;
    let adminCounts;
    beforeEach(() => {
        store = createSmartStore(initialState);
        adminCounts = {};
    });

    it("renders properly if all props provided", () => {
        const fn = () => {};
        comp = renderWithStore(
            <Smart
                adminTabsAvailable = {false}
                getAdminTabsAvailable = {fn}
                admin_counts = {adminCounts}
                getAdminCounts = {fn}
            />,
            { store }
        );
        expect(comp).not.toBeNull();
    });
});
