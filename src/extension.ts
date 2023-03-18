import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const TEMP_DIR_ROOT = os.tmpdir();
const TEMP_DIR = path.join(TEMP_DIR_ROOT, "pytempf");


function cleanTempDir() {
	console.log("Cleaning temp files...");
	fs.readdir(TEMP_DIR, (err, files) => {
		if (err) {
			console.error('Error reading directory:', err);
			return;
		}
		files.forEach((f) => {
			if (f.startsWith("temp_")) {
				fs.unlinkSync(path.join(TEMP_DIR, f));
				vscode.window.showInformationMessage(`Removed: ${f}`);
			}
		});
	});
}

export function activate(context: vscode.ExtensionContext) {
	console.log('"pytempf" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('pytempf.createFile', () => {

		const timestamp = Date.now();
		const fileName = `temp_${timestamp}.py`;
		const fullFilePath = path.join(TEMP_DIR, fileName);

		try {
			const data = `print("Hello World!")\n`;

			fs.mkdirSync(TEMP_DIR, { recursive: true });
			fs.writeFileSync(fullFilePath, data);
			console.log(`pytempf.createFile: File Created:  ${fullFilePath}`);

		} catch (err) {
			console.log(`pytempf.createFile: ${err}`);
			return;
		}

		vscode.window.showTextDocument(vscode.Uri.file(fullFilePath));

	}));

	context.subscriptions.push(
		vscode.commands.registerCommand('pytempf.cleanFiles', () => {
		cleanTempDir();
	}));

	context.subscriptions.push(
		vscode.commands.registerCommand('pytempf.showFiles', () => {
		const allFiles:string[] = [];

		fs.readdir(TEMP_DIR, (err, files) => {
			if (err) {
				console.error('Error reading directory:', err);
				return;
			}
			files.forEach((f) => {
				if (f.startsWith("temp_")) {
					allFiles.push(f);
				}
			});

			vscode.window.showQuickPick(allFiles).then((selectedItem) => {
				if (selectedItem) {
					const fullFilePath = path.join(TEMP_DIR, selectedItem);
					vscode.window.showTextDocument(vscode.Uri.file(fullFilePath));
				}
			});
		});

	}));
}

export function deactivate() {
	console.log('"pytempf" is now deactived');
	console.log("Cleaning temp files...");
	cleanTempDir();
}
