type Token = TextToken | InterpolationToken | OpenToken | CloseToken;

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

type CloseToken = {
	type: "close";
	tag: string;
};
