import { Translation } from './types';

const language: Translation = {
    /* Login */

    /* Languages */
    'studio.languages.portuguesePTBR': 'پرتغالی (pt-BR)',
    'studio.languages.englishUS': 'انگلیسی (en-US)',
    'studio.languages.spanishES': 'اسپانیایی (es-ES)',
    'studio.languages.farsiFA': 'فارسی (fa-IR)',
    'studio.languages.russianRU': 'روسی (ru-RU)',

    /* Home */
    'studio.home.wellcome': 'خوش آمدید به',
    'studio.home.title': 'خانه',
    'studio.home.transforming':
        'ویتروو در حال تحول هنر وب3 است، و این به معنای نرم‌افزارهای کاملاً جدیدی مانند نسخه "آلفا" vtruStudio است. آلفا به معنای آن است که نرم‌افزار به طور کامل آماده نیست و شما به ما کمک می‌کنید تا آن را تست کرده و بهبود بخشیم.',
    'studio.home.software':
        'در حال حاضر، این نرم‌افزار دو ویژگی دارد که می‌توانید با دکمه‌های زیر به آن دسترسی پیدا کنید:',
    'studio.home.consign': 'قرارداد آثار هنری',
    'studio.home.myProfile': 'پروفایل من',

    /* User Account */
    'studio.userAccount.title': 'حساب کاربری',
    'studio.userAccount.creator': 'هنرمند',
    'studio.userAccount.logout.button': 'خروج',
    'studio.userAccount.menu.title': 'پروفایل من',
    'studio.userAccount.menu.subtitle': 'تنظیمات کاربری',

    /* My Profile */
    'studio.myProfile.title': 'پروفایل من',
    'studio.myProfile.subtitle': 'پروفایل ویتروو خود را با چندین آدرس ایمیل و کیف پول دلخواه خود سفارشی کنید.',
    'studio.myProfile.home': 'خانه',
    'studio.myProfile.saveMessage': 'اطلاعات با موفقیت ذخیره شد',
    'studio.myProfile.accessConsignMessage':
        'برای دسترسی به قرارداد آثار هنری، لازم است تمامی فیلدهای اجباری در پروفایل کاربری را پر کنید',
    'studio.myProfile.form.username.title': 'نام کاربری',
    'studio.myProfile.form.username.placeholder': 'نام کاربری را وارد کنید',
    'studio.myProfile.form.usernameRequired.error': 'نام کاربری اجباری است',
    'studio.myProfile.form.profile.title': 'تغییر تصویر پروفایل خود از اینجا',
    'studio.myProfile.form.profile.reset.button': 'بازنشانی',
    'studio.myProfile.form.profile.upload.button': 'آپلود',
    'studio.myProfile.form.profile.description': 'فقط JPG، GIF یا PNG مجاز است. حداکثر اندازه 800 کیلوبایت',
    'studio.myProfile.form.emails.title': 'ایمیل‌ها',
    'studio.myProfile.form.emailsExists.error': 'ایمیل از قبل وجود دارد',
    'studio.myProfile.form.addEmails.placeholder': 'آدرس ایمیل جدید را وارد کنید',
    'studio.myProfile.form.code.placeholder': 'کد را وارد کنید...',
    'studio.myProfile.form.verify.button': 'تایید',
    'studio.myProfile.form.delete.button': 'حذف',
    'studio.myProfile.form.wallets.title': 'کیف پول‌ها',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'کد تایید به ایمیل ارسال شد',
    'studio.myProfile.verificationCodeSentMessageError': 'خطا در ارسال کد تایید به ایمیل',
    'studio.myProfile.emailVerificationMessageSuccess': 'ایمیل تایید شد',
    'studio.myProfile.emailVerificationMessageError': 'خطا در تایید کد',
    'studio.myProfile.form.wallet.placeholder': 'اتصال کیف پول جدید',
    'studio.myProfile.form.connect.button': 'اتصال',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'بعدی',
    'studio.consignArtwork.title': 'قرارداد آثار هنری',
    'studio.consignArtwork.subtitle': 'تمام وظایف مورد نیاز را انجام دهید و اثر هنری خود را امضاء کنید',

    'studio.consignArtwork.stepName.assetMedia': 'رسانه دارایی',
    'studio.consignArtwork.stepName.assetMetadata': 'فهرست دارایی',
    'studio.consignArtwork.stepName.licenses': 'مجوزها',
    'studio.consignArtwork.stepName.termsOfUse': 'شرایط استفاده',
    'studio.consignArtwork.stepName.auxiliaryMedia': 'رسانه‌های کمکی',
    'studio.consignArtwork.optional': 'اختیاری',

    'studio.consignArtwork.stepStatus.completed': 'تکمیل شده',
    'studio.consignArtwork.stepStatus.inProgress': 'در حال انجام',
    'studio.consignArtwork.stepStatus.notStarted': 'شروع نشده',
    'studio.consignArtwork.stepStatus.error': 'خطا',
    'studio.consignArtwork.stepPublishMessageSuccess': 'با موفقیت منتشر شد!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'ویرایش' : 'شروع'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'محول شده' : 'محول کن'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'رسانه دارایی',
    'studio.consignArtwork.assetMedia.description':
        'رسانه‌های دارایی را برای آثار هنری که در قرارداد گرفته شده‌اند، آپلود کنید.',
    'studio.consignArtwork.assetMedia.amazing':
        'شگفت‌انگیز است! برای اینکه آثار هنری شما بر روی دستگاه‌های مختلف زیبا نمایش داده شود، به سه فایل رسانه‌ای دیگر نیاز داریم. نگران نباشید، ما به شما در برش فایل اصلی رسانه کمک خواهیم کرد.',
    'studio.consignArtwork.assetMedia.concerned':
        'اگر نگران از دست دادن کیفیت هستید، از ویژگی برش استفاده نکنید و رسانه را مستقیماً با اندازه مورد نیاز آپلود کنید.',
    'studio.consignArtwork.assetMedia.upload.button': 'آپلود',
    'studio.consignArtwork.assetMedia.assets': 'رسانه‌های دارایی',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${data.definition === 'landscape' ? 'لنداسکیپ' : data.definition === 'portrait' ? 'پرتره' : 'مربع'}`;
    },
    'studio.consignArtwork.assetMedia.image': 'تصویر',
    'studio.consignArtwork.assetMedia.video': 'ویدیو',
    'studio.consignArtwork.assetMedia.max': 'حداکثر',

    'studio.consignArtwork.assetMedia.mediaRequired': (data: { required: boolean }) =>
        `${data.required ? 'الزامی' : 'اختیاری'}`,

    'studio.consignArtwork.assetMedia.mediaIs': 'این رسانه',
    'studio.consignArtwork.assetMedia.cropModal.title': (data: { width: string; height: string }) =>
        `برش رسانه برای نمایش به ابعاد ${data.width} × ${data.height} پیکسل. برای ذخیره کلیک کنید.`,

    'studio.consignArtwork.assetMedia.formats': (data: {
        format: 'original' | 'display' | 'exhibition' | 'preview' | 'print';
    }) => {
        if (data.format === 'original') return 'اصلی';
        if (data.format === 'display') return 'نمایش';
        if (data.format === 'exhibition') return 'نمایشگاه';
        if (data.format === 'preview') return 'پیش‌نمایش';
        if (data.format === 'print') return 'چاپ';
        return '';
    },

    'studio.consignArtwork.assetMedia.modalError.title':
        'اوه اوه! فایل رسانه‌ای که آپلود کرده‌اید، مشکلات زیر را دارد:',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.title': 'ابعاد',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.description': (data: {
        definition: string;
        format: string;
        width: string;
        height: string;
    }) =>
        `— فایل رسانه برای یک تصویر ${data.definition} (${data.format}) باید حداقل دارای ابعاد ${data.width} × ${data.height} پیکسل باشد`,

    'studio.consignArtwork.assetMedia.modalErrorSize.title': 'اندازه',
    'studio.consignArtwork.assetMedia.modalErrorSize.description': (data: {
        definition: string;
        format: string;
        sizeError: string;
    }) =>
        `— اندازه فایل رسانه برای یک تصویر ${data.definition} (${data.format}) نمی‌تواند از ${data.sizeError} بیشتر باشد`,

    'studio.consignArtwork.assetMedia.dragAndDrop': 'بارگذاری اثر هنری اصلی',
    'studio.consignArtwork.assetMedia.dragAndDrop.description':
        'یک فایل رسانه انفراده را بکشید و رها کنید یا برای بارگذاری هنر اصلی خود کلیک کنید.',
    'studio.consignArtwork.assetMedia.imageTypes': 'تصویر: JPEG، PNG، GIF، SVG، WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'ویدئو: MP4، WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'فهرست دارایی',
    'studio.consignArtwork.assetMetadata.description': 'تمام متادیتاهای دارایی به عموم قابل مشاهده هستند.',

    'studio.consignArtwork.assetMetadata.field.artistName': 'نام هنرمند',
    'studio.consignArtwork.assetMetadata.field.title': 'عنوان',
    'studio.consignArtwork.assetMetadata.field.description': 'توضیحات',
    'studio.consignArtwork.assetMetadata.field.date': 'تاریخ',
    'studio.consignArtwork.assetMetadata.field.place': 'محل',

    'studio.consignArtwork.assetMetadata.field.objectType': 'نوع شیء',
    'studio.consignArtwork.assetMetadata.field.objectType.video': 'ویدئو',
    'studio.consignArtwork.assetMetadata.field.objectType.2D': '2D',
    'studio.consignArtwork.assetMetadata.field.objectType.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.objectType.phygital': 'فیزیگیتال',
    'studio.consignArtwork.assetMetadata.field.objectType.other': 'دیگر',

    'studio.consignArtwork.assetMetadata.field.category': 'دسته بندی',
    'studio.consignArtwork.assetMetadata.field.category.photography': 'عکاسی',
    'studio.consignArtwork.assetMetadata.field.category.painting': 'نقاشی',
    'studio.consignArtwork.assetMetadata.field.category.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.category.video': 'ویدئو',
    'studio.consignArtwork.assetMetadata.field.category.mixedMedia': 'مدیاهای مختلط',
    'studio.consignArtwork.assetMetadata.field.category.illustration': 'ایلوستریشن',
    'studio.consignArtwork.assetMetadata.field.category.collage': 'کلاژ',
    'studio.consignArtwork.assetMetadata.field.category.ai': 'هوش مصنوعی',
    'studio.consignArtwork.assetMetadata.field.category.other': 'دیگر',

    'studio.consignArtwork.assetMetadata.field.medium': 'رسانه',
    'studio.consignArtwork.assetMetadata.field.medium.oil': 'رنگ روغن',
    'studio.consignArtwork.assetMetadata.field.medium.watercolour': 'آبرنگ',
    'studio.consignArtwork.assetMetadata.field.medium.acrylic': 'آکریلیک',
    'studio.consignArtwork.assetMetadata.field.medium.ink': 'جوهر',
    'studio.consignArtwork.assetMetadata.field.medium.illustration': 'ایلوستریشن',
    'studio.consignArtwork.assetMetadata.field.medium.collage': 'کلاژ',
    'studio.consignArtwork.assetMetadata.field.medium.AI': 'هوش مصنوعی',
    'studio.consignArtwork.assetMetadata.field.medium.mixedMedia': 'مدیاهای مختلط',
    'studio.consignArtwork.assetMetadata.field.medium.film': 'فیلم',
    'studio.consignArtwork.assetMetadata.field.medium.photography': 'عکاسی',
    'studio.consignArtwork.assetMetadata.field.medium.analogPhotography': 'عکاسی آنالوگ',
    'studio.consignArtwork.assetMetadata.field.medium.digitalPhotography': 'عکاسی دیجیتال',
    'studio.consignArtwork.assetMetadata.field.medium.compositePhotography': 'عکاسی ترکیبی',
    'studio.consignArtwork.assetMetadata.field.medium.other': 'دیگر',
    'studio.consignArtwork.assetMetadata.field.tags': 'برچسب‌ها',
    'studio.consignArtwork.assetMetadata.field.tags.button': 'افزودن',
    'studio.consignArtwork.assetMetadata.field.tags.placeholder': 'برچسب افزودن',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'required' ? 'فیلد ضروری است' : ''}`,

    /* Licenses */
    'studio.consignArtwork.licenses.title': 'لایسنس‌ها',
    'studio.consignArtwork.licenses.description': 'یک یا چند مجوز برای این اثر هنری انتخاب کنید',
    'studio.consignArtwork.licenses.oneLicense.error': 'لطفاً حداقل یک لایسنس اضافه کنید',
    'studio.consignArtwork.licenses.fillFields.error': 'فیلدها را به درستی پر کنید.',
    'studio.consignArtwork.licenses.alreadyAdded': 'لایسنس از قبل اضافه شده است',
    'studio.consignArtwork.licenses.delete.button': 'حذف',
    'studio.consignArtwork.licenses.add.button': 'اضافه',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'بله' : data.checkBoolean === false ? 'خیر' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'این فیلد الزامی است' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'استریم v1.0',
    'studio.consignArtwork.licenses.field.print': 'چاپ v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'حداکثر واحد',
    'studio.consignArtwork.licenses.field.unitPrice': 'قیمت واحد',
    'studio.consignArtwork.licenses.field.maximumEditions': 'حداکثر ادیشن',
    'studio.consignArtwork.licenses.field.editionPrice': 'قیمت ادیشن',
    'studio.consignArtwork.licenses.field.elasticEditions': 'ادیشن‌های ایلاستیک',

    'studio.consignArtwork.licenses.license': 'مجوز',

    'studio.consignArtwork.licenses.nft.description':
        'این مجوز اثر هنری را برای فروش زیر یکی از مدل‌های قیمت‌گذاری انتشار می‌دهد. هنگام فروخته شدن، یک NFT از اثر هنری ساخته و به خریدار تحویل داده می‌شود.',
    'studio.consignArtwork.licenses.nft.enable':
        'این مجوز را فعال کنید اگر می‌خواهید خریداران مالکیت یک مجموعه دیجیتال از اثر هنری را داشته باشند.',

    'studio.consignArtwork.licenses.nft.selectEdition.title': 'انتخاب نسخه',
    'studio.consignArtwork.licenses.nft.selectEdition.elasticEditions':
        'مدل انعطاف‌پذیری است که به خریدار امکان می‌دهد چندین نسخه را به یکدیگر ترکیب کند و اندازه نسخه به صورت پویا تغییر کند.',
    'studio.consignArtwork.licenses.nft.selectEdition.singleEdition': 'مدل ثابت 1/1 است.',
    'studio.consignArtwork.licenses.nft.selectEdition.unlimitedEditions':
        'مدل هزینه‌ای یا رایگان برای نسخه‌های نامحدود است.',

    'studio.consignArtwork.licenses.nft.elasticEditions.title': 'نسخه‌های انعطاف‌پذیر',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice.title': 'قیمت نسخه (دلار آمریکا)',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions.title': 'تعداد نسخه‌ها',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice.title': 'قیمت کل (دلار آمریکا)',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount.title': 'تخفیف نسخه',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice': '“قیمت نسخه” قیمت اثر هنری به دلار آمریکا است.',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions':
        '“تعداد نسخه‌ها” تعداد نسخه‌های اثر هنری است که می‌تواند ساخته شود.',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice':
        '“قیمت کل” حاصل ضرب “قیمت نسخه” در “تعداد نسخه‌ها” است.',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount':
        '“تخفیف نسخه” تخفیف برای خریدار هنگام خرید چند نسخه است. این مقدار با تقسیم 10 به “تعداد نسخه‌ها” محاسبه می‌شود. اگر فعال باشد، تخفیف برای هر نسخه پس از نخستین نسخه اعمال می‌شود.',
    'studio.consignArtwork.licenses.nft.singleEdition.title': 'نسخه تکی',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice': '“قیمت نسخه” قیمت اثر هنری به دلار آمریکا است.',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice.title': 'قیمت نسخه (دلار آمریکا)',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.title': 'نسخه‌های نامحدود',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice':
        '“قیمت نسخه” قیمت اثر هنری به دلار آمریکا است.',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice.title': 'قیمت نسخه (دلار آمریکا)',

    'studio.consignArtwork.licenses.stream.description':
        'این مجوز اثر هنری را برای کارآفرینان برای اضافه کردن به لیست‌های پخش برای استریم هنر به فریم‌های دیجیتال فراهم می‌کند. درآمد از استریم به صورت خودکار بر اساس استفاده و توافق‌نامه‌های قیمت محاسبه می‌شود.',
    'studio.consignArtwork.licenses.stream.enable':
        'این مجوز را فعال کنید اگر می‌خواهید کارآفرینان اثر هنری شما را در لیست‌های پخشی که توسط مصرف‌کنندگان و کسب‌وکارها برای اسلایدها در فریم‌های دیجیتال استفاده می‌شود، قرار دهند.',
    'studio.consignArtwork.licenses.stream.enable.description':
        'درآمد استریم به صورت خودکار بر اساس استفاده و توافق‌نامه‌های قیمت محاسبه می‌شود.',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming': 'استریم نامحدود',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming.description':
        'این اثر ممکن است برای استریم در سناریوهای نامحدود استفاده شود.',

    'studio.consignArtwork.licenses.print.description':
        'این مجوز اثر هنری را برای کاربران نهایی برای چاپ روی یک مورد فیزیکی تکی با استفاده از فناوری چاپ درخواستی (POD) فراهم می‌کند. این مجوز تا لحظه چاپ قابل انتقال است، پس از آن فقط به مالک مورد فیزیکی قابل انتقال است.',
    'studio.consignArtwork.licenses.print.enable':
        'این مجوز را فعال کنید اگر می‌خواهید کاربران نهایی از آثار هنری شما برای برنامه‌های چاپ درخواستی (POD) استفاده کنند. این مجوز برای چاپ فردی است؛ چاپ انبوه مجاز نیست.',
    'studio.consignArtwork.licenses.print.singlePrint.title': 'چاپ تکی',
    'studio.consignArtwork.licenses.print.singlePrint.description':
        '“قیمت واحد” قیمت اثر هنری به دلار آمریکا برای یک چاپ تکی است.',
    'studio.consignArtwork.licenses.print.singlePrint.field': 'قیمت واحد (دلار آمریکا)',

    'studio.consignArtwork.licenses.remix.description':
        'این مجوز اثر هنری را برای کاربران نهایی برای استفاده در برنامه‌های Remix با استفاده از',
    'studio.consignArtwork.licenses.remix.description2':
        'مجوزی که استفاده از Remix برای مقاصد غیرتجاری را امکان‌پذیر می‌کند، فراهم می‌کند.',
    'studio.consignArtwork.licenses.remix.singleRemix.title': 'Remix تکی',
    'studio.consignArtwork.licenses.remix.singleRemix.description':
        '“قیمت واحد” قیمت اثر هنری به دلار آمریکا برای یک Remix تکی است.',
    'studio.consignArtwork.licenses.remix.singleRemix.field': 'قیمت واحد (دلار آمریکا)',
    'studio.consignArtwork.licenses.remix.enable':
        'این مجوز را فعال کنید اگر می‌خواهید کاربران نهایی از آثار هنری شما در برنامه‌های Remix استفاده کنند. خروجی Remix فقط برای مقاصد غیرتجاری استفاده می‌شود.',

    /* Terms of Use */
    'studio.consignArtwork.termsOfUse.title': 'شرایط استفاده',
    'studio.consignArtwork.termsOfUse.description': 'تمام وظایف مورد نیاز را انجام دهید و اثر هنری خود را امضاء کنید',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'قرارداد' : data.scrolledToBottom ? 'پذیرفتن قرارداد' : 'به انتها بروید',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'با اینکه اینجانب تصدیق می‌کنم که فایل‌های رسانه دارایی و رسانه کمکی اثرات اصیل و اصلی هستند و توسط خالقان مشخص شده در ارسال متادیتا ایجاد شده‌اند و از هیچ منبع دیگری کپی، سرقت یا دزدی نشده‌اند.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'من با این توافق موافقم که در صورتی که هر قسمت از فایل‌های دارایی و رسانه های کمکی با استفاده از هوش مصنوعی ایجاد شده باشد، در فیلد متادیتا برای "تولید هوش مصنوعی" پاسخ "بله" داده‌ام.',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'با اینکه اینجانب تصدیق می‌کنم که این اثر در هیچ بلاکچین دیگری ساخته نشده، ارائه شده، قرارداد داده شده یا در هیچ پلتفرم دیگری برای فروش قرار داده نشده است و تا زمانی که لیست فعال است در این پلتفرم ساخته یا فروخته نخواهد شد.',

    /* Auxiliary Media */
    'studio.consignArtwork.auxiliaryMedia.description':
        'رسانه‌های کمکی را برای پشت صحنه (BTS) و واقعیت افزوده (AR) بارگذاری کنید.',
    'studio.consignArtwork.auxiliaryMedia.title': 'رسانه‌های کمکی',
    'studio.consignArtwork.auxiliaryMedia.subTitle': 'اجزاي رسانه‌های کمکی',
    'studio.consignArtwork.auxiliaryMedia.arImage.title': 'تصویر AR',
    'studio.consignArtwork.auxiliaryMedia.arVideo.title': 'ویدئو AR',
    'studio.consignArtwork.auxiliaryMedia.btsImage.title': 'تصویر BTS',
    'studio.consignArtwork.auxiliaryMedia.btsVideo.title': 'ویدئو BTS',
    'studio.consignArtwork.auxiliaryMedia.codeZip.title': 'کد Zip',

    /* Consignment Status */
    'studio.consignArtwork.consignmentStatus.title': 'وضعیت واگذاری',
    'studio.consignArtwork.consignmentStatus.description': 'کار خوبی انجام داده‌اید! نقاشی شما برای واگذاری آماده است.',
    'studio.consignArtwork.consignmentStatus.message': 'این ویژگی به زودی در دسترس خواهد بود.',
    'studio.consignArtwork.consignmentStatus.yes': 'بله',
    'studio.consignArtwork.consignmentStatus.no': 'خیر',
    'studio.consignArtwork.consignmentStatus.edit': 'ویرایش',
    'studio.consignArtwork.consignmentStatus.view': 'نمایش',
    'studio.consignArtwork.consignmentStatus.search': 'جستجو',
    'studio.consignArtwork.consignmentStatus.license': 'مجوز',

    'studio.consignArtwork.consignmentStatus.draft.title': 'پیش نویس',
    'studio.consignArtwork.consignmentStatus.preview.title': 'پیش‌نمایش',
    'studio.consignArtwork.consignmentStatus.activate.title': 'فعال‌سازی',

    'studio.consignArtwork.consignmentStatus.activation.title': 'فعال‌سازی',
    'studio.consignArtwork.consignmentStatus.activation.description':
        'فعال‌سازی نقاشی شما را به زنجیره بلوک واگذار می‌کند و نیاز به اعتبار خالق دارد.',
    'studio.consignArtwork.consignmentStatus.creatorCreditsRequired': 'اعتبار خالق مورد نیاز',
    'studio.consignArtwork.consignmentStatus.creatorCreditsAvailable': 'اعتبار خالق موجود',
    'studio.consignArtwork.consignmentStatus.viewArtwork.button': 'نمایش نقاشی',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'آیا می‌خواهید اطلاعات را ذخیره کنید؟',
    'studio.consignArtwork.backModal.confirm.button': 'ذخیره',
    'studio.consignArtwork.backModal.cancel.button': 'خیر',

    /* Sidebar */
    'studio.sidebar.consign': 'قرارداد آثار هنری',

    /* Footer */
    'studio.footer.thisStep': 'این مرحله انجام شده است',
    'studio.footer.completed': 'کامل شد',
    'studio.footer.inProgress': 'در حال انجام',
    'studio.footer.notYet': 'و هنوز کامل نشده است',
    'studio.footer.step': 'مرحله',
    'studio.footer.of': 'از',
    'studio.footer.save': 'ذخیره',
    'studio.footer.back': 'بازگشت',
};

export default language;
