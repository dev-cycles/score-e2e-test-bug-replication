# score-e2e-test-bug-replication README

This repo replicates a bug lodged here: https://github.com/microsoft/vscode/issues/178184

Hover sequences are different at runtime vs testtime.

To demonstrate:

1. Run this extension in extensionHost using F5.  Open the `src/extension.ts` file and hover over the method name `activate`.  You should see the typescript hover information and as `Hello!` message at the bottom, this is as expected.
1. Run the extension tests.  The tests will fail as the first hover result contains `Hello` - however this should be last, as it is visually in the UI.
