import { Translation } from './types';

const language: Translation = {
    /* Login */

    /* Languages */
    'studio.languages.portuguesePTBR': 'Portuguese (pt-BR)',
    'studio.languages.englishUS': 'English (en-US)',
    'studio.languages.spanishES': 'Spanish (es-ES)',
    'studio.languages.farsiFA': 'Farsi (fa-IR)',
    'studio.languages.russianRU': 'Russian (ru-RU)',

    /* Home */
    'studio.home.wellcome': 'Welcome to',
    'studio.home.title': 'Home',
    'studio.home.transforming':
        'Vitruveo is transforming Web3 art, and that means all-new software like this “Beta” version of vtruStudio. Beta means the software is not fully ready and you’re helping us test it so it can be improved.',
    'studio.home.software': 'The software currently has two features you can access with the buttons below:',
    'studio.home.consign': 'Consign Artwork',
    'studio.home.myProfile': 'My Profile',

    /* User Account */
    'studio.userAccount.title': 'User Account',
    'studio.userAccount.creator': 'Creator',
    'studio.userAccount.logout.button': 'Logout',
    'studio.userAccount.menu.title': 'My Profile',
    'studio.userAccount.menu.subtitle': 'User Settings',
    'studio.userAccount.usernameNotFound': 'Username not found',

    /* My Profile */
    'studio.myProfile.pasteCode': 'Paste code',
    'studio.myProfile.title': 'My Profile',
    'studio.myProfile.subtitle': 'Customize your Vitruveo profile with multiple email and wallet addresses.',
    'studio.myProfile.home': 'Home',
    'studio.myProfile.saveMessage': 'Data saved successfully',
    'studio.myProfile.accessConsignMessage':
        'To access the consign artwork, it is necessary to fill in all the mandatory fields in the user profile',
    'studio.myProfile.form.username.title': 'Username',
    'studio.myProfile.form.username.placeholder': 'Enter username',
    'studio.myProfile.form.usernameRequired.error': 'Username is required',
    'studio.myProfile.form.profile.title': 'Change your profile picture from here',
    'studio.myProfile.form.profile.reset.button': 'Reset',
    'studio.myProfile.form.profile.upload.button': 'Upload',
    'studio.myProfile.form.profile.description': 'Allowed JPG, GIF or PNG. Max size of 800KB',
    'studio.myProfile.form.emails.title': 'Emails',
    'studio.myProfile.form.emailsExists.error': 'Email already exists',
    'studio.myProfile.form.addEmails.placeholder': 'Additional e-mail (optional)',
    'studio.myProfile.form.code.placeholder': 'type a code...',
    'studio.myProfile.form.verify.button': 'Verify',
    'studio.myProfile.form.delete.button': 'Delete',
    'studio.myProfile.form.wallets.title': 'Wallets',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'verification code sent to email',
    'studio.myProfile.verificationCodeSentMessageError': 'error sending verification code to email',
    'studio.myProfile.emailVerificationMessageSuccess': 'email verified',
    'studio.myProfile.emailVerificationMessageError': 'error verifying code',
    'studio.myProfile.form.wallet.placeholderAdded': 'Additional wallet (optional)',
    'studio.myProfile.form.wallet.connected': 'Wallet already connected',
    'studio.myProfile.form.wallet.placeholder': 'Connect new wallet',
    'studio.myProfile.form.connect.button': 'Connect',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Next',
    'studio.consignArtwork.title': 'Consign Artwork',
    'studio.consignArtwork.subtitle': 'Complete all required tasks and consign your artwork.',
    'studio.consignArtwork.subtitle.moreInformation': 'For more information visit the',
    'studio.consignArtwork.subtitle.link': 'Dreamer website.',
    'studio.consignArtwork.assetPreview': 'Asset Preview',

    'studio.consignArtwork.stepName.assetMedia': 'Asset Media',
    'studio.consignArtwork.stepName.assetMetadata': 'Asset Metadata',
    'studio.consignArtwork.stepName.licenses': 'Licenses',
    'studio.consignArtwork.stepName.termsOfUse': 'Terms of Use',
    'studio.consignArtwork.stepName.auxiliaryMedia': 'Auxiliary Media',
    'studio.consignArtwork.stepName.reviewAndConsign': 'Review And Consign',
    'studio.consignArtwork.optional': 'optional',
    'studio.consignArtwork.artworkListing': 'Artwork Listing',
    'studio.consignArtwork.artworkConsignedTitle': 'Your artwork is currently consigned.',

    'studio.consignArtwork.stepStatus.completed': 'Completed',
    'studio.consignArtwork.stepStatus.inProgress': 'In Progress',
    'studio.consignArtwork.stepStatus.notStarted': 'Not Started',
    'studio.consignArtwork.stepStatus.error': 'Error',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Published successfully!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Edit' : 'Start'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Review and Update' : 'Review and Consign'}`,

    'studio.consignArtwork.comingSoon': 'Coming soon',

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Asset Media',
    'studio.consignArtwork.assetMedia.description': 'Upload media assets for the artwork being consigned.',
    'studio.consignArtwork.assetMedia.differentUses': 'UPLOAD/CREATE VARIATIONS FOR DIFFERENT USES',
    'studio.consignArtwork.assetMedia.amazing':
        'Looks amazing! For your artwork to look great on different devices, we need a few more variations.',
    'studio.consignArtwork.assetMedia.haveCreated':
        'If you have created your own files for the variations below, simply upload each one here.',
    'studio.consignArtwork.assetMedia.haveNotCreated':
        'If you have not created your own files don’t worry, just upload your original file again for each required variation and we’ll help you crop your file right here.',
    'studio.consignArtwork.assetMedia.previewHelp':
        'Preview file will be a five second clip of your artwork. You can upload one you’ve created yourself or just upload your original file and we’ll help you create that clip here.',
    'studio.consignArtwork.assetMedia.upload.button': 'Upload',
    'studio.consignArtwork.assetMedia.assets': 'Media Assets',
    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${
            data.definition === 'landscape' ? 'Landscape' : data.definition === 'portrait' ? 'Portrait' : 'Square'
        }`;
    },
    'studio.consignArtwork.assetMedia.image': 'Image',
    'studio.consignArtwork.assetMedia.video': 'Video',
    'studio.consignArtwork.assetMedia.max': (data: { seconds: number }) =>
        `${data.seconds ? `max / ${data.seconds} seconds` : 'maximum'}`,

    'studio.consignArtwork.assetMedia.mediaRequired': (data: { required: boolean }) =>
        `${data.required ? 'Required' : 'Optional'}`,

    'studio.consignArtwork.assetMedia.mediaIs': 'This media is',
    'studio.consignArtwork.assetMedia.cropModal.title': (data: { width: string; height: string }) =>
        `Crop media for Display to ${data.width} x ${data.height} pixels. Click “Done” to save.`,

    'studio.consignArtwork.assetMedia.formats': (data: {
        format: 'original' | 'display' | 'exhibition' | 'preview' | 'print';
    }) => {
        if (data.format === 'original') return 'Original';
        if (data.format === 'display') return 'Display';
        if (data.format === 'exhibition') return 'Exhibition';
        if (data.format === 'preview') return 'Preview';
        if (data.format === 'print') return 'Print';
        return '';
    },

    'studio.consignArtwork.assetMedia.modalError.title': 'Uh oh! The media file you uploaded has the following issues:',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.title': 'Dimensions',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.description': (data: {
        definition: string;
        format: string;
        width: string;
        height: string;
    }) =>
        `— The media file for a ${data.definition} Image (${data.format}) must be at least ${data.width} x ${data.height} pixels`,

    'studio.consignArtwork.assetMedia.modalErrorSize.title': 'Size',
    'studio.consignArtwork.assetMedia.modalErrorSize.description': (data: {
        definition: string;
        format: string;
        sizeError: string;
    }) => `— The media file size for a ${data.definition} Image (${data.format}) cannot exceed ${data.sizeError}`,

    'studio.consignArtwork.assetMedia.dragAndDrop': 'ORIGINAL ARTWORK UPLOAD',
    'studio.consignArtwork.assetMedia.dragAndDrop.description':
        'To upload your original artwork, drag and drop your file here or click to select your file from your computer.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Image: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Video: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Asset Metadata',
    'studio.consignArtwork.assetMetadata.description': 'All Asset Metadata is viewable to the public.',

    'studio.consignArtwork.assetMetadata.section.context': 'Context',
    'studio.consignArtwork.assetMetadata.section.taxonomy': 'Taxonomy',
    'studio.consignArtwork.assetMetadata.section.creators': 'Creators',
    'studio.consignArtwork.assetMetadata.section.provenance': 'Provenance',
    'studio.consignArtwork.assetMetadata.section.custom': 'Custom',
    'studio.consignArtwork.assetMetadata.section.assets': 'Assets',

    'studio.consignArtwork.assetMetadata.field.title': 'Title',
    'studio.consignArtwork.assetMetadata.field.title.description': 'Title of work',

    'studio.consignArtwork.assetMetadata.field.description': 'Short description',
    'studio.consignArtwork.assetMetadata.field.description.description':
        'Brief description of work. Short description available in Auxiliary Media.',

    'studio.consignArtwork.assetMetadata.field.longDescription': 'Long description',
    'studio.consignArtwork.assetMetadata.field.longDescription.description':
        'Brief description of work. Longer description available in Auxiliary Media.',

    'studio.consignArtwork.assetMetadata.field.mood': 'Mood',
    'studio.consignArtwork.assetMetadata.field.mood.description': 'Feelings that the work evokes',

    'studio.consignArtwork.assetMetadata.field.mood.enum.admiration': 'Admiration',
    'studio.consignArtwork.assetMetadata.field.mood.enum.absorbing': 'Absorbing',
    'studio.consignArtwork.assetMetadata.field.mood.enum.amusement': 'Amusement',
    'studio.consignArtwork.assetMetadata.field.mood.enum.adoration': 'Adoration',
    'studio.consignArtwork.assetMetadata.field.mood.enum.awe': 'Awe',
    'studio.consignArtwork.assetMetadata.field.mood.enum.anxiety': 'Anxiety',
    'studio.consignArtwork.assetMetadata.field.mood.enum.boredom': 'Boredom',
    'studio.consignArtwork.assetMetadata.field.mood.enum.brooding': 'Brooding',
    'studio.consignArtwork.assetMetadata.field.mood.enum.calmness': 'Calmness',
    'studio.consignArtwork.assetMetadata.field.mood.enum.chills': 'Chills',
    'studio.consignArtwork.assetMetadata.field.mood.enum.chaotic': 'Chaotic',
    'studio.consignArtwork.assetMetadata.field.mood.enum.connectedness': 'Connectedness',
    'studio.consignArtwork.assetMetadata.field.mood.enum.cosmic': 'Cosmic',
    'studio.consignArtwork.assetMetadata.field.mood.enum.confusion': 'Confusion',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dread': 'Dread',
    'studio.consignArtwork.assetMetadata.field.mood.enum.distaste': 'Distaste',
    'studio.consignArtwork.assetMetadata.field.mood.enum.disgust': 'Disgust',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dreary': 'Dreary',
    'studio.consignArtwork.assetMetadata.field.mood.enum.disorienting': 'Disorienting',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dreamy': 'Dreamy',
    'studio.consignArtwork.assetMetadata.field.mood.enum.desire': 'Desire',
    'studio.consignArtwork.assetMetadata.field.mood.enum.elegant': 'Elegant',
    'studio.consignArtwork.assetMetadata.field.mood.enum.humorous': 'Humorous',
    'studio.consignArtwork.assetMetadata.field.mood.enum.intimate': 'Intimate',
    'studio.consignArtwork.assetMetadata.field.mood.enum.intricate': 'Intricate',
    'studio.consignArtwork.assetMetadata.field.mood.enum.love': 'Love',
    'studio.consignArtwork.assetMetadata.field.mood.enum.lively': 'Lively',
    'studio.consignArtwork.assetMetadata.field.mood.enum.mystical': 'Mystical',
    'studio.consignArtwork.assetMetadata.field.mood.enum.mysterious': 'Mysterious',
    'studio.consignArtwork.assetMetadata.field.mood.enum.nostalgia': 'Nostalgia',
    'studio.consignArtwork.assetMetadata.field.mood.enum.ornate': 'Ornate',
    'studio.consignArtwork.assetMetadata.field.mood.enum.psychedelic': 'Psychedelic',
    'studio.consignArtwork.assetMetadata.field.mood.enum.serenity': 'Serenity',
    'studio.consignArtwork.assetMetadata.field.mood.enum.sadness': 'Sadness',
    'studio.consignArtwork.assetMetadata.field.mood.enum.sensual': 'Sensual',
    'studio.consignArtwork.assetMetadata.field.mood.enum.spiritual': 'Spiritual',
    'studio.consignArtwork.assetMetadata.field.mood.enum.strange': 'Strange',
    'studio.consignArtwork.assetMetadata.field.mood.enum.striking': 'Striking',
    'studio.consignArtwork.assetMetadata.field.mood.enum.tragic': 'Tragic',
    'studio.consignArtwork.assetMetadata.field.mood.enum.tense': 'Tense',
    'studio.consignArtwork.assetMetadata.field.mood.enum.vibrant': 'Vibrant',
    'studio.consignArtwork.assetMetadata.field.mood.enum.violent': 'Violent',
    'studio.consignArtwork.assetMetadata.field.mood.enum.wonder': 'Wonder',
    'studio.consignArtwork.assetMetadata.field.mood.enum.whimsical': 'Whimsical',

    'studio.consignArtwork.assetMetadata.field.copyright': 'Copyright',
    'studio.consignArtwork.assetMetadata.field.copyright.description':
        'Copyright text. (Example: Copyright (c) 2024 Joe Artist)',

    'studio.consignArtwork.assetMetadata.field.colors': 'Colors',
    'studio.consignArtwork.assetMetadata.field.colors.item': 'Color',
    'studio.consignArtwork.assetMetadata.field.colors.description': 'Main color palette (up to three colors)',

    'studio.consignArtwork.assetMetadata.field.orientation': 'Orientation',
    'studio.consignArtwork.assetMetadata.field.orientation.description': 'Orientation of this work',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.horizontal': 'Horizontal',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.vertical': 'Vertical',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.square': 'Square',

    'studio.consignArtwork.assetMetadata.field.culture': 'Culture',
    'studio.consignArtwork.assetMetadata.field.culture.description': 'Primary culture for this work',

    'studio.consignArtwork.assetMetadata.field.culture.enum.african': 'African',
    'studio.consignArtwork.assetMetadata.field.culture.enum.centralasian': 'Central Asian',
    'studio.consignArtwork.assetMetadata.field.culture.enum.eastasian': 'East Asian',
    'studio.consignArtwork.assetMetadata.field.culture.enum.islamic': 'Islamic',
    'studio.consignArtwork.assetMetadata.field.culture.enum.latinamerican': 'Latin American',
    'studio.consignArtwork.assetMetadata.field.culture.enum.nativeamerican': 'Native American',
    'studio.consignArtwork.assetMetadata.field.culture.enum.oceanic': 'Oceanic',
    'studio.consignArtwork.assetMetadata.field.culture.enum.southasian': 'South Asian',
    'studio.consignArtwork.assetMetadata.field.culture.enum.southeastasian': 'Southeast Asian',
    'studio.consignArtwork.assetMetadata.field.culture.enum.western': 'Western',
    'studio.consignArtwork.assetMetadata.field.culture.enum.persian': 'Persian',

    'studio.consignArtwork.assetMetadata.field.objectType': 'Object Type',
    'studio.consignArtwork.assetMetadata.field.objectType.description': 'Origin of the work',

    'studio.consignArtwork.assetMetadata.field.objectType.enum.digitalart': 'Digital Art',
    'studio.consignArtwork.assetMetadata.field.objectType.enum.physicalart': 'Physical Art',
    'studio.consignArtwork.assetMetadata.field.objectType.enum.digitalphysicalart': 'Physical+Digital Hybrid Art',

    'studio.consignArtwork.assetMetadata.field.tags': 'Tags',
    'studio.consignArtwork.assetMetadata.field.tags.item': 'Tag',
    'studio.consignArtwork.assetMetadata.field.tags.description': 'Tags relevant to the work',

    'studio.consignArtwork.assetMetadata.field.collections': 'Collections',
    'studio.consignArtwork.assetMetadata.field.collections.item': 'Collection',
    'studio.consignArtwork.assetMetadata.field.collections.description':
        'Collections for organizing this work (at least one required)',

    'studio.consignArtwork.assetMetadata.field.category': 'Category',
    'studio.consignArtwork.assetMetadata.field.category.description': 'Category of this work',

    'studio.consignArtwork.assetMetadata.field.category.enum.photography': 'Photography',
    'studio.consignArtwork.assetMetadata.field.category.enum.painting': 'Painting',
    'studio.consignArtwork.assetMetadata.field.category.enum.threed': '3D',
    'studio.consignArtwork.assetMetadata.field.category.enum.video': 'Video',
    'studio.consignArtwork.assetMetadata.field.category.enum.mixedmedia': 'Mixed Media',
    'studio.consignArtwork.assetMetadata.field.category.enum.illustration': 'Illustration',
    'studio.consignArtwork.assetMetadata.field.category.enum.collage': 'Collage',

    'studio.consignArtwork.assetMetadata.field.medium': 'Medium',
    'studio.consignArtwork.assetMetadata.field.medium.description': 'Mediums used for this work',

    'studio.consignArtwork.assetMetadata.field.medium.enum.acrylic': 'Acrylic',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ai': 'Artificial Intelligence',
    'studio.consignArtwork.assetMetadata.field.medium.enum.airbrush': 'Airbrush',
    'studio.consignArtwork.assetMetadata.field.medium.enum.albumensilver': 'Albumensilver',
    'studio.consignArtwork.assetMetadata.field.medium.enum.algorithmic': 'Algorithmic Art',
    'studio.consignArtwork.assetMetadata.field.medium.enum.aluminium': 'Aluminium',
    'studio.consignArtwork.assetMetadata.field.medium.enum.appropriation': 'Appropriation',
    'studio.consignArtwork.assetMetadata.field.medium.enum.aquatint': 'Aquatint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.assemblage': 'Assemblage',
    'studio.consignArtwork.assetMetadata.field.medium.enum.augmentedreality': 'Augmentedreality',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ballpoint': 'Ballpoint Pen',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bas-relief': 'Bas-Relief',
    'studio.consignArtwork.assetMetadata.field.medium.enum.basalt': 'Basalt',
    'studio.consignArtwork.assetMetadata.field.medium.enum.binder': 'Binder',
    'studio.consignArtwork.assetMetadata.field.medium.enum.blockchain': 'Blockchain',
    'studio.consignArtwork.assetMetadata.field.medium.enum.board': 'Board',
    'studio.consignArtwork.assetMetadata.field.medium.enum.brass': 'Brass',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bronze': 'Bronze',
    'studio.consignArtwork.assetMetadata.field.medium.enum.brush': 'Brush',
    'studio.consignArtwork.assetMetadata.field.medium.enum.burlap': 'Burlap',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bw': 'Black & White',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cable': 'Cable',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cameo': 'Cameo',
    'studio.consignArtwork.assetMetadata.field.medium.enum.canvas': 'Canvas',
    'studio.consignArtwork.assetMetadata.field.medium.enum.carbonfiber': 'Carbonfiber',
    'studio.consignArtwork.assetMetadata.field.medium.enum.card': 'Card',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cardboard': 'Cardboard',
    'studio.consignArtwork.assetMetadata.field.medium.enum.casein': 'Casein',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cement': 'Cement',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ceramic': 'Ceramic',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ceramics': 'Ceramics',
    'studio.consignArtwork.assetMetadata.field.medium.enum.chalk': 'Chalk',
    'studio.consignArtwork.assetMetadata.field.medium.enum.charcoal': 'Charcoal',
    'studio.consignArtwork.assetMetadata.field.medium.enum.chisel': 'Chisel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.clay': 'Clay',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cliché-verre': 'Cliché-Verre',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cloth': 'Cloth',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coal': 'Coal',
    'studio.consignArtwork.assetMetadata.field.medium.enum.collage': 'Collage',
    'studio.consignArtwork.assetMetadata.field.medium.enum.collotype': 'Collotype',
    'studio.consignArtwork.assetMetadata.field.medium.enum.color': 'Color',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coloredmarkers': 'Coloredmarkers',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coloredpencils': 'Coloredpencils',
    'studio.consignArtwork.assetMetadata.field.medium.enum.colorvarnish': 'Colorvarnish',
    'studio.consignArtwork.assetMetadata.field.medium.enum.concrete': 'Concrete',
    'studio.consignArtwork.assetMetadata.field.medium.enum.conte': 'Conte',
    'studio.consignArtwork.assetMetadata.field.medium.enum.copper': 'Copper',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cotton': 'Cotton',
    'studio.consignArtwork.assetMetadata.field.medium.enum.crayon': 'Crayon',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ctype': 'C-type',
    'studio.consignArtwork.assetMetadata.field.medium.enum.decoupage': 'Decoupage',
    'studio.consignArtwork.assetMetadata.field.medium.enum.digital': 'Digital',
    'studio.consignArtwork.assetMetadata.field.medium.enum.drawing': 'Drawing',
    'studio.consignArtwork.assetMetadata.field.medium.enum.drypoint': 'Drypoint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.dust': 'Dust',
    'studio.consignArtwork.assetMetadata.field.medium.enum.dye': 'Dye Transfer',
    'studio.consignArtwork.assetMetadata.field.medium.enum.elephantdung': 'Elephantdung',
    'studio.consignArtwork.assetMetadata.field.medium.enum.embroidery': 'Embroidery',
    'studio.consignArtwork.assetMetadata.field.medium.enum.emulsion': 'Emulsion',
    'studio.consignArtwork.assetMetadata.field.medium.enum.enamel': 'Enamel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.encaustic': 'Encaustic',
    'studio.consignArtwork.assetMetadata.field.medium.enum.engraving': 'Engraving',
    'studio.consignArtwork.assetMetadata.field.medium.enum.environmental': 'Environmental',
    'studio.consignArtwork.assetMetadata.field.medium.enum.etching': 'Etching',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fabric': 'Fabric',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fabricstraps': 'Fabricstraps',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fat': 'Fat',
    'studio.consignArtwork.assetMetadata.field.medium.enum.feather': 'Feather',
    'studio.consignArtwork.assetMetadata.field.medium.enum.felt-tippen': 'Felt-Tippen',
    'studio.consignArtwork.assetMetadata.field.medium.enum.felt': 'Felt',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiber': 'Fiber',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiberboard': 'Fiberboard',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiberglass': 'Fiberglass',
    'studio.consignArtwork.assetMetadata.field.medium.enum.flashlight': 'Flashlight',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fluorescentpaint': 'Fluorescentpaint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.found': 'Found Objects',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fractal': 'Fractal',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fresco': 'Fresco',
    'studio.consignArtwork.assetMetadata.field.medium.enum.frottage': 'Frottage',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fullspectrum': 'Full spectrum',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gelatin': 'Gelatin',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gelatinsilverprint': 'Gelatinsilverprint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gesso': 'Gesso',
    'studio.consignArtwork.assetMetadata.field.medium.enum.giclee': 'Giclée',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gilt': 'Gilt',
    'studio.consignArtwork.assetMetadata.field.medium.enum.glass': 'Glass',
    'studio.consignArtwork.assetMetadata.field.medium.enum.glitter': 'Glitter',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gloss': 'Gloss',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gold': 'Gold',
    'studio.consignArtwork.assetMetadata.field.medium.enum.goldleaf': 'Goldleaf',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gouache': 'Gouache',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graffiti': 'Graffiti',
    'studio.consignArtwork.assetMetadata.field.medium.enum.granite': 'Granite',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graphite': 'Graphite',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graphitepencil': 'Graphitepencil',
    'studio.consignArtwork.assetMetadata.field.medium.enum.grattage': 'Grattage',
    'studio.consignArtwork.assetMetadata.field.medium.enum.greenstone': 'Greenstone',
    'studio.consignArtwork.assetMetadata.field.medium.enum.grisaille': 'Grisaille',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gumarabic': 'Gumarabic',
    'studio.consignArtwork.assetMetadata.field.medium.enum.hematite': 'Hematite',
    'studio.consignArtwork.assetMetadata.field.medium.enum.hemp': 'Hemp',
    'studio.consignArtwork.assetMetadata.field.medium.enum.hologram': 'Hologram',
    'studio.consignArtwork.assetMetadata.field.medium.enum.horns': 'Horns',
    'studio.consignArtwork.assetMetadata.field.medium.enum.household': 'Household',
    'studio.consignArtwork.assetMetadata.field.medium.enum.indianink': 'Indianink',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ink': 'Ink',
    'studio.consignArtwork.assetMetadata.field.medium.enum.intaglio': 'Intaglio',
    'studio.consignArtwork.assetMetadata.field.medium.enum.interactive': 'Interactive',
    'studio.consignArtwork.assetMetadata.field.medium.enum.iron': 'Iron',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ironplate': 'Ironplate',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ivory': 'Ivory',
    'studio.consignArtwork.assetMetadata.field.medium.enum.japanesepaper': 'Japanesepaper',
    'studio.consignArtwork.assetMetadata.field.medium.enum.jute': 'Jute',
    'studio.consignArtwork.assetMetadata.field.medium.enum.kinetic': 'Kinetic',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lacquer': 'Lacquer',
    'studio.consignArtwork.assetMetadata.field.medium.enum.laidpaper': 'Laidpaper',
    'studio.consignArtwork.assetMetadata.field.medium.enum.latex': 'Latex',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lavis': 'Lavis',
    'studio.consignArtwork.assetMetadata.field.medium.enum.leadpoint': 'Leadpoint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.leather': 'Leather',
    'studio.consignArtwork.assetMetadata.field.medium.enum.led': 'LED',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lemon': 'Lemon',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lenticular': 'Lenticular',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lightbox': 'Lightbox',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lightbulb': 'Lightbulb',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lights': 'Lights',
    'studio.consignArtwork.assetMetadata.field.medium.enum.limestone': 'Limestone',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linen': 'Linen',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocut': 'Linocut',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocutb&w': 'Linocutb&W',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocutcolor': 'Linocutcolor',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocuts': 'Linocuts',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linoleum': 'Linoleum',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lithograph': 'Lithograph',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lithography': 'Lithography',
    'studio.consignArtwork.assetMetadata.field.medium.enum.magna': 'Magna',
    'studio.consignArtwork.assetMetadata.field.medium.enum.magnets': 'Magnets',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mahoganypanel': 'Mahoganypanel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.majolica': 'Majolica',
    'studio.consignArtwork.assetMetadata.field.medium.enum.manipulated': 'Manipulated',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mappins': 'Mappins',
    'studio.consignArtwork.assetMetadata.field.medium.enum.marble': 'Marble',
    'studio.consignArtwork.assetMetadata.field.medium.enum.marker': 'Marker',
    'studio.consignArtwork.assetMetadata.field.medium.enum.maskingtape': 'Maskingtape',
    'studio.consignArtwork.assetMetadata.field.medium.enum.masonite': 'Masonite',
    'studio.consignArtwork.assetMetadata.field.medium.enum.metal': 'Metal',
    'studio.consignArtwork.assetMetadata.field.medium.enum.metalpoint': 'Metalpoint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mezzotint': 'Mezzotint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mixedmedia': 'Mixedmedia',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mixedtechnique': 'Mixedtechnique',
    'studio.consignArtwork.assetMetadata.field.medium.enum.monotype': 'Monotype',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mosaic': 'Mosaic',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mosaïque': 'Mosaïque',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mural': 'Mural',
    'studio.consignArtwork.assetMetadata.field.medium.enum.music': 'Music',
    'studio.consignArtwork.assetMetadata.field.medium.enum.musicpaper': 'Musicpaper',
    'studio.consignArtwork.assetMetadata.field.medium.enum.nails': 'Nails',
    'studio.consignArtwork.assetMetadata.field.medium.enum.neon': 'Neon',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oak': 'Oak',
    'studio.consignArtwork.assetMetadata.field.medium.enum.objettrouve': 'Objettrouve',
    'studio.consignArtwork.assetMetadata.field.medium.enum.obsidian': 'Obsidian',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oil': 'Oil',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oilcloth': 'Oilcloth',
    'studio.consignArtwork.assetMetadata.field.medium.enum.onyx': 'Onyx',
    'studio.consignArtwork.assetMetadata.field.medium.enum.paint': 'Paint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.paintedmetal': 'Paintedmetal',
    'studio.consignArtwork.assetMetadata.field.medium.enum.panel': 'Panel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.paper': 'Paper',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papermache': 'Paper mache',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papier-pelle': 'Papier-Pelle',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papyrus': 'Papyrus',
    'studio.consignArtwork.assetMetadata.field.medium.enum.parchment': 'Parchment',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pastel': 'Pastel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pebbles': 'Pebbles',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pen': 'Pen',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pencil': 'Pencil',
    'studio.consignArtwork.assetMetadata.field.medium.enum.penink': 'Pen and Ink',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pergament': 'Pergament',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photo': 'Photo',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photogram': 'Photogram',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photographicpaper': 'Photographicpaper',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photography': 'Photography',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photogravure': 'Photogravure',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photomontage': 'Photomontage',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photomosaic': 'Photomosaic',
    'studio.consignArtwork.assetMetadata.field.medium.enum.piano': 'Piano',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pigment': 'Pigment',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pinhole': 'Pinhole',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plaster': 'Plaster',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plastic': 'Plastic',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plates': 'Plates',
    'studio.consignArtwork.assetMetadata.field.medium.enum.platinum': 'Platinum',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plexiglas': 'Plexiglas',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plugsocket': 'Plugsocket',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plywood': 'Plywood',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polaroid': 'Polaroid',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polyester': 'Polyester',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polymer': 'Polymer',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polymerpaint': 'Polymerpaint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polystyrene': 'Polystyrene',
    'studio.consignArtwork.assetMetadata.field.medium.enum.poplar': 'Poplar',
    'studio.consignArtwork.assetMetadata.field.medium.enum.porcelain': 'Porcelain',
    'studio.consignArtwork.assetMetadata.field.medium.enum.postcard': 'Postcard',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pottery': 'Pottery',
    'studio.consignArtwork.assetMetadata.field.medium.enum.poetry': 'Poetry',
    'studio.consignArtwork.assetMetadata.field.medium.enum.precious': 'Precious Materials',
    'studio.consignArtwork.assetMetadata.field.medium.enum.print': 'Print',
    'studio.consignArtwork.assetMetadata.field.medium.enum.printedbrochure': 'Printedbrochure',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pyroxylin': 'Pyroxylin',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ready-made': 'Ready-Made',
    'studio.consignArtwork.assetMetadata.field.medium.enum.recorderwithcassette': 'Recorderwithcassette',
    'studio.consignArtwork.assetMetadata.field.medium.enum.resin': 'Resin',
    'studio.consignArtwork.assetMetadata.field.medium.enum.robotics': 'Robotics',
    'studio.consignArtwork.assetMetadata.field.medium.enum.rubber': 'Rubber',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sand': 'Sand',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sandstone': 'Sandstone',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sanguine': 'Sanguine',
    'studio.consignArtwork.assetMetadata.field.medium.enum.satin': 'Satin',
    'studio.consignArtwork.assetMetadata.field.medium.enum.scrapings': 'Scrapings',
    'studio.consignArtwork.assetMetadata.field.medium.enum.screenprint': 'Screenprint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.screenprinting': 'Screenprinting',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sculpting': '3D Sculpting',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sepia': 'Sepia',
    'studio.consignArtwork.assetMetadata.field.medium.enum.shell': 'Shell',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silk': 'Silk',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silkscreen': 'Silkscreen',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silver': 'Silver',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silverpoint': 'Silverpoint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sound': 'Sound',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sponge': 'Sponge',
    'studio.consignArtwork.assetMetadata.field.medium.enum.spraypaint': 'Spraypaint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stainedglass': 'Stainedglass',
    'studio.consignArtwork.assetMetadata.field.medium.enum.steel': 'Steel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stencil': 'Stencil',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stone': 'Stone',
    'studio.consignArtwork.assetMetadata.field.medium.enum.string': 'String',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stucco': 'Stucco',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stump': 'Stump',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tapestry': 'Tapestry',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tar': 'Tar',
    'studio.consignArtwork.assetMetadata.field.medium.enum.taxidermy': 'Taxidermy',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tempera': 'Tempera',
    'studio.consignArtwork.assetMetadata.field.medium.enum.terracotta': 'Terracotta',
    'studio.consignArtwork.assetMetadata.field.medium.enum.textile': 'Textile',
    'studio.consignArtwork.assetMetadata.field.medium.enum.timber': 'Timber',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tin': 'Tin',
    'studio.consignArtwork.assetMetadata.field.medium.enum.travertine': 'Travertine',
    'studio.consignArtwork.assetMetadata.field.medium.enum.turquoise': 'Turquoise',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tusche': 'Tusche',
    'studio.consignArtwork.assetMetadata.field.medium.enum.twine': 'Twine',
    'studio.consignArtwork.assetMetadata.field.medium.enum.varnish': 'Varnish',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vector': 'Vector',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vellum': 'Vellum',
    'studio.consignArtwork.assetMetadata.field.medium.enum.video': 'Video',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vinyl': 'Vinyl',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vitrage': 'Vitrage',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wall': 'Wall',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wallpaper': 'Wallpaper',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wash': 'Wash',
    'studio.consignArtwork.assetMetadata.field.medium.enum.watercolor': 'Watercolor',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wax': 'Wax',
    'studio.consignArtwork.assetMetadata.field.medium.enum.waxpastel': 'Waxpastel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.white': 'White',
    'studio.consignArtwork.assetMetadata.field.medium.enum.whitewash': 'Whitewash',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wine': 'Wine',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wire': 'Wire',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wood': 'Wood',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodblockprint': 'Woodblockprint',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodcut': 'Woodcut',
    'studio.consignArtwork.assetMetadata.field.medium.enum.film': 'Film',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodenchair': 'Woodenchair',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodengraving': 'Woodengraving',
    'studio.consignArtwork.assetMetadata.field.medium.enum.woodensled': 'Woodensled',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wool': 'Wool',
    'studio.consignArtwork.assetMetadata.field.medium.enum.zinc': 'Zinc',

    'studio.consignArtwork.assetMetadata.field.style': 'Style',
    'studio.consignArtwork.assetMetadata.field.style.description': 'Styles used in this work',

    'studio.consignArtwork.assetMetadata.field.style.enum.abstract': 'Abstract',
    'studio.consignArtwork.assetMetadata.field.style.enum.abstractexpressionism': 'Abstract Expressionism',
    'studio.consignArtwork.assetMetadata.field.style.enum.artdeco': 'Art Deco',
    'studio.consignArtwork.assetMetadata.field.style.enum.conceptual': 'Conceptual',
    'studio.consignArtwork.assetMetadata.field.style.enum.cubism': 'Cubism',
    'studio.consignArtwork.assetMetadata.field.style.enum.dada': 'Dada',
    'studio.consignArtwork.assetMetadata.field.style.enum.documentary': 'Documentary',
    'studio.consignArtwork.assetMetadata.field.style.enum.expressionism': 'Expressionism',
    'studio.consignArtwork.assetMetadata.field.style.enum.figurative': 'Figurative',
    'studio.consignArtwork.assetMetadata.field.style.enum.fineart': 'Fine Art',
    'studio.consignArtwork.assetMetadata.field.style.enum.folk': 'Folk',
    'studio.consignArtwork.assetMetadata.field.style.enum.illustration': 'Illustration',
    'studio.consignArtwork.assetMetadata.field.style.enum.impressionism': 'Impressionism',
    'studio.consignArtwork.assetMetadata.field.style.enum.minimalism': 'Minimalism',
    'studio.consignArtwork.assetMetadata.field.style.enum.modern': 'Modern',
    'studio.consignArtwork.assetMetadata.field.style.enum.photorealism': 'Photorealism',
    'studio.consignArtwork.assetMetadata.field.style.enum.popart': 'Pop Art',
    'studio.consignArtwork.assetMetadata.field.style.enum.portraiture': 'Portraiture',
    'studio.consignArtwork.assetMetadata.field.style.enum.realism': 'Realism',
    'studio.consignArtwork.assetMetadata.field.style.enum.streetart': 'Street Art',
    'studio.consignArtwork.assetMetadata.field.style.enum.surrealism': 'Surrealism',

    'studio.consignArtwork.assetMetadata.field.subject': 'Subject',
    'studio.consignArtwork.assetMetadata.field.subject.description':
        'Keywords identifying the subjects used in this work',

    'studio.consignArtwork.assetMetadata.field.subject.enum.abstract': 'Abstract',
    'studio.consignArtwork.assetMetadata.field.subject.enum.aerial': 'Aerial',
    'studio.consignArtwork.assetMetadata.field.subject.enum.aeroplane': 'Aeroplane',
    'studio.consignArtwork.assetMetadata.field.subject.enum.animal': 'Animal',
    'studio.consignArtwork.assetMetadata.field.subject.enum.architecture': 'Architecture',
    'studio.consignArtwork.assetMetadata.field.subject.enum.automobile': 'Automobile',
    'studio.consignArtwork.assetMetadata.field.subject.enum.beach': 'Beach',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bicycle': 'Bicycle',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bike': 'Bike',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bird': 'Bird',
    'studio.consignArtwork.assetMetadata.field.subject.enum.boat': 'Boat',
    'studio.consignArtwork.assetMetadata.field.subject.enum.body': 'Body',
    'studio.consignArtwork.assetMetadata.field.subject.enum.botanic': 'Botanic',
    'studio.consignArtwork.assetMetadata.field.subject.enum.business': 'Business',
    'studio.consignArtwork.assetMetadata.field.subject.enum.calligraphy': 'Calligraphy',
    'studio.consignArtwork.assetMetadata.field.subject.enum.car': 'Car',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cartoon': 'Cartoon',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cats': 'Cats',
    'studio.consignArtwork.assetMetadata.field.subject.enum.celebrity': 'Celebrity',
    'studio.consignArtwork.assetMetadata.field.subject.enum.children': 'Children',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cinema': 'Cinema',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cities': 'Cities',
    'studio.consignArtwork.assetMetadata.field.subject.enum.classicalmythology': 'Classical mythology',
    'studio.consignArtwork.assetMetadata.field.subject.enum.comics': 'Comics',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cows': 'Cows',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cuisine': 'Cuisine',
    'studio.consignArtwork.assetMetadata.field.subject.enum.culture': 'Culture',
    'studio.consignArtwork.assetMetadata.field.subject.enum.dogs': 'Dogs',
    'studio.consignArtwork.assetMetadata.field.subject.enum.education': 'Education',
    'studio.consignArtwork.assetMetadata.field.subject.enum.erotic': 'Erotic',
    'studio.consignArtwork.assetMetadata.field.subject.enum.family': 'Family',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fantasy': 'Fantasy',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fashion': 'Fashion',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fish': 'Fish',
    'studio.consignArtwork.assetMetadata.field.subject.enum.floral': 'Floral',
    'studio.consignArtwork.assetMetadata.field.subject.enum.food': 'Food',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fooddrink': 'Food & Drink',
    'studio.consignArtwork.assetMetadata.field.subject.enum.garden': 'Garden',
    'studio.consignArtwork.assetMetadata.field.subject.enum.geometric': 'Geometric',
    'studio.consignArtwork.assetMetadata.field.subject.enum.graffiti': 'Graffiti',
    'studio.consignArtwork.assetMetadata.field.subject.enum.healthbeauty': 'Health & Beauty',
    'studio.consignArtwork.assetMetadata.field.subject.enum.home': 'Home',
    'studio.consignArtwork.assetMetadata.field.subject.enum.horse': 'Horse',
    'studio.consignArtwork.assetMetadata.field.subject.enum.humor': 'Humor',
    'studio.consignArtwork.assetMetadata.field.subject.enum.interiors': 'Interiors',
    'studio.consignArtwork.assetMetadata.field.subject.enum.kids': 'Kids',
    'studio.consignArtwork.assetMetadata.field.subject.enum.kitchen': 'Kitchen',
    'studio.consignArtwork.assetMetadata.field.subject.enum.landscape': 'Landscape',
    'studio.consignArtwork.assetMetadata.field.subject.enum.language': 'Language',
    'studio.consignArtwork.assetMetadata.field.subject.enum.light': 'Light',
    'studio.consignArtwork.assetMetadata.field.subject.enum.love': 'Love',
    'studio.consignArtwork.assetMetadata.field.subject.enum.men': 'Men',
    'studio.consignArtwork.assetMetadata.field.subject.enum.mortality': 'Mortality',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motor': 'Motor',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motorbike': 'Motorbike',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motorcycle': 'Motorcycle',
    'studio.consignArtwork.assetMetadata.field.subject.enum.music': 'Music',
    'studio.consignArtwork.assetMetadata.field.subject.enum.nature': 'Nature',
    'studio.consignArtwork.assetMetadata.field.subject.enum.nude': 'Nude',
    'studio.consignArtwork.assetMetadata.field.subject.enum.outerspace': 'Outer Space',
    'studio.consignArtwork.assetMetadata.field.subject.enum.patterns': 'Patterns',
    'studio.consignArtwork.assetMetadata.field.subject.enum.people': 'People',
    'studio.consignArtwork.assetMetadata.field.subject.enum.performingarts': 'Performing Arts',
    'studio.consignArtwork.assetMetadata.field.subject.enum.places': 'Places',
    'studio.consignArtwork.assetMetadata.field.subject.enum.political': 'Political',
    'studio.consignArtwork.assetMetadata.field.subject.enum.politics': 'Politics',
    'studio.consignArtwork.assetMetadata.field.subject.enum.popculturecelebrity': 'Pop Culture/Celebrity',
    'studio.consignArtwork.assetMetadata.field.subject.enum.popularculture': 'Popular culture',
    'studio.consignArtwork.assetMetadata.field.subject.enum.portrait': 'Portrait',
    'studio.consignArtwork.assetMetadata.field.subject.enum.religion': 'Religion',
    'studio.consignArtwork.assetMetadata.field.subject.enum.religious': 'Religious',
    'studio.consignArtwork.assetMetadata.field.subject.enum.rurallife': 'Rural life',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sailboat': 'Sailboat',
    'studio.consignArtwork.assetMetadata.field.subject.enum.science': 'Science',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sciencetechnology': 'Science/Technology',
    'studio.consignArtwork.assetMetadata.field.subject.enum.seascape': 'Seascape',
    'studio.consignArtwork.assetMetadata.field.subject.enum.seasons': 'Seasons',
    'studio.consignArtwork.assetMetadata.field.subject.enum.ship': 'Ship',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sport': 'Sport',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sports': 'Sports',
    'studio.consignArtwork.assetMetadata.field.subject.enum.stilllife': 'Still Life',
    'studio.consignArtwork.assetMetadata.field.subject.enum.technology': 'Technology',
    'studio.consignArtwork.assetMetadata.field.subject.enum.time': 'Time',
    'studio.consignArtwork.assetMetadata.field.subject.enum.train': 'Train',
    'studio.consignArtwork.assetMetadata.field.subject.enum.travel': 'Travel',
    'studio.consignArtwork.assetMetadata.field.subject.enum.tree': 'Tree',
    'studio.consignArtwork.assetMetadata.field.subject.enum.typography': 'Typography',
    'studio.consignArtwork.assetMetadata.field.subject.enum.wall': 'Wall',
    'studio.consignArtwork.assetMetadata.field.subject.enum.water': 'Water',
    'studio.consignArtwork.assetMetadata.field.subject.enum.women': 'Women',
    'studio.consignArtwork.assetMetadata.field.subject.enum.worldculture': 'World Culture',

    'studio.consignArtwork.assetMetadata.field.genre': 'Genre',
    'studio.consignArtwork.assetMetadata.field.genre.description': 'Genres for this work',

    'studio.consignArtwork.assetMetadata.field.aiGeneration': 'AI Generation',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.description': 'Is any part of this work AI generated?',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.full': 'Fully AI generated',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.partial': 'Partially AI generated',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.none': 'No AI used',

    'studio.consignArtwork.assetMetadata.field.arenabled': 'Augmented Reality enabled',
    'studio.consignArtwork.assetMetadata.field.arenabled.description': 'Is Augmented Reality enabled for this work?',

    'studio.consignArtwork.assetMetadata.field.arenabled.enum.yes': 'This work is AR enabled',
    'studio.consignArtwork.assetMetadata.field.arenabled.enum.no': 'This work is not AR enabled',

    'studio.consignArtwork.assetMetadata.field.nudity': 'Nudity',
    'studio.consignArtwork.assetMetadata.field.nudity.description': 'Does this work contain any nudity?',

    'studio.consignArtwork.assetMetadata.field.nudity.enum.yes': 'This work contains nudity',
    'studio.consignArtwork.assetMetadata.field.nudity.enum.no': 'This work does not contain nudity',

    'studio.consignArtwork.assetMetadata.field.name': 'Creator Name',
    'studio.consignArtwork.assetMetadata.field.name.description': 'Creator name or pseudonym',

    'studio.consignArtwork.assetMetadata.field.roles': 'Creator Roles',
    'studio.consignArtwork.assetMetadata.field.roles.description': 'Creator roles for this work or general title',

    'studio.consignArtwork.assetMetadata.field.bio': 'Creator Bio',
    'studio.consignArtwork.assetMetadata.field.bio.description': 'Creator bio (short, 3-4 sentences)',

    'studio.consignArtwork.assetMetadata.field.profileUrl': 'Creator Website Link',
    'studio.consignArtwork.assetMetadata.field.profileUrl.description': 'Creator website link',

    'studio.consignArtwork.assetMetadata.field.nationality': 'Nationality',
    'studio.consignArtwork.assetMetadata.field.nationality.description': 'Creator nationality or origin country',

    'studio.consignArtwork.assetMetadata.field.residence': 'Residence',
    'studio.consignArtwork.assetMetadata.field.residence.description': 'Creator residence country',

    'studio.consignArtwork.assetMetadata.field.ethnicity': 'Ethnicity',
    'studio.consignArtwork.assetMetadata.field.ethnicity.description': 'Creator ethnicity',

    'studio.consignArtwork.assetMetadata.field.gender': 'Gender',
    'studio.consignArtwork.assetMetadata.field.gender.description': 'Creator gender',

    'studio.consignArtwork.assetMetadata.field.country': 'Country',
    'studio.consignArtwork.assetMetadata.field.country.description': 'Country of provenance for this work',

    'studio.consignArtwork.assetMetadata.field.plusCode': 'PlusCode',
    'studio.consignArtwork.assetMetadata.field.plusCode.description':
        'For example, Copenhagen, Denmark would be PlusCode "MHJQ+4V" You can lookup PlusCode values here: https://plus.codes/map',

    'studio.consignArtwork.assetMetadata.field.blockchain': 'Blockchain',
    'studio.consignArtwork.assetMetadata.field.blockchain.description': 'Blockchain',

    'studio.consignArtwork.assetMetadata.field.exhibitions': 'Exhibitions',
    'studio.consignArtwork.assetMetadata.field.exhibitions.item': 'Exhibit',
    'studio.consignArtwork.assetMetadata.field.exhibitions.description': 'Exhibitions where this work was shown',

    'studio.consignArtwork.assetMetadata.field.exhibitionName': 'Exhibition Name',
    'studio.consignArtwork.assetMetadata.field.exhibitionName.description': 'Name of the exhibition',

    'studio.consignArtwork.assetMetadata.field.exhibitionUrl': 'Exhibition URL',
    'studio.consignArtwork.assetMetadata.field.exhibitionUrl.description': 'Link to exhibition information',

    'studio.consignArtwork.assetMetadata.field.awards': 'Awards',
    'studio.consignArtwork.assetMetadata.field.awards.item': 'Award',
    'studio.consignArtwork.assetMetadata.field.awards.description': 'Awards this work has won',

    'studio.consignArtwork.assetMetadata.field.awardName': 'Award Name',
    'studio.consignArtwork.assetMetadata.field.awardName.description': 'Name of the award',

    'studio.consignArtwork.assetMetadata.field.awardUrl': 'Award URL',
    'studio.consignArtwork.assetMetadata.field.awardUrl.description': 'Link to award information',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${
            data.message === 'required' || data.message === 'minItems'
                ? 'Field required'
                : data.message === 'format'
                  ? 'Invalid format'
                  : ''
        }`,

    /* Licenses */

    'studio.consignArtwork.licenses.title': 'Licenses',
    'studio.consignArtwork.licenses.description':
        'Currently, Vitruveo offers four ways for your artwork to be licensed/sold. Here you can choose any of these licensing options:',
    'studio.consignArtwork.licenses.oneLicense.error': 'Please add at least one license',
    'studio.consignArtwork.licenses.fillFields.error': 'Fill in the fields correctly.',
    'studio.consignArtwork.licenses.alreadyAdded': 'License already added',
    'studio.consignArtwork.licenses.delete.button': 'Delete',
    'studio.consignArtwork.licenses.add.button': 'Add',
    'studio.consignArtwork.licenses.warning':
        'Genesis artworks have been guaranteed an NFT sale for $150. Please select the NFT-ART-1 license, Single Edition and enter $150. You can select additional licenses as well.',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'yes' : data.checkBoolean === false ? 'no' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'field required' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'Stream v1.0',
    'studio.consignArtwork.licenses.field.print': 'Print v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'Maximum Units',
    'studio.consignArtwork.licenses.field.unitPrice': 'Unit Price',
    'studio.consignArtwork.licenses.field.maximumEditions': 'Maximum Editions',
    'studio.consignArtwork.licenses.field.editionPrice': 'Edition Price',
    'studio.consignArtwork.licenses.field.elasticEditions': 'Elastic Editions',
    'studio.consignArtwork.licenses.license': 'License',

    'studio.consignArtwork.licenses.nft.ccby':
        'This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use.',
    'studio.consignArtwork.licenses.nft.ccbysa':
        'This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use. If you remix, adapt, or build upon the material, you must license the modified material under identical terms.',
    'studio.consignArtwork.licenses.nft.ccbync':
        'This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator.',
    'studio.consignArtwork.licenses.nft.ccbyncsa':
        'This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator. If you remix, adapt, or build upon the material, you must license the modified material under identical terms.',
    'studio.consignArtwork.licenses.nft.ccbynd':
        'This license enables reusers to copy and distribute the material in any medium or format in unadapted form only, and only so long as attribution is given to the creator.',
    'studio.consignArtwork.licenses.nft.ccbyncnd':
        'This license enables reusers to copy and distribute the material in any medium or format in unadapted form only, for noncommercial purposes only, and only so long as attribution is given to the creator.',
    'studio.consignArtwork.licenses.nft.cc0':
        'CC0 (aka CC Zero) is a public dedication tool, which enables creators to give up their copyright and put their works into the worldwide public domain. CC0 enables reusers to distribute, remix, adapt, and build upon the material in any medium or format, with no conditions.',

    'studio.consignArtwork.licenses.nft.description':
        'This license makes the artwork available for sale under one of several edition pricing models. When sold, an NFT of the artwork is minted and delivered to the buyer.',
    'studio.consignArtwork.licenses.nft.enable':
        'Enable this license if you want buyers to have ownership of a digital collectible of the artwork.',

    'studio.consignArtwork.licenses.nft.selectEdition.title': 'Select Edition',
    'studio.consignArtwork.licenses.nft.selectEdition.elasticEditions':
        'is a flexible model that gives a buyer the ability to combine multiple editions into one, dynamically changing the edition size.',
    'studio.consignArtwork.licenses.nft.selectEdition.singleEdition': 'is a fixed 1/1 model.',
    'studio.consignArtwork.licenses.nft.selectEdition.unlimitedEditions':
        'is a fee or free model for unlimited editions.',

    'studio.consignArtwork.licenses.nft.elasticEditions.title': 'Elastic Editions',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice.title': 'Edition Price (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions.title': 'Number of Editions',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice.title': 'Total Price (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount.title': 'Edition Discount',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice':
        '“Edition Price” is the price of the artwork in U.S. dollars.',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions':
        '“Number of Editions” is the quantity of editions of the artwork that can be minted.',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice':
        '“Total Price” is the “Edition Price” multiplied by “Number of Editions.”',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount':
        '“Edition Discount” is the discount for the buyer when purchasing multiple editions. It is calculated by dividing 10 by the “Number of Editions.” If enabled, the discount is applied for each edition after the first one.',
    'studio.consignArtwork.licenses.nft.singleEdition.title': 'Single Edition',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice':
        '“Edition Price” is the price of the artwork in U.S. dollars.',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice.title': 'Edition Price (USD)',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.title': 'Unlimited Editions',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice':
        '“Edition Price” is the price of the artwork in U.S. dollars.',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice.title': 'Edition Price (USD)',

    'studio.consignArtwork.licenses.stream.description':
        'This license makes the artwork available to curators for including in playlists for streaming art to digital frames. Earnings for streaming are automatically calculated based on usage and negotiated price agreements.',
    'studio.consignArtwork.licenses.stream.enable':
        'Enable this license if you want curators to include your artwork in playlists that are used by consumers and businesses for slideshows on digital frames.',
    'studio.consignArtwork.licenses.stream.enable.description':
        'Stream earnings are automatically calculated based on usage and negotiated price agreements.',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming': 'Unlimited Streaming',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming.description':
        'The artwork may be used for streaming in unlimited scenarios.',

    'studio.consignArtwork.licenses.print.description':
        'This license makes the artwork available to end-users for printing to a single physical item using Print-on-Demand (POD) technology. The license is freely transferable until the point of printing, after which it is transferable solely to the owner of the physical item.',
    'studio.consignArtwork.licenses.print.enable':
        'Enable this license if you want end-users to use your art for print-on-demand (POD) applications. This license is for individual printing; bulk printing is not permitted.',
    'studio.consignArtwork.licenses.print.singlePrint.title': 'Single Print',
    'studio.consignArtwork.licenses.print.singlePrint.description':
        '“Unit Price” is the price of the artwork in U.S. dollars for a single print.',
    'studio.consignArtwork.licenses.print.singlePrint.field': 'Unit Price (USD)',

    'studio.consignArtwork.licenses.remix.description':
        'This license makes the artwork available to end-users for use in Remix applications using the',
    'studio.consignArtwork.licenses.remix.description2':
        'license which allows remix usage for non-commercial purposes.',
    'studio.consignArtwork.licenses.remix.singleRemix.title': 'Single Remix',
    'studio.consignArtwork.licenses.remix.singleRemix.description':
        '“Unit Price” is the price of the artwork in U.S. dollars for a single remix.',
    'studio.consignArtwork.licenses.remix.singleRemix.field': 'Unit Price (USD)',
    'studio.consignArtwork.licenses.remix.enable':
        'Enable this license if you want end-users to use your art in Remix applications. The remix output may only be used for non-commercial purposes.',

    /* Terms of Use */
    'studio.consignArtwork.termsOfUse.title': 'Terms of Use',
    'studio.consignArtwork.termsOfUse.description': 'Complete all required tasks and consign your artwork',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'Accepted' : data.scrolledToBottom ? 'Accept Contract' : 'Scroll to the End',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'I hereby agree that the Asset and Auxiliary Media files are original, authentic works that have been created by the creators indicated in the metadata submission and not copied, stolen, or plagiarized from any other source.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'I hereby agree that if any portion of the Asset and Auxiliary Media files were created using Artificial Intelligence, I have answered "Yes" to the Metadata field for "AI Generation."',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'I hereby agree that this work is not minted on any other blockchain, offered, consigned, or listed for sale on any other platform, and will not be minted, offered, consigned, or listed as long as the listing is active on this platform.',

    /* Auxiliary Media */
    'studio.consignArtwork.auxiliaryMedia.description':
        'Upload auxiliary media assets for Behind-the-scenes (BTS) and Augmented Reality (AR).',
    'studio.consignArtwork.auxiliaryMedia.title': 'Auxiliary Media',
    'studio.consignArtwork.auxiliaryMedia.subTitle': 'Auxiliary Media Assets',
    'studio.consignArtwork.auxiliaryMedia.arImage.title': 'AR Image',
    'studio.consignArtwork.auxiliaryMedia.arVideo.title': 'AR Video',
    'studio.consignArtwork.auxiliaryMedia.btsImage.title': 'BTS Image',
    'studio.consignArtwork.auxiliaryMedia.btsVideo.title': 'BTS Video',
    'studio.consignArtwork.auxiliaryMedia.codeZip.title': 'Code Zip',
    'studio.consignArtwork.auxiliaryMedia.field.description': 'Description',
    'studio.consignArtwork.auxiliaryMedia.field.description.placeholder': 'Longer Description of Work',

    /* Consignment Status */
    'studio.consignArtwork.consignmentStatus.title': 'Consignment Status',
    'studio.consignArtwork.consignmentStatus.description': 'Nice work! Your artwork is ready for consignment.',
    'studio.consignArtwork.consignmentStatus.message': 'This feature will be available soon.',
    'studio.consignArtwork.consignmentStatus.yes': 'Yes',
    'studio.consignArtwork.consignmentStatus.no': 'No',
    'studio.consignArtwork.consignmentStatus.edit': 'Edit',
    'studio.consignArtwork.consignmentStatus.view': 'View',
    'studio.consignArtwork.consignmentStatus.search': 'Search',
    'studio.consignArtwork.consignmentStatus.license': 'License',

    'studio.consignArtwork.consignmentStatus.active.title': 'Active',
    'studio.consignArtwork.consignmentStatus.draft.title': 'Draft',
    'studio.consignArtwork.consignmentStatus.preview.title': 'Preview',
    'studio.consignArtwork.consignmentStatus.activate.title': 'Activate',
    'studio.consignArtwork.consignmentStatus.activation.title': 'Activation',
    'studio.consignArtwork.consignmentStatus.activation.description':
        'Activation consigns your artwork to the blockchain and requires a Creator Credit.',
    'studio.consignArtwork.consignmentStatus.creatorCreditsRequired': 'Creator Credits Required',
    'studio.consignArtwork.consignmentStatus.creatorCreditsAvailable': 'Creator Credits Available',
    'studio.consignArtwork.consignmentStatus.viewArtwork.button': 'View Artwork',
    'studio.consignArtwork.consignmentStatus.warning':
        'Creator Credits will be airdropped to all artists soon! We will notify you again when we are ready for this final step.',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'Would you like to save the information?',
    'studio.consignArtwork.backModal.confirm.button': 'Save',
    'studio.consignArtwork.backModal.cancel.button': 'No',

    /* Sidebar */
    'studio.sidebar.consign': 'Consign Artwork',
    'studio.sidebar.artistGuide': 'Artist Guide',
    'studio.sidebar.community': 'Community',

    /* Footer */
    'studio.footer.thisStep': 'This step is',
    'studio.footer.completed': 'Completed',
    'studio.footer.inProgress': 'In Progress',
    'studio.footer.notYet': 'and is not yet complete',
    'studio.footer.step': 'Step',
    'studio.footer.of': 'of',
    'studio.footer.save': 'Save',
    'studio.footer.back': 'Back',
};

export default language;
