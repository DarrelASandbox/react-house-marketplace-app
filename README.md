## About The Project

- Learn modern React by building 4 projects including a Firebase 9 app and a full stack MERN app
- Tutorial for House Marketplace App
- [Originial Repo: House Marketplace](https://github.com/bradtraversy/house-marketplace)
- [Brad's Gists](https://gist.github.com/bradtraversy)
- [Brad Traversy](https://github.com/bradtraversy)
- [Will Adamas](https://github.com/bushblade)
- [Mitchel](https://github.com/MitchelSt)

&nbsp;

## Installation

1. Install NPM packages.

```sh
npm install
```

2. Create .env file in the root folder.

```sh
touch .env
```

1. Copy and paste your firebase config into the .env file

```env
REACT_APP_FIREBASE_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGEING_SENDER_ID=
REACT_APP_APP_ID=
```

&nbsp;

## Notes

- [Seeding mock data to the Firebase Local Emulator Suite](https://dev.to/sethburtonhall/seeding-mock-data-to-the-firebase-local-emulator-suite-with-faker-js-1596)

&nbsp;

### Notes taken from User Sign In comment section:

> is it save that Firebase stores user info and tokens in IndexedDB?

> Yes and no.

> IndexedDB, just like local storage is accessible to client side code and so would/could be used in a XSS attack, where by a user could enter in the various input fields in the app some malicious string of code that gets saved in our Firestore and then later is rendered as html on the page of another user. That code could then retrieve information from the indexedDB and do something with it maliciously, like using the users account.

> But the issue here would not be you're using IndexedDB it would be that you have an app that is vulnerable to XSS. In none Firebase apps the general rule would be to never trust the client, and on the back end to always 'sanitize' any user generated input. This is not as simple in a Firebase app as the majority of code your write is client side code. You could use Firebase cloud functions to watch certain collections for every time something is stored in your Firestore and then sanitize/parse user generated input before writing to the Firestore.

> All that being said though, how likely is that to be a problem? In this particular app I would say very little likelihood. The reason I say that is at no point in our app do we render user generated content as html, we only use plain strings, we don't use innerHTML or dangerouslySetInnerHTML. If you were to do that then it would also be worth sanitizing client side before doing so, which could obviously be manipulated but not easily. Every little thing you do like that is going to make it harder but not impossible.

&nbsp;

### Notes taken from PrivateRoute Component & useAuthStatus Hook comment section:

> Please , can You tell us what is "unsub fonction" exactly ?! Where does it come from ? Many Thanks

> It's a cleanup function, onAuthStateChanged creates a websocket listener that watches/listens for a event in the Firestore of auth changed i.e. user log in / sign up / log out. The function returns another function which cancels/unsubscribes from that event listenter.

> [You can see onAuthStateChanged function signature here.](https://firebase.google.com/docs/reference/js/auth.auth.md#authonauthstatechanged)

> [And you can see the Unsubscribe interface here,](https://firebase.google.com/docs/reference/js/firestore_.unsubscribe) it basically removes the listener and that's it.

> The reason you would do this is that when the component unmounts i.e. is no longer rendered by React and removed from the DOM, then React calls the function you returned from useEffect. This function should be a 'clean up' function i.e any listeners you added in your useEffect are removed when the component is not being used. This prevents asynchronous code running that may try and update the state of you component even though it is no longer being rendered, which would leave you with memory leaks in your app.

> I think the method Brad used is a generic one and perhaps he didn't realize that Firebase.auth provides a cleanup. I think it is better to go with using the Firebase Unsubscribe as that removes the listener while Brad's approach does not, it simply doesn't try to update state in an unmounted component, but the listener is still running and taking up memory unnecessarily.
