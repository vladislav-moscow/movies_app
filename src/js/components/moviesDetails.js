import { getData } from '../api/getData';
import { displayContentDetails } from '../utils/generateTemplate';

// Функция для извлечения идентификатора контента из URL
const getContentIdFromURL = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get('id');
};

const getContentById = async (contentId, contentType) => {
  try {
    const contentDetails = await getData(`${contentType}/${contentId}`);
    return contentDetails;
  } catch (error) {
    console.error('Ошибка в запросе:', error);
    return null;
  }
};
export const loadContentDetails = async (patch) => {
  try {
    const contentId = getContentIdFromURL();
    /*const contentDataMovieById = await getContentById(contentId, 'movie');
    const contentDataTvById = await getContentById(contentId, 'tv');
    displayContentDetails(contentDataMovieById, 'movie-details');
    displayContentDetails(contentDataTvById, 'tv-details');*/
		if (patch === 'movie') {
			// Получаем информацию о фильме по ID
			const contentDataMovieById = await getContentById(contentId, 'movie');
			displayContentDetails(contentDataMovieById, 'movie-details');
	} else if (patch === 'tv') {
			// Получаем информацию о сериале по ID
			const contentDataTvById = await getContentById(contentId, 'tv');
			displayContentDetails(contentDataTvById, 'tv-details');
	} else {
			console.error('Неизвестный тип контента');
	}
  } catch (error) {
    console.error('Ошибка в загрузке подробной информации о контенте:', error);
  }
};
