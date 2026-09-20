// Minimale xlsx-lezer (zip + SpreadsheetML) zodat de import zonder extra
// dependency draait. Genoeg voor de bol.com artikelimport-export.

import fs from 'node:fs';
import zlib from 'node:zlib';

function readZip(buf) {
  // Zoek het End Of Central Directory record vanaf het einde.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 65558; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('Geen geldig zip/xlsx-bestand');

  const entryCount = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);
  const files = new Map();

  for (let n = 0; n < entryCount; n++) {
    if (buf.readUInt32LE(offset) !== 0x02014b50) break;
    const method = buf.readUInt16LE(offset + 10);
    const compressedSize = buf.readUInt32LE(offset + 20);
    const nameLen = buf.readUInt16LE(offset + 28);
    const extraLen = buf.readUInt16LE(offset + 30);
    const commentLen = buf.readUInt16LE(offset + 32);
    const localOffset = buf.readUInt32LE(offset + 42);
    const name = buf.toString('utf8', offset + 46, offset + 46 + nameLen);

    // Lokale header: naam- en extra-lengte kunnen afwijken van de central directory.
    const lNameLen = buf.readUInt16LE(localOffset + 26);
    const lExtraLen = buf.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + lNameLen + lExtraLen;
    const raw = buf.subarray(dataStart, dataStart + compressedSize);
    files.set(name, method === 0 ? raw : zlib.inflateRawSync(raw));

    offset += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&amp;/g, '&');
}

/** Alle <t>-tekst binnen een fragment samenvoegen. */
function textOf(fragment) {
  const parts = [...fragment.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map(m => decodeEntities(m[1]));
  return parts.join('');
}

function parseSharedStrings(xml) {
  if (!xml) return [];
  return [...xml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map(m => textOf(m[1]));
}

/**
 * Leest het eerste werkblad als array van rij-objecten, met kolomletter als key.
 * @returns {{rowNumber:number, cells:Record<string,string>}[]}
 */
export function readSheet(filePath, sheetPath = 'xl/worksheets/sheet1.xml') {
  const files = readZip(fs.readFileSync(filePath));
  const shared = parseSharedStrings(files.get('xl/sharedStrings.xml')?.toString('utf8'));
  const sheet = files.get(sheetPath)?.toString('utf8');
  if (!sheet) throw new Error(`Werkblad ${sheetPath} niet gevonden in ${filePath}`);

  const rows = [];
  for (const rowMatch of sheet.matchAll(/<row[^>]*\sr="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)) {
    const rowNumber = Number(rowMatch[1]);
    const cells = {};
    for (const cell of rowMatch[2].matchAll(/<c\s[^>]*r="([A-Z]+)\d+"([^>]*)>([\s\S]*?)<\/c>/g)) {
      const col = cell[1];
      const type = (cell[2].match(/\st="([^"]+)"/) || [])[1];
      const inner = cell[3];
      let value = '';
      if (type === 'inlineStr') {
        value = textOf(inner);
      } else {
        const v = (inner.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
        if (v !== undefined) value = type === 's' ? (shared[Number(v)] ?? '') : decodeEntities(v);
      }
      if (value !== '') cells[col] = value.trim();
    }
    if (Object.keys(cells).length) rows.push({ rowNumber, cells });
  }
  return rows;
}
