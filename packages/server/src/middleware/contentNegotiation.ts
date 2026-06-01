import { Request, Response, NextFunction } from 'express';

type SupportedFormat = 'json' | 'xml' | 'csv' | 'text';

interface ContentNegotiationOptions {
  defaultFormat: SupportedFormat;
  supportedFormats: SupportedFormat[];
}

const formatMimeTypes: Record<SupportedFormat, string> = {
  json: 'application/json',
  xml: 'application/xml',
  csv: 'text/csv',
  text: 'text/plain',
};

const mimeToFormat: Record<string, SupportedFormat> = {
  'application/json': 'json',
  'text/json': 'json',
  'application/xml': 'xml',
  'text/xml': 'xml',
  'text/csv': 'csv',
  'text/plain': 'text',
};

function parseAcceptHeader(accept: string): string[] {
  return accept
    .split(',')
    .map((part) => {
      const [mimeType, ...params] = part.trim().split(';');
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const quality = qParam ? parseFloat(qParam.trim().split('=')[1]) : 1.0;
      return { mimeType: mimeType.trim(), quality };
    })
    .sort((a, b) => b.quality - a.quality)
    .map((entry) => entry.mimeType);
}

export function contentNegotiation(options?: Partial<ContentNegotiationOptions>) {
  const config: ContentNegotiationOptions = {
    defaultFormat: options?.defaultFormat || 'json',
    supportedFormats: options?.supportedFormats || ['json', 'xml', 'csv', 'text'],
  };

  return (req: Request, res: Response, next: NextFunction): void => {
    // Check explicit query param first
    const formatParam = req.query.format as string | undefined;
    if (formatParam) {
      const format = formatParam.toLowerCase() as SupportedFormat;
      if (config.supportedFormats.includes(format)) {
        (req as any).responseFormat = format;
        res.setHeader('Content-Type', formatMimeTypes[format]);
        next();
        return;
      }
    }

    // Parse Accept header
    const acceptHeader = req.headers.accept || '*/*';
    const preferredTypes = parseAcceptHeader(acceptHeader);

    let selectedFormat: SupportedFormat = config.defaultFormat;

    for (const mimeType of preferredTypes) {
      if (mimeType === '*/*') {
        selectedFormat = config.defaultFormat;
        break;
      }

      const format = mimeToFormat[mimeType];
      if (format && config.supportedFormats.includes(format)) {
        selectedFormat = format;
        break;
      }
    }

    (req as any).responseFormat = selectedFormat;
    res.setHeader('Content-Type', formatMimeTypes[selectedFormat]);
    res.setHeader(
      'X-Supported-Formats',
      config.supportedFormats.map((f) => formatMimeTypes[f]).join(', ')
    );

    next();
  };
}

export default contentNegotiation;
