import LZString from 'lz-string';

export function encodeSketchToURL(sketchData: any): string {
  const json = JSON.stringify(sketchData);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return `${window.location.origin}/editor#sketch=${compressed}`;
}

export function decodeSketchFromURL(hash: string): any | null {
  try {
    const match = hash.match(/sketch=(.+)/);
    if (!match) return null;
    const json = LZString.decompressFromEncodedURIComponent(match[1]);
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getShareableURL(sketchData: any): string {
  return encodeSketchToURL(sketchData);
}

export function getDrawURL(sketchData: any): string {
  const json = JSON.stringify(sketchData);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return `${window.location.origin}/draw#sketch=${compressed}`;
}
