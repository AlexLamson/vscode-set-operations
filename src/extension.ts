import * as vscode from 'vscode';
import { window, commands, ExtensionContext } from 'vscode';

async function openInUntitled(content: string, language?: string) {
    const document = await vscode.workspace.openTextDocument({
        language,
        content,
    });
    vscode.window.showTextDocument(document);
}

async function userSelectTab(filenames:string[], docs: readonly vscode.TextDocument[], step:Number): Promise<string[]> {
    const filename = await window.showQuickPick(filenames, {
		placeHolder: `Choose the file (Step ${step}/3)`
	});
	if(filename === undefined) {
		return [];
	}
	const tab = docs[filenames.indexOf(filename)];
	const lines = tab.getText().split('\n');
	// window.showInformationMessage(`Got: ${filename}`);
	return lines;
}

async function getTwoTabs(): Promise<[string[], string[]]> {

	const docs = vscode.workspace.textDocuments;

	const filenames = docs.map(doc => doc.fileName);

	// Select the first file
	const lines1 = await userSelectTab(filenames, docs, 1);

	// Select the second file
	const lines2 = await userSelectTab(filenames, docs, 2);

	return new Promise((resolve) => {
		resolve([lines1, lines2]);
	});
}

function symmetricDifference(lines1:string[], lines2:string[]):string[] {
	// TODO make this stable
	const set1 = new Set(lines1);
	const set2 = new Set(lines2);
	const outputSet = new Set(set1);

    for (const elem of set2) {
        const operation = (outputSet.has(elem)) ? 'delete' : 'add';
        outputSet[operation](elem);
    }

    return Array.from(outputSet);
}

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('set-operations.intersection', async () => {
		const [lines1, lines2] = await getTwoTabs();

		const set1 = new Set(lines1);
		const set2 = new Set(lines2);
		let setIntersection = lines1.filter(x => set2.has(x));

		openInUntitled(setIntersection.join("\n"));
	}));

	context.subscriptions.push(commands.registerCommand('set-operations.difference', async () => {
		const [lines1, lines2] = await getTwoTabs();

		const set1 = new Set(lines1);
		const set2 = new Set(lines2);
		let setDifference = lines1.filter(x => !set2.has(x));

		openInUntitled(setDifference.join("\n"));
	}));

	context.subscriptions.push(commands.registerCommand('set-operations.symmetric_difference', async () => {
		const [lines1, lines2] = await getTwoTabs();

		let setSymmetricDifference = symmetricDifference(lines1, lines2);

		openInUntitled(setSymmetricDifference.join("\n"));
	}));

	context.subscriptions.push(commands.registerCommand('set-operations.union', async () => {
		const [lines1, lines2] = await getTwoTabs();

		let setUnion = new Set([...lines1, ...lines2]);

		openInUntitled(Array.from(setUnion).join("\n"));
	}));
}

// This method is called when the extension is deactivated
export function deactivate() {}
