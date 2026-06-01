export interface CompiledTemplate {
  name: string;
  source: string;
  variables: string[];
  render: (data: Record<string, unknown>) => string;
}

const templateCache = new Map<string, CompiledTemplate>();

/**
 * Render a template string with variable substitution.
 * Supports {{variable}}, {{variable | default}}, and {{#if variable}}...{{/if}} blocks.
 */
export function renderTemplate(
  template: string,
  data: Record<string, unknown>
): string {
  let result = template;

  // Handle conditional blocks: {{#if variable}}content{{/if}}
  result = result.replace(
    /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_match, variable: string, content: string) => {
      const value = resolveValue(variable, data);
      return value ? content : '';
    }
  );

  // Handle conditional blocks with else: {{#if variable}}content{{else}}alternative{{/if}}
  result = result.replace(
    /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_match, variable: string, ifContent: string, elseContent: string) => {
      const value = resolveValue(variable, data);
      return value ? ifContent : elseContent;
    }
  );

  // Handle {{#each array}}...{{/each}} loops
  result = result.replace(
    /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (_match, variable: string, itemTemplate: string) => {
      const arr = resolveValue(variable, data);
      if (!Array.isArray(arr)) return '';
      return arr
        .map((item, index) => {
          let rendered = itemTemplate;
          if (typeof item === 'object' && item !== null) {
            for (const [key, val] of Object.entries(item)) {
              rendered = rendered.replace(
                new RegExp(`\\{\\{${key}\\}\\}`, 'g'),
                String(val ?? '')
              );
            }
          }
          rendered = rendered.replace(/\{\{@index\}\}/g, String(index));
          rendered = rendered.replace(/\{\{this\}\}/g, String(item));
          return rendered;
        })
        .join('');
    }
  );

  // Handle variables with defaults: {{variable | default}}
  result = result.replace(
    /\{\{\s*(\w+(?:\.\w+)*)\s*\|\s*([^}]+)\s*\}\}/g,
    (_match, path: string, defaultValue: string) => {
      const value = resolveValue(path, data);
      return value !== undefined && value !== null && value !== ''
        ? String(value)
        : defaultValue.trim();
    }
  );

  // Handle simple variables: {{variable}}
  result = result.replace(
    /\{\{\s*(\w+(?:\.\w+)*)\s*\}\}/g,
    (_match, path: string) => {
      const value = resolveValue(path, data);
      return value !== undefined && value !== null ? String(value) : '';
    }
  );

  return result;
}

/**
 * Compile a template for repeated use, extracting variable names and creating a cached render function.
 */
export function compileTemplate(
  name: string,
  source: string
): CompiledTemplate {
  const variablePattern = /\{\{\s*(\w+(?:\.\w+)*)\s*(?:\|[^}]*)?\}\}/g;
  const variables = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = variablePattern.exec(source)) !== null) {
    variables.add(match[1]);
  }

  const compiled: CompiledTemplate = {
    name,
    source,
    variables: Array.from(variables),
    render: (data: Record<string, unknown>) => renderTemplate(source, data),
  };

  templateCache.set(name, compiled);
  return compiled;
}

export function getCompiledTemplate(name: string): CompiledTemplate | undefined {
  return templateCache.get(name);
}

export function listTemplates(): string[] {
  return Array.from(templateCache.keys());
}

export function clearTemplateCache(): void {
  templateCache.clear();
}

function resolveValue(path: string, data: Record<string, unknown>): unknown {
  const parts = path.split('.');
  let current: unknown = data;

  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}
