# Coding & Testing Rule

Every development task **must** be followed by tests. Always adhere to the following workflow:

1. **Implement** the feature or change.
2. **Write tests** that cover the new or modified code.
3. **Run all tests** (`npm test` or the project's equivalent) and confirm they pass before moving on.
4. **Fix any failures** immediately — do not proceed to the next task until every test passes.
5. **Then** move on to the next task.

> No task is considered complete until its tests are written, executed, and passing.
