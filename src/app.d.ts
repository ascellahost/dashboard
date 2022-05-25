/// <reference types="@sveltejs/kit" />


import type { Structs } from "$lib/api_types"

/* eslint-disable @typescript-eslint/no-explicit-any */

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: Structs["Users"]
	}

	// interface Platform {}

	interface Session {
		user?: Structs["Users"]
	}

	interface Stuff {
		user?: Structs["Users"]

	}
}
