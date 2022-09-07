import { WebhookMessage, PluginMessage } from "./types";

window.onmessage = async (event: MessageEvent<any>) => {
  if (event.data.pluginMessage.type === "sendWebhook") {
    const { figmaData, imgBlob, webhookUrl, threadName, description } = event
      .data.pluginMessage as WebhookMessage;

    const filename = `${figmaData.nodeNameSlug}.png`;

    const imgFile = new File([imgBlob], filename, {
      type: "image/png",
      lastModified: Date.now(),
    });

    const formData = new FormData();
    formData.append(filename, imgFile);
    formData.append(
      "payload_json",
      JSON.stringify({
        thread_name: threadName,
        embeds: [
          {
            title: figmaData.nodeName,
            description,
            author: {
              name: figmaData.username,
              icon_url: figmaData.avatarUrl,
            },
            url: figmaData.nodeUrl,
            image: {
              url: `attachment://${filename}`,
            },
            footer: {
              text: "Posted from Figma",
            },
            timestamp: new Date(),
          },
        ],
      })
    );

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: formData,
    });

    const code = response.status;
    const status = code >= 200 && code < 300 ? "success" : "error";

    window.parent.postMessage(
      {
        pluginMessage: {
          status,
          code,
        } as PluginMessage,
      },
      "*"
    );
  }
};
