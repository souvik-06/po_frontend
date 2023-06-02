// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow the body of the commit message to be empty
    'body-empty': [0, 'never'],

    // Allow the footer of the commit message to be empty
    'footer-empty': [0, 'never'],

    // Allow the subject of the commit message to be empty
    'subject-empty': [0, 'never'],
  },
};
