import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';

import { getData } from '../api/getData.js';
import { cardsTemplateWithSlider } from '../utils/generateTemplate.js';

/**
 * Инициализация слайдера Swiper.
 * Настраивает параметры для отображения нескольких слайдов, автопрокрутки и т.д.
 */
export const initSwiper = () => {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 4,
		spaceBetween: 30,
		modules: [Scrollbar],
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		autoplay: {
			delay: 5000,
		},
	});
};

/**
 * Функция для загрузки фильмов и отображения их в слайдере
 */

export const loadMovies = async () => {
	try {
		// Используем функцию getData для отправки запроса к API
		const data = await getData('/movie/now_playing');
		
		// получаем данные
		const movies = data.results;

		// Отображение фильмов в слайдере
		cardsTemplateWithSlider(movies, 'movie');
	} catch (error) {
		console.error('Ошибка в запросе:', error);
	}
};
