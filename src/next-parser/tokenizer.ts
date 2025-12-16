type Token =
	| TextToken
	| InterpolationToken
	| OpenToken
	| CloseToken
	| ArgumentsToken;

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

type ArgumentsToken = {
	type: "arguments";
	value: string[];
};

function tokenize(input: string): Token[] {}

function readTill(
	charToSearchFor: string,
	startingPosition: number,
	text: string,
):
	| {
			success: true;
			value: string;
			finishingPosition: number;
	  }
	| {
			success: false;
	  } {
	const finishingPosition = text.indexOf(charToSearchFor, startingPosition + 1);
	if (finishingPosition === -1) {
		return { success: false };
	}
	const substring = text.substring(startingPosition + 1, finishingPosition);
	return {
		success: true,
		value: substring,
		finishingPosition,
	};
}
