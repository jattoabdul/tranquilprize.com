export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.tranquilprize.com') {
      url.hostname = 'tranquilprize.com';
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.href, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
