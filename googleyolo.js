const GOOGLE_CLIENT_ID = '97329362365-hbe147jo6o1m56e316efsp89d6s22k46.apps.googleusercontent.com';

window.onGoogleYoloLoad = (googleyolo) => {
  console.info('Ready for YOLO');

  googleyolo.retrieve({
    supportedAuthMethods: [
      "https://accounts.google.com",
      "googleyolo://id-and-password"
    ],
    supportedIdTokenProviders: [
      {
        uri: "https://accounts.google.com",
        clientId: GOOGLE_CLIENT_ID
      }
    ]
  }).then(credential => {
    console.info(credential);
  }, (error) => {
    console.error(error);
  });
};
