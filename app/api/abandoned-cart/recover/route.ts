import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Recovery token is required' },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection(dbConfig);

    try {
      // Find cart by recovery token
      const [carts]: any = await connection.execute(
        'SELECT * FROM wp_abandoned_carts WHERE recovery_token = ? AND status = "pending" LIMIT 1',
        [token]
      );

      if (carts.length === 0) {
        await connection.end();
        return NextResponse.json(
          { error: 'Cart not found or already recovered' },
          { status: 404 }
        );
      }

      const cart = carts[0];

      await connection.end();

      return NextResponse.json({
        success: true,
        cart: {
          customer_email: cart.customer_email,
          customer_name: cart.customer_name,
          cart_data: cart.cart_data,
          cart_total: cart.cart_total
        }
      });

    } catch (dbError) {
      await connection.end();
      throw dbError;
    }

  } catch (error) {
    console.error('[Cart Recovery] Error:', error);
    return NextResponse.json(
      { error: 'Failed to recover cart', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
