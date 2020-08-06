# IMHAPPY
IMHAPPY is a web app with full CRUD functionality that allows the user to journal happy moments of their life. The entries are then sorted into a colorful list in descending order that the user can look at, reminisce on, and improve their mood at any time.

* **Responsive:** IMHAPPY was designed with responsiveness in mind, it will look good at any screen size.
* **Colorful:** Every month for each entry has its own background color. The more entries the user makes, the more colorful the app becomes.
* **CRUD:** IMHAPPY entries contain full CRUD (Create, Read, Update, Destroy) functionality.

Technologies used to create IMHAPPY include [React.js](https://github.com/facebook/create-react-app), [JSON server](https://github.com/typicode/json-server), [Google Material design icons](https://github.com/google/material-design-icons), JavaScript, CSS, and HTML.

## Screenshots
<img src="https://raw.githubusercontent.com/chrismccolgan/imhappy/master/public/screen-big-1.png" width=50% height=50%>
<img src="https://raw.githubusercontent.com/chrismccolgan/imhappy/master/public/screen-small-1.png" width=50% height=50%>
<img src="https://raw.githubusercontent.com/chrismccolgan/imhappy/master/public/screen-small-2.png" width=50% height=50%>
 
## Installation
1. Clone this repository.
1. `cd` into the directory it creates.
1. `npm install` to install react.js.
1. Make a `database.json` file in the `api` directory, or use the existing `sample.json` file.
1. While inside the `api` directory, enter `json-server -p 5002 -w database.json` to serve the JSON file.
1. `cd` into the main directory and `npm start` to make the app accessible via a web browser.
 
## Using IMHAPPY
1. Register a new account. **Do not use any sensitive credentials. This is not a secure application.**
1. Log in with the credentials you created, or use the credentials provided in the `sample.json`, `me@me.com:test`.
1. Two entries will be automatically generated: one for the date you registered for IMHAPPY, and another for the birth date entered on the registration form.
1. To create a new entry, click the "What made you happy?" link located at the top.
1. Fill out all the fields in the new entry form.
    * **Category:** Categorize your happy moment with the category dropdown. An icon representation of the category will appear at the start of each entry.
    * **Date:** Enter the date your happy moment occurred. Entries are sorted by date in descending order. The background color for each entry changes depending on the month for each entry.
    * **Entry:** Write about your happy moment here.
    * **Significant:** The entries for the happy moments marked as significant will be displayed with xx-large font size.
1. To edit an entry, hover over an existing entry and click the pencil-shaped button that appears to the right.
1. To delete an entry, hover over an existing entry and click the trash can-shaped button that appears to the right.
