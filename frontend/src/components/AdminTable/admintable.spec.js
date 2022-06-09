import React from "react";
import { render } from "@testing-library/react";
import AdminTable from "./index";

describe("<AdminTable />", () => {
    // let store;
    // let component;
    // beforeEach(() => {
    //
    // });
    it("renders properly if all props provided", () => {
        const fn = () => {};
        const data = [];
        const labels = [];

        const component = render(
            <AdminTable
                getAdmin = {fn}
                adminLabel = {fn}
                discardData = {fn}
                admin_data={data}
                labels={labels}
            />
        );
        expect(component.findByText("Instructions")).not.toBeNull();
    });
});
