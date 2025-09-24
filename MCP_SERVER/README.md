# 🚀 Space Station Escape Challenge

Welcome aboard the **Meridian Space Station**, Systems Analyst. We have a critical emergency situation that requires your expertise in Model Context Protocol (MCP) development and Claude Code features.

## 🚨 Emergency Briefing

**SITUATION**: The Meridian Space Station is experiencing catastrophic system failures. All critical systems have been encrypted as part of emergency protocols, and only a skilled systems analyst can restore control.

**YOUR MISSION**: Decode encrypted logs, implement cryptographic tools, and discover the emergency override procedures to save the station and its crew.

**TIME LIMIT**: 60 minutes (recommended)

## 🎯 Learning Objectives

By completing this challenge, you will master:

- ✅ **MCP Server Development**: Build and configure HTTP-based MCP servers
- ✅ **Tool Implementation**: Create custom tools for cryptographic operations
- ✅ **Sub-Agent Usage**: Deploy specialized forensics agents for data analysis
- ✅ **Custom Slash Commands**: Develop emergency access commands
- ✅ **Data Analysis**: Correlate information across multiple encrypted sources

## 🛠 Quick Start

### Prerequisites
- Node.js 18+ installed
- Claude Code CLI configured
- Basic TypeScript knowledge

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Start the MCP Server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000` with MCP endpoint at `/mcp`

4. **Connect Claude Code**
   In Claude Code, connect to your local MCP server:
   ```
   http://localhost:3000/mcp
   ```

5. **Begin the Challenge**
   Start by examining the emergency file: `data/ICO_EMERGENCY.txt`

## 🧩 Challenge Overview

### Puzzle 1: Initial Decryption (Base64)
**Objective**: Decode the emergency message to find the encryption key

**Your Task**:
- Examine `data/ICO_EMERGENCY.txt` - this contains a base64 encoded emergency message
- Implement the `base64_decode` tool in `src/tools/base64-decoder.ts`
- Use the tool to decode the message and extract the encryption key

**Hint**: Node.js Buffer class has built-in base64 support

### Puzzle 2: Log Analysis (AES Encryption + Sub-Agent)
**Objective**: Decrypt and analyze emergency logs to find critical information

**Your Tasks**:
1. Implement the `decrypt_string` tool in `src/tools/decryption.ts` (AES-256-CBC)
2. Decrypt all 5 log files in `data/encrypted-logs/`
3. Create and use the forensics sub-agent to analyze the logs
4. Discover the 4 key pieces of information:
   - Emergency location
   - Key personnel
   - Access code
   - Secret command

**Hint**: The logs contain fragments of information that need to be correlated

### Puzzle 3: Emergency Access (Hash Generation + Custom Command)
**Objective**: Generate the final access hash and restore station control

**Your Tasks**:
1. Implement the `generate_hash` tool in `src/tools/hash-generator.ts` (SHA256)
2. Use the custom `/emergency-access` slash command with discovered location and code
3. Generate the emergency access hash
4. Use the secret `/station-override` command with the hash to complete the challenge

## 🔧 Technical Implementation Guide

### MCP Server Architecture
The server (`src/index.ts`) uses:
- **Transport**: HTTP with Express.js on port 3000
- **Tools**: 4 cryptographic and utility tools
- **Prompts**: 1 secret validation prompt (`station-override`)

### Tool Implementation Requirements

**base64-decoder.ts**:
```typescript
export async function decodeBase64(encodedText: string): Promise<string> {
  // TODO: Implement using Buffer.from(encodedText, 'base64').toString('utf8')
}
```

**decryption.ts**:
```typescript
export async function decryptString(encryptedText: string, key: string): Promise<string> {
  // TODO: Implement AES-256-CBC decryption
  // Format: IV (32 hex chars) + encrypted data (remaining hex chars)
}
```

**hash-generator.ts**:
```typescript
export async function generateHash(input: string): Promise<string> {
  // TODO: Implement SHA256 hash generation
}
```

### Sub-Agent Configuration
The forensics agent (`.claude/agents/forensics-agent.md`) specializes in:
- Cross-referencing multiple log files
- Pattern recognition in encrypted data
- Personnel and location correlation
- Emergency protocol analysis

### Custom Slash Command
The `/emergency-access` command (`.claude/commands/emergency-access.md`):
- Takes location and access code parameters
- Generates SHA256 hash in format: `location|access_code`
- Prepares hash for final validation

## 📁 Project Structure

```
space-station-escape/
├── README.md                    # This file
├── CLAUDE.md                    # Assistant behavior instructions
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── .claude/
│   ├── commands/
│   │   └── emergency-access.md # Custom slash command
│   └── agents/
│       └── forensics-agent.md  # Sub-agent configuration
├── src/
│   ├── index.ts                # Main MCP server
│   └── tools/
│       ├── base64-decoder.ts   # Base64 decode (implement this!)
│       ├── decryption.ts       # AES-256-CBC decrypt (implement this!)
│       └── hash-generator.ts   # SHA256 hash (implement this!)
├── data/
│   ├── ICO_EMERGENCY.txt       # Base64 encoded starting clue
│   └── encrypted-logs/         # 5 encrypted log files
│       ├── system-01.enc
│       ├── security-02.enc
│       ├── personnel-03.enc
│       ├── maintenance-04.enc
│       └── emergency-05.enc
└── build/                      # Compiled output
```

## 🎮 Challenge Walkthrough

### Step 1: Setup and Initial Investigation
1. Install dependencies and start the MCP server
2. Connect Claude Code to `http://localhost:3000/mcp`
3. Examine the `data/ICO_EMERGENCY.txt` file
4. Notice it contains base64 encoded data

### Step 2: Implement Base64 Decoder
1. Open `src/tools/base64-decoder.ts`
2. Implement the `decodeBase64` function
3. Use the MCP tool to decode the emergency message
4. Extract the encryption key: `NOVA-PRIME-7742`

### Step 3: Implement AES Decryption
1. Open `src/tools/decryption.ts`
2. Implement AES-256-CBC decryption
3. Decrypt all 5 log files using the discovered key
4. Read through all the decrypted content

### Step 4: Deploy Forensics Sub-Agent
1. Create a forensics agent instance
2. Ask the agent to analyze all decrypted logs
3. Look for patterns and correlations across logs
4. Identify the 4 key pieces of information

### Step 5: Generate Emergency Access Hash
1. Open `src/tools/hash-generator.ts`
2. Implement SHA256 hash generation
3. Use the `/emergency-access` command with location and access code
4. Generate the final access hash

### Step 6: Station Override
1. Use the secret `/station-override` command
2. Provide the generated hash for validation
3. Restore station control and complete the challenge!

## 🔍 Troubleshooting

**Server won't start?**
- Check that port 3000 is available
- Ensure all dependencies are installed with `npm install`
- Try `npm run clean && npm run build` to rebuild

**Tools returning errors?**
- This is expected! The tool stubs throw errors until you implement them
- Each error message provides hints about what needs to be implemented

**Can't connect Claude Code to MCP server?**
- Verify the server is running on `http://localhost:3000`
- Use the exact endpoint: `http://localhost:3000/mcp`
- Check server logs for any error messages

**Decryption failing?**
- Ensure you're using the correct key from the decoded base64 message
- Remember: encrypted data format is IV (32 hex chars) + encrypted data
- AES-256-CBC requires proper key derivation with SHA256

## 🏆 Success Criteria

Challenge complete when you achieve:
- ✅ Base64 message decoded and encryption key extracted
- ✅ AES-256-CBC decryption tool working properly
- ✅ All 5 emergency logs successfully decrypted
- ✅ Forensics sub-agent successfully analyzing log patterns
- ✅ All 4 critical pieces of information discovered
- ✅ Custom `/emergency-access` slash command implemented
- ✅ SHA256 hash generation working correctly
- ✅ Final `/station-override` validation successful

**Victory Message**: "🚀 STATION CONTROL RESTORED! Emergency systems back online. Well done, Systems Analyst!"

## 📚 Additional Resources

- [MCP SDK Documentation](https://modelcontextprotocol.io)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Node.js Crypto Module](https://nodejs.org/api/crypto.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🚨 Need Help?

If you're stuck, check the `CLAUDE.md` file for guidance on how Claude can assist you. The assistant is configured to provide hints and conceptual help without giving away the solutions.

Remember: The fate of the Meridian Space Station and its crew depends on your systems analysis skills. Good luck, Systems Analyst!

---

*This challenge was designed to teach MCP development and Claude Code features through an engaging narrative. The encryption and security elements are for educational purposes only.*