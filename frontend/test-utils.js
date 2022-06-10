import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import React from "react";
import createSmartStore from "./src/store";

export const renderWithStore = (ui, { store, ...renderOptions }) => {
    const Wrapper = ({ children }) => (
        <Provider store={store}>{children}</Provider>
    );

    return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export const createStoreWithState = (initialState) =>
    createSmartStore(initialState);

const testUtils = {
    renderWithStore,
    createStoreWithState
};

export default testUtils;
