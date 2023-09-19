import { WebhookMessage, PluginMessage } from "./types";

window.onmessage = async (event: MessageEvent<any>) => {
  if (event.data.pluginMessage.type === "sendWebhook") {
    console.log(event.data.pluginMessage);

    const { discordData, attachmentsData, webhookUrl, threadName, content } =
      event.data.pluginMessage as WebhookMessage;

    const formData = new FormData();

    // Attach each image as a separate file with a unique name
    const attachments = attachmentsData.map((data, index) => {
      const { blob, slug, url } = data;
      const filename = `${slug}_${index}.png`;
      const file = new File([blob], filename, {
        type: "image/png",
        lastModified: Date.now(),
      });

      formData.append(`files[${index}]`, file, filename);

      return {
        id: index,
        description: `Image ${index + 1} of ${attachmentsData.length}`,
        filename: filename,
      };
    });

    // Attach the JSON payload
    formData.append(
      "payload_json",
      JSON.stringify({
        thread_name: threadName,
        username: discordData?.username || null,
        content,
        attachments,
      })
    );

    console.log(formData);

    // Fetch
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
