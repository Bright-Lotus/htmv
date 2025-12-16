type Token = TextToken | InterpolationToken | OpenToken;

type TextToken = {
	type: "text";
	text: string;
};

type InterpolationToken = {
	type: "interpolation";
	value: string;
};

type OpenToken = {
	type: "open";
	tag: string;
};
