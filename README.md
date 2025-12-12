# HTMV
HTMV. A simple yet fast web framework currently in work in progress. Installation and usage guide can be found below.

# Precautions
HTMV currently only works on Bun. Routing on Node.js is broken. Please take note and only use Bun with it while I'm working on Node.js support.

# Installation
It's simple! Just use htmv's CLI!
```bash
bunx htmv@latest new my_cool_project
```
This will create an htmv project on the folder `my_cool_project`. Finally `cd` into it to get started. Dependencies are already installed. No need for a `bun install`.

## And that's it! We're done. 
Now let's try it! You can simply start it with `bun dev`. After that, you should now be able to see your page in `http://localhost:3000`.

## Final note
Did you see how the `{title}` value on our view changed to the one we gave it on our route? Now that's where HTMV gets fun! Just as we now did you could also do more complex stuff like access your DB's data and show it in a nicely form.

# Static files
Having your views is nice and all... but what about images? videos? or maybe you would like to not have to use `<style>` for CSS and `<script>` for your JS.

For this, you can just add any **static files** onto the `public` folder and they will be automatically served at `/public`. Take that into account when importing them inside your `view`.

# Dynamic routes
Sometimes you don't know the exact route (this is more common in `APIs`). For example, let's say you want to have a route `/api/user/USER_ID_HERE`. Of course you don't want to have a million folders every single one named with a different user id. That's where dynamic routes come into play.

Let's setup one. Just rename your file to `/api/user/:id`.

That's it! Now you can access it inside your route like this:
```ts
import { type RouteParams } from "htmv";

export default function UserEndpoint(routeParams: RouteParams) {
	const { id } = routeParams.params
	return `Hello user ${id}!`
}
```
Now when you go to `/api/user/1000` you should see `Hello user 1000!`.

# Route handlers
Following with `APIs`, you sometimes want a single endpoint for your users, for example `/api/user` and depending on the method used on the request act accordingly. For example, create an user with method `POST`, get users with method `GET` and more. 

Normally you'd do that programatically like the following:
```ts
import { type RouteParams } from "htmv";

export default function UserEndpoint(routeParams: RouteParams) {
	const method = routeParams.request.method
	if(method === "GET") {
		// list users
	}
	if(method === "POST") {
		// create user
	}
}
```
Route handlers allow you to this in an easier way. Just have functions for each method!
```ts
import { type RouteParams } from "htmv";

export function GET(routeParams: RouteParams) {
	// list users
}

export function POST(routeParams: RouteParams) {
	// create user
}
```
Note how the `default` keyword was removed, that keyword is instead reserved for when you want to hit all endpoints (`ALL` method).

Supported methods currently are:
- GET
- POST
- PUT
- PATCH
- DELETE
- ALL (add `default` keyword)

# Hot reloading
Having to restart the server every time you make a change can be quite tedious. HTMV takes care of this thanks to Bun. Just develop with `bun dev` and it should work out of the box! Note that this does not include hot reloading in the browser. As of now, you have to refresh the page to see new changes. It doesn't update in real time.