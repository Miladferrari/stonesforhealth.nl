import { promises as fs } from 'fs';
import path from 'path';

export interface PurchaseNotification {
  id: string;
  orderId: number;
  customerName: string; // Voornaam
  productName: string;
  timestamp: string; // ISO string
  shown?: boolean; // Of de notificatie al is getoond
}

// Pad naar het cache bestand
const CACHE_FILE_PATH = path.join(process.cwd(), 'data', 'purchase-notifications.json');
const MAX_NOTIFICATIONS = 50; // Maximaal aantal notificaties in cache
const MAX_AGE_HOURS = 24; // Verwijder notificaties ouder dan 24 uur

/**
 * Zorgt ervoor dat de data directory en cache file bestaan
 */
async function ensureCacheFileExists(): Promise<void> {
  try {
    const dir = path.dirname(CACHE_FILE_PATH);

    // Maak data directory als die niet bestaat
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }

    // Maak cache file als die niet bestaat
    try {
      await fs.access(CACHE_FILE_PATH);
    } catch {
      await fs.writeFile(CACHE_FILE_PATH, JSON.stringify({ notifications: [] }), 'utf-8');
    }
  } catch (error) {
    console.error('Error ensuring cache file exists:', error);
    throw error;
  }
}

/**
 * Leest alle notificaties uit de cache
 */
async function readCache(): Promise<PurchaseNotification[]> {
  try {
    await ensureCacheFileExists();
    const data = await fs.readFile(CACHE_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.notifications || [];
  } catch (error) {
    console.error('Error reading cache:', error);
    return [];
  }
}

/**
 * Schrijft notificaties naar de cache
 */
async function writeCache(notifications: PurchaseNotification[]): Promise<void> {
  try {
    await ensureCacheFileExists();
    await fs.writeFile(
      CACHE_FILE_PATH,
      JSON.stringify({ notifications, lastUpdated: new Date().toISOString() }, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Error writing cache:', error);
    throw error;
  }
}

/**
 * Verwijdert oude notificaties (ouder dan MAX_AGE_HOURS)
 */
function removeOldNotifications(notifications: PurchaseNotification[]): PurchaseNotification[] {
  const cutoffTime = new Date();
  cutoffTime.setHours(cutoffTime.getHours() - MAX_AGE_HOURS);

  return notifications.filter(notification => {
    const notificationTime = new Date(notification.timestamp);
    return notificationTime > cutoffTime;
  });
}

/**
 * Voegt een nieuwe notificatie toe aan de cache
 */
export async function addNotification(notification: Omit<PurchaseNotification, 'id' | 'timestamp'>): Promise<PurchaseNotification> {
  try {
    let notifications = await readCache();

    // Verwijder oude notificaties
    notifications = removeOldNotifications(notifications);

    // Maak nieuwe notificatie met ID en timestamp
    const newNotification: PurchaseNotification = {
      ...notification,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      shown: false,
    };

    // Voeg toe aan het begin van de array (nieuwste eerst)
    notifications.unshift(newNotification);

    // Beperk tot MAX_NOTIFICATIONS
    if (notifications.length > MAX_NOTIFICATIONS) {
      notifications = notifications.slice(0, MAX_NOTIFICATIONS);
    }

    // Schrijf terug naar cache
    await writeCache(notifications);

    return newNotification;
  } catch (error) {
    console.error('Error adding notification:', error);
    throw error;
  }
}

/**
 * Haalt alle recente notificaties op (niet ouder dan MAX_AGE_HOURS)
 */
export async function getRecentNotifications(limit: number = 10): Promise<PurchaseNotification[]> {
  try {
    let notifications = await readCache();

    // Verwijder oude notificaties
    notifications = removeOldNotifications(notifications);

    // Update cache als er oude notificaties waren verwijderd
    await writeCache(notifications);

    // Return de gevraagde hoeveelheid (nieuwste eerst)
    return notifications.slice(0, limit);
  } catch (error) {
    console.error('Error getting recent notifications:', error);
    return [];
  }
}

/**
 * Haalt notificaties op die nog niet getoond zijn
 */
export async function getUnshownNotifications(): Promise<PurchaseNotification[]> {
  try {
    const notifications = await readCache();
    return notifications.filter(n => !n.shown);
  } catch (error) {
    console.error('Error getting unshown notifications:', error);
    return [];
  }
}

/**
 * Markeert een notificatie als getoond
 */
export async function markAsShown(notificationId: string): Promise<void> {
  try {
    const notifications = await readCache();
    const notification = notifications.find(n => n.id === notificationId);

    if (notification) {
      notification.shown = true;
      await writeCache(notifications);
    }
  } catch (error) {
    console.error('Error marking notification as shown:', error);
  }
}

/**
 * Verwijdert alle notificaties (voor testing/reset)
 */
export async function clearAllNotifications(): Promise<void> {
  try {
    await writeCache([]);
  } catch (error) {
    console.error('Error clearing notifications:', error);
    throw error;
  }
}
