import { Translation } from './types';

const language: Translation = {
    /* Login */
    'studio.login.wellcome': 'Wellcome to',
    'studio.login.form.email': 'Email',
    'studio.login.form.remeber': 'Remember this device',
    'studio.login.form.wrongEmail': 'this field must be a valid email',
    'studio.login.form.submit': 'Signin / Signup',
    'studio.consignArtwork.license.value': (data: { value: number }) =>
        data.value === 1 ? 'One single license' : 'Until {{data.value}} licenses',
    'studio.login.api.error': (data: { error: Error }) => `We found an error in your request: ${data.error}`,

    /* Home */
    'studio.home.wellcome': 'Wellcome to',
    'studio.home.title': 'Home',
    'studio.home.congrats': 'Congrats on being selected as a Vitruveo Genesis Artist',
    'studio.home.transforming':
        'Vitruveo is transforming Web3 art, and that means all-new software like this “Alpha” version of vtruStudio. Alpha means the software is not fully ready and you’re helping us test it so it can be improved.',
    'studio.home.software': 'The software currently has two features you can access with the buttons below:',
    'studio.home.consign': 'Consign Artwork',
    'studio.home.myProfile': 'My Profile',

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

    /* Licenses */

    /* Terms of Use */

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
