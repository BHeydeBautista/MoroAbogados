export type ParsedSection = {
	id: string;
	title: string;
	paragraphs: string[];
};

function stripDiacritics(input: string): string {
	return input.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function slugifyAnchor(input: string): string {
	const ascii = stripDiacritics(input)
		.toLowerCase()
		.replace(/['’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/-+/g, "-");

	return ascii || "seccion";
}

function cleanLine(line: string): string {
	return line.replace(/\[arriba\]/gi, "").replace(/\s+/g, " ").trim();
}

function paragraphsFromLines(lines: string[]): string[] {
	const raw = lines.join("\n").trim();
	if (!raw) return [];
	return raw
		.split(/\n\s*\n+/)
		.map((p) => p.replace(/\s+/g, " ").trim())
		.filter(Boolean);
}

export function parseLegalDocument(rawText: string): ParsedSection[] {
	const normalized = rawText.replace(/\r\n/g, "\n");
	const lines = normalized.split("\n");

	const usedIds = new Map<string, number>();
	const uniqueId = (base: string) => {
		const current = usedIds.get(base) ?? 0;
		const next = current + 1;
		usedIds.set(base, next);
		return next === 1 ? base : `${base}-${next}`;
	};

	const headingRe = /^(T[IÍ]TULO|CAP[IÍ]TULO|Cap[ií]tulo|SECCI[OÓ]N|Secci[oó]n|ANEXO|Anexo)\b/;
	// Match only this law's article headers, typically written as "Artículo N .- ...".
	// This avoids splitting on embedded texts like "Artículo 21: ..." from amended laws.
	const articleRe = /^Art[ií]culo\s+(\d+)\s*(?:°)?\s*(?:\[[^\]]*\])?\s*\.\s*-\s*/i;

	const sections: Array<{ id: string; title: string; bodyLines: string[] }> = [];
	let current: { id: string; title: string; bodyLines: string[] } | null = null;

	const pushCurrent = () => {
		if (!current) return;
		sections.push(current);
		current = null;
	};

	for (const rawLine of lines) {
		const line = cleanLine(rawLine);
		if (!line) {
			if (current) current.bodyLines.push("");
			continue;
		}

		const articleMatch = line.match(articleRe);
		if (articleMatch) {
			pushCurrent();
			const num = articleMatch[1];
			const remainder = line.replace(articleRe, "").trim();

			current = {
				id: uniqueId(`articulo-${num}`),
				title: `Artículo ${num}°`,
				bodyLines: remainder ? [remainder] : [],
			};
			continue;
		}

		if (headingRe.test(line)) {
			pushCurrent();
			current = {
				id: uniqueId(slugifyAnchor(line)),
				title: line,
				bodyLines: [],
			};
			continue;
		}

		if (!current) {
			current = {
				id: uniqueId("texto"),
				title: "Texto",
				bodyLines: [],
			};
		}

		current.bodyLines.push(line);
	}

	pushCurrent();

	return sections.map((s) => ({
		id: s.id,
		title: s.title,
		paragraphs: paragraphsFromLines(s.bodyLines),
	}));
}
