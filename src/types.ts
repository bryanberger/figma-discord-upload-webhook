export type WebhookMessage = {
  type: "sendWebhook";
  webhookUrl: string;
  imgBlob: Uint8Array;
  threadName?: string;
  description?: string;
  discordUserId?: string;
  figmaData: {
    username: string;
    avatarUrl: string;
    nodeName: string;
    nodeUrl: string;
    nodeNameSlug: string;
  };
};

export type PluginMessage = {
  status: string;
  code: number;
};

export type CustomParameters = {
  description?: string;
  threadName?: string;
};
