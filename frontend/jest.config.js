/* eslint-env node */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
        "#test-utils": "<rootDir>/test-utils.js"
    },
};

module.exports = config;
