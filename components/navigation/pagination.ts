import { flattenPages } from "blume/components/layout/nav-utils.ts";
import type { FlatPage } from "blume/components/layout/nav-utils.ts";
import type { NavNode } from "blume/core/types.ts";
import { audienceOf, filterNavForAudience } from "./audience.ts";

/**
 * Previous/next pages for a route, in sidebar order and within one audience.
 * Returns null when the route is not in the sidebar.
 */
export const resolvePagination = (
	nodes: NavNode[],
	route: string,
): { prev: FlatPage | null; next: FlatPage | null } | null => {
	const flat = flattenPages(filterNavForAudience(nodes, audienceOf(route)));
	const index = flat.findIndex((page) => page.route === route);

	if (index === -1) {
		return null;
	}

	return {
		next: flat[index + 1] ?? null,
		prev: flat[index - 1] ?? null,
	};
};
