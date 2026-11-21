import { defineComponents } from "blume";
import PageFooter from "./components/PageFooter.astro";
import Pagination from "./components/Pagination.astro";
import Sidebar from "./components/Sidebar.astro";

export default defineComponents({
	layout: {
		PageFooter,
		Pagination,
		Sidebar,
	},
});
