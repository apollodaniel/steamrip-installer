import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('api', {
  getRunners: () => ipcRenderer.invoke('get-runners'),
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  installGame: (payload: any) => ipcRenderer.invoke('install-game', payload),
  openHeroic: () => ipcRenderer.invoke('open-heroic'),
  onInstallProgress: (callback: (progress: any) => void) => {
    const subscription = (_event: any, value: any) => callback(value);
    ipcRenderer.on('install-progress', subscription);
    return () => ipcRenderer.removeListener('install-progress', subscription);
  }
})
