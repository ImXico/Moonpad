// Without ejecting from Create-React-App, there is
// apparently no way to import from outside src/...
// ---------------------------------------------------
// These are the only thing that is shared between main
// process (electron/) and renderer process code (src/).
export const enum IpcActions {
  LoadPersistedData = "LoadPersistedData",
  CheckIfMacOs = "CheckIfMacOs",
  MinimizeWindow = "MinimizeWindow",
  ToggleMaximizeWindow = "ToggleMaximizeWindow",
  CloseWindow = "CloseWindow",
  CreateTab = "CreateTab",
  UpdateTabName = "UpdateTabName",
  UpdateTabContent = "UpdateTabContent",
  SelectTab = "SelectTab",
  SwapTabs = "SwapTabs",
  DeleteTab = "DeleteTab",
  ToggleOpenTabArea = "ToggleOpenTabArea",
  ToggleAlwaysOnTopRequest = "ToggleAlwaysOnTopRequest",
  ToggleAlwaysOnTopResponse = "ToggleAlwaysOnTopResponse",
  UpdateWindowDimensions = "UpdateWindowDimensions",
  ToggleColorTheme = "ToggleColorTheme",
}
