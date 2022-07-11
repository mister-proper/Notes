import React from 'react';

import AddNotice from '../addNotice/AddNotice';
import CardNotice from '../cardNotice/CardNotice';
import SearchNotes from '../searchNotes/SearchNotes';
import AppHeader from '../appHeader/AppHeader';
import { ViewAuthentication } from '../аuthentication/Authentication';

const App = () => {

  return (
		<div className="app">
			<AppHeader/>
			<main>
				<AddNotice/>
				<CardNotice/>
				<SearchNotes/>
			</main>
			<ViewAuthentication/>
		</div>
  )
}

export default App;
