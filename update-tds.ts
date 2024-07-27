import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

// Lê o caminho absoluto para o arquivo data.json
const file = path.resolve(__dirname, 'data.json');
console.log(`Caminho para o arquivo data.json: ${file}`);

if (!fs.existsSync(file)) {
  console.error(`O arquivo ${file} não foi encontrado.`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

// Atualiza cada item com um novo UUID
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatedData = data.map((item: any) => ({
  ...item,
  id: uuidv4(), // Gera um UUID para o campo id
}));

// Salva o arquivo atualizado
fs.writeFileSync(file, JSON.stringify(updatedData, null, 2), 'utf-8');

console.log('IDs atualizados com sucesso!');
