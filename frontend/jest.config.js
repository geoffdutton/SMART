/* eslint-env node */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{js,jsx}",
    ],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
        "#test-utils": "<rootDir>/test-utils.js"
    },
};

module.exports = config;
