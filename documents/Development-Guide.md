Development Guide
---

## Vue CLI

This project was scaffolded with Vue CLI. Folder structure, build system, configs etc. are all provided by Vue CLI.

- [Vue CLI Docs](https://cli.vuejs.org/guide/)

## Vue

This project is written as a Vue Single Page App. Components (`.vue` files) and routing are controlled by Vue.

- [Vue Guide](https://vuejs.org/v2/guide/)
- [Vue Single File Components Guide](https://vuejs.org/v2/guide/single-file-components.html) (`.vue` files)
- [Vue Router Guide](https://router.vuejs.org/)
- [Vue Unit Testing Utils Guide](https://vue-test-utils.vuejs.org/)

### Create a New Component

- Make a new file `src/components/ComponentName.vue`.
- Add a `template`, `script` and `style` tag. 
  - Put at least a single root tag in your template.
  - Export an empty object in your script, this will be our component config.
  - Add the `scoped` attribute to your style tag. This prevents the styles from your component from affecting the styles of any other component.

```html
<!-- ComponentName.vue -->
<template>
  <div></div>
</template>

<script>
export default {
  // config goes here
}
</script>

<style scoped>
/* CSS goes here */
</style>
```

Read more about writing templates and configs in the [Vue Guide](https://vuejs.org/v2/guide/).

### Import a Component

To use a component, we need to import it from another component or view.

Let's assume we have a component `src/components/CustomButton.vue`, and we want to use it from `src/views/HomePage.vue`

- Add a new import statement `import CustomButton from '@/components/CustomButton.vue'`. (Note `@` is an alias for `src/`)
- If you don't have a `components` field in your component config, add one and set it to an empty object `{}`.
- Add the imported component to the `components` object. (Note `{ CustomButton }` is equivalent to `{ CustomButton: CustomButton }`)
- Use the new component in your template as if it were a html tag. `<CustomButton>This is a button</CustomButton>`

```html
<!-- HomePage.vue -->
<template>
  <div>
    <CustomButton>This is a button</CustomButton>
  </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue';

export default {
  components: { CustomButton }
}
</script>

<style scoped>
/* CSS goes in here */
</style>
```

### Create a New View

A view is a component that is only used once, that is, it is not reusable. A view can represent an entire page, or several views could be combined to make a single, larger view which represents a page.

- Make a new file `src/views/ViewName.vue`
- Add a `template`, `script`, and `style` tag as in 'Create a New Component`

#### Create a New Route

If the view you've created is a whole page, you'll probably need to give it its own route.

- Open `src/router.js`
  - Import your new view `import ViewName from './views/ViewName.vue'`
  - Add a new route config to the routes array for your view

```javascript
// router.js
import Vue from 'vue'
import Router from 'router';
// ... other view imports
import ViewName from './views/ViewName.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // ... existng route objects
    {
      path: '/new-route-path',
      name: 'view-name',
      component: ViewName
    }
  ]
});
```

Read more about route configs in the [Vue Router Guide](https://router.vuejs.org/).

### Link to a view

> Do **not** use `<a>` to link to pages within the app.

You must use the `<router-link>` component in place of `<a>` to link between pages.

For example, to link to `/home`
```html
<!-- SomeComponent.vue -->
<template>
  <div>
    <router-link to="/home">Go to Home</router-link>
  </div>
</template>
```

Read more about the `router-link` component in the [Vue Router Guide](https://router.vuejs.org/).

### Unit Testing Components

> Coming soon

## Bootstrap (BootstrapVue)

We use BootstrapVue as a wrapper for Bootstrap to save time converting Bootstrap components to Vue code.

- [BootstrapVue Docs](https://bootstrap-vue.js.org/docs/)
- [Bootstrap Website](https://getbootstrap.com/)

### Using BootstrapVue Components

BootstrapVue is already globally installed.

Visit the components section of the BootstrapVue Docs.

- [BootstrapVue Docs - Components](https://bootstrap-vue.js.org/docs/components)

Select the component you want, use the documented tag in the template of your component.

For example, Button is `b-button`
```html
<template>
  <div>
    <b-button>This is a button</b-button>
  </div>
</template>
```
