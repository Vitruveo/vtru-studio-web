import { Translation } from './types';

const language: Translation = {
    /* Login */

    /* Languages */
    'studio.languages.portuguesePTBR': 'Portugués (pt-BR)',
    'studio.languages.englishUS': 'Inglés (en-US)',
    'studio.languages.spanishES': 'Español (es-ES)',
    'studio.languages.farsiFA': 'Farsi (fa-IR)',
    'studio.languages.russianRU': 'Ruso (ru-RU)',

    /* Home */
    'studio.home.wellcome': 'Bienvenido a',
    'studio.home.title': 'Inicio',
    'studio.home.transforming':
        'Vitruveo está transformando el arte Web3, y eso significa un software completamente nuevo como esta versión "Alpha" de vtruStudio. Alpha significa que el software no está completamente listo y nos estás ayudando a probarlo para que pueda ser mejorado.',
    'studio.home.software':
        'El software actualmente tiene dos características a las que puedes acceder con los botones de abajo:',
    'studio.home.consign': 'Consigue Arte',
    'studio.home.myProfile': 'Mi Perfil',

    /* User Account */
    'studio.userAccount.title': 'Cuenta de Usuario',
    'studio.userAccount.creator': 'Creador',
    'studio.userAccount.logout.button': 'Cerrar Sesión',
    'studio.userAccount.menu.title': 'Mi Perfil',
    'studio.userAccount.menu.subtitle': 'Configuraciones de Usuario',

    /* My Profile */
    'studio.myProfile.title': 'Mi Perfil',
    'studio.myProfile.subtitle':
        'Personaliza tu perfil de Vitruveo con múltiples direcciones de correo electrónico y billeteras.',
    'studio.myProfile.home': 'Inicio',
    'studio.myProfile.saveMessage': 'Datos guardados con éxito',
    'studio.myProfile.accessConsignMessage':
        'Para acceder a la consignación de arte, es necesario completar todos los campos obligatorios en el perfil de usuario',
    'studio.myProfile.form.username.title': 'Nombre de Usuario',
    'studio.myProfile.form.username.placeholder': 'Introduce el nombre de usuario',
    'studio.myProfile.form.usernameRequired.error': 'Se requiere nombre de usuario',
    'studio.myProfile.form.profile.title': 'Cambia tu foto de perfil desde aquí',
    'studio.myProfile.form.profile.reset.button': 'Restablecer',
    'studio.myProfile.form.profile.upload.button': 'Subir',
    'studio.myProfile.form.profile.description': 'Se permite JPG, GIF o PNG. Tamaño máximo de 800K',
    'studio.myProfile.form.emails.title': 'Correos Electrónicos',
    'studio.myProfile.form.emailsExists.error': 'El correo electrónico ya existe',
    'studio.myProfile.form.addEmails.placeholder': 'Introduce una nueva dirección de correo electrónico',
    'studio.myProfile.form.code.placeholder': 'escribe un código...',
    'studio.myProfile.form.verify.button': 'Verificar',
    'studio.myProfile.form.delete.button': 'Eliminar',
    'studio.myProfile.form.wallets.title': 'Billeteras',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'código de verificación enviado al correo electrónico',
    'studio.myProfile.verificationCodeSentMessageError':
        'error al enviar el código de verificación al correo electrónico',
    'studio.myProfile.emailVerificationMessageSuccess': 'correo electrónico verificado',
    'studio.myProfile.emailVerificationMessageError': 'error al verificar el código',
    'studio.myProfile.form.wallet.placeholder': 'Conectar nueva billetera',
    'studio.myProfile.form.connect.button': 'Conectar',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Siguiente',
    'studio.consignArtwork.title': 'Consignar Obra de Arte',
    'studio.consignArtwork.subtitle': 'Completa todas las tareas requeridas y consigna tu obra de arte',

    'studio.consignArtwork.stepName.assetMedia': 'Medios del Activo',
    'studio.consignArtwork.stepName.assetMetadata': 'Metadatos del Activo',
    'studio.consignArtwork.stepName.licenses': 'Licencias',
    'studio.consignArtwork.stepName.termsOfUse': 'Términos de Uso',
    'studio.consignArtwork.optional': 'opcional',

    'studio.consignArtwork.stepStatus.completed': 'Completado',
    'studio.consignArtwork.stepStatus.inProgress': 'En Progreso',
    'studio.consignArtwork.stepStatus.notStarted': 'No Iniciado',
    'studio.consignArtwork.stepStatus.error': 'Error',
    'studio.consignArtwork.stepPublishMessageSuccess': '¡Publicado con éxito!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Editar' : 'Iniciar'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Consignado' : 'Consignar'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Medios del Activo',
    'studio.consignArtwork.assetMedia.description': 'Sube los medios para la obra de arte que se está consignando.',
    'studio.consignArtwork.assetMedia.amazing':
        '¡Se ve increíble! Para que tu obra de arte se vea genial en diferentes dispositivos, necesitamos tres archivos de medios más. No te preocupes, te ayudaremos a recortar tu archivo de medios original.',
    'studio.consignArtwork.assetMedia.concerned':
        'Si te preocupa la pérdida de calidad, no uses la función de recorte y sube los medios directamente en el tamaño requerido.',
    'studio.consignArtwork.assetMedia.upload.button': 'Subir',
    'studio.consignArtwork.assetMedia.assets': 'Medios',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${
            data.definition === 'landscape' ? 'Paisaje' : data.definition === 'portrait' ? 'Retrato' : 'Cuadrado'
        }`;
    },
    'studio.consignArtwork.assetMedia.image': 'imagen',
    'studio.consignArtwork.assetMedia.video': 'video',
    'studio.consignArtwork.assetMedia.max': 'máximo',

    'studio.consignArtwork.assetMedia.mediaRequired': (data: { required: boolean }) =>
        `${data.required ? 'Requerido' : 'Opcional'}`,

    'studio.consignArtwork.assetMedia.mediaIs': 'Este medio es',
    'studio.consignArtwork.assetMedia.cropModal.title': (data: { width: string; height: string }) =>
        `Recorta los medios para la visualización a ${data.width} x ${data.height} píxeles. Haz clic en “Hecho” para guardar.`,

    'studio.consignArtwork.assetMedia.formats': (data: {
        format: 'original' | 'display' | 'exhibition' | 'preview' | 'print';
    }) => {
        if (data.format === 'original') return 'Original';
        if (data.format === 'display') return 'Visualización';
        if (data.format === 'exhibition') return 'Exhibición';
        if (data.format === 'preview') return 'Vista previa';
        if (data.format === 'print') return 'Impresión';
        return '';
    },

    'studio.consignArtwork.assetMedia.modalError.title':
        '¡Vaya! El archivo de medios que has subido tiene los siguientes problemas:',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.title': 'Dimensiones',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.description': (data: {
        definition: string;
        format: string;
        width: string;
        height: string;
    }) =>
        `— El archivo de medios para una imagen ${data.definition} (${data.format}) debe ser al menos de ${data.width} x ${data.height} píxeles`,

    'studio.consignArtwork.assetMedia.modalErrorSize.title': 'Tamaño',
    'studio.consignArtwork.assetMedia.modalErrorSize.description': (data: {
        definition: string;
        format: string;
        sizeError: string;
    }) =>
        `— El tamaño del archivo de medios para una imagen ${data.definition} (${data.format}) no puede exceder ${data.sizeError}`,

    'studio.consignArtwork.assetMedia.dragAndDrop': 'CARGA DE OBRA DE ARTE ORIGINAL',
    'studio.consignArtwork.assetMedia.imageTypes': 'Imagen: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Video: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Metadatos del Activo',
    'studio.consignArtwork.assetMetadata.description': 'Todos los metadatos del activo son visibles para el público.',
    'studio.consignArtwork.assetMetadata.field.artistName': 'Nombre del Artista',
    'studio.consignArtwork.assetMetadata.field.title': 'Título',
    'studio.consignArtwork.assetMetadata.field.description': 'Descripción',
    'studio.consignArtwork.assetMetadata.field.date': 'Fecha',
    'studio.consignArtwork.assetMetadata.field.place': 'Lugar',

    'studio.consignArtwork.assetMetadata.field.objectType': 'Tipo de Objeto',
    'studio.consignArtwork.assetMetadata.field.objectType.video': 'Video',
    'studio.consignArtwork.assetMetadata.field.objectType.2D': '2D',
    'studio.consignArtwork.assetMetadata.field.objectType.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.objectType.phygital': 'Fígitales',
    'studio.consignArtwork.assetMetadata.field.objectType.other': 'Otro',

    'studio.consignArtwork.assetMetadata.field.category': 'Categoría',
    'studio.consignArtwork.assetMetadata.field.category.photography': 'Fotografía',
    'studio.consignArtwork.assetMetadata.field.category.painting': 'Pintura',
    'studio.consignArtwork.assetMetadata.field.category.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.category.video': 'Video',
    'studio.consignArtwork.assetMetadata.field.category.mixedMedia': 'Medios Mixtos',
    'studio.consignArtwork.assetMetadata.field.category.illustration': 'Ilustración',
    'studio.consignArtwork.assetMetadata.field.category.collage': 'Collage',
    'studio.consignArtwork.assetMetadata.field.category.ai': 'IA',
    'studio.consignArtwork.assetMetadata.field.category.other': 'Otro',

    'studio.consignArtwork.assetMetadata.field.medium': 'Medio',
    'studio.consignArtwork.assetMetadata.field.medium.oil': 'Óleo',
    'studio.consignArtwork.assetMetadata.field.medium.watercolour': 'Acuarela',
    'studio.consignArtwork.assetMetadata.field.medium.acrylic': 'Acrílico',
    'studio.consignArtwork.assetMetadata.field.medium.ink': 'Tinta',
    'studio.consignArtwork.assetMetadata.field.medium.illustration': 'Ilustración',
    'studio.consignArtwork.assetMetadata.field.medium.collage': 'Collage',
    'studio.consignArtwork.assetMetadata.field.medium.AI': 'IA',
    'studio.consignArtwork.assetMetadata.field.medium.mixedMedia': 'Medios Mixtos',
    'studio.consignArtwork.assetMetadata.field.medium.film': 'Película',
    'studio.consignArtwork.assetMetadata.field.medium.photography': 'Fotografía',
    'studio.consignArtwork.assetMetadata.field.medium.analogPhotography': 'Fotografía Analógica',
    'studio.consignArtwork.assetMetadata.field.medium.digitalPhotography': 'Fotografía Digital',
    'studio.consignArtwork.assetMetadata.field.medium.compositePhotography': 'Fotografía Compuesta',
    'studio.consignArtwork.assetMetadata.field.medium.other': 'Otro',
    'studio.consignArtwork.assetMetadata.field.tags': 'Etiquetas',
    'studio.consignArtwork.assetMetadata.field.tags.button': 'Agregar',
    'studio.consignArtwork.assetMetadata.field.tags.placeholder': 'Agregar etiqueta',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'required' ? 'Campo requerido' : ''}`,

    /* Licenses */
    'studio.consignArtwork.licenses.title': 'Licencias',
    'studio.consignArtwork.licenses.description': 'Seleccione una o más licencias para esta obra de arte',
    'studio.consignArtwork.licenses.oneLicense.error': 'Por favor, añade al menos una licencia',
    'studio.consignArtwork.licenses.fillFields.error': 'Rellena los campos correctamente.',
    'studio.consignArtwork.licenses.alreadyAdded': 'Licencia ya añadida',
    'studio.consignArtwork.licenses.delete.button': 'Eliminar',
    'studio.consignArtwork.licenses.add.button': 'Añadir',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'sí' : data.checkBoolean === false ? 'no' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'campo requerido' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'Stream v1.0',
    'studio.consignArtwork.licenses.field.print': 'Print v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'Unidades Máximas',
    'studio.consignArtwork.licenses.field.unitPrice': 'Precio por Unidad',
    'studio.consignArtwork.licenses.field.maximumEditions': 'Ediciones Máximas',
    'studio.consignArtwork.licenses.field.editionPrice': 'Precio de la Edición',
    'studio.consignArtwork.licenses.field.elasticEditions': 'Ediciones Elásticas',

    /* Terms of Use */
    'studio.consignArtwork.termsOfUse.title': 'Términos de Uso',
    'studio.consignArtwork.termsOfUse.description': 'Completa todas las tareas requeridas y consigna tu obra de arte',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'Aceptado' : data.scrolledToBottom ? 'Aceptar Contrato' : 'Desplázate hasta el final',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'Por la presente, confirmo que los archivos del Activo y los Medios Auxiliares son obras originales y auténticas que han sido creadas por los creadores indicados en la presentación de metadatos y no copiadas, robadas o plagiadas de ninguna otra fuente.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'Por la presente, confirmo que si alguna parte de los archivos del Activo y los Medios Auxiliares fueron creados utilizando Inteligencia Artificial, he respondido "Sí" en el campo de Metadatos para "Generación por IA".',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'Por la presente, confirmo que esta obra no está acuñada en ninguna otra blockchain, ofrecida, consignada o listada para la venta en ninguna otra plataforma, y no será acuñada, ofrecida, consignada o listada mientras la lista esté activa en esta plataforma.',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': '¿Te gustaría guardar la información?',
    'studio.consignArtwork.backModal.confirm.button': 'Guardar',
    'studio.consignArtwork.backModal.cancel.button': 'No',

    /* Sidebar */
    'studio.sidebar.consign': 'Consignar Obra de Arte',

    /* Footer */
    'studio.footer.thisStep': 'Este paso ha sido',
    'studio.footer.completed': 'Completado',
    'studio.footer.inProgress': 'En Progreso',
    'studio.footer.notYet': 'y aún no está completo',
    'studio.footer.step': 'Paso',
    'studio.footer.of': 'de',
    'studio.footer.save': 'Guardar',
    'studio.footer.back': 'Atrás',
};

export default language;
