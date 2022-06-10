import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DataCard from "./index";

const projectId = 9999;

describe("<DataCard />", () => {
    let comp;
    let testProps;
    beforeEach(() => {
        window.ADMIN = false;
        testProps = {
            fetchCards: jest.fn(),
            annotateCard: jest.fn(),
            passCard: jest.fn(),
            cards: [
                {
                    id: 0,
                    text: {
                        text: "Card 0 text",
                        metadata: []
                    }
                }
            ],
            labels: [
                {
                    pk: 2,
                    name: "label one",
                    project: projectId,
                    description: "label one desc"
                },
                {
                    pk: 3,
                    name: "label two",
                    project: projectId,
                    description: "label two desc"
                }
            ],
            message: "unit testing"
        };

    });

    it("renders `message` if no cards and fetches cards", () => {
        testProps.cards = [];
        testProps.labels = [];
        comp = render(
            <DataCard {...testProps} />
        );

        expect(comp).not.toBeNull();
        expect(comp.getByText(testProps.message)).toBeInTheDocument();
        expect(testProps.fetchCards).toHaveBeenCalledTimes(1);
    });

    it("adds click handlers for annotate and skip", () => {
        comp = render(
            <DataCard {...testProps} />
        );
        expect(comp.queryByText("Background Data")).toBe(null);
        expect(comp.baseElement.querySelector("h2")).toHaveTextContent("Card 1");
        expect(testProps.fetchCards).not.toHaveBeenCalled();
        expect(testProps.annotateCard).not.toHaveBeenCalled();
        
        fireEvent.click(comp.getByText("label one"));
        expect(testProps.annotateCard).toHaveBeenCalledWith(
            testProps.cards[0],
            2,
            1,
            false
        );

        expect(testProps.passCard).not.toHaveBeenCalled();
        fireEvent.click(comp.getByText("Skip"));
        expect(testProps.passCard).toHaveBeenCalledWith(
            testProps.cards[0],
            1,
            false
        );
    });

    it("renders select when more than 5 labels", () => {
        testProps.cards[0].text.metadata = [
            "some meta data"
        ];
        testProps.labels.push(
            {
                pk: 4,
                name: "label three",
                project: projectId,
                description: "label three desc"
            },
            {
                pk: 5,
                name: "label four",
                project: projectId,
                description: "label four desc"
            },
            {
                pk: 6,
                name: "label five",
                project: projectId,
                description: "label five desc"
            },
            {
                pk: 7,
                name: "label six",
                project: projectId,
                description: "label six desc"
            }
        );
        expect(testProps.labels).toHaveLength(6);
        comp = render(
            <DataCard {...testProps} />
        );
        // should show background data
        expect(comp.queryByText("Background Data")).toBeInTheDocument();
        expect(comp.queryByText("some meta data")).toBeInTheDocument();

        expect(comp.queryByText("label one")).toBeNull();
    });
});
