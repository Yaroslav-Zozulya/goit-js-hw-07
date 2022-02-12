import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');

//Функция отрисовку галереи
function galleryRender(arrayOfImages) {
    const imagesArr = [];
    galleryItems.map(({ preview, original, description }) => {
        imagesArr.push(`<div class="gallery__item">
                            <a class="gallery__link" href="large-image.jpg">
                                <img
                                class="gallery__image"
                                src="${preview}"
                                data-source="${original}"
                                alt="${description}"
                                />
                            </a>
                        </div>`);
    });
    galleryRef.insertAdjacentHTML('beforeend', imagesArr.join(''));
}
galleryRender(galleryItems);

galleryRef.addEventListener('click', openOriginalImage); //Слушатель клика на родительский div галереи
function openOriginalImage(event) {
    event.preventDefault(); // отменяем дефолтное поведение ссылок

    const instance = basicLightbox.create(
        // открываем модальное окно
        `<img src="${event.target.dataset.source}" width="800" height="600">`,
        {
            onClose: instance =>
                document.removeEventListener('keydown', onEscClick), // снимаем слушатель клавиатуры при закрытие модалки
        },
    );
    instance.show();

    document.addEventListener('keydown', onEscClick); // добавляем слушатель клавиатуры
    function onEscClick(event) {
        // проверяем как кнопка нажата
        if (event.code === 'Escape') {
            // если ESC то закрываем модалку
            instance.close();
        }
    }
}
