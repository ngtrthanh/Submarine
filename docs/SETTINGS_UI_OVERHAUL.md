# Settings UI Overhaul

Status: planned after light-theme + dual-pane file-manager polish

## Goal

Make Settings feel native, compact, predictable, and consistent with the rest of Submarine without changing stored preference keys or backend behavior.

## Design rules

- KISS: one settings shell, small focused sections, no card masonry.
- Desktop: left category rail + right content pane.
- Narrow/mobile: category list -> detail view.
- Use semantic light/dark surface tokens instead of hard-coded black/zinc backgrounds.
- Keep controls native and keyboard accessible.
- Show changes live. No separate Save button for local UI preferences.
- Dangerous/reset actions stay isolated under Advanced.
- Do not mix cloud profile settings with device-only appearance settings without a clear scope label.

## Information architecture

1. Appearance
   - Theme: Dark / Light
   - Accent color
   - Dark background color (dark theme only)
   - Compact preview

2. Terminal
   - Font size
   - Future: font family, cursor style, line height only if demanded by real use

3. Server info
   - Font family
   - Font size
   - Live preview

4. Sync
   - Auto-sync
   - Sync interval
   - Device/local vs profile/cloud scope shown explicitly

5. Diagnostics
   - Activity log
   - Build/version information

6. Advanced
   - Reset UI preferences
   - Future migration/debug controls only when needed

## Component plan

- SettingsPanel.tsx becomes shell/router only.
- settings/AppearanceSettings.tsx
- settings/TerminalSettings.tsx
- settings/ServerInfoSettings.tsx
- settings/SyncSettings.tsx
- settings/DiagnosticsSettings.tsx
- settings/AdvancedSettings.tsx
- settings/SettingRow.tsx for aligned label/control/help layout.
- settings/SettingSection.tsx for consistent headings and spacing.

Do not introduce a settings framework or form library.

## Theme cleanup

Create semantic CSS variables and use them across Settings and node/file surfaces:

- --surface-0
- --surface-1
- --surface-2
- --text-1
- --text-2
- --text-3
- --border-1
- --control-bg
- --control-border

Dark and light themes should only redefine these variables. New UI must not add hard-coded #09090b/#121215/zinc text combinations.

## UX polish

- 40-44 px control height.
- Strong visible focus state.
- Inline descriptions, max 1-2 lines.
- Disable irrelevant controls instead of hiding unexpectedly.
- Consistent switch, select, numeric input, slider alignment.
- Preview blocks use the actual app theme/font renderer.
- Reset action shows exactly what resets.

## Gates

### S0 — Foundation
- Introduce semantic theme variables.
- Light/dark contrast audit for Settings, Nodes, File Manager.
- No functional change.

### S1 — Settings shell
- Replace masonry columns with category rail + content pane.
- Responsive narrow mode.
- Preserve every existing setting key.

### S2 — Appearance + Terminal
- Migrate existing theme/accent/background/terminal controls.
- Live preview.
- Remove duplicated dark-only classes.

### S3 — Server info + Sync
- Migrate font controls and cloud sync controls.
- Scope labels: This device / Cloud profile.

### S4 — Diagnostics + Advanced
- Activity log entry.
- Reset preferences.
- Build/version metadata.

### S5 — Polish gate
- Keyboard navigation.
- 320 px narrow layout.
- Windows WebView light/dark visual pass.
- npm build PASS.
- Windows installer workflow PASS.

## Non-goals

- No backend settings migration.
- No redesign of terminal/SFTP logic.
- No new dependency.
- No animation system.
- No account/settings sync rewrite.
