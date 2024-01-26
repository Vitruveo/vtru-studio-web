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
    'studio.home.congrats': 'Поздравляем с выбором в качестве художника Vitruveo Genesis',
    'studio.home.transforming':
        'Vitruveo трансформирует искусство Web3, и это означает совершенно новое программное обеспечение, такое как эта "Alpha" версия vtruStudio. Alpha означает, что программное обеспечение еще не полностью готово, и вы помогаете нам его тестировать, чтобы оно могло быть улучшено.',
    'studio.home.software':
        'У программного обеспечения в настоящее время есть две функции, к которым вы можете получить доступ с помощью кнопок ниже:',
    'studio.home.consign': 'Отправить арт',
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
        'Для доступа к передаче произведения искусства необходимо заполнить все обязательные поля в профиле пользователя',
    'studio.myProfile.form.username.title': 'Имя пользователя',
    'studio.myProfile.form.username.placeholder': 'Введите имя пользователя',
    'studio.myProfile.form.usernameRequired.error': 'Имя пользователя обязательно',
    'studio.myProfile.form.profile.title': 'Измените свою фотографию профиля здесь',
    'studio.myProfile.form.profile.reset.button': 'Сбросить',
    'studio.myProfile.form.profile.upload.button': 'Загрузить',
    'studio.myProfile.form.profile.description': 'Разрешенные форматы: JPG, GIF или PNG. Максимальный размер 800Кб',
    'studio.myProfile.form.emails.title': 'Электронная почта',
    'studio.myProfile.form.emailsExists.error': 'Электронная почта уже существует',
    'studio.myProfile.form.addEmails.placeholder': 'Введите новый адрес электронной почты',
    'studio.myProfile.form.code.placeholder': 'введите код...',
    'studio.myProfile.form.verify.button': 'Подтвердить',
    'studio.myProfile.form.delete.button': 'Удалить',
    'studio.myProfile.form.wallets.title': 'Кошельки',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'Код подтверждения отправлен на электронную почту',
    'studio.myProfile.verificationCodeSentMessageError': 'Ошибка отправки кода подтверждения на электронную почту',
    'studio.myProfile.emailVerificationMessageSuccess': 'Электронная почта подтверждена',
    'studio.myProfile.emailVerificationMessageError': 'Ошибка подтверждения кода',
    'studio.myProfile.form.wallet.placeholder': 'Подключить новый кошелек',
    'studio.myProfile.form.connect.button': 'Подключить',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Далее',
    'studio.consignArtwork.title': 'Отправить арт',
    'studio.consignArtwork.subtitle': 'Завершите все задачи и опубликуйте свое произведение искусства',

    'studio.consignArtwork.stepName.assetMedia': 'Медиа активы',
    'studio.consignArtwork.stepName.assetMetadata': 'Метаданные активов',
    'studio.consignArtwork.stepName.licenses': 'Лицензии',
    'studio.consignArtwork.stepName.termsOfUse': 'Условия использования',

    'studio.consignArtwork.stepStatus.completed': 'Завершено',
    'studio.consignArtwork.stepStatus.inProgress': 'В процессе',
    'studio.consignArtwork.stepStatus.notStarted': 'Не начато',
    'studio.consignArtwork.stepStatus.error': 'Ошибка',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Успешно опубликовано!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Редактировать' : 'Начать'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Опубликовано' : 'Опубликовать'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Медиа активы',
    'studio.consignArtwork.assetMedia.description': 'Загрузите медиа активы для порученного произведения искусства.',
    'studio.consignArtwork.assetMedia.amazing':
        'Выглядит потрясающе! Чтобы ваше произведение искусства выглядело отлично на разных устройствах, нам нужно еще три медиафайла. Не волнуйтесь, мы поможем вам обрезать ваш оригинальный медиафайл.',
    'studio.consignArtwork.assetMedia.concerned':
        'Если вы беспокоитесь о потере качества, не используйте функцию обрезки и загружайте медиа напрямую в требуемом размере.',
    'studio.consignArtwork.assetMedia.upload.button': 'Загрузить',
    'studio.consignArtwork.assetMedia.assets': 'Медиа активы',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${data.definition === 'landscape' ? 'Пейзаж' : data.definition === 'portrait' ? 'Портрет' : 'Квадрат'}`;
    },
    'studio.consignArtwork.assetMedia.image': 'изображение',
    'studio.consignArtwork.assetMedia.video': 'видео',
    'studio.consignArtwork.assetMedia.max': 'максимум',

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

    'studio.consignArtwork.assetMedia.dragAndDrop': 'Перетащите один медиафайл или нажмите, чтобы загрузить.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Изображение: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Видео: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Метаданные активов',
    'studio.consignArtwork.assetMetadata.description': 'Все метаданные ресурса видны публике.',

    'studio.consignArtwork.assetMetadata.field.artistName': 'Имя художника',
    'studio.consignArtwork.assetMetadata.field.title': 'Название',
    'studio.consignArtwork.assetMetadata.field.description': 'Описание',
    'studio.consignArtwork.assetMetadata.field.date': 'Дата',
    'studio.consignArtwork.assetMetadata.field.place': 'Место',

    'studio.consignArtwork.assetMetadata.field.objectType': 'Тип объекта',
    'studio.consignArtwork.assetMetadata.field.objectType.video': 'Видео',
    'studio.consignArtwork.assetMetadata.field.objectType.2D': '2D',
    'studio.consignArtwork.assetMetadata.field.objectType.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.objectType.phygital': 'Фигитал',
    'studio.consignArtwork.assetMetadata.field.objectType.other': 'Другое',

    'studio.consignArtwork.assetMetadata.field.category': 'Категория',
    'studio.consignArtwork.assetMetadata.field.category.photography': 'Фотография',
    'studio.consignArtwork.assetMetadata.field.category.painting': 'Живопись',
    'studio.consignArtwork.assetMetadata.field.category.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.category.video': 'Видео',
    'studio.consignArtwork.assetMetadata.field.category.mixedMedia': 'Смешанные медиа',
    'studio.consignArtwork.assetMetadata.field.category.illustration': 'Иллюстрация',
    'studio.consignArtwork.assetMetadata.field.category.collage': 'Коллаж',
    'studio.consignArtwork.assetMetadata.field.category.ai': 'AI',
    'studio.consignArtwork.assetMetadata.field.category.other': 'Другое',

    'studio.consignArtwork.assetMetadata.field.medium': 'Среда',
    'studio.consignArtwork.assetMetadata.field.medium.oil': 'Масло',
    'studio.consignArtwork.assetMetadata.field.medium.watercolour': 'Акварель',
    'studio.consignArtwork.assetMetadata.field.medium.acrylic': 'Акрил',
    'studio.consignArtwork.assetMetadata.field.medium.ink': 'Чернила',
    'studio.consignArtwork.assetMetadata.field.medium.illustration': 'Иллюстрация',
    'studio.consignArtwork.assetMetadata.field.medium.collage': 'Коллаж',
    'studio.consignArtwork.assetMetadata.field.medium.AI': 'AI',
    'studio.consignArtwork.assetMetadata.field.medium.mixedMedia': 'Смешанные медиа',
    'studio.consignArtwork.assetMetadata.field.medium.film': 'Фильм',
    'studio.consignArtwork.assetMetadata.field.medium.photography': 'Фотография',
    'studio.consignArtwork.assetMetadata.field.medium.analogPhotography': 'Аналоговая фотография',
    'studio.consignArtwork.assetMetadata.field.medium.digitalPhotography': 'Цифровая фотография',
    'studio.consignArtwork.assetMetadata.field.medium.compositePhotography': 'Композитная фотография',
    'studio.consignArtwork.assetMetadata.field.medium.other': 'Другое',
    'studio.consignArtwork.assetMetadata.field.tags': 'Теги',
    'studio.consignArtwork.assetMetadata.field.tags.button': 'Добавить',
    'studio.consignArtwork.assetMetadata.field.tags.placeholder': 'Добавить тег',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'required' ? 'поле обязательно для заполнения' : ''}`,

    /* Licenses */
    'studio.consignArtwork.licenses.title': 'Лицензии',
    'studio.consignArtwork.licenses.description':
        'Выберите одну или несколько лицензий для этого произведения искусства',
    'studio.consignArtwork.licenses.oneLicense.error': 'Пожалуйста, добавьте хотя бы одну лицензию',
    'studio.consignArtwork.licenses.fillFields.error': 'Заполните поля правильно.',
    'studio.consignArtwork.licenses.alreadyAdded': 'Лицензия уже добавлена',
    'studio.consignArtwork.licenses.delete.button': 'Удалить',
    'studio.consignArtwork.licenses.add.button': 'Добавить',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'да' : data.checkBoolean === false ? 'нет' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'поле обязательно для заполнения' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'Stream v1.0',
    'studio.consignArtwork.licenses.field.print': 'Print v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'Максимальное количество единиц',
    'studio.consignArtwork.licenses.field.unitPrice': 'Цена за единицу',
    'studio.consignArtwork.licenses.field.maximumEditions': 'Максимальное количество изданий',
    'studio.consignArtwork.licenses.field.editionPrice': 'Цена издания',
    'studio.consignArtwork.licenses.field.elasticEditions': 'Эластичные издания',

    /* Terms of Use */
    'studio.consignArtwork.termsOfUse.title': 'Условия использования',
    'studio.consignArtwork.termsOfUse.description': 'Завершите все задачи и опубликуйте свое произведение искусства',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'Договор принят' : data.scrolledToBottom ? 'Принять договор' : 'Прокрутите до конца',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'Я подтверждаю, что актив и вспомогательные медиафайлы являются оригинальными, подлинными работами, созданными указанными в заявке на метаданные создателями, и не скопированы, украдены или плагиатствованы из какого-либо другого источника.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'Я подтверждаю, что если какая-либо часть актива и вспомогательных медиафайлов была создана с использованием искусственного интеллекта, я ответил "Да" в поле метаданных "Произведение искусства, созданное AI".',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'Я подтверждаю, что это произведение не отчеканено на любой другой блокчейн, не предлагается, не передается или не выставляется на продажу на любой другой платформе и не будет отчеканено, предложено, передано или выставлено на продажу, пока листинг активен на этой платформе.',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'Хотите сохранить информацию?',
    'studio.consignArtwork.backModal.confirm.button': 'Сохранить',
    'studio.consignArtwork.backModal.cancel.button': 'Нет',

    /* Sidebar */
    'studio.sidebar.consign': 'Отправить арт',

    /* Footer */
    'studio.footer.thisStep': 'Этот шаг был',
    'studio.footer.completed': 'Завершено',
    'studio.footer.inProgress': 'В процессе',
    'studio.footer.notYet': 'и еще не завершено',
    'studio.footer.step': 'Шаг',
    'studio.footer.of': 'из',
    'studio.footer.save': 'Сохранить',
    'studio.footer.back': 'Назад',
};

export default language;
