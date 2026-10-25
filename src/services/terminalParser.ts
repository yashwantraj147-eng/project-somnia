import { CommandToken, ParsedCommand } from '../types/terminal';

export class TerminalParser {
  public static tokenize(input: string): CommandToken[] {
    const tokens: CommandToken[] = [];
    let i = 0;
    const len = input.length;

    while (i < len) {
      const char = input[i];

      // Skip whitespace
      if (/\s/.test(char)) {
        i++;
        continue;
      }

      // Pipe operator
      if (char === '|') {
        tokens.push({ type: 'pipe', value: '|' });
        i++;
        continue;
      }

      // Redirection operator
      if (char === '>') {
        tokens.push({ type: 'redirect', value: '>' });
        i++;
        continue;
      }

      // Quoted string
      if (char === '"' || char === "'") {
        const quoteType = char;
        let str = '';
        i++; // skip opening quote
        while (i < len && input[i] !== quoteType) {
          if (input[i] === '\\' && i + 1 < len) {
            i++;
            str += input[i];
          } else {
            str += input[i];
          }
          i++;
        }
        i++; // skip closing quote
        tokens.push({ type: 'string', value: str });
        continue;
      }

      // Flag (e.g. -l, -la, --help)
      if (char === '-' && i + 1 < len && !/\s/.test(input[i + 1])) {
        let flag = '';
        while (i < len && !/\s/.test(input[i]) && input[i] !== '|' && input[i] !== '>') {
          flag += input[i];
          i++;
        }
        tokens.push({ type: 'flag', value: flag });
        continue;
      }

      // Normal word
      let word = '';
      while (i < len && !/\s/.test(input[i]) && input[i] !== '|' && input[i] !== '>' && input[i] !== '"' && input[i] !== "'") {
        word += input[i];
        i++;
      }
      if (word.length > 0) {
        tokens.push({ type: 'word', value: word });
      }
    }

    return tokens;
  }

  public static parse(input: string): ParsedCommand {
    const rawTrimmed = input.trim();
    if (!rawTrimmed) {
      return {
        command: '',
        args: [],
        flags: {},
        rawInput: input,
      };
    }

    const tokens = this.tokenize(rawTrimmed);
    if (tokens.length === 0) {
      return { command: '', args: [], flags: {}, rawInput: input };
    }

    return this.parseTokenStream(tokens, input);
  }

  private static parseTokenStream(tokens: CommandToken[], rawInput: string): ParsedCommand {
    // Check for pipe
    const pipeIndex = tokens.findIndex(t => t.type === 'pipe');
    let currentTokens = tokens;
    let pipedTokens: CommandToken[] | null = null;

    if (pipeIndex !== -1) {
      currentTokens = tokens.slice(0, pipeIndex);
      pipedTokens = tokens.slice(pipeIndex + 1);
    }

    // Check for redirect
    let redirectTo: string | undefined = undefined;
    const redirectIndex = currentTokens.findIndex(t => t.type === 'redirect');
    if (redirectIndex !== -1 && redirectIndex + 1 < currentTokens.length) {
      redirectTo = currentTokens[redirectIndex + 1].value;
      currentTokens = currentTokens.slice(0, redirectIndex);
    }

    if (currentTokens.length === 0) {
      return { command: '', args: [], flags: {}, rawInput };
    }

    const command = currentTokens[0].value.toLowerCase();
    const args: string[] = [];
    const flags: Record<string, boolean | string> = {};

    for (let i = 1; i < currentTokens.length; i++) {
      const token = currentTokens[i];
      if (token.type === 'flag') {
        const flagVal = token.value;
        if (flagVal.startsWith('--')) {
          const key = flagVal.slice(2);
          if (key.includes('=')) {
            const [k, v] = key.split('=');
            flags[k] = v;
          } else {
            flags[key] = true;
          }
        } else if (flagVal.startsWith('-')) {
          // single dash flags (e.g. -l, -la, -k key)
          const chars = flagVal.slice(1);
          if (chars.length === 1 && i + 1 < currentTokens.length && currentTokens[i + 1].type !== 'flag' && currentTokens[i + 1].type !== 'pipe') {
            // e.g. -k secret_value
            flags[chars] = currentTokens[i + 1].value;
            i++;
          } else {
            // separate each char (e.g. -la -> l: true, a: true)
            for (const ch of chars) {
              flags[ch] = true;
            }
          }
        }
      } else {
        args.push(token.value);
      }
    }

    const result: ParsedCommand = {
      command,
      args,
      flags,
      redirectTo,
      rawInput,
    };

    if (pipedTokens && pipedTokens.length > 0) {
      result.pipeTo = this.parseTokenStream(pipedTokens, rawInput);
    }

    return result;
  }
}
