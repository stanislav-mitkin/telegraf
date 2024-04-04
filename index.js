import { fastify } from "fastify";
import { Telegraf } from "telegraf";

const TOKEN = "6748836434:AAGMcz5CB8ACnpUpTnJenvBPvkQ1g14hwvE";
const DOMAIN = "telegrafbot.vercel.app";
const PORT = 8080;

const bot = new Telegraf(TOKEN);
const app = fastify();

const webhook = await bot.createWebhook({ domain: DOMAIN });

app.post(`/telegraf/${bot.secretPathComponent()}`, webhook);

bot.on("text", (ctx) => ctx.reply("Hello"));

app.listen({ port: PORT }).then(() => console.log("Listening on port", PORT));
