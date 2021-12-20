const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input');

const APP_API_ID = process.env.APP_API_ID;
const APP_API_HASH = process.env.APP_API_HASH;
const stringSession = new StringSession('');
(async () => {
    console.log('Loading interactive example...');
    const client = new TelegramClient(stringSession, APP_API_ID, APP_API_HASH, { connectionRetries: 5 })
    await client.start({
        phoneNumber: async () => await input.text('number ?'),
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });
    console.log('You should now be connected.');
    console.log(client.session.save());
    await client.sendMessage('me', { message: 'Yeah its working Dude !' });
})();

