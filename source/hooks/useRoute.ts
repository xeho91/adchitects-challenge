import { createTrackedSelector } from "react-tracked";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface RouteState {
	isReady: boolean;
	setIsReady: (newState: RouteState["isReady"]) => void;
	loaderMessage: string;
	setLoaderMessage: (newMessage: RouteState["loaderMessage"]) => void;
	title: string;
	setTitle: (newTitle: RouteState["title"]) => void;
}

const routeStore = create<RouteState>(
	devtools(
		(set) => ({
			isReady: false,
			setIsReady: (isReady) => set({ isReady }),

			loaderMessage: "Please wait, application is loading...",
			setLoaderMessage: (loaderMessage) => set({ loaderMessage }),

			title: "",
			setTitle: (title) => set({ title }),
		}),
		{ name: "Route metadata store" },
	),
);

/**
 * @description React custom hook which uses Zustand and to manage Route metadata.
 */
export const useRoute = createTrackedSelector(routeStore);
