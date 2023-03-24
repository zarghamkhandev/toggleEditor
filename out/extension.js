"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const vscode_1 = require("vscode");
function activate(context) {
    const nextTextEditor = vscode.commands.registerCommand("toggleeditor.nextTextEditor", async () => {
        const allTabs = getTabs();
        // get index of terminal tab next to the active tab
        const textTabs = allTabs.filter((tab) => isInputTab(tab.input));
        const nextTab = getNextTab(textTabs);
        // tab next to the activated tab
        if (nextTab) {
            await goToTabAtIndex(nextTab.index);
        }
    });
    const previousTextEditor = vscode.commands.registerCommand("toggleeditor.previousTextEditor", async () => {
        const allTabs = getTabs();
        // get index of terminal tab next to the active tab
        const textTabs = allTabs.filter((tab) => isInputTab(tab.input));
        const nextTab = getPreviousTab(textTabs);
        // tab next to the activated tab
        if (nextTab) {
            await goToTabAtIndex(nextTab.index);
        }
    });
    const nextTerminalEditor = vscode.commands.registerCommand("toggleeditor.nextTerminalEditor", async () => {
        const allTabs = getTabs();
        const terminalTabs = allTabs.filter((tab) => isTerminalTab(tab.input));
        const nextTab = getNextTab(terminalTabs);
        // tab next to the actived tab
        if (nextTab) {
            await goToTabAtIndex(nextTab.index);
        }
    });
    const previousTerminalEditor = vscode.commands.registerCommand("toggleeditor.previousTerminalEditor ", async () => {
        const allTabs = getTabs();
        const terminalTabs = allTabs.filter((tab) => isTerminalTab(tab.input));
        const nextTab = getPreviousTab(terminalTabs);
        // tab next to the actived tab
        if (nextTab) {
            await goToTabAtIndex(nextTab.index);
        }
    });
    const newPinnedTerminal = vscode.commands.registerCommand("toggleeditor.newPinnedTerminal", async () => {
        // create a new terminal
        const terminal = vscode.window.createTerminal();
        // pin the terminal
        terminal.show(true);
        vscode.commands.executeCommand("workbench.action.pinEditor");
    });
    context.subscriptions.push(...[
        nextTextEditor,
        nextTerminalEditor,
        newPinnedTerminal,
        previousTextEditor,
        previousTerminalEditor,
    ]);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function isInputTab(input) {
    return input instanceof vscode_1.TabInputText;
}
function isTerminalTab(input) {
    return input instanceof vscode_1.TabInputTerminal;
}
function goToTabAtIndex(index) {
    return vscode.commands.executeCommand("workbench.action.openEditorAtIndex", index);
}
function getNextTab(tabs) {
    const activeTabIndex = tabs.findIndex((tab) => tab.isActive);
    const nextIndex = (activeTabIndex + 1) % tabs.length;
    return tabs[nextIndex];
}
function getPreviousTab(tabs) {
    const activeTabIndex = tabs.findIndex((tab) => tab.isActive);
    const nextIndex = (activeTabIndex - 1) % tabs.length;
    return tabs[nextIndex];
}
function getTabs() {
    return vscode.window.tabGroups.activeTabGroup.tabs.map((tab, index) => {
        return {
            ...tab,
            index,
        };
    });
}
//# sourceMappingURL=extension.js.map