import "dotenv/config";

let URL = process.env.CRASH_WEBHOOK_URL;

fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        content: "if-schleife-bot crashed!",
        username: "if-schleife-bot crash notifications",
        avatar_url:
        "https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-error-icon.png",
    }),
}).catch((err) => console.error(err));
