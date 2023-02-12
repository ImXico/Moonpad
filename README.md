# Moonpad

> The cross-platform, auto-saving scratchpad with tabs.

<p align="center">
  <img src="https://github.com/ImXico/Moonpad/blob/master/assets/readme-hero.png?raw=true" alt="Moonpad Hero"/>
</p>

Inspired by [FromScratch](https://github.com/Kilian/fromscratch) and named after the great John Maus [song](https://open.spotify.com/track/2NJGAT43AvS7BQvn2017yS?si=9_zcPXJJT1Wdjg-ip5-1sw), Moonpad is a simple scratchpad intented for you to quickly type down your notes, thoughts, to-dos... anything, really.

It is an Electron app built with React/Redux/TypeScript and uses `styled-components` for styling.

### Features

* Content auto-saving
* Tabs! Move them up/down, edit their names, create some, delete some
* Window always-on-top toggle
* Clutter-free mode: show/hide tabs sidebar
* Character/Word counters on text selection
* A super clean UI, featuring the great colors from the [Nord](https://www.nordtheme.com/) palette

### Keyboard Shortcuts

* `Ctrl/Cmd + e` - Toggle open/close the tabs sidebar
* `Ctrl/Cmd + n` - Create a new tab
* `Ctrl/Cmd + .` - Toggle window always-on-top mode
* `Ctrl/Cmd + s` - ... No need, content is auto-saved

### Content Storage

Both window preferences and tabs/content are saved in a single json file, `data.json`:

* On Windows: `%APPDATA%/Moonpad/data.json`
* On MacOS: `~/Library/Application Support/Moonpad/data.json`
* On Linux: `~/.config/Moonpad/data.json`

For the time being, this location is not configurable.

### Development & Building

To clone and run this repository you'll need Git and Yarn. From the command line:

```bash
$ git clone https://github.com/ImXico/Moonpad && cd Moonpad
$ yarn install
$ yarn run electron:dev
```

To make a release-ready build (will go to `/dist`):

```bash
$ yarn run electron:build
```

### License

This project is released under the MIT License.
