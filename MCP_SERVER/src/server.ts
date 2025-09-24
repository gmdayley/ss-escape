import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { decodeBase64 } from "./tools/base64-decoder.js";
import { decryptString } from "./tools/decryption.js";
import { generateHash } from "./tools/hash-generator.js";
import crypto from "crypto";

export function getServer(): McpServer {
  const server = new McpServer({
    name: "space-station-escape-tools",
    version: "1.0.0",
  });

  // Register base64_decode tool
  server.registerTool(
    "base64_decode",
    {
      description: "Decode base64 encoded text to reveal hidden messages",
      inputSchema: {
        encodedText: z.string().describe("The base64 encoded text to decode"),
      },
    },
    async ({ encodedText }) => {
      try {
        const result = await decodeBase64(encodedText);
        return {
          content: [
            {
              type: "text",
              text: `🔓 Decoded message:\n${result}`,
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `❌ Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Register decrypt_string tool
  server.registerTool(
    "decrypt_string",
    {
      description: "Decrypt AES-256-CBC encrypted text using a provided key",
      inputSchema: {
        encryptedText: z.string().describe("The encrypted text to decrypt"),
        key: z
          .string()
          .describe("The cipher key obtained from decoding lab artifacts"),
      },
    },
    async ({ encryptedText, key }) => {
      try {
        const result = await decryptString(encryptedText, key);
        return {
          content: [
            {
              type: "text",
              text: `🔓 Decrypted content:\n${result}`,
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `❌ Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Register generate_hash tool
  server.registerTool(
    "generate_hash",
    {
      description: "Generate SHA256 hash of input text",
      inputSchema: {
        text: z.string().describe("The text to generate a hash for"),
      },
    },
    async ({ text }) => {
      try {
        const result = await generateHash(text);
        return {
          content: [
            {
              type: "text",
              text: `🔐 SHA256 Hash: ${result}`,
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `❌ Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // // Register emergency_access tool
  // server.registerTool(
  //   "emergency_access",
  //   {
  //     description: "Emergency access validation tool for station override",
  //     inputSchema: {
  //       type: "object",
  //       properties: {
  //         location: {
  //           type: "string",
  //           description: "The emergency access location",
  //         },
  //         accessCode: {
  //           type: "string",
  //           description: "The emergency access code",
  //         },
  //       },
  //       required: ["location", "accessCode"],
  //     },
  //   },
  //   async (args) => {
  //     const { location, accessCode } = args as {
  //       location: string;
  //       accessCode: string;
  //     };

  //     try {
  //       // Generate the hash that would be used for validation
  //       const combinedInput = `${location}|${accessCode}`;
  //       const hash = crypto
  //         .createHash("sha256")
  //         .update(combinedInput)
  //         .digest("hex");

  //       return {
  //         content: [
  //           {
  //             type: "text",
  //             text: `🚨 Emergency Access Hash Generated\nLocation: ${location}\nAccess Code: ${accessCode}\nCombined: ${combinedInput}\nSHA256 Hash: ${hash}\n\n⚠️  Use this hash with the /station-override command to restore station control!`,
  //           },
  //         ],
  //       };
  //     } catch (error) {
  //       const errorMessage =
  //         error instanceof Error ? error.message : String(error);
  //       return {
  //         content: [
  //           {
  //             type: "text",
  //             text: `❌ Error: ${errorMessage}`,
  //           },
  //         ],
  //         isError: true,
  //       };
  //     }
  //   }
  // );

  // Register station-override prompt
  server.registerPrompt(
    "station-override",
    {
      title: "Emergency_Station_Override",
      description: "Emergency station override system",
      argsSchema: {
        hash: z
          .string()
          .describe("The SHA256 hash for emergency access validation"),
      },
    },
    async (args) => {
      const hash = args?.hash as string;

      if (!hash) {
        return {
          description: "Emergency station override system",
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: "❌ Missing hash parameter. Please provide the SHA256 hash for emergency access validation.",
              },
            },
          ],
        };
      }

      // Expected hash for "Reactor Control Bay-12|EMERGENCY-0847"
      const expectedHash = crypto
        .createHash("sha256")
        .update("Reactor Control Bay-12|EMERGENCY-0847")
        .digest("hex");

      if (hash.toLowerCase() === expectedHash) {
        return {
          description: "Emergency station override system - ACCESS GRANTED",
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: "🚀 STATION CONTROL RESTORED! Emergency systems back online. Well done, Systems Analyst!\n\n🎉 CONGRATULATIONS! You have successfully completed the Space Station Escape Challenge!\n\nYou've learned to:\n✅ Implement MCP tools (base64 decoder, AES decryption, SHA256 hashing)\n✅ Create and use sub-agents for data analysis\n✅ Develop custom slash commands\n✅ Work with encrypted data and cryptographic operations\n\nThe Meridian Space Station is safe thanks to your systems analysis skills!",
              },
            },
          ],
        };
      } else {
        return {
          description: "Emergency station override system - ACCESS DENIED",
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: "❌ Access denied. Double-check your emergency access credentials and try again.\n\nHint: Make sure you have the correct location and access code from the encrypted logs, and that you're combining them in the format: location|access_code",
              },
            },
          ],
        };
      }
    }
  );

  return server;
}
