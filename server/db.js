import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

export async function readData(fileName) {
  try {
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}.json:`, error.message);
    return null;
  }
}

export async function writeData(fileName, data) {
  try {
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${fileName}.json:`, error.message);
    return false;
  }
}
