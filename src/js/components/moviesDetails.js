import { getData } from '../api/getData';
import { displayContentDetails } from '../utils/generateTemplate';

// Функция для извлечения идентификатора контента из URL
const getContentIdFromURL = () => {
	const queryString = window.location.search; // Получаем строку запроса из URL
	const urlParams = new URLSearchParams(queryString); // Создаем объект для работы с параметрами URL
	return urlParams.get('id'); // Извлекаем значение параметра 'id'
};
/**
 * // Функция для получения данных о контенте по ID и типу контента
 * @param {string} contentId - идентификатор контента.
 * @param {string} contentType - тип контента (movie или tv).
 * @returns 
 */
const getContentById = async (contentId, contentType) => {
  try {
		// Получаем данные от API
    const contentDetails = await getData(`${contentType}/${contentId}`);
		// Возвращаем полученные данные
    return contentDetails;
  } catch (error) {
    console.error('Ошибка в запросе:', error);
    return null;
  }
};

/**
 * / Функция для загрузки и отображения подробной информации о контенте
 * @param {string} patch - строка, указывающая, какой тип контента нужно загрузить (movie или tv)
 */
export const loadContentDetails = async (patch) => {
  try {
		// Извлекаем идентификатор контента из URL
    const contentId = getContentIdFromURL();
		// Если тип контента 'movie'
		if (patch === 'movie') {
			// Получаем информацию о фильме по ID
			const contentDataMovieById = await getContentById(contentId, 'movie');
			// Отображаем данные о фильме
			displayContentDetails(contentDataMovieById, 'movie-details');
			// Если тип контента 'tv'
	} else if (patch === 'tv') {
			// Получаем данные о сериале
			const contentDataTvById = await getContentById(contentId, 'tv');
			// Отображаем данные о сериале
			displayContentDetails(contentDataTvById, 'tv-details');
	} else {
			console.error('Неизвестный тип контента');
	}
  } catch (error) {
    console.error('Ошибка в загрузке подробной информации о контенте:', error);
  }
};
