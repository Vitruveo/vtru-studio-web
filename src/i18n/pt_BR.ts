import { Translation } from './types';

const language: Translation = {
    /* Home */
    'studio.home.wellcome': 'Bem-vindo a',
    'studio.home.title': 'Início',
    'studio.home.congrats': 'Parabéns por ser selecionado como Artista Genesis Vitruveo',
    'studio.home.transforming':
        'Vitruveo está transformando a arte Web3, e isso significa um software totalmente novo como esta versão "Alpha" do vtruStudio. Alpha significa que o software não está totalmente pronto e você está nos ajudando a testá-lo para que possa ser melhorado.',
    'studio.home.software': 'O software atualmente tem dois recursos que você pode acessar com os botões abaixo:',
    'studio.home.consign': 'Consignar Obra de Arte',
    'studio.home.myProfile': 'Meu Perfil',

    /* My Profile */
    'studio.myProfile.title': 'Meu Perfil',
    'studio.myProfile.subtitle': 'Personalize seu perfil Vitruveo com vários emails e endereços de carteira.',
    'studio.myProfile.home': 'Início',
    'studio.myProfile.saveMessage': 'Dados salvos com sucesso',
    'studio.myProfile.accessConsignMessage':
        'Para acessar a consignação de obras de arte, é necessário preencher todos os campos obrigatórios no perfil do usuário',
    'studio.myProfile.form.username.title': 'Nome de usuário',
    'studio.myProfile.form.username.placeholder': 'Digite o nome de usuário',
    'studio.myProfile.form.usernameRequired.error': 'Nome de usuário é obrigatório',
    'studio.myProfile.form.profile.title': 'Altere sua foto de perfil a partir daqui',
    'studio.myProfile.form.profile.reset.button': 'Redefinir',
    'studio.myProfile.form.profile.upload.button': 'Upload',
    'studio.myProfile.form.profile.description': 'Permitido JPG, GIF ou PNG. Tamanho máximo de 800K',
    'studio.myProfile.form.emails.title': 'Emails',
    'studio.myProfile.form.emailsExists.error': 'Email já existe',
    'studio.myProfile.form.addEmails.placeholder': 'Digite novo endereço de email',
    'studio.myProfile.form.code.placeholder': 'digite um código...',
    'studio.myProfile.form.verify.button': 'Verificar',
    'studio.myProfile.form.delete.button': 'Excluir',
    'studio.myProfile.form.wallets.title': 'Carteiras',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'código de verificação enviado para o email',
    'studio.myProfile.verificationCodeSentMessageError': 'erro ao enviar código de verificação para o email',
    'studio.myProfile.emailVerificationMessageSuccess': 'email verificado',
    'studio.myProfile.emailVerificationMessageError': 'erro ao verificar o código',
    'studio.myProfile.form.wallet.placeholder': 'Conectar nova carteira',
    'studio.myProfile.form.connect.button': 'Conectar',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Próximo',
    'studio.consignArtwork.title': 'Consignar Obra de Arte',
    'studio.consignArtwork.subtitle': 'Complete todas as tarefas e publique sua obra de arte',

    'studio.consignArtwork.stepName.assetMedia': 'Mídia de Ativo',
    'studio.consignArtwork.stepName.assetMetadata': 'Metadados do Ativo',
    'studio.consignArtwork.stepName.licenses': 'Licenças',
    'studio.consignArtwork.stepName.termsOfUse': 'Termos de Uso',

    'studio.consignArtwork.stepStatus.completed': 'Concluído',
    'studio.consignArtwork.stepStatus.inProgress': 'Em Andamento',
    'studio.consignArtwork.stepStatus.notStarted': 'Não Iniciado',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Publicado com sucesso!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Editar' : 'Iniciar'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Publicado' : 'Publicar'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Mídia do Ativo',
    'studio.consignArtwork.assetMedia.description':
        'Faça upload dos arquivos de mídia para a obra de arte sendo consignada.',
    'studio.consignArtwork.assetMedia.amazing':
        'Parece incrível! Para que sua obra de arte fique ótima em diferentes dispositivos, precisamos de mais três arquivos de mídia. Não se preocupe, nós vamos ajudá-lo a cortar seu arquivo de mídia original.',
    'studio.consignArtwork.assetMedia.concerned':
        'Se você está preocupado com a perda de qualidade, não use o recurso de corte e faça o upload da mídia diretamente no tamanho necessário.',
    'studio.consignArtwork.assetMedia.upload.button': 'Upload',
    'studio.consignArtwork.assetMedia.assets': 'Arquivos de Mídia',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${
            data.definition === 'landscape' ? 'Paisagem' : data.definition === 'portrait' ? 'Retrato' : 'Quadrado'
        }`;
    },
    'studio.consignArtwork.assetMedia.image': 'imagem',
    'studio.consignArtwork.assetMedia.max': 'máximo',

    'studio.consignArtwork.assetMedia.mediaRequired': (data: { required: boolean }) =>
        `${data.required ? 'Obrigatório' : 'Opcional'}`,

    'studio.consignArtwork.assetMedia.mediaIs': 'Esta mídia é',
    'studio.consignArtwork.assetMedia.cropModal.title': (data: { width: string; height: string }) =>
        `Corte a mídia para exibição em ${data.width} x ${data.height} pixels. Clique em “Concluído” para salvar.`,

    'studio.consignArtwork.assetMedia.formats': (data: {
        format: 'original' | 'display' | 'exhibition' | 'preview' | 'print';
    }) => {
        if (data.format === 'original') return 'Original';
        if (data.format === 'display') return 'Exibição';
        if (data.format === 'exhibition') return 'Exposição';
        if (data.format === 'preview') return 'Pré-visualização';
        if (data.format === 'print') return 'Impressão';
        return '';
    },

    'studio.consignArtwork.assetMedia.modalError.title':
        'Uh oh! O arquivo de mídia que você fez upload tem os seguintes problemas:',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.title': 'Dimensões',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.description': (data: {
        definition: string;
        format: string;
        width: string;
        height: string;
    }) =>
        `— O arquivo de mídia para uma Imagem ${data.definition} (${data.format}) deve ter pelo menos ${data.width} x ${data.height} pixels`,

    'studio.consignArtwork.assetMedia.modalErrorSize.title': 'Tamanho',
    'studio.consignArtwork.assetMedia.modalErrorSize.description': (data: {
        definition: string;
        format: string;
        sizeError: string;
    }) =>
        `— O tamanho do arquivo de mídia para uma Imagem ${data.definition} (${data.format}) não pode exceder ${data.sizeError}`,

    'studio.consignArtwork.assetMedia.dragAndDrop':
        'Arraste e solte um único arquivo de mídia ou clique para fazer upload.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Imagem: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Vídeo: MP4, WEBM',

    /* Asset Metadata */

    /* Licenses */

    /* Terms of Use */

    /* Footer */
    'studio.footer.thisStep': 'Esta etapa está',
    'studio.footer.completed': 'Concluída',
    'studio.footer.inProgress': 'Em progresso',
    'studio.footer.notYet': 'e ainda não está completa',
    'studio.footer.step': 'Etapa',
    'studio.footer.of': 'de',
    'studio.footer.save': 'Salvar',
    'studio.footer.back': 'Voltar',
};

export default language;
