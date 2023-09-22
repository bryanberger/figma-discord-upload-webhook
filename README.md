# Figma Discord Upload Webhook, aka WIP

WIP is a Figma plugin for quickly sharing  your works-in-progress directly to a Discord channel via webhooks. Think of it as a very low friction way to share our work.

![banner](banner.png?raw=true)

## Dev

Create a webhook in a `text`, `forum`, or `media` channel in your Discord server (forum channel preferred). This is a parameter based plugin that accepts a required `Thread Name` and some optional properties. If the webhook was not created you will get a `400` error. You may also get 400 errors if you try and post more than 25mb.

- Run `npm install` to install dependencies.
- cp `.env.sample` `.env`
- Edit the `WEBHOOK_URL` in `.env`
- Run `npm run watch` to start parcel in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose the `manifest.json` file from this repo.

## Build

```
Run `npm run build` to build a production version.
```

## Notice

While I am a Discord employee, this is by no way endorsed as an "official" Discord integration with Figma. This is a personal project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.