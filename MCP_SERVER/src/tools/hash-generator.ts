/**
 * SHA256 hash generator tool for the Space Station Escape Challenge
 *
 * Users need to implement this function to generate the final access hash.
 * This hash combines the location and access code discovered in the logs.
 *
 * Format: location|access_code (pipe character as separator)
 */

import crypto from "crypto";

export async function generateHash(input: string): Promise<string> {
  // TODO: Implement SHA256 hash generation
  // Hint: Use crypto.createHash('sha256').update(input).digest('hex')

  throw new Error("🚨 Hash generator not implemented - use SHA256 to create the emergency access hash!");
}