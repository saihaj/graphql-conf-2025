import { writeFile } from 'node:fs/promises';
import { typeDefs } from '../src/app/api/graphql/route';

async function main() {
  await writeFile('./schema.graphql', typeDefs, 'utf-8');
}

main();
