import { createTrackedSelector } from "react-tracked";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface PageState {
	isReady: boolean;
	setIsReady: (newState: PageState["isReady"]) => void;
	loaderMessage: string;
	setLoaderMessage: (newMessage: PageState["loaderMessage"]) => void;
	title: string;
	setTitle: (newTitle: PageState["title"]) => void;
}

const pageStore = create<PageState>(
	devtools(
		(set) => ({
			isReady: false,
			setIsReady: (isReady) => set({ isReady }),

			loaderMessage: "Please wait, application is loading...",
			setLoaderMessage: (loaderMessage) => set({ loaderMessage }),

			title: "",
			setTitle: (title) => set({ title }),
		}),
		{ name: "Page metadata store" },
	),
);

/**
 * @description React custom hook which uses Zustand and to manage Page metadata.
 */
export const usePage = createTrackedSelector(pageStore);
