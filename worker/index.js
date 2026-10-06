export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.tranquilprize.com') {
      url.hostname = 'tranquilprize.com';
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.href, 301);
    }
    const asset = await env.ASSETS.fetch(request);
    if (!asset.headers.get('content-type')?.includes('text/html')) return asset;

    // Keep the published HTML intact, including the decision to omit analytics.
    const response = new Response(asset.body, asset);
    const cacheControl =
      response.headers.get('cache-control') ||
      'public, max-age=0, must-revalidate';
    response.headers.set('cache-control', `${cacheControl}, no-transform`);
    return response;
  },
};
