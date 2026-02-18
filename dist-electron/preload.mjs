"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  getRunners: () => electron.ipcRenderer.invoke("get-runners"),
  selectDirectory: () => electron.ipcRenderer.invoke("select-directory"),
  installGame: (payload) => electron.ipcRenderer.invoke("install-game", payload),
  openHeroic: () => electron.ipcRenderer.invoke("open-heroic"),
  onInstallProgress: (callback) => {
    const subscription = (_event, value) => callback(value);
    electron.ipcRenderer.on("install-progress", subscription);
    return () => electron.ipcRenderer.removeListener("install-progress", subscription);
  },
  onInstallLog: (callback) => {
    const subscription = (_event, value) => callback(value);
    electron.ipcRenderer.on("install-log", subscription);
    return () => electron.ipcRenderer.removeListener("install-log", subscription);
  }
});
