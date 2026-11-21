import type { NavNode } from "blume/core/types.ts";

export type Audience = "events" | "internship";

const isEventRoute = (route: string | undefined): boolean =>
	route === "/events" || route?.startsWith("/events/") === true;

/** Which audience a route belongs to. Everything outside `/events` is Internship. */
export const audienceOf = (route: string): Audience =>
	isEventRoute(route) ? "events" : "internship";

/** Keep only the pages and groups that belong to one audience. */
export const filterNavForAudience = (nodes: NavNode[], audience: Audience): NavNode[] =>
	nodes.flatMap((node): NavNode[] => {
		if (node.kind === "page") {
			return audienceOf(node.route) === audience ? [node] : [];
		}

		const children = filterNavForAudience(node.children, audience);
		const ownsRoute = node.route !== undefined && audienceOf(node.route) === audience;

		return children.length > 0 || ownsRoute ? [{ ...node, children }] : [];
	});
