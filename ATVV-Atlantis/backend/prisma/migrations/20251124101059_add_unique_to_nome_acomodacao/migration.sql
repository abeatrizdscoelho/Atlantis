/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Acomodacao` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Acomodacao_nome_key` ON `Acomodacao`(`nome`);
