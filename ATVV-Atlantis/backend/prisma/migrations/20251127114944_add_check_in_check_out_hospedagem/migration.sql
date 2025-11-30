-- AlterTable
ALTER TABLE `hospedagem` ADD COLUMN `dataCheckIn` DATETIME(3) NULL,
    ADD COLUMN `dataCheckOut` DATETIME(3) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Pendente';
