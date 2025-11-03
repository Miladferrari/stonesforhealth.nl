import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import crypto from 'crypto';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Generate unique recovery token
function generateRecoveryToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, cartItems, cartTotal, sessionId } = body;

    // Validate required fields
    if (!email || !cartItems || !cartTotal) {
      return NextResponse.json(
        { error: 'Missing required fields: email, cartItems, cartTotal' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate session ID if not provided
    const finalSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const recoveryToken = generateRecoveryToken();

    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    try {
      // Check if session already exists
      const [existing]: any = await connection.execute(
        'SELECT id, status FROM wp_abandoned_carts WHERE session_id = ? OR customer_email = ?',
        [finalSessionId, email]
      );

      if (existing.length > 0) {
        // Update existing cart
        await connection.execute(
          `UPDATE wp_abandoned_carts
           SET cart_data = ?,
               cart_total = ?,
               customer_name = ?,
               created_at = NOW(),
               status = 'pending',
               email_count = 0,
               last_email_sent_at = NULL,
               recovery_token = ?
           WHERE session_id = ? OR customer_email = ?`,
          [
            JSON.stringify(cartItems),
            cartTotal,
            name || null,
            recoveryToken,
            finalSessionId,
            email
          ]
        );

        console.log(`[Abandoned Cart] Updated existing cart for ${email}`);
      } else {
        // Insert new cart
        await connection.execute(
          `INSERT INTO wp_abandoned_carts
           (session_id, customer_email, customer_name, cart_data, cart_total, recovery_token, created_at, status)
           VALUES (?, ?, ?, ?, ?, ?, NOW(), 'pending')`,
          [
            finalSessionId,
            email,
            name || null,
            JSON.stringify(cartItems),
            cartTotal,
            recoveryToken
          ]
        );

        console.log(`[Abandoned Cart] Created new cart for ${email}`);
      }

      await connection.end();

      return NextResponse.json({
        success: true,
        message: 'Cart saved successfully',
        sessionId: finalSessionId
      });

    } catch (dbError) {
      await connection.end();
      throw dbError;
    }

  } catch (error) {
    console.error('[Abandoned Cart Save] Error:', error);
    return NextResponse.json(
      { error: 'Failed to save abandoned cart', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Mark cart as recovered (when order is completed)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, orderId } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection(dbConfig);

    try {
      await connection.execute(
        `UPDATE wp_abandoned_carts
         SET status = 'recovered',
             converted_order_id = ?
         WHERE customer_email = ? AND status = 'pending'`,
        [orderId || null, email]
      );

      await connection.end();

      console.log(`[Abandoned Cart] Marked cart as recovered for ${email}`);

      return NextResponse.json({
        success: true,
        message: 'Cart marked as recovered'
      });

    } catch (dbError) {
      await connection.end();
      throw dbError;
    }

  } catch (error) {
    console.error('[Abandoned Cart Recovery] Error:', error);
    return NextResponse.json(
      { error: 'Failed to mark cart as recovered' },
      { status: 500 }
    );
  }
}
