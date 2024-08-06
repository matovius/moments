/**
 * The stored time value in milliseconds since midnight, January 1, 1970 UTC.
 */
export type Timestamp = number;
/**
 * An array of tag strings shared by all entries.
 */
export type Tags = string[];
/**
 * A single entry in a journal.
 * Contains text, a timestamp, optional tags, and an optional footnote.
 */
export type Entry = {
	text: string;
	timestamp: Timestamp;
	tags?: Tags;
	footnote?: string;
};

/**
 * A single changelog post with the content of the post, the title,
 * the description, and the publishing date
 */
export type ChangelogPost = {
	content: any;
	title: string;
	description: string;
	date: string;
};

export interface FullChangelogPost {
	meta: ChangelogPost;
	path: string;
}
