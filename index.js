// Cloudflare Worker Proxy for EduNova API
const API_BASE = 'https://edunova-pw.vercel.app/api';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Handle CORS preflight requests
function handleCORS(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }
}

// Main request handler
export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    const corsResponse = handleCORS(request);
    if (corsResponse) return corsResponse;

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Route: /batches - Fetch batches data
      if (path === '/batches' || path === '/batches/') {
        const page = url.searchParams.get('page') || '0';
        const limit = url.searchParams.get('limit') || '1000';
        const search = url.searchParams.get('search') || '';
        
        const apiUrl = `${API_BASE}/batches.php?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`;
        
        const response = await fetch(apiUrl, {
          method: request.method,
          headers: {
            'User-Agent': 'EduNova-Proxy/1.0',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // Route: /subjects - Fetch subjects data
      if (path === '/subjects' || path === '/subjects/') {
        const batchId = url.searchParams.get('batch_id');
        const token = url.searchParams.get('token');
        
        if (!batchId || !token) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'Missing required parameters: batch_id and token are required'
          }), {
            status: 400,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          });
        }
        
        const apiUrl = `${API_BASE}/subjects.php?batch_id=${encodeURIComponent(batchId)}&token=${encodeURIComponent(token)}`;
        
        const response = await fetch(apiUrl, {
          method: request.method,
          headers: {
            'User-Agent': 'EduNova-Proxy/1.0',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // Route: /chapters - Fetch chapters data
      if (path === '/chapters' || path === '/chapters/') {
        const subjectId = url.searchParams.get('subject_id');
        const token = url.searchParams.get('token');
        
        if (!subjectId || !token) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'Missing required parameters: subject_id and token are required'
          }), {
            status: 400,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          });
        }
        
        const apiUrl = `${API_BASE}/chapters_api.php?subject_id=${encodeURIComponent(subjectId)}&token=${encodeURIComponent(token)}`;
        
        const response = await fetch(apiUrl, {
          method: request.method,
          headers: {
            'User-Agent': 'EduNova-Proxy/1.0',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // Route: /lectures - Fetch lectures data
      if (path === '/lectures' || path === '/lectures/') {
        const chapterId = url.searchParams.get('chapter_id');
        const token = url.searchParams.get('token');
        const tab = url.searchParams.get('tab');
        
        if (!chapterId || !token || !tab) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'Missing required parameters: chapter_id, token, and tab are required'
          }), {
            status: 400,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          });
        }
        
        const apiUrl = `${API_BASE}/lecture.php?chapter_id=${encodeURIComponent(chapterId)}&token=${encodeURIComponent(token)}&tab=${encodeURIComponent(tab)}`;
        
        const response = await fetch(apiUrl, {
          method: request.method,
          headers: {
            'User-Agent': 'EduNova-Proxy/1.0',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // Route: /play - Fetch play data
      if (path === '/play' || path === '/play/') {
        const id = url.searchParams.get('id');
        const token = url.searchParams.get('token');
        const chapterId = url.searchParams.get('chapter_id');
        
        if (!id || !token || !chapterId) {
          return new Response(JSON.stringify({
            error: 'Bad Request',
            message: 'Missing required parameters: id, token, and chapter_id are required'
          }), {
            status: 400,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          });
        }
        
        const apiUrl = `${API_BASE}/play_api.php?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}&chapter_id=${encodeURIComponent(chapterId)}`;
        
        const response = await fetch(apiUrl, {
          method: request.method,
          headers: {
            'User-Agent': 'EduNova-Proxy/1.0',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // 404 for unknown routes
      return new Response(JSON.stringify({ 
        error: 'Not Found'
      }), {
        status: 404,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      console.error('Proxy Error:', error);
      
      return new Response(JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }
  },
};
