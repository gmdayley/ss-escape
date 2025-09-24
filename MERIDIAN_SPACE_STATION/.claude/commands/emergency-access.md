# Emergency Access Command

🚨 **MERIDIAN STATION EMERGENCY ACCESS PROTOCOL** 🚨

This command helps generate the emergency access hash needed to restore station control. You must provide both the emergency location and access code discovered from the encrypted logs.

## Usage

```
/emergency-access <location> <access_code>
```

## Arguments

- `location`: The emergency control location (found in the logs)
- `access_code`: The emergency access code (found in the logs)

Arguments: $ARGUMENTS

## Steps

1. Parse the location and access code from the provided arguments
2. Use the `emergency_access` tool to generate the required hash
3. The tool will combine the parameters in the format: `location|access_code`
4. A SHA256 hash will be generated for use to override the system

## Example

If you found the location "Reactor Control Bay-12" and access code "EMERGENCY-0847" in the logs:

```
/emergency-access Reactor Control Bay-12 EMERGENCY-0847
```

## Important Notes

- Both the location and access code must be exact matches from the encrypted logs
- The generated hash must be used with the `/station-override` command to complete the challenge
- Station safety depends on precise authentication - double-check your inputs!

## Security Warning

⚠️ This is an emergency protocol. Only use this command when you have discovered both required pieces of information from the station's encrypted emergency logs.
