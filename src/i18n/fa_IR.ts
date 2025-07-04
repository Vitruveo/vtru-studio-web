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
    'studio.userAccount.usernameNotFound': 'نام کاربری یافت نشد',

    /* My Profile */
    'studio.myProfile.pasteCode': 'کد را وارد کنید',
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
    'studio.myProfile.form.addEmails.placeholder': 'آدرس ایمیل اضافی را وارد کنید',
    'studio.myProfile.form.code.placeholder': 'کد را وارد کنید...',
    'studio.myProfile.form.verify.button': 'تایید',
    'studio.myProfile.form.delete.button': 'حذف',
    'studio.myProfile.form.wallets.title': 'کیف پول‌ها',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'کد تایید به ایمیل ارسال شد',
    'studio.myProfile.verificationCodeSentMessageError': 'خطا در ارسال کد تایید به ایمیل',
    'studio.myProfile.emailVerificationMessageSuccess': 'ایمیل تایید شد',
    'studio.myProfile.emailVerificationMessageError': 'خطا در تایید کد',
    'studio.myProfile.form.wallet.placeholder': 'اتصال کیف پول جدید',
    'studio.myProfile.form.wallet.placeholderAdded': 'اتصال کیف پول اضافی',
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
    'studio.consignArtwork.stepName.reviewAndConsign': 'بررسی و ارسال',
    'studio.consignArtwork.requestConsign': 'درخواست امضاء قرارداد',
    'studio.consignArtwork.optional': 'اختیاری',
    'studio.consignArtwork.artworkListing': 'فهرست آثار هنری',
    'studio.consignArtwork.artworkConsignedTitle': 'آثار هنری شما در حال حاضر ارسال شده است.',
    'studio.consignArtwork.stepStatus.completed': 'تکمیل شده',
    'studio.consignArtwork.stepStatus.inProgress': 'در حال انجام',
    'studio.consignArtwork.stepStatus.notStarted': 'شروع نشده',
    'studio.consignArtwork.stepStatus.error': 'ناقص',
    'studio.consignArtwork.stepPublishMessageSuccess': 'با موفقیت منتشر شد!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'ویرایش' : 'شروع'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'محول شده' : 'محول کن'}`,

    'studio.consignArtwork.comingSoon': 'به زودی',

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'رسانه دارایی',
    'studio.consignArtwork.assetMedia.description':
        'رسانه‌های دارایی را برای آثار هنری که در قرارداد گرفته شده‌اند، آپلود کنید.',
    'studio.consignArtwork.assetMedia.differentUses': 'آپلود/ایجاد تغییرات برای استفاده‌های مختلف',
    'studio.consignArtwork.assetMedia.amazing':
        'شگفت‌انگیز به نظر می‌آید! برای اینکه هنر شما بر روی دستگاه‌های مختلف زیبا به نظر بیاید، نیاز به چند نسخه دیگر داریم.',
    'studio.consignArtwork.assetMedia.haveCreated':
        'اگر فایل‌های خود را برای تغییرات زیر ایجاد کرده‌اید، به راحتی هرکدام را در اینجا بارگذاری کنید.',
    'studio.consignArtwork.assetMedia.haveNotCreated':
        'اگر فایل‌های خود را ایجاد نکرده‌اید، نگران نباشید، فقط فایل اصلی خود را برای هر تغییر مورد نیاز دوباره بارگذاری کنید و ما به شما کمک خواهیم کرد تا فایل خود را در همینجا کراپ کنید.',
    'studio.consignArtwork.assetMedia.previewHelp':
        'پرونده پیش‌نمایش یک کلیپ پنج ثانیه‌ای از هنر شما خواهد بود. می‌توانید یکی را که خودتان ایجاد کرده‌اید بارگذاری کنید یا فقط پرونده اصلی خود را بارگذاری کنید و ما به شما کمک خواهیم کرد تا این کلیپ را ایجاد کنید.',
    'studio.consignArtwork.assetMedia.upload.button': 'آپلود',
    'studio.consignArtwork.assetMedia.assets': 'رسانه‌های دارایی',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${data.definition === 'landscape' ? 'لنداسکیپ' : data.definition === 'portrait' ? 'پرتره' : 'مربع'}`;
    },
    'studio.consignArtwork.assetMedia.image': 'تصویر',
    'studio.consignArtwork.assetMedia.video': 'ویدیو',
    'studio.consignArtwork.assetMedia.max': (data: { seconds: number }) =>
        `${data.seconds ? `حداکثر / ${data.seconds} ثانیه` : 'حداکثر'}`,

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
        'برای بارگذاری هنر اصلی خود، پرونده خود را اینجا بکشید و رها کنید یا برای انتخاب پرونده از رایانه خود کلیک کنید.',
    'studio.consignArtwork.assetMedia.imageTypes': 'تصویر: JPEG، PNG، GIF، SVG، WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'ویدئو: MP4، WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'فهرست داده‌های دارایی',
    'studio.consignArtwork.assetMetadata.description': 'همه داده‌های دارایی قابل مشاهده برای عموم است.',

    'studio.consignArtwork.assetMetadata.section.context': 'زمینه',
    'studio.consignArtwork.assetMetadata.section.taxonomy': 'طبقه‌بندی',
    'studio.consignArtwork.assetMetadata.section.creators': 'آفرینندگان',
    'studio.consignArtwork.assetMetadata.section.provenance': 'اصل',
    'studio.consignArtwork.assetMetadata.section.custom': 'سفارشی',
    'studio.consignArtwork.assetMetadata.section.assets': 'دارایی‌ها',

    'studio.consignArtwork.assetMetadata.field.title': 'عنوان',
    'studio.consignArtwork.assetMetadata.field.title.description': 'عنوان اثر',

    'studio.consignArtwork.assetMetadata.field.description': 'برچسب',
    'studio.consignArtwork.assetMetadata.field.description.description':
        'توضیح کوتاه درباره اثر. توضیحات بیشتر در رسانه‌های کمکی موجود است.',

    'studio.consignArtwork.assetMetadata.field.mood': 'حالت',
    'studio.consignArtwork.assetMetadata.field.mood.description': 'احساساتی که اثر به وجود می‌آورد',

    'studio.consignArtwork.assetMetadata.field.mood.enum.admiration': 'تحسین',
    'studio.consignArtwork.assetMetadata.field.mood.enum.absorbing': 'جذاب',
    'studio.consignArtwork.assetMetadata.field.mood.enum.amusement': 'سرگرمی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.adoration': 'عشق',
    'studio.consignArtwork.assetMetadata.field.mood.enum.awe': 'ترس',
    'studio.consignArtwork.assetMetadata.field.mood.enum.anxiety': 'اضطراب',
    'studio.consignArtwork.assetMetadata.field.mood.enum.boredom': 'خستگی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.brooding': 'غمگین',
    'studio.consignArtwork.assetMetadata.field.mood.enum.calmness': 'آرامش',
    'studio.consignArtwork.assetMetadata.field.mood.enum.chills': 'سرمایش',
    'studio.consignArtwork.assetMetadata.field.mood.enum.chaotic': 'بی نظمی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.connectedness': 'اتصال',
    'studio.consignArtwork.assetMetadata.field.mood.enum.cosmic': 'کیهانی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.confusion': 'گیجی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dread': 'وحشت',
    'studio.consignArtwork.assetMetadata.field.mood.enum.distaste': 'ناپسند',
    'studio.consignArtwork.assetMetadata.field.mood.enum.disgust': 'تنفر',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dreary': 'تیره',
    'studio.consignArtwork.assetMetadata.field.mood.enum.disorienting': 'گیج‌کننده',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dreamy': 'رویایی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.desire': 'خواسته',
    'studio.consignArtwork.assetMetadata.field.mood.enum.elegant': 'شیک',
    'studio.consignArtwork.assetMetadata.field.mood.enum.humorous': 'طنز',
    'studio.consignArtwork.assetMetadata.field.mood.enum.intimate': 'صمیمی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.intricate': 'پیچیده',
    'studio.consignArtwork.assetMetadata.field.mood.enum.love': 'عشق',
    'studio.consignArtwork.assetMetadata.field.mood.enum.lively': 'پرجنب و جوش',
    'studio.consignArtwork.assetMetadata.field.mood.enum.mystical': 'مرموز',
    'studio.consignArtwork.assetMetadata.field.mood.enum.mysterious': 'رمزآمیز',
    'studio.consignArtwork.assetMetadata.field.mood.enum.nostalgia': 'حس دلتنگی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.ornate': 'زینتی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.psychedelic': 'روانی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.serenity': 'آرامش',
    'studio.consignArtwork.assetMetadata.field.mood.enum.sadness': 'غم',
    'studio.consignArtwork.assetMetadata.field.mood.enum.sensual': 'حسی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.spiritual': 'معنوی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.strange': 'عجیب',
    'studio.consignArtwork.assetMetadata.field.mood.enum.striking': 'چشمگیر',
    'studio.consignArtwork.assetMetadata.field.mood.enum.tragic': 'تراژیک',
    'studio.consignArtwork.assetMetadata.field.mood.enum.tense': 'تنش‌آور',
    'studio.consignArtwork.assetMetadata.field.mood.enum.vibrant': 'پرانرژی',
    'studio.consignArtwork.assetMetadata.field.mood.enum.violent': 'خشونت‌آمیز',
    'studio.consignArtwork.assetMetadata.field.mood.enum.wonder': 'تعجب',
    'studio.consignArtwork.assetMetadata.field.mood.enum.whimsical': 'عجیب و غریب',

    'studio.consignArtwork.assetMetadata.field.copyright': 'حق تکثیر',
    'studio.consignArtwork.assetMetadata.field.copyright.description':
        'متن حق تکثیر. (مثال: حق تکثیر (c) ۲۰۲۴ هنرمند جو)',

    'studio.consignArtwork.assetMetadata.field.colors': 'رنگ‌ها',
    'studio.consignArtwork.assetMetadata.field.colors.item': 'رنگ',
    'studio.consignArtwork.assetMetadata.field.colors.description': 'پالت رنگ اصلی (تا سه رنگ)',

    'studio.consignArtwork.assetMetadata.field.orientation': 'جهت',
    'studio.consignArtwork.assetMetadata.field.orientation.description': 'جهت این اثر',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.horizontal': 'افقی',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.vertical': 'عمودی',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.square': 'مربع',

    'studio.consignArtwork.assetMetadata.field.culture': 'فرهنگ',
    'studio.consignArtwork.assetMetadata.field.culture.description': 'فرهنگ اصلی برای این اثر',

    'studio.consignArtwork.assetMetadata.field.culture.enum.african': 'آفریقایی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.persian': 'فارسی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.centralasian': 'آسیای مرکزی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.eastasian': 'آسیای شرقی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.islamic': 'اسلامی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.latinamerican': 'لاتین آمریکایی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.nativeamerican': 'بومی آمریکایی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.oceanic': 'اقیانوسی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.southasian': 'آسیای جنوبی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.southeastasian': 'آسیای جنوب شرقی',
    'studio.consignArtwork.assetMetadata.field.culture.enum.western': 'غربی',

    'studio.consignArtwork.assetMetadata.field.objectType': 'نوع اشیا',
    'studio.consignArtwork.assetMetadata.field.objectType.description': 'منبع اثر',

    'studio.consignArtwork.assetMetadata.field.objectType.enum.digitalart': 'هنر دیجیتال',
    'studio.consignArtwork.assetMetadata.field.objectType.enum.physicalart': 'هنر فیزیکی',
    'studio.consignArtwork.assetMetadata.field.objectType.enum.digitalphysicalart': 'هنر هیبرید دیجیتال + فیزیکی',

    'studio.consignArtwork.assetMetadata.field.tags': 'برچسب‌ها',
    'studio.consignArtwork.assetMetadata.field.tags.item': 'برچسب',
    'studio.consignArtwork.assetMetadata.field.tags.description': 'برچسب‌های مرتبط با کار',

    'studio.consignArtwork.assetMetadata.field.collections': 'مجموعه‌ها',
    'studio.consignArtwork.assetMetadata.field.collections.item': 'مجموعه',
    'studio.consignArtwork.assetMetadata.field.collections.description':
        'مجموعه‌ها برای سازماندهی این کار (حداقل یک مورد لازم است)',

    'studio.consignArtwork.assetMetadata.field.category': 'دسته‌بندی',
    'studio.consignArtwork.assetMetadata.field.category.description': 'دسته‌بندی این کار',

    'studio.consignArtwork.assetMetadata.field.category.enum.photography': 'عکاسی',
    'studio.consignArtwork.assetMetadata.field.category.enum.painting': 'نقاشی',
    'studio.consignArtwork.assetMetadata.field.category.enum.threed': 'سه بعدی',
    'studio.consignArtwork.assetMetadata.field.category.enum.video': 'ویدئو',
    'studio.consignArtwork.assetMetadata.field.category.enum.mixedmedia': 'رسانه مختلط',
    'studio.consignArtwork.assetMetadata.field.category.enum.illustration': 'تصویرسازی',
    'studio.consignArtwork.assetMetadata.field.category.enum.collage': 'کلاژ',

    'studio.consignArtwork.assetMetadata.field.medium': 'رسانه',
    'studio.consignArtwork.assetMetadata.field.medium.description': 'رسانه‌های استفاده شده برای این اثر',

    'studio.consignArtwork.assetMetadata.field.medium.enum.acrylic': 'آکریلیک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ai': 'هوش مصنوعی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.airbrush': 'نقاشی هوا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.albumensilver': 'نقره آلبومن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.algorithmic': 'هنر الگوریتمی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.aluminium': 'آلومینیوم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.appropriation': 'استفاده',
    'studio.consignArtwork.assetMetadata.field.medium.enum.aquatint': 'آکواتینت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.assemblage': 'مونتاژ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.augmentedreality': 'واقعیت افزوده',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ballpoint': 'مداد توپی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bas-relief': 'باریکه',
    'studio.consignArtwork.assetMetadata.field.medium.enum.basalt': 'بازالت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.binder': 'بایندر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.blockchain': 'زنجیره بلوک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.board': 'تخته',
    'studio.consignArtwork.assetMetadata.field.medium.enum.brass': 'برنج',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bronze': 'برنز',
    'studio.consignArtwork.assetMetadata.field.medium.enum.brush': 'مسطح',
    'studio.consignArtwork.assetMetadata.field.medium.enum.burlap': 'چسبان',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bw': 'سیاه و سفید',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cable': 'کابل',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cameo': 'کامئو',
    'studio.consignArtwork.assetMetadata.field.medium.enum.canvas': 'کانوس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.carbonfiber': 'فیبر کربن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.card': 'کارت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cardboard': 'کارتن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.casein': 'کازئین',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cement': 'سیمان',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ceramic': 'سرامیک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ceramics': 'سرامیک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.chalk': 'گچ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.charcoal': 'زغال',
    'studio.consignArtwork.assetMetadata.field.medium.enum.chisel': 'قیچی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.clay': 'خاک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cliché-verre': 'کلیشه-ور',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cloth': 'پارچه',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coal': 'زغال',
    'studio.consignArtwork.assetMetadata.field.medium.enum.collage': 'کلاژ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.collotype': 'کولوتایپ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.color': 'رنگ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coloredmarkers': 'نشانگرهای رنگی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coloredpencils': 'مدادهای رنگی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.colorvarnish': 'ورنیش رنگی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.concrete': 'بتن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.conte': 'سیاه و سفید',
    'studio.consignArtwork.assetMetadata.field.medium.enum.copper': 'مس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cotton': 'پنبه',
    'studio.consignArtwork.assetMetadata.field.medium.enum.crayon': 'مداد رنگی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ctype': 'نوع C',
    'studio.consignArtwork.assetMetadata.field.medium.enum.decoupage': 'دکوپاژ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.digital': 'دیجیتال',
    'studio.consignArtwork.assetMetadata.field.medium.enum.drawing': 'نقاشی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.drypoint': 'نقاشی خش',
    'studio.consignArtwork.assetMetadata.field.medium.enum.dust': 'گرد و غبار',
    'studio.consignArtwork.assetMetadata.field.medium.enum.dye': 'رنگ رنگ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.elephantdung': 'مزارع فیل',
    'studio.consignArtwork.assetMetadata.field.medium.enum.embroidery': 'گلدوزی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.emulsion': 'امولسیون',
    'studio.consignArtwork.assetMetadata.field.medium.enum.enamel': 'سفالگری',
    'studio.consignArtwork.assetMetadata.field.medium.enum.encaustic': 'انکاوستیک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.engraving': 'حکاکی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.environmental': 'محیط زیست',
    'studio.consignArtwork.assetMetadata.field.medium.enum.etching': 'خوراک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fabric': 'پارچه',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fabricstraps': 'بندهای پارچه ای',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fat': 'چربی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.feather': 'پر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.felt-tippen': 'نوک فلزی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.felt': 'نمد',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiber': 'فیبر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiberboard': 'فیبر بورد',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiberglass': 'فایبرگلاس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.flashlight': 'چراغ قوه',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fluorescentpaint': 'رنگ فلورسنت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.found': 'اشیاء پیدا شده',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fractal': 'فراکتال',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fresco': 'فرش',
    'studio.consignArtwork.assetMetadata.field.medium.enum.frottage': 'نقاشی بر روی سطح',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fullspectrum': 'طیف کامل',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gelatin': 'ژلاتین',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gelatinsilverprint': 'چاپ نقره ژلاتین',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gesso': 'ژسو',
    'studio.consignArtwork.assetMetadata.field.medium.enum.giclee': 'ژیکله',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gilt': 'طلا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.glass': 'شیشه',
    'studio.consignArtwork.assetMetadata.field.medium.enum.glitter': 'گلیتر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gloss': 'درخشان',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gold': 'طلا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.goldleaf': 'برگ طلا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gouache': 'گواش',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graffiti': 'گرافیتی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.granite': 'گرانیت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graphite': 'گرافیت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graphitepencil': 'مداد گرافیتی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.grattage': 'گراتاژ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.greenstone': 'سنگ سبز',
    'studio.consignArtwork.assetMetadata.field.medium.enum.grisaille': 'گریزایل',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gumarabic': 'گوم آرابیک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.hematite': 'هماتیت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.hemp': 'شنبلیله',
    'studio.consignArtwork.assetMetadata.field.medium.enum.hologram': 'هولوگرام',
    'studio.consignArtwork.assetMetadata.field.medium.enum.horns': 'شاخ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.household': 'خانواده',
    'studio.consignArtwork.assetMetadata.field.medium.enum.indianink': 'مرکب هندی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ink': 'مرکب',
    'studio.consignArtwork.assetMetadata.field.medium.enum.intaglio': 'گویه نقاشی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.interactive': 'تعاملی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.iron': 'آهن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ironplate': 'تخته آهنی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ivory': 'عاج',
    'studio.consignArtwork.assetMetadata.field.medium.enum.japanesepaper': 'کاغذ ژاپنی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.jute': 'جوت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.kinetic': 'حرکتی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lacquer': 'لاک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.laidpaper': 'کاغذ مخملی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.latex': 'لاتکس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lavis': 'لویس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.leadpoint': 'نقطه فلزی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.leather': 'چرم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.led': 'LED',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lemon': 'لیمو',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lenticular': 'لنتیکولار',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lightbox': 'جعبه نوری',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lightbulb': 'چراغ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lights': 'چراغ ها',
    'studio.consignArtwork.assetMetadata.field.medium.enum.limestone': 'سنگ آهک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linen': 'کتان',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocut': 'لینوکات',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocutb&w': 'لینوکات سیاه و سفید',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocutcolor': 'لینوکات رنگی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocuts': 'لینوکات ها',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linoleum': 'لینولیوم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lithograph': 'لیتوگراف',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lithography': 'لیتوگرافی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.magna': 'مگنا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.magnets': 'آهنربا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mahoganypanel': 'پنل ماهوگانی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.majolica': 'مایولیکا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.manipulated': 'منحرف شده',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mappins': 'سوزن‌های مپ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.marble': 'مرمر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.marker': 'مداد نشانگر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.maskingtape': 'نوار ماسکینگ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.masonite': 'ماسونیت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.metal': 'فلز',
    'studio.consignArtwork.assetMetadata.field.medium.enum.metalpoint': 'نقاشی فلزی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mezzotint': 'مزوتینت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mixedmedia': 'مخلوط',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mixedtechnique': 'تکنیک مخلوط',
    'studio.consignArtwork.assetMetadata.field.medium.enum.monotype': 'مونوتایپ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mosaic': 'موزاییک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mosaïque': 'موزاییک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mural': 'دیوارنقاشی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.music': 'موسیقی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.musicpaper': 'کاغذ موسیقی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.nails': 'میخ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.neon': 'نئون',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oak': 'بلوط',
    'studio.consignArtwork.assetMetadata.field.medium.enum.objettrouve': 'اشیای پیدا شده',
    'studio.consignArtwork.assetMetadata.field.medium.enum.obsidian': 'شیشه سیاه',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oil': 'روغن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oilcloth': 'پارچه روغنی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.onyx': 'عقیق',
    'studio.consignArtwork.assetMetadata.field.medium.enum.paint': 'رنگ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.paintedmetal': 'فلز نقاشی شده',
    'studio.consignArtwork.assetMetadata.field.medium.enum.panel': 'پنل',
    'studio.consignArtwork.assetMetadata.field.medium.enum.paper': 'کاغذ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papermache': 'کاغذ مچ‌کاری',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papier-pelle': 'کاغذ-پله',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papyrus': 'پاپیروس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.parchment': 'پارچم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pastel': 'پاستل',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pebbles': 'سنگ‌ها',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pen': 'خودنویس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pencil': 'مداد',
    'studio.consignArtwork.assetMetadata.field.medium.enum.penink': 'خودنویس و مرکب',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pergament': 'پرگمان',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photo': 'عکس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photogram': 'فتوگرام',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photographicpaper': 'کاغذ عکاسی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photography': 'عکاسی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photogravure': 'فتوگراوور',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photomontage': 'فتومونتاژ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photomosaic': 'فتوموزاییک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.piano': 'پیانو',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pigment': 'پیگمنت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pinhole': 'سوراخ سوزن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plaster': 'گچ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plastic': 'پلاستیک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plates': 'بشقاب',
    'studio.consignArtwork.assetMetadata.field.medium.enum.platinum': 'پلاتین',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plexiglas': 'پلکسی گلاس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plugsocket': 'پریز',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plywood': 'پلای وود',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polaroid': 'پلاروید',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polyester': 'پلی‌استر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polymer': 'پلیمر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polymerpaint': 'پلیمر رنگی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polystyrene': 'پلی استایرن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.poplar': 'پلودار',
    'studio.consignArtwork.assetMetadata.field.medium.enum.porcelain': 'فسفر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.postcard': 'کارت پستال',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pottery': 'سفالگری',
    'studio.consignArtwork.assetMetadata.field.medium.enum.poetry': 'شعر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.precious': 'مواد گرانبها',
    'studio.consignArtwork.assetMetadata.field.medium.enum.print': 'چاپ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.printedbrochure': 'بروشور چاپی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pyroxylin': 'پیروکسیلین',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ready-made': 'آماده',
    'studio.consignArtwork.assetMetadata.field.medium.enum.recorderwithcassette': 'رکوردر با کاست',
    'studio.consignArtwork.assetMetadata.field.medium.enum.resin': 'رزین',
    'studio.consignArtwork.assetMetadata.field.medium.enum.robotics': 'رباتیک',
    'studio.consignArtwork.assetMetadata.field.medium.enum.rubber': 'لاتکس',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sand': 'شن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sandstone': 'سنگ آهکی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sanguine': 'سانگوین',
    'studio.consignArtwork.assetMetadata.field.medium.enum.satin': 'شاتون',
    'studio.consignArtwork.assetMetadata.field.medium.enum.scrapings': 'تراشه‌ها',
    'studio.consignArtwork.assetMetadata.field.medium.enum.screenprint': 'اسکرین پرینت',
    'studio.consignArtwork.assetMetadata.field.medium.enum.screenprinting': 'اسکرین پرینتینگ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sculpting': 'مجسمه سازی سه بعدی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sepia': 'سپیا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.shell': 'صدف',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silk': 'ابریشم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silkscreen': 'سیلک اسکرین',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silver': 'نقره',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silverpoint': 'نقاشی نقطه نقره',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sound': 'صدا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sponge': 'اسفنج',
    'studio.consignArtwork.assetMetadata.field.medium.enum.spraypaint': 'اسپری رنگ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stainedglass': 'شیشه‌های رنگی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.steel': 'فولاد',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stencil': 'استنسیل',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stone': 'سنگ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.string': 'رشته',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stucco': 'استوکو',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stump': 'تنه',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tapestry': 'نقشه گلیم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tar': 'قیر',
    'studio.consignArtwork.assetMetadata.field.medium.enum.taxidermy': 'ساخت مجسمه‌های مومی حیوانات',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tempera': 'تمپرا',
    'studio.consignArtwork.assetMetadata.field.medium.enum.terracotta': 'خاک سفالی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.textile': 'متن بافی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.timber': 'چوب',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tin': 'قلع',
    'studio.consignArtwork.assetMetadata.field.medium.enum.travertine': 'سنگ تراورتن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.turquoise': 'فیروزه',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tusche': 'توش',
    'studio.consignArtwork.assetMetadata.field.medium.enum.twine': 'نخ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.varnish': 'ورنیش',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vector': 'برداری',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vellum': 'گوسفندنی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.video': 'ویدئو',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vinyl': 'وینیل',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vitrage': 'ویتراژ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wall': 'دیوار',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wallpaper': 'کاغذ دیواری',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wash': 'شستشو',
    'studio.consignArtwork.assetMetadata.field.medium.enum.watercolor': 'آبرنگ',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wax': 'موم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.waxpastel': 'موم پاستل',
    'studio.consignArtwork.assetMetadata.field.medium.enum.white': 'سفید',
    'studio.consignArtwork.assetMetadata.field.medium.enum.whitewash': 'سفیدکردن',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wine': 'شراب',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wire': 'سیم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wood': 'چوب',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodblockprint': 'چاپ بلوک چوبی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodcut': 'چاپ چوبی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.film': 'فیلم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodenchair': 'صندلی چوبی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodengraving': 'حکاکی چوبی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodensled': 'لوح چوبی',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wool': 'پشم',
    'studio.consignArtwork.assetMetadata.field.medium.enum.zinc': 'رویا',

    'studio.consignArtwork.assetMetadata.field.style': 'سبک',
    'studio.consignArtwork.assetMetadata.field.style.description': 'سبک‌های استفاده شده در این اثر',

    'studio.consignArtwork.assetMetadata.field.style.enum.abstract': 'استخراجی',
    'studio.consignArtwork.assetMetadata.field.style.enum.abstractexpressionism': 'انتزاعی اکسپرسیونیسم',
    'studio.consignArtwork.assetMetadata.field.style.enum.artdeco': 'آرت دکو',
    'studio.consignArtwork.assetMetadata.field.style.enum.conceptual': 'مفهومی',
    'studio.consignArtwork.assetMetadata.field.style.enum.cubism': 'کوبیسم',
    'studio.consignArtwork.assetMetadata.field.style.enum.dada': 'دادا',
    'studio.consignArtwork.assetMetadata.field.style.enum.documentary': 'مستند',
    'studio.consignArtwork.assetMetadata.field.style.enum.expressionism': 'اکسپرسیونیسم',
    'studio.consignArtwork.assetMetadata.field.style.enum.figurative': 'شکلی',
    'studio.consignArtwork.assetMetadata.field.style.enum.fineart': 'هنر زیبا',
    'studio.consignArtwork.assetMetadata.field.style.enum.folk': 'مردمی',
    'studio.consignArtwork.assetMetadata.field.style.enum.illustration': 'تصویرسازی',
    'studio.consignArtwork.assetMetadata.field.style.enum.impressionism': 'انطباع‌گرایی',
    'studio.consignArtwork.assetMetadata.field.style.enum.minimalism': 'کمینه‌گرایی',
    'studio.consignArtwork.assetMetadata.field.style.enum.modern': 'مدرن',
    'studio.consignArtwork.assetMetadata.field.style.enum.photorealism': 'فتو‌رئالیسم',
    'studio.consignArtwork.assetMetadata.field.style.enum.popart': 'پاپ آرت',
    'studio.consignArtwork.assetMetadata.field.style.enum.portraiture': 'پرتره‌نگاری',
    'studio.consignArtwork.assetMetadata.field.style.enum.realism': 'واقع‌گرایی',
    'studio.consignArtwork.assetMetadata.field.style.enum.streetart': 'هنر خیابانی',
    'studio.consignArtwork.assetMetadata.field.style.enum.surrealism': 'سورئالیسم',

    'studio.consignArtwork.assetMetadata.field.subject': 'موضوع',
    'studio.consignArtwork.assetMetadata.field.subject.description':
        'کلمات کلیدی شناسایی موضوعات استفاده شده در این اثر',

    'studio.consignArtwork.assetMetadata.field.subject.enum.abstract': 'استخراجی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.aerial': 'هوایی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.aeroplane': 'هواپیما',
    'studio.consignArtwork.assetMetadata.field.subject.enum.animal': 'حیوان',
    'studio.consignArtwork.assetMetadata.field.subject.enum.architecture': 'معماری',
    'studio.consignArtwork.assetMetadata.field.subject.enum.automobile': 'اتومبیل',
    'studio.consignArtwork.assetMetadata.field.subject.enum.beach': 'ساحل',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bicycle': 'دوچرخه',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bike': 'بایک',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bird': 'پرنده',
    'studio.consignArtwork.assetMetadata.field.subject.enum.boat': 'قایق',
    'studio.consignArtwork.assetMetadata.field.subject.enum.body': 'بدن',
    'studio.consignArtwork.assetMetadata.field.subject.enum.botanic': 'گیاهان',
    'studio.consignArtwork.assetMetadata.field.subject.enum.business': 'کسب و کار',
    'studio.consignArtwork.assetMetadata.field.subject.enum.calligraphy': 'خوشنویسی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.car': 'ماشین',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cartoon': 'کارتون',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cats': 'گربه‌ها',
    'studio.consignArtwork.assetMetadata.field.subject.enum.celebrity': 'مشهور',
    'studio.consignArtwork.assetMetadata.field.subject.enum.children': 'کودکان',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cinema': 'سینما',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cities': 'شهرها',
    'studio.consignArtwork.assetMetadata.field.subject.enum.classicalmythology': 'اسطوره‌های کلاسیک',
    'studio.consignArtwork.assetMetadata.field.subject.enum.comics': 'کمیک',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cows': 'گاوها',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cuisine': 'آشپزی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.culture': 'فرهنگ',
    'studio.consignArtwork.assetMetadata.field.subject.enum.dogs': 'سگ‌ها',
    'studio.consignArtwork.assetMetadata.field.subject.enum.education': 'آموزش',
    'studio.consignArtwork.assetMetadata.field.subject.enum.erotic': 'تناسلی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.family': 'خانواده',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fantasy': 'فانتزی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fashion': 'مد',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fish': 'ماهی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.floral': 'گل',
    'studio.consignArtwork.assetMetadata.field.subject.enum.food': 'غذا',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fooddrink': 'غذا و نوشیدنی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.garden': 'باغ',
    'studio.consignArtwork.assetMetadata.field.subject.enum.geometric': 'هندسی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.graffiti': 'نقاشی دیوار',
    'studio.consignArtwork.assetMetadata.field.subject.enum.healthbeauty': 'سلامت و زیبایی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.home': 'خانه',
    'studio.consignArtwork.assetMetadata.field.subject.enum.horse': 'اسب',
    'studio.consignArtwork.assetMetadata.field.subject.enum.humor': 'طنز',
    'studio.consignArtwork.assetMetadata.field.subject.enum.interiors': 'داخلی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.kids': 'بچه‌ها',
    'studio.consignArtwork.assetMetadata.field.subject.enum.kitchen': 'آشپزخانه',
    'studio.consignArtwork.assetMetadata.field.subject.enum.landscape': 'منظره',
    'studio.consignArtwork.assetMetadata.field.subject.enum.language': 'زبان',
    'studio.consignArtwork.assetMetadata.field.subject.enum.light': 'نور',
    'studio.consignArtwork.assetMetadata.field.subject.enum.love': 'عشق',
    'studio.consignArtwork.assetMetadata.field.subject.enum.men': 'مردان',
    'studio.consignArtwork.assetMetadata.field.subject.enum.mortality': 'مرگی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motor': 'موتور',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motorbike': 'موتور سیکلت',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motorcycle': 'موتورسیکلت',
    'studio.consignArtwork.assetMetadata.field.subject.enum.music': 'موسیقی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.nature': 'طبیعت',
    'studio.consignArtwork.assetMetadata.field.subject.enum.nude': 'عریان',
    'studio.consignArtwork.assetMetadata.field.subject.enum.outerspace': 'فضای بیرونی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.patterns': 'الگوها',
    'studio.consignArtwork.assetMetadata.field.subject.enum.people': 'مردم',
    'studio.consignArtwork.assetMetadata.field.subject.enum.performingarts': 'هنرهای اجرایی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.places': 'مکان‌ها',
    'studio.consignArtwork.assetMetadata.field.subject.enum.political': 'سیاسی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.politics': 'سیاست',
    'studio.consignArtwork.assetMetadata.field.subject.enum.popculturecelebrity': 'فرهنگ محبوب/مشهور',
    'studio.consignArtwork.assetMetadata.field.subject.enum.popularculture': 'فرهنگ محبوب',
    'studio.consignArtwork.assetMetadata.field.subject.enum.portrait': 'پرتره',
    'studio.consignArtwork.assetMetadata.field.subject.enum.religion': 'دین',
    'studio.consignArtwork.assetMetadata.field.subject.enum.religious': 'مذهبی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.rurallife': 'زندگی روستایی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sailboat': 'قایق بادبانی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.science': 'علم',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sciencetechnology': 'علم/فناوری',
    'studio.consignArtwork.assetMetadata.field.subject.enum.seascape': 'ساحلی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.seasons': 'فصل‌ها',
    'studio.consignArtwork.assetMetadata.field.subject.enum.ship': 'کشتی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sport': 'ورزش',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sports': 'ورزش‌ها',
    'studio.consignArtwork.assetMetadata.field.subject.enum.stilllife': 'طبیعت‌مرده',
    'studio.consignArtwork.assetMetadata.field.subject.enum.technology': 'فناوری',
    'studio.consignArtwork.assetMetadata.field.subject.enum.time': 'زمان',
    'studio.consignArtwork.assetMetadata.field.subject.enum.train': 'قطار',
    'studio.consignArtwork.assetMetadata.field.subject.enum.travel': 'سفر',
    'studio.consignArtwork.assetMetadata.field.subject.enum.tree': 'درخت',
    'studio.consignArtwork.assetMetadata.field.subject.enum.typography': 'تایپوگرافی',
    'studio.consignArtwork.assetMetadata.field.subject.enum.wall': 'دیوار',
    'studio.consignArtwork.assetMetadata.field.subject.enum.water': 'آب',
    'studio.consignArtwork.assetMetadata.field.subject.enum.women': 'زنان',
    'studio.consignArtwork.assetMetadata.field.subject.enum.worldculture': 'فرهنگ جهانی',

    'studio.consignArtwork.assetMetadata.field.genre': 'سبک',
    'studio.consignArtwork.assetMetadata.field.genre.description': 'سبک‌های این اثر',

    'studio.consignArtwork.assetMetadata.field.aiGeneration': 'تولید هوش مصنوعی',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.description':
        'آیا بخشی از این اثر توسط هوش مصنوعی تولید شده است؟',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.full': 'کاملاً تولید شده توسط هوش مصنوعی',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.partial': 'تا حدی تولید شده توسط هوش مصنوعی',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.none': 'بدون استفاده از هوش مصنوعی',

    'studio.consignArtwork.assetMetadata.field.arenabled': 'فعال بودن واقعیت افزوده',
    'studio.consignArtwork.assetMetadata.field.arenabled.description': 'آیا واقعیت افزوده برای این اثر فعال است؟',
    'studio.consignArtwork.assetMetadata.field.arenabled.enum.yes': 'این اثر دارای واقعیت افزوده است',
    'studio.consignArtwork.assetMetadata.field.arenabled.enum.no': 'این اثر دارای واقعیت افزوده نیست',

    'studio.consignArtwork.assetMetadata.field.nudity': 'عریانی',
    'studio.consignArtwork.assetMetadata.field.nudity.description': 'آیا این اثر شامل عریانی است؟',
    'studio.consignArtwork.assetMetadata.field.nudity.enum.yes': 'این اثر شامل عریانی است',
    'studio.consignArtwork.assetMetadata.field.nudity.enum.no': 'این اثر شامل عریانی نیست',

    'studio.consignArtwork.assetMetadata.field.name': 'نام خالق',
    'studio.consignArtwork.assetMetadata.field.name.description': 'نام واقعی یا نام مستعار خالق',

    'studio.consignArtwork.assetMetadata.field.roles': 'نقش‌های خالق',
    'studio.consignArtwork.assetMetadata.field.roles.description': 'نقش‌های خالق برای این اثر یا عنوان عمومی',

    'studio.consignArtwork.assetMetadata.field.bio': 'زندگینامه خالق',
    'studio.consignArtwork.assetMetadata.field.bio.description': 'زندگینامه خالق (کوتاه، ۳-۴ جمله)',

    'studio.consignArtwork.assetMetadata.field.profileUrl': 'لینک وب‌سایت خالق',
    'studio.consignArtwork.assetMetadata.field.profileUrl.description': 'لینک وب‌سایت خالق',

    'studio.consignArtwork.assetMetadata.field.nationality': 'ملیت',
    'studio.consignArtwork.assetMetadata.field.nationality.description': 'ملیت یا کشور مبدا خالق',

    'studio.consignArtwork.assetMetadata.field.residence': 'محل اقامت',
    'studio.consignArtwork.assetMetadata.field.residence.description': 'کشور محل اقامت خالق',

    'studio.consignArtwork.assetMetadata.field.ethnicity': 'نژاد',
    'studio.consignArtwork.assetMetadata.field.ethnicity.description': 'نژاد خالق',

    'studio.consignArtwork.assetMetadata.field.gender': 'جنسیت',
    'studio.consignArtwork.assetMetadata.field.gender.description': 'جنسیت خالق',

    'studio.consignArtwork.assetMetadata.field.country': 'کشور',
    'studio.consignArtwork.assetMetadata.field.country.description': 'کشور مبدا این اثر',

    'studio.consignArtwork.assetMetadata.field.plusCode': 'پلاس‌کد',
    'studio.consignArtwork.assetMetadata.field.plusCode.description':
        'به عنوان مثال، کپنهاگ، دانمارک با پلاس‌کد "MHJQ+4V" است. می‌توانید از اینجا مقادیر پلاس‌کد را جستجو کنید: https://plus.codes/map',

    'studio.consignArtwork.assetMetadata.field.blockchain': 'بلاک‌چین',
    'studio.consignArtwork.assetMetadata.field.blockchain.description': 'بلاک‌چین',

    'studio.consignArtwork.assetMetadata.field.exhibitions': 'نمایشگاه‌ها',
    'studio.consignArtwork.assetMetadata.field.exhibitions.item': 'نمایش',
    'studio.consignArtwork.assetMetadata.field.exhibitions.description':
        'نمایشگاه‌هایی که این اثر در آن‌ها نمایش داده شده است',

    'studio.consignArtwork.assetMetadata.field.exhibitionName': 'نام نمایشگاه',
    'studio.consignArtwork.assetMetadata.field.exhibitionName.description': 'نام نمایشگاه',

    'studio.consignArtwork.assetMetadata.field.exhibitionUrl': 'لینک نمایشگاه',
    'studio.consignArtwork.assetMetadata.field.exhibitionUrl.description': 'لینک به اطلاعات نمایشگاه',

    'studio.consignArtwork.assetMetadata.field.awards': 'جوایز',
    'studio.consignArtwork.assetMetadata.field.awards.item': 'جایزه',
    'studio.consignArtwork.assetMetadata.field.awards.description': 'جوایزی که این اثر برنده شده است',

    'studio.consignArtwork.assetMetadata.field.awardName': 'نام جایزه',
    'studio.consignArtwork.assetMetadata.field.awardName.description': 'نام جایزه',

    'studio.consignArtwork.assetMetadata.field.awardUrl': 'لینک جایزه',
    'studio.consignArtwork.assetMetadata.field.awardUrl.description': 'لینک به اطلاعات جایزه',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${
            data.message === 'required' || data.message === 'minItems'
                ? 'این فیلد الزامی است'
                : data.message === 'format'
                  ? 'فرمت این فیلد اشتباه است'
                  : ''
        }`,

    /* Licenses */
    'studio.consignArtwork.licenses.title': 'لایسنس‌ها',
    'studio.consignArtwork.licenses.description':
        'در حال حاضر، ویتروو چهار راه برای اخذ مجوز/فروش اثر هنری شما ارائه می‌دهد. در اینجا می‌توانید هر یک از گزینه‌های این مجوزها را انتخاب کنید:',
    'studio.consignArtwork.licenses.oneLicense.error': 'لطفاً حداقل یک لایسنس اضافه کنید',
    'studio.consignArtwork.licenses.fillFields.error': 'فیلدها را به درستی پر کنید.',
    'studio.consignArtwork.licenses.alreadyAdded': 'لایسنس از قبل اضافه شده است',
    'studio.consignArtwork.licenses.delete.button': 'حذف',
    'studio.consignArtwork.licenses.add.button': 'اضافه',
    'studio.consignArtwork.licenses.warning':
        'آثار تولید اولیه به فروش ام‌اف‌تی به ارزش 150 دلار تضمین شده‌اند. لطفاً لایسنس DIGITAL COLLECTIBLE-ART-1 را انتخاب کنید، ادیشن تکی را انتخاب کرده و مبلغ 150 دلار را وارد کنید. همچنین می‌توانید لایسنس‌های اضافی را نیز انتخاب کنید.',

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

    'studio.consignArtwork.licenses.nft.ccby':
        'این مجوز به کاربران اجازه می‌دهد تا مواد را در هر رسانه یا فرمتی توزیع، ترکیب، سازگار و ساخته شده روی آن بگذارند، تا زمانی که نشانی از خالق داده شود. این مجوز برای استفاده تجاری امکان پذیر است.',
    'studio.consignArtwork.licenses.nft.ccbysa':
        'این مجوز به کاربران اجازه می‌دهد تا مواد را در هر رسانه یا فرمتی توزیع، ترکیب، سازگار و ساخته شده روی آن بگذارند، تا زمانی که نشانی از خالق داده شود. این مجوز برای استفاده تجاری امکان پذیر است. اگر مواد را تغییر دهید، سازگار کنید یا بر مبنای مواد اصلی ساخته شده، باید مواد تغییر یافته را زیر شرایط یکسان مجوز دهید.',
    'studio.consignArtwork.licenses.nft.ccbync':
        'این مجوز به کاربران اجازه می‌دهد تا مواد را در هر رسانه یا فرمتی برای مقاصد غیرتجاری تنها، و تنها تا زمانی که نشانی از خالق داده شود، توزیع، ترکیب، سازگار و ساخته شده روی آن بگذارند.',
    'studio.consignArtwork.licenses.nft.ccbyncsa':
        'این مجوز به کاربران اجازه می‌دهد تا مواد را در هر رسانه یا فرمتی برای مقاصد غیرتجاری تنها، و تنها تا زمانی که نشانی از خالق داده شود، توزیع، ترکیب، سازگار و ساخته شده روی آن بگذارند. اگر مواد را تغییر دهید، سازگار کنید یا بر مبنای مواد اصلی ساخته شده، باید مواد تغییر یافته را زیر شرایط یکسان مجوز دهید.',
    'studio.consignArtwork.licenses.nft.ccbynd':
        'این مجوز به کاربران اجازه می‌دهد تا مواد را تنها در فرمت یا رسانه‌ای که بدون تغییر است، تکثیر و توزیع کنند، تا زمانی که نشانی از خالق داده شود.',
    'studio.consignArtwork.licenses.nft.ccbyncnd':
        'این مجوز به کاربران اجازه می‌دهد تا مواد را تنها در فرمت یا رسانه‌ای که بدون تغییر است، تکثیر و توزیع کنند، تنها برای مقاصد غیرتجاری، و تنها تا زمانی که نشانی از خالق داده شود.',
    'studio.consignArtwork.licenses.nft.cc0':
        'CC0 (به نام CC Zero) ابزار اهدای عمومی است که امکان داده است که خالقان حق نشر خود را رها کنند و اثرات خود را به دامنه عمومی جهانی بگذارند. CC0 به کاربران اجازه می‌دهد تا مواد را در هر رسانه یا فرمتی، بدون هیچ شرایطی، توزیع، ترکیب، سازگار و ساخته شده روی آن بگذارند.',

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

    'studio.consignArtwork.licenses.artCards.description':
        'این مجوز اثر هنری را برای کاربران نهایی برای استفاده در برنامه‌های ArtCard فراهم می‌کند.',
    'studio.consignArtwork.licenses.artCards.enable':
        'این مجوز را فعال کنید اگر می‌خواهید کاربران نهایی از آثار هنری شما برای برنامه‌های ArtCard استفاده کنند.',
    'studio.consignArtwork.licenses.artCards.enable.description':
        'ArtCard یک برنامه برای ارائه آثار هنری به صورت دیجیتال است.',
    'studio.consignArtwork.licenses.artCards.enable.amount': (data: { amount: number; from: string }) =>
        `مبلغ ${data.amount} ${data.from}`,

    'studio.consignArtwork.licenses.print.description':
        'این مجوز، اثر هنری را برای چاپ روی یک آیتم فیزیکی با استفاده از فناوری چاپ بر حسب تقاضا (POD) در دسترس کاربران نهایی قرار می‌دهد. مجوز فقط محصولاتی را به مشتریان نشان می‌دهد که برای فایل‌های آثار هنری با وضوح پایین مناسب هستند.',
    'studio.consignArtwork.licenses.print.enable':
        'این مجوز را فعال کنید اگر می‌خواهید کاربران نهایی از آثار هنری شما برای برنامه‌های چاپ درخواستی (POD) استفاده کنند. این مجوز برای چاپ فردی است؛ چاپ انبوه مجاز نیست.',
    'studio.consignArtwork.licenses.print.singlePrint.title': 'چاپ تکیمجوز چاپ',
    'studio.consignArtwork.licenses.print.singlePrint.description':
        '"قیمت کالا" هزینه مجوز چاپ روی کالاهایی مانند لیوان، کلاه، پیراهن، کیف و غیره است.',
    'studio.consignArtwork.licenses.print.singlePrint.description2':
        '"قیمت نمایش" هزینه مجوز چاپ روی موادی است که هدف اصلی آنها نمایش اثر هنری است، مانند بوم، آلومینیوم، پوستر و غیره. این قیمت بر حسب سانتی‌متر مربع بیان می‌شود تا بتوان آن را بر روی محصولات نمایشی با اندازه‌های مختلف اعمال کرد.',
    'studio.consignArtwork.licenses.print.singlePrint.field': 'قیمت کالا',
    'studio.consignArtwork.licenses.print.singlePrint2.field': '(USD)',
    'studio.consignArtwork.licenses.print.displayPrice.field': 'قیمت نمایش',
    'studio.consignArtwork.licenses.print.displayPrice2.field': '(Cents به ازای هر سانتی‌متر مربع)',

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
    'studio.consignArtwork.auxiliaryMedia.field.description': 'توضیحات',
    'studio.consignArtwork.auxiliaryMedia.field.description.placeholder': 'توضیحات بلند درباره کار',

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

    'studio.consignArtwork.consignmentStatus.active.title': 'فعال',
    'studio.consignArtwork.consignmentStatus.draft.title': 'پیش نویس',
    'studio.consignArtwork.consignmentStatus.preview.title': 'پیش‌نمایش',
    'studio.consignArtwork.consignmentStatus.activate.title': 'فعال‌سازی',

    'studio.consignArtwork.consignmentStatus.activation.title': 'فعال‌سازی',
    'studio.consignArtwork.consignmentStatus.activation.description':
        'فعال‌سازی نقاشی شما را به زنجیره بلوک واگذار می‌کند و نیاز به اعتبار خالق دارد.',
    'studio.consignArtwork.consignmentStatus.creatorCreditsRequired': 'اعتبار خالق مورد نیاز',
    'studio.consignArtwork.consignmentStatus.creatorCreditsAvailable': 'اعتبار خالق موجود',
    'studio.consignArtwork.consignmentStatus.viewArtwork.button': 'نمایش نقاشی',
    'studio.consignArtwork.consignmentStatus.warning':
        'اعتبارات خالق به زودی به تمام هنرمندان توزیع خواهد شد! ما شما را دوباره اطلاع خواهیم داد زمانی که برای این مرحله نهایی آماده باشیم.',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'آیا می‌خواهید اطلاعات را ذخیره کنید؟',
    'studio.consignArtwork.backModal.confirm.button': 'ذخیره',
    'studio.consignArtwork.backModal.cancel.button': 'خیر',

    /* Sidebar */
    'studio.sidebar.consign': 'قرارداد آثار هنری',
    'studio.sidebar.community': 'پشتیبانی جامعه',
    'studio.sidebar.store': 'فروشگاه',
    'studio.sidebar.truLevel': 'سطح‌های سازنده',
    'studio.sidebar.profile': 'پروفایل',

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
