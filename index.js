addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  try {
    // Parse the request URL to get query parameters
    const url = new URL(request.url)
    const view = url.searchParams.get('view')
    
    if (!view) {
      return new Response(JSON.stringify({ error: 'Missing view parameter' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // Construct the target API URL
    const targetUrl = `https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=${encodeURIComponent(view)}`
    
    // Forward the request to the target API
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'User-Agent': 'Cloudflare-Worker-Proxy/1.0',
      },
    })

    // Get the response data
    const data = await response.text()
    
    // Return the response with CORS headers
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Proxy request failed', details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
