export type ServerStatus = {
  online: boolean;
  version: string | null;
  pingMs: number | null;
  players: {
    online: number;
    max: number;
    list: string[];
  };
  motd: string | null;
  error: string | null;
};
