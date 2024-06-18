/**
 * The stored time value in milliseconds since midnight, January 1, 1970 UTC.
 */
export type Timestamp = number;
/**
 * An array of tag strings shared by all moments.
 */
export type Tags = string[];

export type Moment = {
	text: string;
	timestamp: Timestamp;
	tags?: Tags;
	footnote?: string;
};
