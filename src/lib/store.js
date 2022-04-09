import { writable } from "svelte/store";

export const languages = writable([]);
export const words = writable([]);
export const isSignedIn = writable();
export const sheetId = writable();
