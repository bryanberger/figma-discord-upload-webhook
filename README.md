# Figma Selection to Discord (via webhook)

Upload a selection (as an image) from Figma to Discord (via webhook)

## Dev

Create a webhook in a `text` or `forum` channel in your Discord server (forum channel preferred). This is a parameter based plugin that accepts an optional `Thread Name` value. If this value is supplied and the webhook was not created for a `forum` channel you will get a `400` error.

- Run `npm install` to install dependencies.
- Run `npm run watch` to start parcel in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose the `manifest.json` file from this repo.

-

## Build

```
Run `npm run build` to build a production version.
```
