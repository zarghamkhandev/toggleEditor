import * as vscode from "vscode";
import { Tab, TabInputTerminal, TabInputText } from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const nextTextEditor = vscode.commands.registerCommand(
    "toggleeditor.nextTextEditor",
    async () => {
      const allTabs = getTabs();
      // get index of terminal tab next to the active tab
      const textTabs = allTabs.filter((tab) => isInputTab(tab.input));
      const nextTab = getNextTab(textTabs);

      // tab next to the activated tab
      if (nextTab) {
        await goToTabAtIndex(nextTab.index);
      }
    }
  );

  const previousTextEditor = vscode.commands.registerCommand(
    "toggleeditor.previousTextEditor",
    async () => {
      const allTabs = getTabs();
      // get index of terminal tab next to the active tab
      const textTabs = allTabs.filter((tab) => isInputTab(tab.input));
      const nextTab = getPreviousTab(textTabs);

      // tab next to the activated tab
      if (nextTab) {
        await goToTabAtIndex(nextTab.index);
      }
    }
  );

  const nextTerminalEditor = vscode.commands.registerCommand(
    "toggleeditor.nextTerminalEditor",
    async () => {
      const allTabs = getTabs();
      const terminalTabs = allTabs.filter((tab) => isTerminalTab(tab.input));
      const nextTab = getNextTab(terminalTabs);
      // tab next to the actived tab
      if (nextTab) {
        await goToTabAtIndex(nextTab.index);
      }
    }
  );

  const previousTerminalEditor = vscode.commands.registerCommand(
    "toggleeditor.previousTerminalEditor",
    async () => {
      const allTabs = getTabs();
      const terminalTabs = allTabs.filter((tab) => isTerminalTab(tab.input));
      const nextTab = getPreviousTab(terminalTabs);
      // tab next to the actived tab
      if (nextTab) {
        await goToTabAtIndex(nextTab.index);
      }
    }
  );

  const newPinnedTerminal = vscode.commands.registerCommand(
    "toggleeditor.newPinnedTerminal",
    async () => {
      // create a new terminal
      const terminal = vscode.window.createTerminal();
      // pin the terminal
      terminal.show(true);
      vscode.commands.executeCommand("workbench.action.pinEditor");
    }
  );

  const unPinAndCloseEditor = vscode.commands.registerCommand(
    "toggleeditor.unPinAndCloseEditor",
    async () => {
      vscode.commands.executeCommand("workbench.action.unpinEditor");
      vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    }
  );

  context.subscriptions.push(
    ...[
      nextTextEditor,
      nextTerminalEditor,
      newPinnedTerminal,
      previousTextEditor,
      previousTerminalEditor,
      unPinAndCloseEditor,
    ]
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

function isInputTab(input: any): input is TabInputText {
  return input instanceof TabInputText;
}

function isTerminalTab(input: any): input is TabInputTerminal {
  return input instanceof TabInputTerminal;
}

function goToTabAtIndex(index: number) {
  return vscode.commands.executeCommand(
    "workbench.action.openEditorAtIndex",
    index
  );
}

interface TabWithIndex extends Tab {
  index: number;
}

function getNextTab(tabs: TabWithIndex[]) {
  const activeTabIndex = tabs.findIndex((tab) => tab.isActive);
  const nextIndex = (activeTabIndex + 1) % tabs.length;
  return tabs[nextIndex];
}

function getPreviousTab(tabs: TabWithIndex[]) {
  const activeTabIndex = tabs.findIndex((tab) => tab.isActive);
  const previousIndex =
    activeTabIndex === 0 ? tabs.length - 1 : activeTabIndex - 1;
  return tabs[previousIndex];
}

function getTabs(): TabWithIndex[] {
  return vscode.window.tabGroups.activeTabGroup.tabs.map((tab, index) => {
    return {
      ...tab,
      index,
    };
  });
}
