-- Abandoned Cart Table Schema
-- This table stores abandoned cart sessions for email recovery

CREATE TABLE IF NOT EXISTS wp_abandoned_carts (
  id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL UNIQUE,
  customer_email VARCHAR(100) NOT NULL,
  customer_name VARCHAR(100),
  cart_data LONGTEXT NOT NULL COMMENT 'JSON string of cart items',
  cart_total DECIMAL(10,2) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_email_sent_at DATETIME NULL,
  email_count INT(11) DEFAULT 0 COMMENT 'Number of emails sent',
  status ENUM('pending', 'recovered', 'abandoned') DEFAULT 'pending',
  recovery_token VARCHAR(255) UNIQUE,
  converted_order_id BIGINT(20) NULL COMMENT 'WooCommerce order ID if recovered',
  INDEX idx_email (customer_email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_token (recovery_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notes:
-- session_id: Unique identifier for this cart session
-- customer_email: Email from checkout form
-- cart_data: JSON with product IDs, quantities, prices, bundles
-- email_count: 0 = no emails, 1 = first email (2h), 2 = second (24h), 3+ = reminder (every 3 days)
-- status: 'pending' = not recovered, 'recovered' = order placed, 'abandoned' = stopped sending
-- recovery_token: Unique token for cart recovery link in email
