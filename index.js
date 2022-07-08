import DiscordJS, { Intents } from "discord.js";
import "dotenv/config";

// utils {{{
function getenv(key) {
  if (!process.env[key]) {
    shutdown(`${key} environmental varible not found`);
  }
  return process.env[key];
}
// }}}

// constants {{{
const OUR_GUILD = getenv("OUR_GUILD_ID");
const ADMIN_ROLE = getenv("ADMIN_ROLE_ID");
const TOKEN = getenv("TOKEN");
// languages map {{{
const langProjMap = [
  {
    name: "C++",
    regex: /[Cc](\+\+|pp|PP)/,
    id: getenv("LANG_CPP_ID"),
  },
  {
    name: "C#",
    regex: /[Cc](#|[Ss])/,
    id: getenv("LANG_CS_ID"),
  },
  {
    name: "Go",
    regex: /[Gg]o(lang)?/,
    id: getenv("LANG_GO_ID"),
  },
  {
    name: "Java+Kotlin",
    regex: /([Jj]ava|[Kk]otlin)/,
    id: getenv("LANG_JAVA_ID"),
  },
  {
    name: "Python",
    regex: /[Pp]y(thon)?/,
    id: getenv("LANG_PYTHON_ID"),
  },
  {
    name: "HTML / CSS / JavaScript",
    regex: /([Hh]tml|HTML)|(CSS|css)|(js|JS|[Jj]avascript)|([Ww]eb(dev)?)/,
    id: getenv("LANG_WEB_ID"),
  },
  {
    name: "LeoConsole",
    regex: /([Ll]eo[Cc]onsole|LC|lc)/,
    id: getenv("LANG_LC_ID"),
  },
];
// }}}
// }}}

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// commands {{{
// subscribe() {{{
function subscribe(interaction, selectedLang) {
  for (let lang in langProjMap) {
    if (langProjMap[lang].regex.test(selectedLang)) {
      interaction.member.roles.add(langProjMap[lang].id);
      interaction.reply({
        content: `Added you to the ${langProjMap[lang].name} role`,
        ephemeral: true,
      });
      return;
    }
  }
  interaction.reply({
    content: "A role for this language does not exist",
    ephemeral: true,
  });
}
// }}}

// unsubscribe() {{{
function unsubscribe(interaction, selectedLang) {
  for (let lang in langProjMap) {
    if (langProjMap[lang].regex.test(selectedLang)) {
      interaction.member.roles.remove(langProjMap[lang].id);
      interaction.reply({
        content: `Removed you from the ${langProjMap[lang].name} role`,
        ephemeral: true,
      });
      return;
    }
  }
  interaction.reply({
    content: "A role for this language does not exist",
    ephemeral: true,
  });
}
// }}}

// TODO temporarily
// shutdown() {{{
function shutdown(msg = "shutting down") {
  console.log(msg);
  console.log("logging out");
  client.destroy();
  process.exit(0);
}
// }}}
// }}}

// TODO doesnt work
// logout and exit {{{
for (let signal in ["SIGHUP", "SIGINT", "SIGQUIT", "SIGTERM"]) {
  process.on(signal, shutdown);
}
// }}}

// on ready {{{
client.on("ready", () => {
  console.log("logged in, ready");
  const guild = client.guilds.cache.get(OUR_GUILD);

  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }

  // beep command {{{
  commands.create({
    name: "beep",
    description: "beep boop",
  });
  // }}}

  // subscribe command {{{
  commands.create({
    name: "subscribe",
    description: "get a language/project specific role",
    options: [
      {
        name: "lang",
        description: "language you want to subscribe to",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
  // }}}

  // unsubscribe command {{{
  commands.create({
    name: "unsubscribe",
    description: "remove language/project specific role",
    options: [
      {
        name: "lang",
        description: "language you want to unsubscribe from",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
  // }}}

  // shutdown command {{{
  commands.create({
    name: "shutdown",
    description: "shutdown if-schleife-bot",
  });
  // }}}

  console.log("registered slash commands");
});
// }}}

// on interaction {{{
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  // beep {{{
  if (commandName == "beep") {
    interaction.reply({
      content: "boop",
      ephemeral: true,
    });
    return;
  }
  // }}}

  // subscribe {{{
  if (commandName == "subscribe") {
    subscribe(interaction, options.getString("lang", true));
    return;
  }
  // }}}

  // unsubscribe {{{
  if (commandName == "unsubscribe") {
    unsubscribe(interaction, options.getString("lang", true));
    return;
  }
  // }}}

  // TODO temporarily
  // shutdown {{{
  if (commandName == "shutdown") {
    if (!interaction.member.roles.cache.has(ADMIN_ROLE)) {
      interaction.reply({
        content: "you are not permitted to shut me down!",
        ephemeral: true,
      });
      return;
    }
    await interaction.reply({
      content: `shutting if-schleife-bot down triggered by ${interaction.member.name}`,
    });
    shutdown();
    return;
  }
  // }}}

  interaction.reply({
    content: `unknown command: ${commandName}`,
    ephemeral: true,
  });
});
// }}}

client.login(TOKEN);
