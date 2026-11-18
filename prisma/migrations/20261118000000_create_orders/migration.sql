CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference` VARCHAR(64) NOT NULL,
    `customer` VARCHAR(191) NOT NULL,
    `city` VARCHAR(120) NOT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'processing',
    `total` DECIMAL(12, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `orders_reference_key`(`reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
