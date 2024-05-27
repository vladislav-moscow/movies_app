import { getData } from '../api/getData';
import { cardsTemplate } from '../utils/generateTemplate';

/**
 * Компонент для переключения вкладок (табы).
 */
export const tabsComponent = () => {
	// Получаем доступ к контейнеру вкладок
	const tabs = document.querySelector('.tabs');

	// Получаем доступ ко всем кнопкам вкладок и к содержимому вкладок
	const tabsBtn = document.querySelectorAll('.tabs__btn');
	const tabsContent = document.querySelectorAll('.tabs__content');

	if (tabs) {
		// Добавляем обработчик клика на контейнер вкладок
		tabs.addEventListener('click', (e) => {
			// Проверяем, что клик произошел на кнопке вкладки
			if (e.target.classList.contains('tabs__btn')) {
				// Получаем значение атрибута data-tabs-path выбранной кнопки вкладки
				const tabsPath = e.target.dataset.tabsPath;
				// Удаляем класс "tabs__btn--active" у всех кнопок вкладок
				tabsBtn.forEach((el) => el.classList.remove('tabs__btn--active'));
				// Добавляем класс "tabs__btn--active" к выбранной кнопке вкладки
				e.target.classList.add('tabs__btn--active');
				// Вызываем функцию для обработки вкладок с переданным значением data-tabs-path
				tabsHandler(tabsPath);
				// Вызываем функцию для отображение данных в вкладке
				loadTabsMovies(tabsPath);
			}
		});
	}

	// Функция для обработки вкладок
	const tabsHandler = (path) => {
		// Скрываем все содержимое вкладок
		tabsContent.forEach((el) => el.classList.remove('tabs__content--active'));

		// Показываем содержимое вкладки с переданным значением data-tabs-target
		document
			.querySelector(`[data-tabs-target="${path}"]`)
			.classList.add('tabs__content--active');
	};
};

/**
 * Функция для отображения табов в зависимости какой таб выполнить запрос
 * @param {string} type - Тип контента "movie" или "tv"
 * @param {string} path - Тип  куда отображаем "movie" или "tv Shows"
 * @returns
 */
export const loadTabsMovies = async (type, path) => {
	let endpoint;

	// Определяем endpoint в зависимости от типа контента
	if (type === 'movie') {
		endpoint = '/movie/popular';
	} else if (type === 'tv') {
		endpoint = '/tv/popular';
	} else {
		console.error('Неправильный тип контента');
		return;
	}

	try {
		// Используем функцию getData для отправки запроса к API
		const data = await getData(endpoint);
		// Получаем данные
		const results = data.results;

		// Отображение данных в указанном контейнере
		cardsTemplate(results, path, type);
	} catch (error) {
		console.error('Ошибка в запросе:', error);
	}
};
