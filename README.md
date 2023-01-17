# Set Operations Extension for VSCode

This extension allows you to perform set operations (such as intersection and difference) on a pair of user-selected tabs in the VSCode editor.

## Features
* Intersection: returns the common elements between the two selected sets.
* Difference: returns the elements in the first set that are not in the second set.
* Symmetric Difference: returns all elements that are not in the common set.
* Union: returns all elements of both sets

## Usage
1. Open the command palette and search for the operation you would like to perform (eg. intersection, difference, etc.)
1. Choose the first file
1. Choose the second file
1. The result of the operation will be written to a new tab

## Note
* This extension only works with text that is separated by newlines
* The result of a set operation has no ordering guarantees

## Contribution
Please feel free to contribute to this extension by submitting pull requests or by reporting bugs.

## Support
If you have any questions or issues, please open an issue on the [GitHub page](https://github.com/AlexLamson/vscode-set-operations) for this extension.
