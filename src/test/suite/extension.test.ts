import * as assert from 'assert';
import * as path from 'path';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});

suite('Hover Test Suits', () => {
	test('Check sequence of hover results', async () => {
		const uri = vscode.Uri.parse(path.join(path.resolve(__dirname, '../../..'), 'src/extension.ts'));

		const position = new vscode.Position(6,20); // should be on the `activate` method in the extension file.

		await vscode.commands.executeCommand('vscode.open', uri);

		await new Promise((resolve) => setTimeout(resolve, 500));

		const hoverResults: vscode.Hover[] = await vscode.commands.executeCommand('vscode.executeHoverProvider', uri, position);

		const hoverTexts = hoverResults.map(h => (h.contents[0] as vscode.MarkdownString).value)

		console.log(hoverTexts);

		assert.equal(hoverTexts.length, 2);
		assert.match(hoverTexts[0], /activate/); // the typescript `activate` hover content should be first
		assert.match(hoverTexts[1], /Hello/); // the 'hello' hover content should be last
	});
});
