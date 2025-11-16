import { z } from 'zod';

/**
 * Transforms an object to only include properties defined in a Zod schema
 * @param schema - Zod schema to use for filtering
 * @param obj - Object to transform
 * @param options - Options for transformation
 * @returns Object with only properties defined in the schema
 */
export function transformBySchema<T extends z.ZodTypeAny>(
  schema: T,
  obj: Record<string, any>,
  options: {
    validate?: boolean; // If true, validates the result (throws on invalid)
    stripUnknown?: boolean; // If true, strips unknown properties (default: true)
  } = { validate: false, stripUnknown: true },
): Partial<z.infer<T>> {
  // Get the shape of the schema to extract keys
  if (!(schema instanceof z.ZodObject)) {
    throw new Error('Schema must be a ZodObject');
  }

  const shape = schema.shape;
  const schemaKeys = Object.keys(shape);

  // Pick only the keys that exist in the schema
  const cleaned: Record<string, any> = {};
  for (const key of schemaKeys) {
    if (key in obj) {
      cleaned[key] = obj[key];
    }
  }

  // Optionally validate the result
  if (options.validate) {
    return schema.parse(cleaned);
  }

  return cleaned as Partial<z.infer<T>>;
}

/**
 * Alternative: Use Zod's built-in strip functionality
 * This validates and strips unknown properties in one step
 */
export function transformAndValidate<T extends z.ZodTypeAny>(
  schema: T,
  obj: Record<string, any>,
): z.infer<T> {
  // Use passthrough to allow extra properties, then strip manually
  // Or use parse which will validate and coerce types
  return schema.parse(obj);
}

/**
 * Simple pick function that only extracts schema-defined keys without validation
 * This is the safest option if you just want to clean the object
 */
export function pickBySchema<T extends z.ZodObject<any>>(
  schema: T,
  obj: Record<string, any>,
): Partial<z.infer<T>> {
  const shape = schema.shape;
  const schemaKeys = Object.keys(shape);

  const result: Record<string, any> = {};
  for (const key of schemaKeys) {
    if (key in obj && obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }

  return result as Partial<z.infer<T>>;
}
