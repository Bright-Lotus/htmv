# HTMV
HTMV. A simple yet fast web framework currently in work in progress. Installation and usage guide can be found below.

# Precautions
HTMV currently works exclusively on Bun, as Routing on Node.js is broken. Please take note and only use Bun, while I'm working on Node.js support.

# Requirements
- [Bun](https://bun.sh/) (version 1.1.18 or higher)
  - Lower versions cause [issues](https://github.com/Rdeisenroth/ConvertX/commit/f6f675d49ab030cf94a957f717e80b63f568e274#diff-0b5adbfe7b36e4ae2f479291e20152e33e940f7f265162d77f40f6bdb5da7405R24) with the public folder not properly serving assets.
  - Verify your version with `bun --version`, and update with `bun upgrade` if needed.
- A code editor (e.g. [VSCode](https://code.visualstudio.com/))
- A terminal (e.g. [Windows Terminal](https://aka.ms/terminal) or your OS' default terminal)
- Awesome mood!

# Installation
It's quite simple! Just use HTMV's CLI!
```bash
bunx htmv@latest new my_cool_project
```
This will create an HTMV project on the folder `my_cool_project`. Next, `cd` into it to get started. 
> Dependencies are already pre-installed, there is no need for `bun install`.

## And that's it! We're done. 
Now let's try it! You can simply start it with `bun dev`. After that, you should now be able to see your page at `http://localhost:3000`.

If port 3000 is occupied, the server will try to use another open one. Please note the URL displayed in the console (e.g. `HTMV running on port 8080! http://localhost:8080`).

# Usage

Inside the project folder you will find three subfolders:
- routes/
  - Where you will place index.ts files inside subfolders that tell the server what pages to serve.
  - e.g. routes/about/index.ts will resolve to localhost:3000/about.
- views/
  - Where you will place your view files in the .htmv format.
  - They can also be [generated](#code-generation) with `bunx htmv@latest gen view ViewName`.
  - e.g. views/about.htmv will be the view served at localhost:3000/about.
- public/
  - Where you will place your static files like images, videos, etc.
  - They will be served at localhost:3000/public/your_file.ext.
  - e.g. public/style.css will be served at localhost:3000/public/style.css.

Start by taking a quick peek at the `routes/index.ts` file. It should look something like this:
```ts
import { type RouteParams, view } from "htmv";

export default async (_params: RouteParams) => {
	return await view("example", {
		title: "Welcome to HTMV!",
	});
};
```

This file points to `http://localhost:3000/` (the root route).
It imports the `view` function from HTMV which is used to render views. Said function searches for the view `example` inside the `views` folder and renders it, passing it the `{ title: "Welcome to HTMV!" }` argument.

Now direct your attention to the `views/example.htmv` file. It should look something like this:
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>{title}</title>
</head>

<body>
  <h1>{title}</h1>
</body>
</html>
```

Analyze the files then open the page at `http://localhost:3000/` in your browser.

Did you see how the `{title}` value on our view changed to the one we gave it on our route? Now that's where HTMV gets fun! Just as we now did you could also do more complex stuff like access your DB's data and show it in a nicely form.

# Static files
Having your views is nice and all... but what about images? Videos? Or maybe you would rather not use dull `<style>` for CSS and monotonous `<script>` for your JS.

For this, you can just add any **static files** onto the `public` folder and they will be automatically served at `/public`. Take that into account when importing them inside your `view`.

As an example, place any image inside the `public` folder (e.g. `public/cool_image.png`) and then access it inside your view like so:
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>{title}</title>
</head>

<body>
  <h1>{title}</h1>
  <img src="/public/cool_image.png" alt="A cool image!">
</body>
</html>
```

# Dynamic routes
Sometimes you don't know the exact route (common in `APIs`). For example, let's say you want to have a route `/api/user/USER_ID_HERE`. Of course you don't want to have a million folders every single one named with a different user ID. That's where dynamic routes come into play.

So let's create one. Create this magic structure of folders:
```
routes/
└── api/
	└── user/
		└── [id]/
			└── index.ts
```

That's it! Inside `index.ts` you can access the `id` parameter as follows:
```ts
import { type RouteParams } from "htmv";

export default function UserEndpoint(routeParams: RouteParams) {
	const { id } = routeParams.params
	return `Hello user ${id}!`
}
```
Now when you go to `[URL]/api/user/1000` you should see `Hello user 1000!`.

# Route handlers
On the topic of `APIs`, you sometimes want a single endpoint for your users, for example `/api/user` and depending on the method used on the request act accordingly. For example, create an user with method `POST`, retrieve users with method `GET` and more. 

Normally you'd do that programatically such as this:
```ts
import { type RouteParams } from "htmv";

export default function UserEndpoint(routeParams: RouteParams) {
	const method = routeParams.request.method
	if (method === "GET") {
		// List users
	}
	if (method === "POST") {
		// Create user
	}
}
```
Route handlers in HTMV allow you to do this in an easier way. Just have functions for each method!
```ts
import { type RouteParams } from "htmv";

export function GET(routeParams: RouteParams) {
	// List users
}

export function POST(routeParams: RouteParams) {
	// Create user
}
```
Observe how the `default` keyword was removed. Now, the `default` keyword is used when you want a function that catches all endpoints. (`ALL` method)

Supported methods currently are:
- GET
- POST
- PUT
- PATCH
- DELETE
- ALL
  - Add `default` keyword.

# Renaming folders
If you wish to rename either the `views`, `routes` or `public` folders you can do so in `index.ts` as follows:
```ts
setup({
	routes: path.join(dirPath, "my_custom_routes_folder"), 
	views: path.join(dirPath, "stuff", "views"),
	public: path.join(dirPath, "static"),
	port: 3000,
});
```
Rename the folders and then modify the string for the new name you wish for. Note that when modifying the **default** values, `htmv gen` will now require the `--path` flag to know where to find them. Refer to [code gen](#code-generation).


# Code generation
Do you often forget how to write boilerplate code? Why not just let HTMV do it for you?
As you know, HTMV comes with the CLI tool you used when creating the project. But it also has the command `htmv gen` which allows you to generate a basic template for a view or route.

The syntax is as follows:
```bash
bunx htmv@latest gen {TYPE} {NAME} {OPTIONS}
```
For example, to create a view called MyCoolView:
```bash
bunx htmv@latest gen view MyCoolView
```
Running this will generate a view in the `views` directory of your project. The other remaining type is `route` which works the same way but creates the route in your `routes` directory.

However, note that if you have changed the name of your folders HTMV will be unable to find them and you'll have to manually specify the folder you want the generated file to be placed:
```bash
bunx htmv@latest gen view MyCoolView --path cool_stuff/my_custom_views_folder
```

> Keep in mind this command does not create any new folders, please create the desired folder before running the command.

# Interpolation
As mentioned briefly at the start of the docs, one of HTMV's main features is interpolation.

What's that? Imagine you have a value on the backend you wish to show when rendering the view, just use interpolation!

Here's a simple example which lets you randomly show different strings on page load:
```ts
// /routes/index.ts (root)
import { view } from 'htmv'

export default () => {
	const messages = ["Welcome back!", "How was your day?", "We're glad you're back."]

	return view('example', {
		message: getRandomValue(messages) // The message variable will get sent to the view for you to use freely.
	})
}

function getRandomValue(arr: Array) {
	return arr[Math.floor(Math.random() * arr.length)]
}
```
```html
<!-- /views/example.htmv -->
<p>{message}</p> <!-- Here we are accessing the message variable -->
```

# Attribute binding
Although being able to interpolate values is nice, sometimes you need *just a bit* more than that.

For example, let's say you have a task you wish to show if it's done or not:

The first step would be to pass the `{task.done}` value to the view.

After that, you should have an `<input type="checkbox">` element inside your view.

Next to that, one would think *"I'll just add a checked={task.done} attribute to it!"*

Like so: `<input type="checkbox" checked={task.done}>`

However, on opening your web page you'll realize the input is always checked. No matter whether `task.done` is truthy or not. This is because for attributes like `checked`, HTML doesn't care if the value for the attribute is truthy or not. It only checks if the attribute is present or not. The culprit is the way HTML handles boolean attributes: If it's present, it sets the value to true, and if not, it's false, e.g. `<input type=checkbox> // checked=false`. The value assigned to the attribute gets ignored.


Therefore, it is impossible to solve this with simple interpolation.

For this, you'll need attribute binding. And HTMV has got your back! Simply add a `:` before the attribute. That's it!

`<input type="checkbox" :checked={task.done}>`

This tells HTMV's compiler: *"Don't add the attribute AND value, just add the attribute alone IF the value is truthy!"* 

# Components
One of HTMV's key values is that a component is just a view. Therefore, your `example` view is already a component!

However, for HTMV to be able to differentiate it from an HTML element it must start with an uppercase (`Example`).

Let's create a header component with `bunx htmv gen view Header`
> Remember to use `--path` if needed.

Inside we can make use of attributes like so:
```html
<h1>{title}</h1>
<h2>{description}</h2>
```
Lastly, in our `example` view, let's make use of it!
```html
<Header title="My cool webpage" description="It's purpose is to test HTMV's components!"/>
```

That's it. We can also make use of the `children` prop, like so:
```html
<!-- example view -->
<Header description="It's purpose is to test HTMV's components!">My cool webpage</Header>
```
```html
<!-- Header view -->
<h1>{children}</h1>
<h2>{description}</h2>
```


# Hot reloading
Hot reloading has not yet been fully developed. For now, you may develop with `bun dev`, which will take care of reloading on route code change. However, note that this won't include views or hot reloading in the browser.

# Linting
As of now, views work under the `.html` extension. However, that is subject to change in the future due to HTMV's language adding features which do not exist on normal HTML. Expect errors to appear on your editor when working with views. This will get sorted out once the `.htmv` extension becomes available.

# Still have questions?
More in-depth documentation and explanations can be found in HTMV's [DeepWiki](https://deepwiki.com/Fabrisdev/htmv). How about you
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Fabrisdev/htmv) ?

# Interested in HTMV's development or would like to contribute?
There's still a ton of work left! Check out features to come at [**HTMV's Trello page**](https://trello.com/b/rhprnM4y/htmv)! 

If you would like to contribute, check out the Trello for ideas on what to work on!