export type JsonPrimitive = null | boolean | number | string | JsonPrimitive[];

export interface JsonObject {
	[key: string]: JsonPrimitive | JsonObject | JsonObject[];
}

export type JsonValue = JsonPrimitive | JsonObject | JsonObject[];

export type JsonOverrideFunction = (
	key: string,
	original: JsonValue
) => JsonValue;

export type JsonOverrideValue = JsonValue |
	JsonOverrideFunction;

export interface JsonOverrides {
	[key: string]: JsonOverrideValue;
}
