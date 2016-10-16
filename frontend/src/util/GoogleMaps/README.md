## ScriptCache + React + Google Api

The 3 scripts in here are separated for clarity. They are:

* `ScriptCache.js` - The backbone of this method which asynchronously loads JavaScript `<script>` tags on a page. It will only load a single `<script>` tag on a page per-script tag declaration. If it's already loaded on a page, it calls the callback from the `onLoad` event immediately. 

Sample usage:

```javascript
this.scriptCache = cache({
  google: 'https://api.google.com/some/script.js'
});
```

* `GoogleApi.js` is a script tag _compiler_. Essentially, this utility module builds a Google Script tag link allowing us to describe the pieces of the Google API we want to load inusing a JS object and letting it build the endpoint string. 

Sample usage:

```javascript
GoogleApi({
  apiKey: apiKey,
  libraries: ['places']
});
```

* `GoogleApiComponent.js` - The React wrapper which is responsible for loading a component and passing through the `window.google` object after it's loaded on the page.

Sample usage:

```javascript
const Container = React.createClass({
  render: function() {
    return <div>Google</div>;
  }
})
export default GoogleApiComponent({
  apiKey: __GAPI_KEY__
})(Container)
```