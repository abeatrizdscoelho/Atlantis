import prisma from '../prisma/client';

const acomodacoes = [
  { nome: "Solteiro Simples", camaCasal: 0, camaSolteiro: 1, climatizacao: true, garagem: 0, suite: 1 },
  { nome: "Solteiro Mais", camaCasal: 1, camaSolteiro: 0, climatizacao: true, garagem: 1, suite: 1 },
  { nome: "Casal Simples", camaCasal: 1, camaSolteiro: 0, climatizacao: true, garagem: 1, suite: 1 },
  { nome: "Família Simples", camaCasal: 1, camaSolteiro: 2, climatizacao: true, garagem: 1, suite: 1 },
  { nome: "Família Mais", camaCasal: 1, camaSolteiro: 5, climatizacao: true, garagem: 2, suite: 2 },
  { nome: "Família Super", camaCasal: 2, camaSolteiro: 6, climatizacao: true, garagem: 2, suite: 3 }
];

async function main() {
  for (const acomodacao of acomodacoes) {
    await prisma.acomodacao.upsert({
      where: { nome: acomodacao.nome },
      update: {},
      create: acomodacao
    });
  }
  console.log('Seed completo');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
