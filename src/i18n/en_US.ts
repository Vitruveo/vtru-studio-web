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
    'studio.home.wellcome': 'Wellcome to',
    'studio.home.title': 'Home',
    'studio.home.congrats': 'Congrats on being selected as a Vitruveo Genesis Artist',
    'studio.home.transforming':
        'Vitruveo is transforming Web3 art, and that means all-new software like this “Alpha” version of vtruStudio. Alpha means the software is not fully ready and you’re helping us test it so it can be improved.',
    'studio.home.software': 'The software currently has two features you can access with the buttons below:',
    'studio.home.consign': 'Consign Artwork',
    'studio.home.myProfile': 'My Profile',

    /* User Account */
    'studio.userAccount.title': 'User Account',
    'studio.userAccount.creator': 'Creator',
    'studio.userAccount.logout.button': 'Logout',
    'studio.userAccount.menu.title': 'My Profile',
    'studio.userAccount.menu.subtitle': 'User Settings',

    /* My Profile */
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
    'studio.myProfile.form.profile.description': 'Allowed JPG, GIF or PNG. Max size of 800K',
    'studio.myProfile.form.emails.title': 'Emails',
    'studio.myProfile.form.emailsExists.error': 'Email already exists',
    'studio.myProfile.form.addEmails.placeholder': 'Enter new email address',
    'studio.myProfile.form.code.placeholder': 'type a code...',
    'studio.myProfile.form.verify.button': 'Verify',
    'studio.myProfile.form.delete.button': 'Delete',
    'studio.myProfile.form.wallets.title': 'Wallets',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'verification code sent to email',
    'studio.myProfile.verificationCodeSentMessageError': 'error sending verification code to email',
    'studio.myProfile.emailVerificationMessageSuccess': 'email verified',
    'studio.myProfile.emailVerificationMessageError': 'error verifying code',
    'studio.myProfile.form.wallet.placeholder': 'Connect new wallet',
    'studio.myProfile.form.connect.button': 'Connect',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Next',
    'studio.consignArtwork.title': 'Consign Artwork',
    'studio.consignArtwork.subtitle': 'Complete all tasks and publish your artwork',

    'studio.consignArtwork.stepName.assetMedia': 'Asset Media',
    'studio.consignArtwork.stepName.assetMetadata': 'Asset Metadata',
    'studio.consignArtwork.stepName.licenses': 'Licenses',
    'studio.consignArtwork.stepName.termsOfUse': 'Terms of Use',

    'studio.consignArtwork.stepStatus.completed': 'Completed',
    'studio.consignArtwork.stepStatus.inProgress': 'In Progress',
    'studio.consignArtwork.stepStatus.notStarted': 'Not Started',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Published successfully!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Edit' : 'Start'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Published' : 'Publish'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Asset Media',
    'studio.consignArtwork.assetMedia.description': 'Upload media assets for the artwork being consigned.',
    'studio.consignArtwork.assetMedia.amazing':
        'Looks amazing! For your artwork to look great on different devices, we need three more media files. Don’t worry, we’ll help you crop your original media file.',
    'studio.consignArtwork.assetMedia.concerned':
        'If you’re concerned about loss of quality, don’t use the crop feature and upload media directly in the required size.',
    'studio.consignArtwork.assetMedia.upload.button': 'Upload',
    'studio.consignArtwork.assetMedia.assets': 'Media Assets',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${
            data.definition === 'landscape' ? 'Landscape' : data.definition === 'portrait' ? 'Portrait' : 'Square'
        }`;
    },
    'studio.consignArtwork.assetMedia.image': 'image',
    'studio.consignArtwork.assetMedia.video': 'video',
    'studio.consignArtwork.assetMedia.max': 'maximum',

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

    'studio.consignArtwork.assetMedia.dragAndDrop': 'Drag and drop a single media asset file or click to upload.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Image: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Video: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Asset Metadata',
    'studio.consignArtwork.assetMetadata.description': 'Complete all tasks and publish your artwork',
    'studio.consignArtwork.assetMetadata.field.artistName': 'Artist Name',
    'studio.consignArtwork.assetMetadata.field.title': 'Title',
    'studio.consignArtwork.assetMetadata.field.description': 'Description',
    'studio.consignArtwork.assetMetadata.field.date': 'Date',
    'studio.consignArtwork.assetMetadata.field.place': 'Place',

    'studio.consignArtwork.assetMetadata.field.objectType': 'Object Type',
    'studio.consignArtwork.assetMetadata.field.objectType.video': 'Video',
    'studio.consignArtwork.assetMetadata.field.objectType.2D': '2D',
    'studio.consignArtwork.assetMetadata.field.objectType.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.objectType.phygital': 'Phygital',
    'studio.consignArtwork.assetMetadata.field.objectType.other': 'Other',

    'studio.consignArtwork.assetMetadata.field.category': 'Category',
    'studio.consignArtwork.assetMetadata.field.category.photography': 'Photography',
    'studio.consignArtwork.assetMetadata.field.category.painting': 'Painting',
    'studio.consignArtwork.assetMetadata.field.category.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.category.video': 'Video',
    'studio.consignArtwork.assetMetadata.field.category.mixedMedia': 'Mixed Media',
    'studio.consignArtwork.assetMetadata.field.category.illustration': 'Illustration',
    'studio.consignArtwork.assetMetadata.field.category.collage': 'Collage',
    'studio.consignArtwork.assetMetadata.field.category.ai': 'AI',
    'studio.consignArtwork.assetMetadata.field.category.other': 'Other',

    'studio.consignArtwork.assetMetadata.field.medium': 'Medium',
    'studio.consignArtwork.assetMetadata.field.medium.oil': 'Oil',
    'studio.consignArtwork.assetMetadata.field.medium.watercolour': 'Watercolour',
    'studio.consignArtwork.assetMetadata.field.medium.acrylic': 'Acrylic',
    'studio.consignArtwork.assetMetadata.field.medium.ink': 'Ink',
    'studio.consignArtwork.assetMetadata.field.medium.illustration': 'Illustration',
    'studio.consignArtwork.assetMetadata.field.medium.collage': 'Collage',
    'studio.consignArtwork.assetMetadata.field.medium.AI': 'AI',
    'studio.consignArtwork.assetMetadata.field.medium.mixedMedia': 'Mixed media',
    'studio.consignArtwork.assetMetadata.field.medium.film': 'Film',
    'studio.consignArtwork.assetMetadata.field.medium.photography': 'Photography',
    'studio.consignArtwork.assetMetadata.field.medium.analogPhotography': 'Analog photography',
    'studio.consignArtwork.assetMetadata.field.medium.digitalPhotography': 'Digital photography',
    'studio.consignArtwork.assetMetadata.field.medium.compositePhotography': 'Composite Photography',
    'studio.consignArtwork.assetMetadata.field.medium.other': 'Other',
    'studio.consignArtwork.assetMetadata.field.tags': 'Tags',
    'studio.consignArtwork.assetMetadata.field.tags.button': 'Add',
    'studio.consignArtwork.assetMetadata.field.tags.placeholder': 'Add tag',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'field required' : ''}`,

    /* Licenses */
    'studio.consignArtwork.licenses.title': 'Licenses',
    'studio.consignArtwork.licenses.description': 'Complete all tasks and publish your artwork',
    'studio.consignArtwork.licenses.oneLicense.error': 'Please add at least one license',
    'studio.consignArtwork.licenses.fillFields.error': 'Fill in the fields correctly.',
    'studio.consignArtwork.licenses.alreadyAdded': 'License already added',
    'studio.consignArtwork.licenses.delete.button': 'Delete',
    'studio.consignArtwork.licenses.add.button': 'Add',

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

    /* Terms of Use */
    'studio.consignArtwork.termsOfUse.title': 'Terms of Use',
    'studio.consignArtwork.termsOfUse.description': 'Complete all tasks and publish your artwork',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'Contract accepted' : data.scrolledToBottom ? 'Accept Contract' : 'Scroll to the End',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'I hereby agree that the Asset and Auxiliary Media files are original, authentic works that have been created by the creators indicated in the metadata submission and not copied, stolen, or plagiarized from any other source.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'I hereby agree that if any portion of the Asset and Auxiliary Media files were created using Artificial Intelligence, I have answered "Yes" in the Metadata field for "AI-Generated Artwork."',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'I hereby agree that this work is not minted on any other blockchain, offered, consigned, or listed for sale on any other platform, and will not be minted, offered, consigned, or listed as long as the listing is active on this platform.',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'Would you like to save the information?',
    'studio.consignArtwork.backModal.confirm.button': 'Save',
    'studio.consignArtwork.backModal.cancel.button': 'No',

    /* Sidebar */
    'studio.sidebar.consign': 'Consign Artwork',

    /* Footer */
    'studio.footer.thisStep': 'This step has been',
    'studio.footer.completed': 'Completed',
    'studio.footer.inProgress': 'In Progress',
    'studio.footer.notYet': 'and is not yet complete',
    'studio.footer.step': 'Step',
    'studio.footer.of': 'of',
    'studio.footer.save': 'Save',
    'studio.footer.back': 'Back',
};

export default language;
