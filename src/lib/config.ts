export const lookupKeys = ['pro_monthly', 'pro_yearly'] as const;

export const productNames = ['Basic', 'Pro'] as const;
type ProductNames = (typeof productNames)[number];

type ProductConfig = Record<ProductNames, { features: string[]; call_to_action: string }>;

export const productConfig: ProductConfig = {
	Basic: {
		features: [
			'Up to 10 Journals',
			'Untranscribed audio notes',
			'Up to 5MB per image upload',
			'Up to 10MB per video upload',
			'No file attachments'
		],
		call_to_action: 'Get Started'
	},
	Pro: {
		features: [
			'Unlimited Journals',
			'Transcribed audio notes',
			'Up to 100MB per image upload',
			'Up to 1GB per video upload',
			'Up to 50MB per file attachment'
		],
		call_to_action: 'Start Free Trial'
	}
};

export const freePrice = {
	id: '',
	unit_amount: 0,
	interval: 'forever',
	product: {
		name: 'Free',
		description: 'For limited personal use',
		features: productConfig.Basic.features,
		call_to_action: productConfig.Basic.call_to_action
	}
};

export const tierPolicy = {
	maxJournals: {
		Basic: 10,
		Pro: Infinity
	}
} as const;
