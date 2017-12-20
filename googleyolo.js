const GOOGLE_CLIENT_ID = '97329362365-hbe147jo6o1m56e316efsp89d6s22k46.apps.googleusercontent.com';

let app = {};
let elements = {
  welcome: document.querySelector('#welcome'),
  id_token: {
    header: document.querySelector('#idtoken .header'),
    payload: document.querySelector('#idtoken .payload')
  },
  forget_me: document.querySelector('#forget-me')
}

app.signIn = () => {
  return googleyolo.retrieve({
    supportedAuthMethods: [
      'https://accounts.google.com',
      'googleyolo://id-and-password'
    ],
    supportedIdTokenProviders: [
      {
        uri: 'https://accounts.google.com',
        clientId: GOOGLE_CLIENT_ID
      }
    ]
  });
};

app.signedIn = (credential) => {
  console.info('signed-in with', credential);
  elements.welcome.innerText = "Welcome, " + credential.displayName + '!';

  let [header, payload, signature] = credential.idToken.split('.');
  let prettyPrint = (jwt_segment) => {
    return JSON.stringify(JSON.parse(atob(jwt_segment)), false, 2);
  };
  elements.id_token.header.innerText = prettyPrint(header);
  elements.id_token.payload.innerText = prettyPrint(payload);
  elements.forget_me.

  elements.forget_me.onclick = () => {
    app.signOut().then(() => {
      location.reload();
    })
  }
};

app.signUp = () => {
  return googleyolo.hint({
    supportedAuthMethods: [
      'https://accounts.google.com'
    ],
    supportedIdTokenProviders: [
      {
        uri: 'https://accounts.google.com',
        clientId: GOOGLE_CLIENT_ID
      }
    ]
  });
}

app.signOut = () => {
  return googleyolo.disableAutoSignIn();
}

window.onGoogleYoloLoad = (googleyolo) => {
  console.info('Ready for YOLO');

  app.signIn().then(app.signedIn, error => {
    console.error('Sign-in failed', error);

    if (error.type === 'noCredentialsAvailable') {
      app.signUp().then(credential => {
        app.signedIn(credential);
      }, error => {
        console.error('Sign-up failed', error);
      });
    }
  }).catch(error => {

  });
};
