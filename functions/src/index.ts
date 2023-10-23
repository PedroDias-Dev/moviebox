// import * as functions from 'firebase-functions';

// // // Start writing functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

// create a function that adds a createdAt date to every user created
// Path: functions\src\index.ts
import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

export const onUserCreate = functions.firestore.document('users/{userId}').onCreate(snapshot => {
  // const userId = context.params.userId;
  const createdAt = new Date();

  return snapshot.ref.set(
    {
      createdAt
    },
    { merge: true }
  );
});

const url = 'smtps://teambetmailer%40gmail.com:' + encodeURIComponent('flvbvwwmgkoyfcar') + '@smtp.gmail.com:465';
const transporter = nodemailer.createTransport(url);

export const onInviteCreate = functions.firestore.document('invites/{inviteId}').onCreate(snapshot => {
  const from = '"TeamBet" <teambetmailer@gmail.com>';

  const invite = {
    id: snapshot.id,
    ...snapshot.data()
  } as any;

  const subject = 'Você foi convidado para participar de um bolão no TeamBet!';
  const to = invite.user_email;
  const text = 'Você foi convidado para participar de um bolão no TeamBet!';
  const html =
    '<h2>' +
    invite.owner_name +
    ' te convidou para jogar no Teambet!</h2> <br /> <p> Faça seu cadastro <a href="' +
    'https://teambet-1.web.app/auth/invite?group_id=' +
    invite.group_id +
    '&invite_id=' +
    invite.id +
    '&user_id=' +
    invite.user_id +
    '">aqui</a> </p>';

  const email = {
    from,
    to,
    subject,
    text,
    html
  };

  transporter.sendMail(email, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Mensagem %s enviada: %s', info.messageId, info.response);
  });

  return snapshot.ref.set(
    {
      email_sent: true
    },
    { merge: true }
  );
});
