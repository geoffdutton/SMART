import React from "react";
// import { render } from "@testing-library/react";
import { renderWithStore } from "#test-utils";
import createSmartStore from "@/store";
import AdminTable from "./index";


const initialState = {
    smart: {
        adminTabsAvailable: false,
        admin_counts: {},
        isAdminOrCreator: false
    }
};

describe("<AdminTable />", () => {
    /** @type {import('redux').Store} */
    let store;
    let comp;
    beforeEach(() => {
        store = createSmartStore(initialState);
    });
    it("renders properly if all props provided", () => {
        const fn = () => {};
        const data = [];
        const labels = [];

        comp = renderWithStore(
            <AdminTable
                getAdmin = {fn}
                adminLabel = {fn}
                discardData = {fn}
                admin_data={data}
                labels={labels}
            />,
            { store }
        );
        expect(store.getState()).toMatchInlineSnapshot(`
Object {
  "adminTables": Object {
    "admin_counts": Array [],
    "admin_data": Array [],
  },
  "card": Object {
    "cards": Array [],
    "labels": Array [],
    "message": "",
  },
  "history": Object {
    "history_data": Array [],
  },
  "recycleBin": Object {
    "discarded_data": Array [],
  },
  "skew": Object {
    "label_counts": Array [],
    "unlabeled_data": Array [],
  },
  "smart": Object {
    "adminTabsAvailable": false,
    "admin_counts": Object {},
    "isAdminOrCreator": false,
  },
}
`);
        expect(comp.findByText("Instructions")).not.toBeNull();
    });
});
