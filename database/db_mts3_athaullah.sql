-- Struktur database UKK untuk impor setelah clone proyek.
-- Akun admin dibuat terpisah dengan `npm run db:seed`.
CREATE DATABASE IF NOT EXISTS `db_mts3_athaullah`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE `db_mts3_athaullah`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(32) NOT NULL DEFAULT 'admin',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE INDEX `users_email_key` (`email`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `reference` VARCHAR(64) NOT NULL,
  `customer` VARCHAR(191) NOT NULL,
  `city` VARCHAR(120) NOT NULL,
  `status` VARCHAR(32) NOT NULL DEFAULT 'processing',
  `total` DECIMAL(12, 2) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  UNIQUE INDEX `orders_reference_key` (`reference`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `products` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `category` VARCHAR(120) NOT NULL,
  `stock` INTEGER NOT NULL DEFAULT 0,
  `price` DECIMAL(12, 2) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

