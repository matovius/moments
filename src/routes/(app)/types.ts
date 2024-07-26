/**
 * The stored time value in milliseconds since midnight, January 1, 1970 UTC.
 */
export type Timestamp = number;
/**
 * An array of tag strings shared by all moments.
 */
export type Tags = string[];
/**
 * A single entry in a journal.
 * Contains text, a timestamp, optional tags, and an optional footnote.
 */
export type Moment = {
	text: string;
	timestamp: Timestamp;
	tags?: Tags;
	footnote?: string;
};
