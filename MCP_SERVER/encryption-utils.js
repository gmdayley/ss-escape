/**
 * Encryption/Decryption utilities for Space Station Escape Challenge
 *
 * This script contains the encryption functions used to generate the challenge files
 * and the corresponding decryption functions that users need to implement.
 */

const crypto = require('crypto');

// The encryption key revealed in the base64 decoded message
const ENCRYPTION_KEY = 'NOVA-PRIME-7742';

/**
 * Encrypts text using AES-256-CBC
 * This function was used to generate the .enc files in data/encrypted-logs/
 */
function encryptText(plaintext, key = ENCRYPTION_KEY) {
  // Create a 256-bit key from the provided key string
  const keyBuffer = crypto.createHash('sha256').update(key).digest();

  // Generate a random 16-byte initialization vector
  const iv = crypto.randomBytes(16);

  // Create cipher
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);

  // Encrypt the text
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return IV + encrypted data as hex string
  // Format: IV (32 hex chars) + encrypted data
  return iv.toString('hex') + encrypted;
}

/**
 * Decrypts text using AES-256-CBC
 * This is what users need to implement in src/tools/decryption.ts
 */
function decryptText(encryptedHex, key = ENCRYPTION_KEY) {
  try {
    // Create a 256-bit key from the provided key string
    const keyBuffer = crypto.createHash('sha256').update(key).digest();

    // Extract IV from first 32 hex characters (16 bytes)
    const ivHex = encryptedHex.substring(0, 32);
    const iv = Buffer.from(ivHex, 'hex');

    // Extract encrypted data from remaining hex characters
    const encryptedDataHex = encryptedHex.substring(32);

    // Create decipher
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);

    // Decrypt the data
    let decrypted = decipher.update(encryptedDataHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

/**
 * Generates base64 encoded text
 * Used for the ICO_EMERGENCY.txt file
 */
function encodeBase64(text) {
  return Buffer.from(text, 'utf8').toString('base64');
}

/**
 * Decodes base64 encoded text
 * This is what users need to implement in src/tools/base64-decoder.ts
 */
function decodeBase64(encodedText) {
  return Buffer.from(encodedText, 'base64').toString('utf8');
}

/**
 * Generates SHA256 hash
 * This is what users need to implement in src/tools/hash-generator.ts
 */
function generateSHA256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

// Export functions for use in other scripts
module.exports = {
  encryptText,
  decryptText,
  encodeBase64,
  decodeBase64,
  generateSHA256,
  ENCRYPTION_KEY
};

// Demo/Test section - only runs when script is executed directly
if (require.main === module) {
  console.log('🔐 Space Station Escape - Encryption Utils Demo\n');

  // Test the base64 encoding/decoding
  const originalMessage = `MERIDIAN STATION EMERGENCY LOG - ENCRYPTION KEY: ${ENCRYPTION_KEY}
Dr. Elena Vasquez, Chief Engineer, initiated emergency protocols.
All critical systems encrypted. Locate the Emergency Override Terminal.
Access the encrypted logs in /data/encrypted-logs/ for more information.`;

  console.log('1. Base64 Encoding/Decoding Test:');
  const encoded = encodeBase64(originalMessage);
  console.log('Encoded:', encoded);
  const decoded = decodeBase64(encoded);
  console.log('Decoded:', decoded);
  console.log('Match:', originalMessage === decoded ? '✅' : '❌');
  console.log();

  // Test the AES encryption/decryption
  console.log('2. AES-256-CBC Encryption/Decryption Test:');
  const testLog = `MERIDIAN STATION - TEST LOG
TIMESTAMP: 2387.156.12:00:00
This is a test of the encryption system.
Location: Reactor Control Bay-12
Access Code: EMERGENCY-0847
END LOG`;

  const encrypted = encryptText(testLog);
  console.log('Encrypted (hex):', encrypted);
  const decrypted = decryptText(encrypted);
  console.log('Decrypted:', decrypted);
  console.log('Match:', testLog === decrypted ? '✅' : '❌');
  console.log();

  // Test SHA256 hash generation
  console.log('3. SHA256 Hash Generation Test:');
  const testInput = 'Reactor Control Bay-12|EMERGENCY-0847';
  const hash = generateSHA256(testInput);
  console.log('Input:', testInput);
  console.log('SHA256 Hash:', hash);
  console.log();

  console.log('🚀 All encryption utilities working correctly!');
  console.log('\nNote: Users need to implement these functions in their MCP tools:');
  console.log('- src/tools/base64-decoder.ts → decodeBase64()');
  console.log('- src/tools/decryption.ts → decryptString()');
  console.log('- src/tools/hash-generator.ts → generateHash()');
}