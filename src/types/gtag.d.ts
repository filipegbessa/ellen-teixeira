/**
 * Google Analytics gtag TypeScript definitions
 */

interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  non_interaction?: boolean;
  [key: string]: any;
}

interface Window {
  gtag: (
    command: "config" | "event" | "js" | "set",
    targetId: string,
    config?: GtagEventParams
  ) => void;
}
