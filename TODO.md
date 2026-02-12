# TODO for Fixing Variable Initialization Bug

- [x] Modify pageloaded() function to initialize all localStorage keys with default values if they don't exist, and set global variables accordingly.
- [x] Update updateCounts() function to safely handle cases where localStorage items are null or undefined, initializing them if necessary.
- [x] Test the changes to ensure variables are properly set on page load.
