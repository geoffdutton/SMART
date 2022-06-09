import React from "react";
import { fireEvent, render } from "@testing-library/react";
import CodebookLabelMenu from "./index";

describe("<CodebookLabelMenu />", () => {
    let labels;
    let comp;
    beforeEach(() => {
        window.CODEBOOK_URL = "";
        labels = [
            {
                pk: 55,
                name: "label one",
                description: ""
            }
        ];
    });

    it("renders labels when toggle is clicked", () => {
        comp = render(
            <CodebookLabelMenu
                labels={labels}
            />
        );

        expect(comp.queryByText("Codebook")).toBeNull();
        expect(comp.queryByText("label one")).toBeNull();
        const lblGuidBtn = comp.queryByText("Label Guide");
        expect(lblGuidBtn).toHaveClass("plus_button");
        fireEvent.click(lblGuidBtn);
        const lblOne = comp.queryByText("label one");
        expect(lblOne).toBeInTheDocument();
        expect(lblGuidBtn).toHaveClass("minus_button");
    });

    it("renders codebook pdf", () => {
        window.CODEBOOK_URL = "http://localhost/codebook.pdf";
        comp = render(
            <CodebookLabelMenu
                labels={labels}
            />
        );
        const codebookBtn = comp.queryByText("Codebook");
        expect(codebookBtn).toMatchInlineSnapshot(`
<button
  class="codebook-btn btn btn-primary"
  type="button"
>
  Codebook
</button>
`);
        expect(comp.baseElement.querySelector("embed")).toBeNull();
        expect(codebookBtn).toBeInTheDocument();

        fireEvent.click(codebookBtn);
        expect(comp.baseElement.querySelector("embed").src).toBe(window.CODEBOOK_URL);
    });
});
