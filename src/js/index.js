import { global } from './global.js';
import { loadMovies } from './components/swiper.js';
import { loadTabsMovies, tabsComponent } from './components/tabs.js';
import { loadContentDetails } from './components/moviesDetails.js';
import { search } from './api/searchServices.js';
/**
 * Инициализирует функции в зависимости от страницы.
 */
function init() {
	switch (global.currentPage) {
		// Если текущая страница корневая или index.html
		case '/':
		case '/index.html':
			// Вызываем функции для отображения фильмов в прокате (слайдер), а также популярных фильмов и сериалов
			loadMovies();
			// инициализация табов
			tabsComponent();
			// Загружаем данные для вкладки "Movies"
			loadTabsMovies('movie', '.popular-movies');
			// Загружаем данные для вкладки "TV Shows"
			loadTabsMovies('tv', '.popular-tv');
			break;
		case '/movie-details.html':
			// Вызываем функцию для отображения деталей о фильме
			loadContentDetails('movie');
			break;
		case '/tv-details.html':
			// Вызываем функцию для отображения деталей о сериале
			loadContentDetails('tv');
			break;
		case '/search.html':
			// Вызываем функцию для выполнения поиска
			search();
			break;
	}
}

document.addEventListener('DOMContentLoaded', init);
