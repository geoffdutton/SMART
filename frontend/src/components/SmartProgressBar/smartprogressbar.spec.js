import React from "react";
import { render } from "@testing-library/react";
import SmartProgressBar from "./index";

describe("<SmartProgressBar />", () => {
    let comp;
    let cards;
    beforeEach(() => {
        cards = [
            {
                id: 0,
                text: {
                    text: "Card 0 text",
                    metadata: []
                }
            }
        ];
    });
    
    it("renders progress based on card length", () => {
        // @TODO: Handle cases where progress is NaN
        comp = render(
            <SmartProgressBar
                cards={cards}
            />
        );
        expect(comp.container).toMatchInlineSnapshot(`
<div>
  <div
    class="progress"
  >
    <div
      aria-valuemax="100"
      aria-valuemin="0"
      aria-valuenow="NaN"
      class="progress-bar"
      role="progressbar"
      style="min-width: 60px;"
    >
      1 of 1
    </div>
  </div>
</div>
`);
    });

    it("renders 50%", () => {
        cards = [
            {
                id: 0,
                text: {
                    text: "Card 0 text",
                    metadata: []
                }
            },
            {
                id: 1,
                text: {
                    text: "Card 1 text",
                    metadata: []
                }
            }
        ];
        comp = render(
            <SmartProgressBar
                cards={cards}
            />
        );

        expect(comp.getByText("1 of 2")).toBeInTheDocument();
        expect(comp.getByText("1 of 2")).toMatchInlineSnapshot(`
<div
  aria-valuemax="100"
  aria-valuemin="0"
  aria-valuenow="0"
  class="progress-bar"
  role="progressbar"
  style="width: 0%; min-width: 60px;"
>
  1 of 2
</div>
`);
    });

    it("renders complete", () => {
        comp = render(
            <SmartProgressBar
                cards={[]}
            />
        );
        expect(comp.getByText("Complete")).toMatchInlineSnapshot(`
<div
  aria-valuemax="100"
  aria-valuemin="0"
  aria-valuenow="100"
  class="progress-bar"
  role="progressbar"
  style="width: 100%; min-width: 60px;"
>
  Complete
</div>
`);
    });
});
