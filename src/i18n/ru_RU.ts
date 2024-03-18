import { Translation } from './types';

const language: Translation = {
    /* Login */

    /* Languages */
    'studio.languages.portuguesePTBR': 'Португальский (pt-BR)',
    'studio.languages.englishUS': 'Английский (en-US)',
    'studio.languages.spanishES': 'Испанский (es-ES)',
    'studio.languages.farsiFA': 'Фарси (fa-IR)',
    'studio.languages.russianRU': 'Русский (ru-RU)',

    /* Home */
    'studio.home.wellcome': 'Добро пожаловать в',
    'studio.home.title': 'Главная',
    'studio.home.transforming':
        'Vitruveo трансформирует искусство Web3, и это означает совершенно новое программное обеспечение, такое как эта "Beta" версия vtruStudio. Beta означает, что программное обеспечение еще не полностью готово, и вы помогаете нам его тестировать, чтобы оно стало лучше.',
    'studio.home.software': 'У программного обеспечения в настоящее время есть две функции, к которым вы можете получить доступ с помощью кнопок ниже:',
    'studio.home.consign': 'Подать Работу',
    'studio.home.myProfile': 'Мой профиль',

    /* User Account */
    'studio.userAccount.title': 'Учетная запись пользователя',
    'studio.userAccount.creator': 'Создатель',
    'studio.userAccount.logout.button': 'Выйти',
    'studio.userAccount.menu.title': 'Мой профиль',
    'studio.userAccount.menu.subtitle': 'Настройки пользователя',

    /* My Profile */
    'studio.myProfile.title': 'Мой профиль',
    'studio.myProfile.subtitle':
        'Настройте свой профиль Vitruveo с несколькими адресами электронной почты и кошельками.',
    'studio.myProfile.home': 'Главная',
    'studio.myProfile.saveMessage': 'Данные успешно сохранены',
    'studio.myProfile.accessConsignMessage':
        'Для доступа к подаче произведения искусства необходимо заполнить все обязательные поля в профиле пользователя',
    'studio.myProfile.form.username.title': 'Имя пользователя',
    'studio.myProfile.form.username.placeholder': 'Введите имя пользователя',
    'studio.myProfile.form.usernameRequired.error': 'Имя пользователя обязательно',
    'studio.myProfile.form.profile.title': 'Измените свою фотографию профиля здесь',
    'studio.myProfile.form.profile.reset.button': 'Сбросить',
    'studio.myProfile.form.profile.upload.button': 'Загрузить',
    'studio.myProfile.form.profile.description': 'Разрешенные форматы: JPG, GIF или PNG. Максимальный размер 800Кб',
    'studio.myProfile.form.emails.title': 'Электронная почта',
    'studio.myProfile.form.emailsExists.error': 'Электронная почта уже существует',
    'studio.myProfile.form.addEmails.placeholder': 'Введите дополнительный адрес электронной почты',
    'studio.myProfile.form.code.placeholder': 'введите код...',
    'studio.myProfile.form.verify.button': 'Подтвердить',
    'studio.myProfile.form.delete.button': 'Удалить',
    'studio.myProfile.form.wallets.title': 'Кошельки',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'Код подтверждения отправлен на электронную почту',
    'studio.myProfile.verificationCodeSentMessageError': 'Ошибка отправки кода подтверждения на электронную почту',
    'studio.myProfile.emailVerificationMessageSuccess': 'Электронная почта подтверждена',
    'studio.myProfile.emailVerificationMessageError': 'Неверный код подтверждения',
    'studio.myProfile.form.wallet.placeholderAdded': 'Подключить дополнительный кошелек',
    'studio.myProfile.form.wallet.placeholder': 'Подключить новый кошелек',
    'studio.myProfile.form.connect.button': 'Подключить',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Далее',
    'studio.consignArtwork.title': 'Подать Работу',
    'studio.consignArtwork.subtitle': 'Выполните все необходимые задачи и передайте свое произведение искусства',
    'studio.consignArtwork.subtitle.moreInformation': 'Для детального описание посетите страницу',
    'studio.consignArtwork.subtitle.link': 'Dreamer.',

    'studio.consignArtwork.stepName.assetMedia': 'Медиафайлы',
    'studio.consignArtwork.stepName.assetMetadata': 'Метаданные мадиафайлов',
    'studio.consignArtwork.stepName.licenses': 'Лицензии',
    'studio.consignArtwork.stepName.termsOfUse': 'Условия использования',
    'studio.consignArtwork.stepName.auxiliaryMedia': 'Вспомогательные Медиа',
    'studio.consignArtwork.optional': 'необязательный',

    'studio.consignArtwork.stepStatus.completed': 'Завершено',
    'studio.consignArtwork.stepStatus.inProgress': 'В процессе',
    'studio.consignArtwork.stepStatus.notStarted': 'Не начато',
    'studio.consignArtwork.stepStatus.error': 'Ошибка',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Успешно опубликовано!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Редактировать' : 'Начать'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Передано' : 'Передать'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Медиафайлы',
    'studio.consignArtwork.assetMedia.description': 'Загрузите Ваше произведение искусства.',
    'studio.consignArtwork.assetMedia.differentUses': 'ЗАГРУЗИТЬ/СОЗДАТЬ ВАРИАНТЫ ДЛЯ РАЗЛИЧНЫХ ИСПОЛЬЗОВАНИЙ',
    'studio.consignArtwork.assetMedia.amazing':
        'Выглядит потрясающе! Для того чтобы ваше произведение искусства выглядело отлично на разных устройствах, нам нужно еще несколько вариаций.',
    'studio.consignArtwork.assetMedia.haveCreated':
        'Если вы создали свои собственные файлы для нижеперечисленных вариаций, просто загрузите каждый из них здесь.',
    'studio.consignArtwork.assetMedia.haveNotCreated':
        'Если вы не создали свои собственные файлы, не волнуйтесь, просто загрузите ваш оригинальный файл снова для каждой необходимой вариации, и мы поможем вам обрезать ваш файл прямо здесь.',
    'studio.consignArtwork.assetMedia.previewHelp':
        'Файл предварительного просмотра будет пяти секундным клипом вашего произведения искусства. Вы можете загрузить тот, который создали сами, или просто загрузить свой оригинальный файл, и мы поможем вам создать этот клип здесь.',
    'studio.consignArtwork.assetMedia.upload.button': 'Загрузить',
    'studio.consignArtwork.assetMedia.assets': 'Медиафайлы',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${data.definition === 'landscape' ? 'Пейзаж' : data.definition === 'portrait' ? 'Портрет' : 'Квадрат'}`;
    },
    'studio.consignArtwork.assetMedia.image': 'изображение',
    'studio.consignArtwork.assetMedia.video': 'видео',
    'studio.consignArtwork.assetMedia.max': (data: { seconds: number }) =>
        `${data.seconds ? `макс / ${data.seconds} сек.` : 'максимально'}`,

    'studio.consignArtwork.assetMedia.mediaRequired': (data: { required: boolean }) =>
        `${data.required ? 'Требуется' : 'Необязательно'}`,

    'studio.consignArtwork.assetMedia.mediaIs': 'Это медиа',
    'studio.consignArtwork.assetMedia.cropModal.title': (data: { width: string; height: string }) =>
        `Обрезать медиа для отображения до ${data.width} x ${data.height} пикселей. Нажмите «Готово», чтобы сохранить.`,

    'studio.consignArtwork.assetMedia.formats': (data: {
        format: 'original' | 'display' | 'exhibition' | 'preview' | 'print';
    }) => {
        if (data.format === 'original') return 'Оригинал';
        if (data.format === 'display') return 'Отображение';
        if (data.format === 'exhibition') return 'Выставка';
        if (data.format === 'preview') return 'Предварительный просмотр';
        if (data.format === 'print') return 'Печать';
        return '';
    },

    'studio.consignArtwork.assetMedia.modalError.title': 'Ой! Загруженный вами медиафайл имеет следующие проблемы:',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.title': 'Размеры',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.description': (data: {
        definition: string;
        format: string;
        width: string;
        height: string;
    }) =>
        `— Медиафайл для ${data.definition} изображения (${data.format}) должен быть как минимум ${data.width} x ${data.height} пикселей`,

    'studio.consignArtwork.assetMedia.modalErrorSize.title': 'Размер',
    'studio.consignArtwork.assetMedia.modalErrorSize.description': (data: {
        definition: string;
        format: string;
        sizeError: string;
    }) =>
        `— Размер медиафайла для ${data.definition} изображения (${data.format}) не может превышать ${data.sizeError}`,

    'studio.consignArtwork.assetMedia.dragAndDrop': 'ЗАГРУЗКА ОРИГИНАЛЬНОГО ИЗОБРАЖЕНИЯ',
    'studio.consignArtwork.assetMedia.dragAndDrop.description':
        'Чтобы загрузить свою оригинальную художественную работу, перетащите свой файл сюда или нажмите, чтобы выбрать файл с вашего компьютера.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Изображение: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Видео: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Метаданные медиафайлов',
    'studio.consignArtwork.assetMetadata.description': 'Все метаданные видны публике.',

    'studio.consignArtwork.assetMetadata.section.context': 'Контекст',
    'studio.consignArtwork.assetMetadata.section.taxonomy': 'Таксономия',
    'studio.consignArtwork.assetMetadata.section.creators': 'Авторы',
    'studio.consignArtwork.assetMetadata.section.provenance': 'Происхождение',
    'studio.consignArtwork.assetMetadata.section.custom': 'Дополнительно',
    'studio.consignArtwork.assetMetadata.section.assets': 'Медиафайлы',

    'studio.consignArtwork.assetMetadata.field.title': 'Название',
    'studio.consignArtwork.assetMetadata.field.title.description': 'Название работы',

    'studio.consignArtwork.assetMetadata.field.description': 'Описание',
    'studio.consignArtwork.assetMetadata.field.description.description':
        'Короткое описание работы. Более развёрнутое описание работы можно заполнить в разделе Дополнительных Медиафайлов',

    'studio.consignArtwork.assetMetadata.field.mood': 'Настроение',
    'studio.consignArtwork.assetMetadata.field.mood.description': 'Чувства, вызываемые произведением',

    'studio.consignArtwork.assetMetadata.field.mood.enum.admiration': 'Восхищение',
    'studio.consignArtwork.assetMetadata.field.mood.enum.absorbing': 'Поглащение',
    'studio.consignArtwork.assetMetadata.field.mood.enum.amusement': 'Веселье',
    'studio.consignArtwork.assetMetadata.field.mood.enum.adoration': 'Почтение',
    'studio.consignArtwork.assetMetadata.field.mood.enum.awe': 'Страх',
    'studio.consignArtwork.assetMetadata.field.mood.enum.anxiety': 'Тревога',
    'studio.consignArtwork.assetMetadata.field.mood.enum.boredom': 'Скука',
    'studio.consignArtwork.assetMetadata.field.mood.enum.brooding': 'Задумчивость',
    'studio.consignArtwork.assetMetadata.field.mood.enum.calmness': 'Спокойствие',
    'studio.consignArtwork.assetMetadata.field.mood.enum.chills': 'Мурашки',
    'studio.consignArtwork.assetMetadata.field.mood.enum.chaotic': 'Хаотичность',
    'studio.consignArtwork.assetMetadata.field.mood.enum.connectedness': 'Связь',
    'studio.consignArtwork.assetMetadata.field.mood.enum.cosmic': 'Космический',
    'studio.consignArtwork.assetMetadata.field.mood.enum.confusion': 'Замешательство',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dread': 'Страх',
    'studio.consignArtwork.assetMetadata.field.mood.enum.distaste': 'Неприязнь',
    'studio.consignArtwork.assetMetadata.field.mood.enum.disgust': 'Отвращение',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dreary': 'Мрачность',
    'studio.consignArtwork.assetMetadata.field.mood.enum.disorienting': 'Дезориентация',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dreamy': 'Мечтательность',
    'studio.consignArtwork.assetMetadata.field.mood.enum.desire': 'Желание',
    'studio.consignArtwork.assetMetadata.field.mood.enum.elegant': 'Изысканность',
    'studio.consignArtwork.assetMetadata.field.mood.enum.humorous': 'Юмористический',
    'studio.consignArtwork.assetMetadata.field.mood.enum.intimate': 'Интимный',
    'studio.consignArtwork.assetMetadata.field.mood.enum.intricate': 'Сложный',
    'studio.consignArtwork.assetMetadata.field.mood.enum.love': 'Любовь',
    'studio.consignArtwork.assetMetadata.field.mood.enum.lively': 'Живой',
    'studio.consignArtwork.assetMetadata.field.mood.enum.mystical': 'Мистический',
    'studio.consignArtwork.assetMetadata.field.mood.enum.mysterious': 'Таинственный',
    'studio.consignArtwork.assetMetadata.field.mood.enum.nostalgia': 'Ностальгия',
    'studio.consignArtwork.assetMetadata.field.mood.enum.ornate': 'Изысканный',
    'studio.consignArtwork.assetMetadata.field.mood.enum.psychedelic': 'Психоделический',
    'studio.consignArtwork.assetMetadata.field.mood.enum.serenity': 'Смирение',
    'studio.consignArtwork.assetMetadata.field.mood.enum.sadness': 'Печаль',
    'studio.consignArtwork.assetMetadata.field.mood.enum.sensual': 'Нежность',
    'studio.consignArtwork.assetMetadata.field.mood.enum.spiritual': 'Духовность',
    'studio.consignArtwork.assetMetadata.field.mood.enum.strange': 'Странный',
    'studio.consignArtwork.assetMetadata.field.mood.enum.striking': 'Заметный',
    'studio.consignArtwork.assetMetadata.field.mood.enum.tragic': 'Трагический',
    'studio.consignArtwork.assetMetadata.field.mood.enum.tense': 'Напряженный',
    'studio.consignArtwork.assetMetadata.field.mood.enum.vibrant': 'Яркий',
    'studio.consignArtwork.assetMetadata.field.mood.enum.violent': 'Жестокий',
    'studio.consignArtwork.assetMetadata.field.mood.enum.wonder': 'Изумительный',
    'studio.consignArtwork.assetMetadata.field.mood.enum.whimsical': 'Причудливый',

    'studio.consignArtwork.assetMetadata.field.copyright': 'Копирайт',
    'studio.consignArtwork.assetMetadata.field.copyright.description':
        'Текст копирайта. (Пример: Copyright (c) 2024 Joe Artist)',

    'studio.consignArtwork.assetMetadata.field.colors': 'Цвета',
    'studio.consignArtwork.assetMetadata.field.colors.item': 'Цвет',
    'studio.consignArtwork.assetMetadata.field.colors.description': 'Основная цветовая палитра (до трёх цветов)',

    'studio.consignArtwork.assetMetadata.field.orientation': 'Ориентация',
    'studio.consignArtwork.assetMetadata.field.orientation.description': 'Ориентация работы',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.horizontal': 'Горизонтальная',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.vertical': 'Вертикальная',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.square': 'Квадрат',

    'studio.consignArtwork.assetMetadata.field.culture': 'Культурная принадлежность',
    'studio.consignArtwork.assetMetadata.field.culture.description': 'Основная культура',

    'studio.consignArtwork.assetMetadata.field.culture.enum.african': 'Африканская',
    'studio.consignArtwork.assetMetadata.field.culture.enum.centralasian': 'Центральной Азии',
    'studio.consignArtwork.assetMetadata.field.culture.enum.eastasian': 'Восточноазиатская',
    'studio.consignArtwork.assetMetadata.field.culture.enum.islamic': 'Исламская',
    'studio.consignArtwork.assetMetadata.field.culture.enum.latinamerican': 'Латиноамериканская',
    'studio.consignArtwork.assetMetadata.field.culture.enum.nativeamerican': 'Коренных Американцев',
    'studio.consignArtwork.assetMetadata.field.culture.enum.oceanic': 'Океаническая',
    'studio.consignArtwork.assetMetadata.field.culture.enum.southasian': 'Южноазиатская',
    'studio.consignArtwork.assetMetadata.field.culture.enum.southeastasian': 'Юго-Восточноазиатская',
    'studio.consignArtwork.assetMetadata.field.culture.enum.western': 'Западная',

    'studio.consignArtwork.assetMetadata.field.objectType': 'Тип',
    'studio.consignArtwork.assetMetadata.field.objectType.description': 'Тип работы',

    'studio.consignArtwork.assetMetadata.field.objectType.enum.digitalart': 'Цифровое Искусство',
    'studio.consignArtwork.assetMetadata.field.objectType.enum.physicalart': 'Физическое Искусство',
    'studio.consignArtwork.assetMetadata.field.objectType.enum.digitalphysicalart': 'Гибрид (Физическое+Цифровое)',

    'studio.consignArtwork.assetMetadata.field.tags': 'Тэги',
    'studio.consignArtwork.assetMetadata.field.tags.item': 'Тэг',
    'studio.consignArtwork.assetMetadata.field.tags.description': 'Тэги, относящиеся к работе',

    'studio.consignArtwork.assetMetadata.field.collections': 'Коллекции',
    'studio.consignArtwork.assetMetadata.field.collections.item': 'Коллекция',
    'studio.consignArtwork.assetMetadata.field.collections.description':
        'Коллекции для группировки работ (как минимум одна необходима)',

    'studio.consignArtwork.assetMetadata.field.category': 'Категория',
    'studio.consignArtwork.assetMetadata.field.category.description': 'Категория работы',

    'studio.consignArtwork.assetMetadata.field.category.enum.photography': 'Фотография',
    'studio.consignArtwork.assetMetadata.field.category.enum.painting': 'Картина',
    'studio.consignArtwork.assetMetadata.field.category.enum.threed': '3D',
    'studio.consignArtwork.assetMetadata.field.category.enum.video': 'Видео',
    'studio.consignArtwork.assetMetadata.field.category.enum.mixedmedia': 'Смешанный тип',
    'studio.consignArtwork.assetMetadata.field.category.enum.illustration': 'Иллюстрация',
    'studio.consignArtwork.assetMetadata.field.category.enum.collage': 'Коллаж',

    'studio.consignArtwork.assetMetadata.field.medium': 'Среда',
    'studio.consignArtwork.assetMetadata.field.medium.description': 'Среда, в которой выполнена работа',

    'studio.consignArtwork.assetMetadata.field.medium.enum.acrylic': 'Акрил',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ai': 'Искусственный Интеллект',
    'studio.consignArtwork.assetMetadata.field.medium.enum.airbrush': 'Аэрокисть',
    'studio.consignArtwork.assetMetadata.field.medium.enum.albumensilver': 'Альбуминовое серебро',
    'studio.consignArtwork.assetMetadata.field.medium.enum.algorithmic': 'Алгоритмический Арт',
    'studio.consignArtwork.assetMetadata.field.medium.enum.aluminium': 'Алюминий',
    'studio.consignArtwork.assetMetadata.field.medium.enum.appropriation': 'Аппроприация',
    'studio.consignArtwork.assetMetadata.field.medium.enum.aquatint': 'Акватинта',
    'studio.consignArtwork.assetMetadata.field.medium.enum.assemblage': 'Асембляж',
    'studio.consignArtwork.assetMetadata.field.medium.enum.augmentedreality': 'Дополненная реальность',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ballpoint': 'Шариковой ручкой',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bas-relief': 'Барельеф',
    'studio.consignArtwork.assetMetadata.field.medium.enum.basalt': 'Базальт',
    'studio.consignArtwork.assetMetadata.field.medium.enum.binder': 'Биндер',
    'studio.consignArtwork.assetMetadata.field.medium.enum.blockchain': 'Блокчейн',
    'studio.consignArtwork.assetMetadata.field.medium.enum.board': 'Доска',
    'studio.consignArtwork.assetMetadata.field.medium.enum.brass': 'Латунь',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bronze': 'Бронза',
    'studio.consignArtwork.assetMetadata.field.medium.enum.brush': 'Кисть',
    'studio.consignArtwork.assetMetadata.field.medium.enum.burlap': 'Мешковина',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bw': 'Чёрно Белый',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cable': 'Провода',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cameo': 'Камео',
    'studio.consignArtwork.assetMetadata.field.medium.enum.canvas': 'Холст',
    'studio.consignArtwork.assetMetadata.field.medium.enum.carbonfiber': 'Углеродное волокно',
    'studio.consignArtwork.assetMetadata.field.medium.enum.card': 'Карта',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cardboard': 'Картон',
    'studio.consignArtwork.assetMetadata.field.medium.enum.casein': 'Казеин',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cement': 'Цемент',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ceramic': 'Керамика',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ceramics': 'Керамический',
    'studio.consignArtwork.assetMetadata.field.medium.enum.chalk': 'Мел',
    'studio.consignArtwork.assetMetadata.field.medium.enum.charcoal': 'Уголь (Charcoal)',
    'studio.consignArtwork.assetMetadata.field.medium.enum.chisel': 'Долото',
    'studio.consignArtwork.assetMetadata.field.medium.enum.clay': 'Глина',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cliché-verre': 'Клише-вер',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cloth': 'Ткань',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coal': 'Уголь',
    'studio.consignArtwork.assetMetadata.field.medium.enum.collage': 'Коллаж',
    'studio.consignArtwork.assetMetadata.field.medium.enum.collotype': 'Коллотип',
    'studio.consignArtwork.assetMetadata.field.medium.enum.color': 'Цвет',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coloredmarkers': 'Цветные маркеры',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coloredpencils': 'Цветные карандаши',
    'studio.consignArtwork.assetMetadata.field.medium.enum.colorvarnish': 'Цветной лак',
    'studio.consignArtwork.assetMetadata.field.medium.enum.concrete': 'Бетон',
    'studio.consignArtwork.assetMetadata.field.medium.enum.conte': 'Конт-мелок',
    'studio.consignArtwork.assetMetadata.field.medium.enum.copper': 'Медь',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cotton': 'Хлопок',
    'studio.consignArtwork.assetMetadata.field.medium.enum.crayon': 'Мелки',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ctype': 'C-процесс',
    'studio.consignArtwork.assetMetadata.field.medium.enum.decoupage': 'Декупаж',
    'studio.consignArtwork.assetMetadata.field.medium.enum.digital': 'Цифровой',
    'studio.consignArtwork.assetMetadata.field.medium.enum.drawing': 'Рисунок',
    'studio.consignArtwork.assetMetadata.field.medium.enum.drypoint': 'Сухая игла',
    'studio.consignArtwork.assetMetadata.field.medium.enum.dust': 'Пыль',
    'studio.consignArtwork.assetMetadata.field.medium.enum.dye': 'Перенос цвета (фотография)',
    'studio.consignArtwork.assetMetadata.field.medium.enum.elephantdung': 'Слоновий навоз',
    'studio.consignArtwork.assetMetadata.field.medium.enum.embroidery': 'Вышивка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.emulsion': 'Эмульсия',
    'studio.consignArtwork.assetMetadata.field.medium.enum.enamel': 'Эмаль',
    'studio.consignArtwork.assetMetadata.field.medium.enum.encaustic': 'Энкаустика',
    'studio.consignArtwork.assetMetadata.field.medium.enum.engraving': 'Гравюра',
    'studio.consignArtwork.assetMetadata.field.medium.enum.environmental': 'Экологическое искусство',
    'studio.consignArtwork.assetMetadata.field.medium.enum.etching': 'Травление',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fabric': 'Ткань',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fabricstraps': 'Тканевые ремни',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fat': 'Жир',
    'studio.consignArtwork.assetMetadata.field.medium.enum.feather': 'Перо',
    'studio.consignArtwork.assetMetadata.field.medium.enum.felt-tippen': 'Фломастер',
    'studio.consignArtwork.assetMetadata.field.medium.enum.felt': 'Фетр',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiber': 'Волокно',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiberboard': 'Фиброборд (деревянная плита)',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiberglass': 'Стеклопластик',
    'studio.consignArtwork.assetMetadata.field.medium.enum.flashlight': 'Вспышка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fluorescentpaint': 'Флуоресцентная краска',
    'studio.consignArtwork.assetMetadata.field.medium.enum.found': 'Найденные объекты',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fractal': 'Фрактал',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fresco': 'Фреска',
    'studio.consignArtwork.assetMetadata.field.medium.enum.frottage': 'Фроттаж',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fullspectrum': 'Полный спектр',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gelatin': 'Желатин',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gelatinsilverprint': 'Серебряный принт на желатине',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gesso': 'Гипс (материал для подготовки холста)',
    'studio.consignArtwork.assetMetadata.field.medium.enum.giclee': 'Жикле (процесс цифровой печати)',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gilt': 'Позолота',
    'studio.consignArtwork.assetMetadata.field.medium.enum.glass': 'Стекло',
    'studio.consignArtwork.assetMetadata.field.medium.enum.glitter': 'Блеск',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gloss': 'Глянец',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gold': 'Золото',
    'studio.consignArtwork.assetMetadata.field.medium.enum.goldleaf': 'Золотая фольга',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gouache': 'Гуашь',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graffiti': 'Граффити',
    'studio.consignArtwork.assetMetadata.field.medium.enum.granite': 'Гранит',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graphite': 'Графит',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graphitepencil': 'Графитный карандаш',
    'studio.consignArtwork.assetMetadata.field.medium.enum.grattage': 'Граташ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.greenstone': 'Изумруд',
    'studio.consignArtwork.assetMetadata.field.medium.enum.grisaille': 'Грисайль',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gumarabic': 'Арабская гуммиа',
    'studio.consignArtwork.assetMetadata.field.medium.enum.hematite': 'Гематит',
    'studio.consignArtwork.assetMetadata.field.medium.enum.hemp': 'Конопля',
    'studio.consignArtwork.assetMetadata.field.medium.enum.hologram': 'Голография',
    'studio.consignArtwork.assetMetadata.field.medium.enum.horns': 'Рога',
    'studio.consignArtwork.assetMetadata.field.medium.enum.household': 'Бытовой',
    'studio.consignArtwork.assetMetadata.field.medium.enum.indianink': 'Индийская тушь',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ink': 'Чернила',
    'studio.consignArtwork.assetMetadata.field.medium.enum.intaglio': 'Интальо',
    'studio.consignArtwork.assetMetadata.field.medium.enum.interactive': 'Интерактивный',
    'studio.consignArtwork.assetMetadata.field.medium.enum.iron': 'Железо',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ironplate': 'Железная пластина',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ivory': 'Слоновья кость',
    'studio.consignArtwork.assetMetadata.field.medium.enum.japanesepaper': 'Японская бумага',
    'studio.consignArtwork.assetMetadata.field.medium.enum.jute': 'Джут',
    'studio.consignArtwork.assetMetadata.field.medium.enum.kinetic': 'Кинетический',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lacquer': 'Лак',
    'studio.consignArtwork.assetMetadata.field.medium.enum.laidpaper': 'Пергамент',
    'studio.consignArtwork.assetMetadata.field.medium.enum.latex': 'Латекс',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lavis': 'Лавис',
    'studio.consignArtwork.assetMetadata.field.medium.enum.leadpoint': 'Графитный карандаш',
    'studio.consignArtwork.assetMetadata.field.medium.enum.leather': 'Кожа',
    'studio.consignArtwork.assetMetadata.field.medium.enum.led': 'Светодиод',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lemon': 'Лимон',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lenticular': 'Линзовый',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lightbox': 'Световая коробка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lightbulb': 'Лампочка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lights': 'Огни',
    'studio.consignArtwork.assetMetadata.field.medium.enum.limestone': 'Известняк',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linen': 'Льняное полотно',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocut': 'Линогравюра',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocutb&w': 'Черно-белая линогравюра',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocutcolor': 'Цветная линогравюра',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocuts': 'Линогравюры',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linoleum': 'Линолеум',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lithograph': 'Литограф',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lithography': 'Литография',
    'studio.consignArtwork.assetMetadata.field.medium.enum.magna': 'Магна',
    'studio.consignArtwork.assetMetadata.field.medium.enum.magnets': 'Магниты',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mahoganypanel': 'Махагоновая панель',
    'studio.consignArtwork.assetMetadata.field.medium.enum.majolica': 'Маджолика',
    'studio.consignArtwork.assetMetadata.field.medium.enum.manipulated': 'Манипулированный',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mappins': 'Маппинг-проекции',
    'studio.consignArtwork.assetMetadata.field.medium.enum.marble': 'Мрамор',
    'studio.consignArtwork.assetMetadata.field.medium.enum.marker': 'Маркер',
    'studio.consignArtwork.assetMetadata.field.medium.enum.maskingtape': 'Маскирующий скотч',
    'studio.consignArtwork.assetMetadata.field.medium.enum.masonite': 'Масонит',
    'studio.consignArtwork.assetMetadata.field.medium.enum.metal': 'Металл',
    'studio.consignArtwork.assetMetadata.field.medium.enum.metalpoint': 'Металлическая точка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mezzotint': 'Меззотинта',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mixedmedia': 'Смешанные медиа',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mixedtechnique': 'Смешанная техника',
    'studio.consignArtwork.assetMetadata.field.medium.enum.monotype': 'Монотипия',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mosaic': 'Мозаика',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mosaïque': 'Французская Мозаика',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mural': 'Мурал',
    'studio.consignArtwork.assetMetadata.field.medium.enum.music': 'Музыка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.musicpaper': 'Нотная бумага',
    'studio.consignArtwork.assetMetadata.field.medium.enum.nails': 'Гвозди',
    'studio.consignArtwork.assetMetadata.field.medium.enum.neon': 'Неон',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oak': 'Дуб',
    'studio.consignArtwork.assetMetadata.field.medium.enum.objettrouve': 'Найденный объект (фр.)',
    'studio.consignArtwork.assetMetadata.field.medium.enum.obsidian': 'Обсидиан',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oil': 'Масло',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oilcloth': 'Масленка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.onyx': 'Оникс',
    'studio.consignArtwork.assetMetadata.field.medium.enum.paint': 'Краска',
    'studio.consignArtwork.assetMetadata.field.medium.enum.paintedmetal': 'Покрашенный металл',
    'studio.consignArtwork.assetMetadata.field.medium.enum.panel': 'Панель',
    'studio.consignArtwork.assetMetadata.field.medium.enum.paper': 'Бумага',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papermache': 'Папье-маше',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papier-pelle': 'Папье-пелле',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papyrus': 'Папирус',
    'studio.consignArtwork.assetMetadata.field.medium.enum.parchment': 'Пергамент',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pastel': 'Пастель',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pebbles': 'Галька',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pen': 'Ручка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pencil': 'Карандаш',
    'studio.consignArtwork.assetMetadata.field.medium.enum.penink': 'Ручка и чернила',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pergament': 'Пергамент',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photo': 'Фото',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photogram': 'Фотограмма',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photographicpaper': 'Фотографическая бумага',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photography': 'Фотография',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photogravure': 'Фотогравюра',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photomontage': 'Фотомонтаж',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photomosaic': 'Фотомозаика',
    'studio.consignArtwork.assetMetadata.field.medium.enum.piano': 'Фортепиано',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pigment': 'Пигмент',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pinhole': 'Пинхол',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plaster': 'Штукатурка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plastic': 'Пластик',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plates': 'Пластины',
    'studio.consignArtwork.assetMetadata.field.medium.enum.platinum': 'Платина',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plexiglas': 'Плексиглас',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plugsocket': 'Розетка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plywood': 'Фанера',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polaroid': 'Полароид',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polyester': 'Полиэстер',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polymer': 'Полимер',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polymerpaint': 'Полимерная краска',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polystyrene': 'Полистирол',
    'studio.consignArtwork.assetMetadata.field.medium.enum.poplar': 'Тополь',
    'studio.consignArtwork.assetMetadata.field.medium.enum.porcelain': 'Фарфор',
    'studio.consignArtwork.assetMetadata.field.medium.enum.postcard': 'Открытка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pottery': 'Керамика',
    'studio.consignArtwork.assetMetadata.field.medium.enum.poetry': 'Поэзия',
    'studio.consignArtwork.assetMetadata.field.medium.enum.precious': 'Драгоценные материалы',
    'studio.consignArtwork.assetMetadata.field.medium.enum.print': 'Печать',
    'studio.consignArtwork.assetMetadata.field.medium.enum.printedbrochure': 'Напечатанная брошюра',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pyroxylin': 'Пироксилин',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ready-made': 'Готовое изделие',
    'studio.consignArtwork.assetMetadata.field.medium.enum.recorderwithcassette': 'Рекордер с кассетой',
    'studio.consignArtwork.assetMetadata.field.medium.enum.resin': 'Смола',
    'studio.consignArtwork.assetMetadata.field.medium.enum.robotics': 'Робототехника',
    'studio.consignArtwork.assetMetadata.field.medium.enum.rubber': 'Резина',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sand': 'Песок',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sandstone': 'Песчаник',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sanguine': 'Сангвиника',
    'studio.consignArtwork.assetMetadata.field.medium.enum.satin': 'Атлас',
    'studio.consignArtwork.assetMetadata.field.medium.enum.scrapings': 'Скоблени',
    'studio.consignArtwork.assetMetadata.field.medium.enum.screenprint': 'Шелкограф',
    'studio.consignArtwork.assetMetadata.field.medium.enum.screenprinting': 'Шелкография',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sculpting': '3D скульптура',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sepia': 'Сепия',
    'studio.consignArtwork.assetMetadata.field.medium.enum.shell': 'Ракушка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silk': 'Шелк',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silkscreen': 'Шелкография',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silver': 'Серебро',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silverpoint': 'Серебряная точка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sound': 'Звук',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sponge': 'Губка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.spraypaint': 'Краска в баллончике',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stainedglass': 'Витражное стекло',
    'studio.consignArtwork.assetMetadata.field.medium.enum.steel': 'Сталь',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stencil': 'Шаблон',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stone': 'Камень',
    'studio.consignArtwork.assetMetadata.field.medium.enum.string': 'Нить',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stucco': 'Штукатурка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stump': 'Трубка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tapestry': 'Гобелен',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tar': 'Деготь',
    'studio.consignArtwork.assetMetadata.field.medium.enum.taxidermy': 'Таксидермия',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tempera': 'Темпера',
    'studio.consignArtwork.assetMetadata.field.medium.enum.terracotta': 'Терракота',
    'studio.consignArtwork.assetMetadata.field.medium.enum.textile': 'Текстиль',
    'studio.consignArtwork.assetMetadata.field.medium.enum.timber': 'Древесина',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tin': 'Олово',
    'studio.consignArtwork.assetMetadata.field.medium.enum.travertine': 'Травертин',
    'studio.consignArtwork.assetMetadata.field.medium.enum.turquoise': 'Бирюза',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tusche': 'Тушь',
    'studio.consignArtwork.assetMetadata.field.medium.enum.twine': 'Веревка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.varnish': 'Лак',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vector': 'Вектор',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vellum': 'Веллум',
    'studio.consignArtwork.assetMetadata.field.medium.enum.video': 'Видео',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vinyl': 'Винил',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vitrage': 'Витраж',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wall': 'Стена',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wallpaper': 'Обои',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wash': 'Мытье',
    'studio.consignArtwork.assetMetadata.field.medium.enum.watercolor': 'Акварель',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wax': 'Воск',
    'studio.consignArtwork.assetMetadata.field.medium.enum.waxpastel': 'Восковая пастель',
    'studio.consignArtwork.assetMetadata.field.medium.enum.white': 'Белый',
    'studio.consignArtwork.assetMetadata.field.medium.enum.whitewash': 'Мел',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wine': 'Вино',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wire': 'Проволока',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wood': 'Дерево',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodblockprint': 'Деревянная гравюра',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodcut': 'Деревянная гравюра',
    'studio.consignArtwork.assetMetadata.field.medium.enum.film': 'Пленка',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodenchair': 'Деревянный стул',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodengraving': 'Деревянная гравюра',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodensled': 'Деревянный санки',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wool': 'Шерсть',
    'studio.consignArtwork.assetMetadata.field.medium.enum.zinc': 'Цинк',

    'studio.consignArtwork.assetMetadata.field.style': 'Стиль',
    'studio.consignArtwork.assetMetadata.field.style.description': 'Стиль работы',

    'studio.consignArtwork.assetMetadata.field.style.enum.abstract': 'Абстракционизм',
    'studio.consignArtwork.assetMetadata.field.style.enum.abstractexpressionism': 'Абстрактный экспрессионизм',
    'studio.consignArtwork.assetMetadata.field.style.enum.artdeco': 'Арт-Деко',
    'studio.consignArtwork.assetMetadata.field.style.enum.conceptual': 'Концептуализм',
    'studio.consignArtwork.assetMetadata.field.style.enum.cubism': 'Кубизм',
    'studio.consignArtwork.assetMetadata.field.style.enum.dada': 'Дадаизм',
    'studio.consignArtwork.assetMetadata.field.style.enum.documentary': 'Документализм',
    'studio.consignArtwork.assetMetadata.field.style.enum.expressionism': 'Экспрессионизм',
    'studio.consignArtwork.assetMetadata.field.style.enum.figurative': 'Фигуративизм',
    'studio.consignArtwork.assetMetadata.field.style.enum.fineart': 'Файн-Арт',
    'studio.consignArtwork.assetMetadata.field.style.enum.folk': 'Фольклор',
    'studio.consignArtwork.assetMetadata.field.style.enum.illustration': 'Иллюстрация',
    'studio.consignArtwork.assetMetadata.field.style.enum.impressionism': 'Импрессионизм',
    'studio.consignArtwork.assetMetadata.field.style.enum.minimalism': 'Минимализм',
    'studio.consignArtwork.assetMetadata.field.style.enum.modern': 'Современное искусство',
    'studio.consignArtwork.assetMetadata.field.style.enum.photorealism': 'Фотореализм',
    'studio.consignArtwork.assetMetadata.field.style.enum.popart': 'Поп-арт',
    'studio.consignArtwork.assetMetadata.field.style.enum.portraiture': 'Портрет',
    'studio.consignArtwork.assetMetadata.field.style.enum.realism': 'Реализм',
    'studio.consignArtwork.assetMetadata.field.style.enum.streetart': 'Стрит-арт',
    'studio.consignArtwork.assetMetadata.field.style.enum.surrealism': 'Сюрреализм',

    'studio.consignArtwork.assetMetadata.field.subject': 'Сюжет',
    'studio.consignArtwork.assetMetadata.field.subject.description':
        'Ключевые слова, описывающие сюжет работы',

    'studio.consignArtwork.assetMetadata.field.subject.enum.abstract': 'Абстракция',
    'studio.consignArtwork.assetMetadata.field.subject.enum.aerial': 'Аэреальный',
    'studio.consignArtwork.assetMetadata.field.subject.enum.aeroplane': 'Аэроплан',
    'studio.consignArtwork.assetMetadata.field.subject.enum.animal': 'Животные',
    'studio.consignArtwork.assetMetadata.field.subject.enum.architecture': 'Архитектура',
    'studio.consignArtwork.assetMetadata.field.subject.enum.automobile': 'Автомобили',
    'studio.consignArtwork.assetMetadata.field.subject.enum.beach': 'Пляж',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bicycle': 'Велосипед',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bike': 'Байк',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bird': 'Птица',
    'studio.consignArtwork.assetMetadata.field.subject.enum.boat': 'Лодка',
    'studio.consignArtwork.assetMetadata.field.subject.enum.body': 'Тело',
    'studio.consignArtwork.assetMetadata.field.subject.enum.botanic': 'Ботаника',
    'studio.consignArtwork.assetMetadata.field.subject.enum.business': 'Бизнесс',
    'studio.consignArtwork.assetMetadata.field.subject.enum.calligraphy': 'Калиграфия',
    'studio.consignArtwork.assetMetadata.field.subject.enum.car': 'Машина',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cartoon': 'Мультфильм',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cats': 'Котики',
    'studio.consignArtwork.assetMetadata.field.subject.enum.celebrity': 'Знаменитость',
    'studio.consignArtwork.assetMetadata.field.subject.enum.children': 'Ребёнок',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cinema': 'Кино',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cities': 'Города',
    'studio.consignArtwork.assetMetadata.field.subject.enum.classicalmythology': 'Классические мелодии',
    'studio.consignArtwork.assetMetadata.field.subject.enum.comics': 'Космический',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cows': 'Коровы',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cuisine': 'Кухня',
    'studio.consignArtwork.assetMetadata.field.subject.enum.culture': 'Культура',
    'studio.consignArtwork.assetMetadata.field.subject.enum.dogs': 'Собаки',
    'studio.consignArtwork.assetMetadata.field.subject.enum.education': 'Образование',
    'studio.consignArtwork.assetMetadata.field.subject.enum.erotic': 'Эротика',
    'studio.consignArtwork.assetMetadata.field.subject.enum.family': 'Семья',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fantasy': 'Фантазия',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fashion': 'Мода',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fish': 'Рыба',
    'studio.consignArtwork.assetMetadata.field.subject.enum.floral': 'Флора',
    'studio.consignArtwork.assetMetadata.field.subject.enum.food': 'Пища',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fooddrink': 'Еда и напитки',
    'studio.consignArtwork.assetMetadata.field.subject.enum.garden': 'Сад',
    'studio.consignArtwork.assetMetadata.field.subject.enum.geometric': 'Геометрия',
    'studio.consignArtwork.assetMetadata.field.subject.enum.graffiti': 'Граффити',
    'studio.consignArtwork.assetMetadata.field.subject.enum.healthbeauty': 'Красота и здоровье',
    'studio.consignArtwork.assetMetadata.field.subject.enum.home': 'Дом',
    'studio.consignArtwork.assetMetadata.field.subject.enum.horse': 'Лошадь',
    'studio.consignArtwork.assetMetadata.field.subject.enum.humor': 'Юмор',
    'studio.consignArtwork.assetMetadata.field.subject.enum.interiors': 'Интерьеры',
    'studio.consignArtwork.assetMetadata.field.subject.enum.kids': 'Малыши',
    'studio.consignArtwork.assetMetadata.field.subject.enum.kitchen': 'Кухня',
    'studio.consignArtwork.assetMetadata.field.subject.enum.landscape': 'Пейзаж',
    'studio.consignArtwork.assetMetadata.field.subject.enum.language': 'Языки',
    'studio.consignArtwork.assetMetadata.field.subject.enum.light': 'Свет',
    'studio.consignArtwork.assetMetadata.field.subject.enum.love': 'Любов',
    'studio.consignArtwork.assetMetadata.field.subject.enum.men': 'Мужчина',
    'studio.consignArtwork.assetMetadata.field.subject.enum.mortality': 'Мораль',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motor': 'Мотор',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motorbike': 'Байк',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motorcycle': 'Мотоцикл',
    'studio.consignArtwork.assetMetadata.field.subject.enum.music': 'Музыка',
    'studio.consignArtwork.assetMetadata.field.subject.enum.nature': 'Природа',
    'studio.consignArtwork.assetMetadata.field.subject.enum.nude': 'Ню',
    'studio.consignArtwork.assetMetadata.field.subject.enum.outerspace': 'Дальний космос',
    'studio.consignArtwork.assetMetadata.field.subject.enum.patterns': 'Шаблоны',
    'studio.consignArtwork.assetMetadata.field.subject.enum.people': 'Люди',
    'studio.consignArtwork.assetMetadata.field.subject.enum.performingarts': 'Исполнительские искусства',
    'studio.consignArtwork.assetMetadata.field.subject.enum.places': 'Места',
    'studio.consignArtwork.assetMetadata.field.subject.enum.political': 'Политичный',
    'studio.consignArtwork.assetMetadata.field.subject.enum.politics': 'Политики',
    'studio.consignArtwork.assetMetadata.field.subject.enum.popculturecelebrity': 'Поп-культура/Знаменитость',
    'studio.consignArtwork.assetMetadata.field.subject.enum.popularculture': 'Поп-культура',
    'studio.consignArtwork.assetMetadata.field.subject.enum.portrait': 'Портрет',
    'studio.consignArtwork.assetMetadata.field.subject.enum.religion': 'Религи',
    'studio.consignArtwork.assetMetadata.field.subject.enum.religious': 'Рилигиозный',
    'studio.consignArtwork.assetMetadata.field.subject.enum.rurallife': 'Сельская жизнь',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sailboat': 'Парусник',
    'studio.consignArtwork.assetMetadata.field.subject.enum.science': 'Наука',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sciencetechnology': 'Наука/Технологии',
    'studio.consignArtwork.assetMetadata.field.subject.enum.seascape': 'Морской пейзаж',
    'studio.consignArtwork.assetMetadata.field.subject.enum.seasons': 'Времена года',
    'studio.consignArtwork.assetMetadata.field.subject.enum.ship': 'Корабль',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sport': 'Спорт',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sports': 'Спортивный',
    'studio.consignArtwork.assetMetadata.field.subject.enum.stilllife': 'Натюрморт',
    'studio.consignArtwork.assetMetadata.field.subject.enum.technology': 'Технология',
    'studio.consignArtwork.assetMetadata.field.subject.enum.time': 'Время',
    'studio.consignArtwork.assetMetadata.field.subject.enum.train': 'Поезд',
    'studio.consignArtwork.assetMetadata.field.subject.enum.travel': 'Путешестве',
    'studio.consignArtwork.assetMetadata.field.subject.enum.tree': 'Дерево',
    'studio.consignArtwork.assetMetadata.field.subject.enum.typography': 'Типография',
    'studio.consignArtwork.assetMetadata.field.subject.enum.wall': 'Стена',
    'studio.consignArtwork.assetMetadata.field.subject.enum.water': 'Вода',
    'studio.consignArtwork.assetMetadata.field.subject.enum.women': 'Женщина',
    'studio.consignArtwork.assetMetadata.field.subject.enum.worldculture': 'Мировая культура',

    'studio.consignArtwork.assetMetadata.field.genre': 'Жанр',
    'studio.consignArtwork.assetMetadata.field.genre.description': 'Жанр работы',

    'studio.consignArtwork.assetMetadata.field.aiGeneration': 'ИИ-генерация',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.description': 'Часть работы сгенерирована ИИ?',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.full': 'Работа полностью сгенерирована ИИ',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.partial': 'Часть работы сгенерирована ИИ',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.none': 'ИИ не использовался',

    'studio.consignArtwork.assetMetadata.field.arenabled': 'Дополненная Реальность доступна',
    'studio.consignArtwork.assetMetadata.field.arenabled.description': 'Доступна ли версия работы для отображения в Дополненной Реальности?',

    'studio.consignArtwork.assetMetadata.field.arenabled.enum.yes': 'Да',
    'studio.consignArtwork.assetMetadata.field.arenabled.enum.no': 'Нет',

    'studio.consignArtwork.assetMetadata.field.nudity': 'Обножённая натура',
    'studio.consignArtwork.assetMetadata.field.nudity.description': 'Содержит ли работа обнажённую натуру?',

    'studio.consignArtwork.assetMetadata.field.nudity.enum.yes': 'Данная работа содержит обнажённую натуру',
    'studio.consignArtwork.assetMetadata.field.nudity.enum.no': 'Данная работа не содержит обнажённой натуры',

    'studio.consignArtwork.assetMetadata.field.name': 'Имя Автора',
    'studio.consignArtwork.assetMetadata.field.name.description': 'Има Автора или псевдоним',

    'studio.consignArtwork.assetMetadata.field.roles': 'Роли Автора',
    'studio.consignArtwork.assetMetadata.field.roles.description': 'Роли Автора в создании работы',

    'studio.consignArtwork.assetMetadata.field.bio': 'Информация об Авторе',
    'studio.consignArtwork.assetMetadata.field.bio.description': 'Информация об Авторе (коротко, 3-4 предложения)',

    'studio.consignArtwork.assetMetadata.field.profileUrl': 'Ссылка на профиль Автора',
    'studio.consignArtwork.assetMetadata.field.profileUrl.description': 'Ссылка на профиль Автора',

    'studio.consignArtwork.assetMetadata.field.nationality': 'Национальность',
    'studio.consignArtwork.assetMetadata.field.nationality.description': 'Национальность или Страна Происхождения Автора',

    'studio.consignArtwork.assetMetadata.field.residence': 'Резиденция',
    'studio.consignArtwork.assetMetadata.field.residence.description': 'Страна проживания Автора',

    'studio.consignArtwork.assetMetadata.field.ethnicity': 'Этническая принадлежность',
    'studio.consignArtwork.assetMetadata.field.ethnicity.description': 'Этническая принадлежность автора',

    'studio.consignArtwork.assetMetadata.field.gender': 'Пол',
    'studio.consignArtwork.assetMetadata.field.gender.description': 'Пол Автора',

    'studio.consignArtwork.assetMetadata.field.country': 'Страна',
    'studio.consignArtwork.assetMetadata.field.country.description': 'Страна происхождения данной работы',

    'studio.consignArtwork.assetMetadata.field.plusCode': 'Плюс-Код',
    'studio.consignArtwork.assetMetadata.field.plusCode.description':
        'Например, Копенгаген, Дания, будет иметь плюс-код "MHJQ+4V" Вы можете выбрать подходящий плюс-код здесь: https://plus.codes/map',

    'studio.consignArtwork.assetMetadata.field.blockchain': 'Блокчейн',
    'studio.consignArtwork.assetMetadata.field.blockchain.description': 'Блокчейн',

    'studio.consignArtwork.assetMetadata.field.exhibitions': 'Выставки',
    'studio.consignArtwork.assetMetadata.field.exhibitions.item': 'Выставка',
    'studio.consignArtwork.assetMetadata.field.exhibitions.description': 'Выставки, в которых учавствовала работа',

    'studio.consignArtwork.assetMetadata.field.exhibitionName': 'Выставка',
    'studio.consignArtwork.assetMetadata.field.exhibitionName.description': 'Название выставки',

    'studio.consignArtwork.assetMetadata.field.exhibitionUrl': 'URL Выставки',
    'studio.consignArtwork.assetMetadata.field.exhibitionUrl.description': 'Ссылка на информацию о выставке',

    'studio.consignArtwork.assetMetadata.field.awards': 'Награды',
    'studio.consignArtwork.assetMetadata.field.awards.item': 'Награда',
    'studio.consignArtwork.assetMetadata.field.awards.description': 'Награды, полученные работой',

    'studio.consignArtwork.assetMetadata.field.awardName': 'Награда',
    'studio.consignArtwork.assetMetadata.field.awardName.description': 'Название награды',

    'studio.consignArtwork.assetMetadata.field.awardUrl': 'URL Награды',
    'studio.consignArtwork.assetMetadata.field.awardUrl.description': 'Ссылка на описание награды',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'required' || data.message === 'minItems' ? 'поле обязательно для заполнения' : ''}`,

    /* Licenses */

    'studio.consignArtwork.licenses.title': 'Лицензии',
    'studio.consignArtwork.licenses.description':
        'В настоящее время Vitruveo предлагает четыре способа лицензирования/продажи вашего произведения искусства. Здесь вы можете выбрать любой из вариантов лицензирования:',
    'studio.consignArtwork.licenses.oneLicense.error': 'Пожалуйста, добавьте хотя бы одну лицензию',
    'studio.consignArtwork.licenses.fillFields.error': 'Заполните поля правильно.',
    'studio.consignArtwork.licenses.alreadyAdded': 'Лицензия уже добавлена',
    'studio.consignArtwork.licenses.delete.button': 'Удалить',
    'studio.consignArtwork.licenses.add.button': 'Добавить',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'да' : data.checkBoolean === false ? 'нет' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'поле обязательно для заполнения' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'Потоковая (Stream) v1.0',
    'studio.consignArtwork.licenses.field.print': 'Печать (Print) v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'Максимальное количество единиц',
    'studio.consignArtwork.licenses.field.unitPrice': 'Цена за единицу',
    'studio.consignArtwork.licenses.field.maximumEditions': 'Максимальное количество изданий',
    'studio.consignArtwork.licenses.field.editionPrice': 'Цена издания',
    'studio.consignArtwork.licenses.field.elasticEditions': 'Эластичные издания',
    'studio.consignArtwork.licenses.license': 'Лицензия',

    'studio.consignArtwork.licenses.nft.ccby':
    'Эта лицензия позволяет распространять, ремикшировать, адаптировать и создавать новый работы на базе текущей в любом виде или формате, при условии, что указано авторство. Лицензия допускает коммерческое использование.',
'studio.consignArtwork.licenses.nft.ccbysa':
    'Эта лицензия позволяет распространять, ремикшировать, адаптировать и создавать производные работы на базе текуще в любом виде или формате, при условии, что указано авторство. Лицензия допускает коммерческое использование. Если вы ремикшируете, адаптируете или создаете производные работы на базе текущей, вы должны лицензировать новую работу той-же лицензией.',
'studio.consignArtwork.licenses.nft.ccbync':
    'Эта лицензия позволяет распространять, ремикшировать, адаптировать и создавать производные работы на базе текущей в любом виде или формате исключительно в некоммерческих целях, при условии, что указано авторство.',
'studio.consignArtwork.licenses.nft.ccbyncsa':
    'Эта лицензия позволяет распространять, ремикшировать, адаптировать и создавать производные работы на базе текущей в любом виде или формате исключительно в некоммерческих целях, при условии, что указано авторство. Если вы ремикшируете, адаптируете или создаете производные работы на базе текущей, вы должны лицензировать новую работу той-же лицензией.',
'studio.consignArtwork.licenses.nft.ccbynd':
    'Эта лицензия позволяет пользователям копировать и распространять работу в любом виде или формате только в неизмененной форме, при условии, что указано авторство.',
'studio.consignArtwork.licenses.nft.ccbyncnd':
    'Эта лицензия позволяет пользователям копировать и распространять работу в любом виде или формате только в неизмененной форме и исключительно в некоммерческих целях, при условии, что указано авторство.',
'studio.consignArtwork.licenses.nft.cc0':
    'CC0 (или также известная как CC Ноль) - это инструмент публичного отказа, который позволяет авторам отказаться от своих авторских прав и поместить свои работы в мировое общественное достояние. CC0 позволяет пользователям распространять, ремикшировать, адаптировать и создавать производные работы на материале в любом средстве или формате без каких-либо ограничений.',

    'studio.consignArtwork.licenses.nft.description':
        'Эта лицензия обеспечивает возможность продажи произведения искусства по одной из нескольких моделей ценообразования. При продаже происходит чеканка (mint) работы в виде NFT и передача NFT покупателю.',
    'studio.consignArtwork.licenses.nft.enable':
        'Включите эту лицензию, если хотите, чтобы покупатели получили право владения цифровой коллекционной копией произведения искусства.',

    'studio.consignArtwork.licenses.nft.selectEdition.title': 'Выберите издание',
    'studio.consignArtwork.licenses.nft.selectEdition.elasticEditions':
        'это гибкая модель, предоставляющая покупателю возможность объединять несколько копий издания в одну, динамически изменяя размер издания.',
    'studio.consignArtwork.licenses.nft.selectEdition.singleEdition': 'это фиксированная модель 1/1.',
    'studio.consignArtwork.licenses.nft.selectEdition.unlimitedEditions':
        'модель для неограниченных изданий: за символическую плату или бесплатно',

    'studio.consignArtwork.licenses.nft.elasticEditions.title': 'Эластичные издания',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice.title': 'Цена издания (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions.title': 'Количество изданий',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice.title': 'Общая стоимость (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount.title': 'Скидка на издание',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice':
        '“Цена издания” - это цена одной копии произведения искусства в долларах США.',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions':
        '“Количество изданий” - это количество копий произведения, которые могут быть созданы.',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice':
        '“Общая стоимость” - это “Цена издания” умноженная на “Количество изданий”.',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount':
        '“Скидка на издание” - это скидка для покупателя при покупке нескольких копий издания. Рассчитывается делением 10% на “Количество изданий”. Если включено, скидка применяется к каждой копии издания после первой.',
    'studio.consignArtwork.licenses.nft.singleEdition.title': 'Одиночное издание',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice':
        '“Цена издания” - это цена произведения искусства в долларах США.',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice.title': 'Цена издания (USD)',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.title': 'Неограниченные издания',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice':
        '“Цена издания” - это цена произведения искусства в долларах США.',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice.title': 'Цена издания (USD)',

    'studio.consignArtwork.licenses.stream.description':
        'Эта лицензия позволяет кураторам включать произведение искусства в плейлисты для потокового воспроизведения работ на дисплеях. Доходы от потокового воспроизведения автоматически рассчитываются на основе количества показов и стоимости показа.',
    'studio.consignArtwork.licenses.stream.enable':
        'Включите эту лицензию, если хотите, чтобы кураторы включали ваше произведение в плейлисты, используемые обычными пользователями и бизнесами для слайд-шоу на цифровых дисплеях.',
    'studio.consignArtwork.licenses.stream.enable.description':
        'Доходы от потокового воспроизведения автоматически рассчитываются на основе количества показов и стоимости показа.',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming': 'Неограниченное потоковое воспроизведение',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming.description':
        'Произведение может использоваться для потокового воспроизведения в неограниченных сценариях.',

    'studio.consignArtwork.licenses.print.description':
        'Эта лицензия предоставляет произведение конечным пользователям для печати на один физический объект с использованием технологии печати по требованию (POD). Лицензия свободно передается до момента первой печати, после чего она передается исключительно владельцу физического объекта.',
    'studio.consignArtwork.licenses.print.enable':
        'Включите эту лицензию, если хотите, чтобы конечные пользователи использовали ваше искусство для приложений печати по требованию (POD). Эта лицензия предназначена для индивидуальной печати; массовая печать не разрешена.',
    'studio.consignArtwork.licenses.print.singlePrint.title': 'Одиночная печать',
    'studio.consignArtwork.licenses.print.singlePrint.description':
        '“Цена за единицу” - это цена произведения искусства в долларах США за одну печать.',
    'studio.consignArtwork.licenses.print.singlePrint.field': 'Цена за единицу (USD)',

    'studio.consignArtwork.licenses.remix.description':
        'Эта лицензия позволяет конечным пользователям использовать работу в приложениях создания ремиксов с использованием',
    'studio.consignArtwork.licenses.remix.description2':
        'лицензии, которая разрешает использование ремиксов в некоммерческих целях.',
    'studio.consignArtwork.licenses.remix.singleRemix.title': 'Одиночный ремикс',
    'studio.consignArtwork.licenses.remix.singleRemix.description':
        '“Цена за единицу” - это цена произведения искусства в долларах США за один ремикс.',
    'studio.consignArtwork.licenses.remix.singleRemix.field': 'Цена за единицу (USD)',
    'studio.consignArtwork.licenses.remix.enable':
        'Включите эту лицензию, если хотите, чтобы конечные пользователи использовали ваше искусство в приложениях создания ремиксов. Результат ремикса может использоваться только в некоммерческих целях.',

    /* Terms of Use */
    'studio.consignArtwork.termsOfUse.title': 'Условия использования',
    'studio.consignArtwork.termsOfUse.description':
        'Выполните все необходимые задачи и передайте свое произведение искусства',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'принят' : data.scrolledToBottom ? 'Принять договор' : 'Прокрутите до конца',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'Я подтверждаю, что основной и вспомогательные медиафайлы являются оригинальными, подлинными работами, созданными указанными в метаданных создателями, и не скопированы или украдены (не являются плагиатом) из какого-либо другого источника.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'Я подтверждаю, что если какая-либо часть основного и вспомогательных медиафайлов была создана с использованием искусственного интеллекта, я ответил "Да" в поле метаданных "Генерации ИИ".',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'Я подтверждаю, что это произведение не чеканилось (mint) на любой другой платформе и/или сети, не предлагается, не подано и не выставляется на продажу на любой другой платформе или сети и не будет отчеканено, предложено, подано или выставлено на продажу, пока листинг активен на этой платформе.',

    /* Auxiliary Media */
    'studio.consignArtwork.auxiliaryMedia.description':
        'Загрузите вспомогательные медиа-файлы: съёмки за сценой (BTS) и файлы дополненной реальности (AR).',
    'studio.consignArtwork.auxiliaryMedia.title': 'Вспомогательные медиа-файлы',
    'studio.consignArtwork.auxiliaryMedia.subTitle': 'Медиа-ресурсы вспомогательных файлов',
    'studio.consignArtwork.auxiliaryMedia.arImage.title': 'AR изображение',
    'studio.consignArtwork.auxiliaryMedia.arVideo.title': 'AR видео',
    'studio.consignArtwork.auxiliaryMedia.btsImage.title': 'BTS изображение',
    'studio.consignArtwork.auxiliaryMedia.btsVideo.title': 'BTS видео',
    'studio.consignArtwork.auxiliaryMedia.codeZip.title': 'ZIP-код',

    /* Consignment Status */
    'studio.consignArtwork.consignmentStatus.title': 'Статус подачи',
    'studio.consignArtwork.consignmentStatus.description':
        'Отличная работа! Ваша художественное произведение готово к подаче.',
    'studio.consignArtwork.consignmentStatus.message': 'Эта функция будет доступна скоро.',
    'studio.consignArtwork.consignmentStatus.yes': 'Да',
    'studio.consignArtwork.consignmentStatus.no': 'Нет',
    'studio.consignArtwork.consignmentStatus.edit': 'Редактировать',
    'studio.consignArtwork.consignmentStatus.view': 'Просмотр',
    'studio.consignArtwork.consignmentStatus.search': 'Поиск',
    'studio.consignArtwork.consignmentStatus.license': 'Лицензия',

    'studio.consignArtwork.consignmentStatus.draft.title': 'Черновик',
    'studio.consignArtwork.consignmentStatus.preview.title': 'Предпросмотр',
    'studio.consignArtwork.consignmentStatus.activate.title': 'Активировать',

    'studio.consignArtwork.consignmentStatus.activation.title': 'Активация',
    'studio.consignArtwork.consignmentStatus.activation.description':
        'Активация передает ваше произведение искусства на блокчейн и требует кредитов художника.',
    'studio.consignArtwork.consignmentStatus.creatorCreditsRequired': 'Кредитов Художника необходимо',
    'studio.consignArtwork.consignmentStatus.creatorCreditsAvailable': 'Кредитов Художника доступно',
    'studio.consignArtwork.consignmentStatus.viewArtwork.button': 'Просмотреть произведение искусства',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'Хотите сохранить информацию?',
    'studio.consignArtwork.backModal.confirm.button': 'Сохранить',
    'studio.consignArtwork.backModal.cancel.button': 'Нет',

    /* Sidebar */
    'studio.sidebar.consign': 'Подать Работу',

    /* Footer */
    'studio.footer.thisStep': 'Текущий шаг',
    'studio.footer.completed': 'Завершено',
    'studio.footer.inProgress': 'В процессе',
    'studio.footer.notYet': 'и еще не завершено',
    'studio.footer.step': 'Шаг',
    'studio.footer.of': 'из',
    'studio.footer.save': 'Сохранить',
    'studio.footer.back': 'Назад',
};

export default language;