## Getting Started

Follow the instructions in the root README to install the node modules and start the development server.

### Running in Development Mode

Runs at [http://localhost:3000](http://localhost:3000).

### Styling

This project uses vanilla CSS. Custom properties come from the `@repo/ui` package. Global and utility styles are in the `global.css` file in the root `/app` directory. Both are imported in the root `layout.tsx` file.

### Components

This project uses a combination of custom components and components from the `@repo/ui` package. Custom components are located in the `/components` directory.

### State Management

The overall state of this application is managed using MobX. The store files are located in `/stores`. The walkthrough application is wrapped in a MobX `Provider` in the walkthrough page at `/walkthrough/[id]/page.tsx`. Mobx lets individual components subscribe to the store and re-render when the parts of the store they are interested in change.

#### Root Store

The root store is located at `/stores/WalkthroughRootStore.ts`. It contains the setup of all the stores and also exports the context and hook for using the stores.

#### Answer Store

The answer store is located at `/stores/AnswerStore.ts`. It contains the state and actions for all the answer data in the walkthrough.

#### Navigation Store

The navigation store is located at `/stores/NavigationStore.ts`. It contains the state and actions for the navigation in the walkthrough including the current item, history state, and the ability to move to the next and previous items.

### Utilities

The `/utils` directory contains utility and logic functions used throughout the application. This includes functions for parsing the walkthrough data, calculating items and progress, and more.

### Environment Variables

There are currently 2 environment variables used in this project. Set them to `yes` to enable them. They are both helpers related to the development of the application and should not be used in any environment other than local:

- `NEXT_PUBLIC_SHOW_QUESTION_LABELS` - Displays the question number on the website for each question.
- `NEXT_PUBLIC_SHOW_LOG_STATE_BUTTON` - Shows a button in the walkthrough footer to log the current answer state of the walkthrough to the console.
