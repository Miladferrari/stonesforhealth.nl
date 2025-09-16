import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Store API proxy to handle session-based cart operations
export async function POST(request: NextRequest) {
  try {
    const { endpoint, method = 'GET', body } = await request.json();

    // Get the base WordPress URL
    const baseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL?.replace('/wp-json/wc/v3', '') ||
                   'http://wordpress.123noodboxen.nl';

    const storeApiUrl = `${baseUrl}/wp-json/wc/store${endpoint}`;

    console.log(`[Store Proxy] Forwarding ${method} request to: ${storeApiUrl}`);

    // Get cookies from the request
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('woocommerce-session')?.value;

    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Add cart token if available
    if (cartToken) {
      headers['Cookie'] = `woocommerce-session=${cartToken}`;
    }

    // Make the request to Store API
    const response = await fetch(storeApiUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });

    // Get response text
    const responseText = await response.text();

    // Extract session cookie from response
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      // Parse and set the session cookie
      const sessionMatch = setCookieHeader.match(/woocommerce-session=([^;]+)/);
      if (sessionMatch) {
        (await cookies()).set('woocommerce-session', sessionMatch[1], {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 2, // 2 days
        });
      }
    }

    // Return the response
    if (!response.ok) {
      console.error(`[Store Proxy] Error ${response.status}:`, responseText);
      return NextResponse.json(
        { error: responseText },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('[Store Proxy] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Store API proxy error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || '/cart';

  return POST(new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ endpoint, method: 'GET' }),
  }));
}