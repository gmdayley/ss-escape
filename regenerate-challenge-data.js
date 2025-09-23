/**
 * Regenerate Challenge Data Script
 *
 * This script regenerates all the encrypted challenge files using the encryption utilities.
 * Run this if you need to recreate the challenge data with different content or keys.
 */

const fs = require('fs');
const path = require('path');
const { encryptText, encodeBase64, ENCRYPTION_KEY } = require('./encryption-utils');

// Ensure data directories exist
const dataDir = path.join(__dirname, 'data');
const encryptedLogsDir = path.join(dataDir, 'encrypted-logs');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
if (!fs.existsSync(encryptedLogsDir)) {
  fs.mkdirSync(encryptedLogsDir);
}

// Base64 emergency message content
const emergencyMessage = `MERIDIAN STATION EMERGENCY LOG - ENCRYPTION KEY: ${ENCRYPTION_KEY}
Dr. Elena Vasquez, Chief Engineer, initiated emergency protocols.
All critical systems encrypted. Locate the Emergency Override Terminal.
Access the encrypted logs in /data/encrypted-logs/ for more information.`;

// Log file contents that will be encrypted
const logContents = {
  'system-01.enc': `MERIDIAN STATION - SYSTEM LOG 01
TIMESTAMP: 2387.156.12:15:33
CLASSIFICATION: RESTRICTED

Primary systems diagnostic report initiated by Dr. Elena Vasquez.
Station operating at 67% efficiency due to cascade failure in sector 7.

CRITICAL ALERT: Emergency protocols activated.
Location: Reactor Control Bay-12 has been sealed for safety.
All personnel evacuated from affected areas.

System backup procedures initialized.
Core temperature: 2,347°C (WITHIN SAFE PARAMETERS)
Radiation shielding: ACTIVE

Station Administrator: Dr. Marcus Chen
Chief Engineer: Dr. Elena Vasquez

END LOG`,

  'security-02.enc': `MERIDIAN STATION - SECURITY LOG 02
TIMESTAMP: 2387.156.13:22:18
CLASSIFICATION: CONFIDENTIAL

Security breach detected in maintenance tunnel C-7.
Investigation reveals sabotage attempt on primary systems.

PERSONNEL ALERT:
Dr. Elena Vasquez reported suspicious activity near reactor access.
Security team deployed to investigate.

Lockdown procedures initiated for non-essential areas.
Emergency access restricted to authorized personnel only.
Station security level: YELLOW (ELEVATED)

All crew members accounted for except technician Rodriguez (off-duty).
Station security chief: Commander Sarah Mitchell

END LOG`,

  'personnel-03.enc': `MERIDIAN STATION - PERSONNEL LOG 03
TIMESTAMP: 2387.156.13:45:07
CLASSIFICATION: INTERNAL

Crew Status Report - Emergency Response Team Active

Current station complement: 47 personnel
Emergency response team: 12 members
Medical staff on standby: 4 personnel

KEY PERSONNEL STATUS:
- Dr. Elena Vasquez: Leading emergency response (Reactor Control Bay-12)
- Dr. Marcus Chen: Coordinating evacuation procedures
- Commander Sarah Mitchell: Security operations
- Chief Medical Officer Dr. Park: Medical bay operations

All personnel instructed to remain in designated safe zones.
Station evacuation pods prepared as contingency measure.

Morale remains high despite emergency conditions.
Crew confidence in Dr. Vasquez's leadership is excellent.

END LOG`,

  'maintenance-04.enc': `MERIDIAN STATION - MAINTENANCE LOG 04
TIMESTAMP: 2387.156.14:12:41
CLASSIFICATION: TECHNICAL

Emergency maintenance procedures activated station-wide.
Primary focus: Life support and reactor containment systems.

MAINTENANCE PRIORITIES:
1. Reactor cooling system integrity check - COMPLETED
2. Emergency power grid stabilization - IN PROGRESS
3. Communication array diagnostics - PENDING

Emergency Access Override System Status:
Access Code: EMERGENCY-0847
System Status: STANDBY
Authorization Level: CHIEF ENGINEER ONLY

Automated repair drones deployed to affected sectors.
Estimated repair time: 6-8 hours for full restoration.

Engineering Team Lead: Dr. Elena Vasquez
Backup Systems: FULLY OPERATIONAL

END LOG`,

  'emergency-05.enc': `MERIDIAN STATION - EMERGENCY LOG 05
TIMESTAMP: 2387.156.14:42:07
CLASSIFICATION: ULTRA-SECURE

Dr. Elena Vasquez - Chief Engineer Status Update:
All emergency protocols now active. Station control transferred to Reactor Control Bay-12.

CRITICAL: Emergency override accessible only through secure command interface.
Command Protocol: /station-override
Authentication: Requires SHA256 hash verification
Format: [LOCATION]|[ACCESS_CODE]

If you're reading this, the station's automated systems should guide you.
Remember: The hash must be exact. Station safety depends on it.

FINAL NOTE: Trust the process. The encryption was designed to test our emergency response capabilities. Follow the protocols exactly as designed.

Dr. Elena Vasquez, Chief Engineer
Meridian Space Station

END LOG`
};

console.log('🔐 Regenerating Space Station Escape Challenge Data...\n');

// Generate base64 encoded emergency file
console.log('1. Generating ICO_EMERGENCY.txt (base64 encoded)...');
const encodedEmergency = encodeBase64(emergencyMessage);
fs.writeFileSync(path.join(dataDir, 'ICO_EMERGENCY.txt'), encodedEmergency);
console.log('   ✅ ICO_EMERGENCY.txt created');

// Generate encrypted log files
console.log('\n2. Generating encrypted log files...');
Object.entries(logContents).forEach(([filename, content]) => {
  const encrypted = encryptText(content);
  fs.writeFileSync(path.join(encryptedLogsDir, filename), encrypted);
  console.log(`   ✅ ${filename} created`);
});


console.log('\n🔑 Key Information:');
console.log(`- Encryption Key: ${ENCRYPTION_KEY}`);
console.log('- Algorithm: AES-256-CBC');
console.log('- Format: IV (32 hex chars) + encrypted data');
console.log('- Expected Solution: "Reactor Control Bay-12|EMERGENCY-0847"');

console.log('\n⚠️  Remember to test the challenge flow after regeneration!');