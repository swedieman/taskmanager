
# Task Management Application

This is a React frontend built for the API that can be found here: https://github.com/popstr/tasks.

## User Interface

You will be presented with a list of tasks that is fetched from the API endpoint <url-to-api>/tasks. You can add,
edit and delete tasks.

You can sort the list by clicking on each header Status, Name, Category, Due Date. Clicking a second time will change
the sort order from descending to ascending. If there are more tasks than will fit in the browser window the list
will scroll. It should also look OK on a mobile phone and other devices with lower than desktop resolution.

## Configuration
Change `REACT_APP_API_URL` in `.env` if you need to use a different API endpoint.

## Known Issues
* There is currently nothing that checks that all fields are filled in when create a new task.
* When sorting by column the sort order is not always correct.
* Sometimes different tasks can get the same ID which may result in unexpected behavior as the backend will delete or
  edit the first task it finds (which may be different from the one you want to modify).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
