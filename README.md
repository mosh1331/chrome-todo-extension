# Sticky To-Do List Chrome Extension

This is a simple Chrome extension built with React that provides a sticky to-do list. You can easily add tasks, mark them as completed, delete them, and reorder them using drag-and-drop functionality powered by `react-beautiful-dnd`. The extension uses Chrome's `sync` storage API to persist tasks across devices.

## Features

- Add, remove, and reorder tasks
- Persistent storage using Chrome's sync API
- Drag-and-drop to rearrange tasks with `react-beautiful-dnd`
- Simple and responsive design

---

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

You need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Chrome browser

---

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/sticky-todo-extension.git
   cd sticky-todo-extension

   ```


1. **Install dependencies:**

Once inside the project folder, install the required dependencies:

```bash
npm install
```

2. **Run the project in development mode:**

Use the following command to start the development server:

```bash
npm start
```

This will start the app at `http://localhost:3000/`, but remember that Chrome extension-specific features like `chrome.storage` won't work here. This is just for testing the React components.

# Building the Extension

  ## Build the extension:

To create a production build that can be used as a Chrome extension, run the following command in the terminal:

```bash
npm run build
```

This will generate a build folder containing the static files required for the extension. The files in this folder will be used when loading the extension into Chrome.

## Load the Extension into Chrome
Open Chrome and navigate to the Extensions page:

Open a new tab in Chrome and go to the extensions page:

`chrome://extensions/`


### Enable Developer Mode:

In the top-right corner of the Extensions page, you will see a toggle labeled Developer mode. Enable this by clicking on the toggle switch.

### Load the unpacked extension:

After enabling Developer mode, a few new options will appear. Click the Load unpacked button.
A file explorer window will open. Navigate to the build folder inside your project directory, and select it.
Chrome will load your extension, and you should see it appear in the list of installed extensions. You can now find your Sticky To-Do List in the extensions tray.

After following these steps, your Chrome extension will be installed and ready to use. You can access it by clicking on the extension icon in the Chrome toolbar. If you need to make updates, simply rebuild the project (npm run build) and reload the unpacked extension from the chrome://extensions/ page.