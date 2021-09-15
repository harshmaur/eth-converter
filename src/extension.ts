
'use strict';

import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	var enableExtension: Boolean = true;
	var regexDec = /^-?[0-9]+$/g;

	let hover = vscode.languages.registerHoverProvider({ scheme: '*', language: '*' }, {
		provideHover(document, position) {
			var hoveredWord = document.getText(document.getWordRangeAtPosition(position));
			const output = hoveredWord;
			var markdownString = new vscode.MarkdownString("Assuming the hovered number is wei", true);
			if (regexDec.test(hoveredWord.toString()) && enableExtension) {

				const hoveredValue = BigNumber.from(output?.toString());

				const eth = formatUnits(hoveredValue, 'ether');
				const gwei = formatUnits(hoveredValue, 'gwei');
				markdownString.appendCodeblock(` Eth: ${eth.toString()}\n Gwei: ${gwei}`, 'javascript');
				return {
					contents: [markdownString]
				};

			}

		}
	});

	context.subscriptions.push(hover);

}

export function deactivate() { }