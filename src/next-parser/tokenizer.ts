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

function tokenize(input: string): Token[] {
	const tokens: Token[] = [];
	let textBuffer = "";
	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		if (char === "{") {
			pushTextBuffer();
			const read = readTill("}", i, input);
			if (!read.success) throw new Error("Unable to find closing }");
			const { value, finishingPosition } = read;
			tokens.push({
				type: "interpolation",
				value,
			});
			i = finishingPosition;
			continue;
		}

		if (char === "<") {
			pushTextBuffer();
			const read = readTill(">", i, input);
			if (!read.success) throw new Error("Unable to find closing '>'");
			const { value, finishingPosition } = read;
			const values = value.trim().split(/\s+/);
			const tag = values[0];
			if (tag === undefined) throw new Error("Unable to find tag name");
			if (tag[0] === "/") {
				const tagName = tag.substring(1);
				tokens.push({
					type: "close",
					tag: tagName,
				});
				i = finishingPosition;
				continue;
			}
			const args = values.slice(1);
			tokens.push({
				type: "open",
				tag,
			});
			if (args.length > 0) {
				tokens.push({
					type: "arguments",
					value: args,
				});
			}

			i = finishingPosition;
			continue;
		}

		textBuffer += char;
	}
	pushTextBuffer();
	return tokens;

	function pushTextBuffer() {
		if (textBuffer.length > 0) {
			tokens.push({
				type: "text",
				text: textBuffer,
			});
			textBuffer = "";
		}
	}
}

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
