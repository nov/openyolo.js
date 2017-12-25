const GOOGLE_CLIENT_ID = '97329362365-hbe147jo6o1m56e316efsp89d6s22k46.apps.googleusercontent.com';
const FB_CLIENT_ID = '158245434257042';
const SUPPORTED_AMRS = [
  'https://www.facebook.com',
  'https://accounts.google.com',
  'googleyolo://id-and-password'
];
const SUPPORTED_IDPS = [{
  uri: 'https://www.facebook.com',
  clientId: FB_CLIENT_ID
}, {
  uri: 'https://accounts.google.com',
  clientId: GOOGLE_CLIENT_ID
}];

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
    supportedAuthMethods: SUPPORTED_AMRS,
    supportedIdTokenProviders: SUPPORTED_IDPS
  });
};

app.signUp = () => {
  return googleyolo.hint({
    supportedAuthMethods: SUPPORTED_AMRS,
    supportedIdTokenProviders: SUPPORTED_IDPS
  });
};

app.signOut = () => {
  return googleyolo.disableAutoSignIn();
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
  elements.forget_me.style = 'display: block;';

  elements.forget_me.onclick = () => {
    app.signOut().then(() => {
      location.reload();
    });
    return false;
  };
};

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
  });
};
