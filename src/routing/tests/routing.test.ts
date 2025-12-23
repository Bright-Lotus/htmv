import { describe, expect, test } from "bun:test";
import fs from "node:fs/promises";
import path from "node:path";
import Elysia from "elysia";
import { registerRoutes } from "../routing";

const projects = (await fs.readdir(import.meta.dir)).filter((project) =>
	isFolder(project),
);

describe("Routing tests", () => {
	projects.forEach((project) => {
		test(project, async () => {
			const expectedOutput = JSON.parse(
				await fs.readFile(
					path.join(import.meta.dir, project, "expected_output.json"),
					"utf-8",
				),
			);
			const app = new Elysia();
			await registerRoutes(app, project);
			expect(app).toEqual(expectedOutput);
		});
	});
});

async function isFolder(path: string) {
	const stats = await fs.stat(path);
	return stats.isDirectory();
}
