import React from 'react';
import AddNotice from '../addNotice/AddNotice';
import CardNotice from '../cardNotice/CardNotice';
import SearchNotes from '../searchNotes/SearchNotes';
import AppHeader from '../appHeader/AppHeader';
import WrapperContext from '../WrapperContext';

const App = () => {

  return (
		<div className="app">
			<WrapperContext>
				<AppHeader/>
				<main>
						<AddNotice/>
						<CardNotice/>
						<SearchNotes/>
				</main>
			</WrapperContext>
		</div>
  )
}

export default App;
