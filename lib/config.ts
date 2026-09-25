export const siteConfig = {
  name: "SMU SMP",
  tagline: "Survival MultiPlayer con mods",
  description:
    "Servidor Survival MultiPlayer con mods. Minecraft 1.21.1 · NeoForge.",
  serverAddress: process.env.NEXT_PUBLIC_SERVER_ADDRESS ?? "mc.gbxd.app",
  blueMapUrl: process.env.NEXT_PUBLIC_BLUEMAP_URL ?? "https://map.gbxd.app",
  modsDownloadUrl:
    process.env.NEXT_PUBLIC_MODS_DOWNLOAD_URL ?? "https://gofile.io/d/xhmSofA9",
  modrinthAppUrl:
    process.env.NEXT_PUBLIC_MODRINTH_APP_URL ?? "https://modrinth.com/app",
  minecraftVersion: "1.21.1",
  loader: "NeoForge",
  pollIntervalMs: 30_000,
  timeZone: "Europe/Madrid",
  dailyRestartHour: 10,
  saturdayEventHour: 15,
  mods: [
    {
      name: "Create",
      description: "Automatización, contraptions e ingeniería",
    },
    {
      name: "Simple Voice Chat",
      description: "Chat de voz de proximidad",
    },
    {
      name: "Jade",
      description: "Información del bloque y entidad bajo el cursor",
    },
    {
      name: "EMI",
      description: "Recetas e items a simple vista",
    },
  ],
  rules: [
    {
      title: "Respeta a los demás",
      description: "Sin insultos, acoso ni toxicidad en el chat ni por voz.",
    },
    {
      title: "No grief ni robos",
      description:
        "No rompas, robes ni sabotees lo que no sea tuyo. Pide permiso antes de construir cerca de otra base.",
    },
    {
      title: "No matar al dragon ni ir al end",
      description:
        "No se puede ir al end ni matar al dragon por temas logicos, se hará en un evento todos juntos y luego ya se podrá hacer lo que quieras",
    },
  ],
} as const;

export const POLL_INTERVAL_MS = siteConfig.pollIntervalMs;
