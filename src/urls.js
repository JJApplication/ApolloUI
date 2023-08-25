export default {
  JJApplication: 'https://github.com/JJApplication',
  Landers1037: 'https://github.com/landers1037',
  Facebook: 'https://fb.me/landers1037',
  Home: 'http://renj.io',
  Geist: 'https://geist-ui.dev',
  Apollo: 'https://github.com/JJApplication/Apollo',
  ApolloDoc: 'https://github.com/JJApplication/Apollo/blob/master/README.md',
  Atlas: 'https://github.com/JJApplication/Atlas',
};

export const openUrl = (uri) => {
  return () => {
    if (uri) {
      window.open(uri, '_blank');
    }
  };
};

export const goto = (route) => {
  if (route === '') {
    window.location.href = '/';
  } else {
    window.location.href = route;
  }
};