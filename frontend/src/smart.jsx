import "./styles/smart.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createSmartStore from "./store";
import SmartContainer from "./containers/smart_container";

const store = createSmartStore();

ReactDOM.render(
    <Provider store={store}>
        <SmartContainer />
    </Provider>,
    document.getElementById("mount")
);
