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
      title: "Trato entre jugadores",
      description:
        "Sin insultos, acoso ni toxicidad en el chat ni por voz. No se molesta a otros jugadores.",
    },
    {
      title: "Nada de grief",
      description:
        "No rompas, sabotées ni grifees lo que no sea tuyo.",
    },
    {
      title: "Nada de explosiones",
      description:
        "Prohibido explotar bases, terreno ajeno o cualquier cosa que no sea tuya.",
    },
    {
      title: "Nada de robos",
      description: "No robes cofres, granjas ni objetos de otros jugadores.",
    },
    {
      title: "Zona de bases",
      description:
        "Las bases tienen que estar dentro del cuadrado de 10000 a -10000, para que queden más o menos juntas.",
    },
    {
      title: "Elegir terreno",
      description:
        "Si quieres una zona para tu base, se habla. Si alguien ya está ahí, se respeta: el mundo es muy grande.",
    },
    {
      title: "Mods de cliente",
      description:
        "Se permiten algunos mods solo de cliente, como el zoom o el minimapa, siempre que no estén rotos ni den ventaja injusta.",
    },
    {
      title: "Granjas comunitarias",
      description:
        "Habrá algunas granjas comunitarias para evitar lag. No montes granjas enormes por tu cuenta si ya existe una compartida.",
    },
    {
      title: "El End y el dragón",
      description:
        "No se puede ir al End ni matar al dragón hasta el evento en grupo. Después, cada uno puede hacer lo que quiera.",
    },
  ],
} as const;

export const POLL_INTERVAL_MS = siteConfig.pollIntervalMs;
