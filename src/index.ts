import { slugify } from "./helpers";
import { CustomParameters, PluginMessage, WebhookMessage } from "./types";

figma.showUI(__html__, { visible: false });

figma.ui.onmessage = async (data: PluginMessage) => {
  const { status, code } = data;

  if (status === "success") {
    figma.notify("Successfully uploaded!");
  } else {
    figma.notify(
      `(${code}) Error sending webhook request, please reach out to the plugin developer.`,
      { error: true }
    );
  }

  figma.closePlugin();
};

figma.on(
  "run",
  async ({ parameters }: RunEvent) => await runPlugin(parameters)
);

figma.parameters.on("input", ({ result }: ParameterInputEvent) => {
  // Don't set any suggestions, this is a freeform title
  result.setSuggestions([]);
});

async function runPlugin(parameters: ParameterValues) {
  const { description, threadName } = parameters as CustomParameters;
  const selection = figma.currentPage.selection;

  console.log("selection", selection);

  // If the selection length does not equal 1 and exportAsync doesn't exist on the node error out
  if (selection.length !== 1 || !selection[0].exportAsync) {
    return figma.notify(
      "Please select a single node. If you want to send multiple nodes, group them first.",
      { error: true }
    );
  }

  // Set node
  const node = selection[0];
  node.setRelaunchData({ upload: "" });

  // Prepare image blob data
  const imgBlob = await node.exportAsync({
    format: "PNG",
    contentsOnly: true,
    constraint: { type: "WIDTH", value: 2048 },
  });

  const msg: WebhookMessage = {
    type: "sendWebhook",
    webhookUrl: process.env.WEBHOOK_URL,
    description,
    threadName,
    imgBlob,
    figmaData: {
      username: figma.currentUser.name,
      avatarUrl: figma.currentUser.photoUrl,
      nodeName: node.name,
      nodeUrl: `https://www.figma.com/file/${figma.fileKey}?node-id=${node.id}`,
      nodeNameSlug: slugify(node.name),
    },
  };

  setTimeout(() => figma.ui.postMessage(msg), 1);
}
