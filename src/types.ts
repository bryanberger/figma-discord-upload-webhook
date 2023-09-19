export type WebhookMessage = {
  type: "sendWebhook";
  webhookUrl: string;
  content: string;
  threadName: string;
  attachmentsData: Attachment[];
  figmaData: {
    username: string;
    avatarUrl: string;
    fileUrl: string;
  };
  discordData?: {
    username: string;
  };
};

export type PluginMessage = {
  status: string;
  code: number;
};

export type CustomParameters = {
  threadName: string;
  description?: string;
  shareLinks?: string; // all params are strings, but this is really meant to be treated as a boolean
};

export type Attachment = {
  blob: Uint8Array;
  name: string;
  url: string;
  slug: string;
};
