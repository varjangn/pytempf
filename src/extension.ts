import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const TEMP_DIR_ROOT = os.tmpdir();
const TEMP_DIR = path.join(TEMP_DIR_ROOT, "tempsf");


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
	console.log('"tempsf" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('tempsf.createPyFile', () => {

		const timestamp = Date.now();
		const fileName = `tempf-${timestamp}.py`;
		const fullFilePath = path.join(TEMP_DIR, fileName);

		try {
			const data = `print("Hello World!")\n`;

			fs.mkdirSync(TEMP_DIR, { recursive: true });
			fs.writeFileSync(fullFilePath, data);
			console.log(`tempsf.createFile: File Created:  ${fullFilePath}`);

		} catch (err) {
			console.log(`tempsf.createFile: ${err}`);
			return;
		}

		vscode.window.showTextDocument(vscode.Uri.file(fullFilePath));

	}));

	context.subscriptions.push(
		vscode.commands.registerCommand('tempsf.cleanFiles', () => {
		cleanTempDir();
	}));

	context.subscriptions.push(
		vscode.commands.registerCommand('tempsf.showFiles', () => {
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
	console.log('"tempsf" is now deactived');
	console.log("Cleaning temp files...");
	cleanTempDir();
}
