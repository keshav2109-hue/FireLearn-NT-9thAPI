export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const search = url.search;
      let targetUrl;

      // Define specific endpoints
      switch (path) {
        case '/api/AllBatches':
          targetUrl = `https://powerstudy.site/api/AllBatches${search}`;
          break;
        case '/api/BatchInfo':
          targetUrl = `https://powerstudy.site/api/BatchInfo${search}`;
          break;
        case '/api/SubjectInfo':
          targetUrl = `https://powerstudy.site/api/SubjectInfo${search}`;
          break;
        case '/api/TopicInfo':
          targetUrl = `https://powerstudy.site/api/TopicInfo${search}`;
          break;
        case '/api/get-video-url':
          targetUrl = `https://powerstudy.site/api/get-video-url${search}`;
          break;
        case '/api/get-otp':
          targetUrl = `https://powerstudy.site/api/get-otp${search}`;
          break;
        default:
          return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
      }
      
      const response = await fetch(targetUrl);
      const data = await response.text();
      
      return new Response(data, {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
