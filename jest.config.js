module.exports = {
    testPathIgnorePatterns: [
        '/node_modules/',
        '/build/',
        '/.next/',
        '/cors-proxy/'
    ],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ['./setupTests.js'],
    resetMocks: true,
}
