export default {
  JJApplication: 'https://github.com/JJApplication',
  Landers1037: 'https://github.com/landers1037',
  GithubPages: 'https://landers1037.github.io',
  Facebook: 'https://fb.me/landers1037',
  Home: 'http://renj.io',
  Geist: 'https://geist-ui.dev',
  Apollo: 'https://github.com/JJApplication/Apollo',
  ApolloDoc: 'https://github.com/JJApplication/Apollo/blob/master/README.md',
  Atlas: 'https://github.com/JJApplication/Atlas',
  Blog: 'https://blog.renj.io',
  Docs: 'https://dev.renj.io',
  Resume: 'https://me.renj.io',
  Drive: 'http://drive.renj.io',
  Gallery: 'http://life.renj.io',
  Status: 'http://status.renj.io',
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