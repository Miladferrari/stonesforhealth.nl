import { NextRequest, NextResponse } from 'next/server';
import {
  getRecentNotifications,
  addNotification,
  getUnshownNotifications,
  markAsShown
} from '@/app/utils/purchaseNotificationCache';

/**
 * GET /api/purchase-notifications
 * Haalt recente notificaties op die nog niet getoond zijn
 */
export async function GET(request: NextRequest) {
  try {
    // Haal alleen notificaties op die nog niet getoond zijn
    const notifications = await getUnshownNotifications();

    // Markeer deze notificaties als getoond (zodat ze niet opnieuw verschijnen bij refresh)
    for (const notification of notifications) {
      await markAsShown(notification.id);
    }

    return NextResponse.json({
      success: true,
      notifications,
      count: notifications.length,
    });
  } catch (error) {
    console.error('Error fetching purchase notifications:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch notifications',
        notifications: [],
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/purchase-notifications
 * Voegt een nieuwe notificatie toe (alleen voor interne gebruik)
 *
 * Body:
 * {
 *   orderId: number,
 *   customerName: string,
 *   productName: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, customerName, productName } = body;

    // Validatie
    if (!orderId || !customerName || !productName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: orderId, customerName, productName',
        },
        { status: 400 }
      );
    }

    // Valideer dat orderId een nummer is
    if (typeof orderId !== 'number') {
      return NextResponse.json(
        {
          success: false,
          error: 'orderId must be a number',
        },
        { status: 400 }
      );
    }

    // Voeg notificatie toe
    const notification = await addNotification({
      orderId,
      customerName,
      productName,
    });

    return NextResponse.json({
      success: true,
      notification,
      message: 'Notification added successfully',
    });
  } catch (error) {
    console.error('Error adding purchase notification:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add notification',
      },
      { status: 500 }
    );
  }
}
