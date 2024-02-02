import { Translation } from './types';

const language: Translation = {
    /* Languages */
    'studio.languages.portuguesePTBR': 'Português (pt-BR)',
    'studio.languages.englishUS': 'Inglês (en-US)',
    'studio.languages.spanishES': 'Espanhol (es-ES)',
    'studio.languages.farsiFA': 'Farsi (fa-IR)',
    'studio.languages.russianRU': 'Russo (ru-RU)',

    /* Home */
    'studio.home.wellcome': 'Bem-vindo a',
    'studio.home.title': 'Início',
    'studio.home.transforming':
        'Vitruveo está transformando a arte Web3, e isso significa um software totalmente novo como esta versão "Alpha" do vtruStudio. Alpha significa que o software não está totalmente pronto e você está nos ajudando a testá-lo para que possa ser melhorado.',
    'studio.home.software': 'O software atualmente tem dois recursos que você pode acessar com os botões abaixo:',
    'studio.home.consign': 'Consignar Obra de Arte',
    'studio.home.myProfile': 'Meu Perfil',

    /* User Account */
    'studio.userAccount.title': 'Conta do Usuário',
    'studio.userAccount.creator': 'Criador',
    'studio.userAccount.logout.button': 'Sair',
    'studio.userAccount.menu.title': 'Meu Perfil',
    'studio.userAccount.menu.subtitle': 'Configurações do Usuário',

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
    'studio.consignArtwork.optional': 'opcional',

    'studio.consignArtwork.stepStatus.completed': 'Concluído',
    'studio.consignArtwork.stepStatus.inProgress': 'Em Andamento',
    'studio.consignArtwork.stepStatus.notStarted': 'Não Iniciado',
    'studio.consignArtwork.stepStatus.error': 'Erro',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Publicado com sucesso!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Editar' : 'Iniciar'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Consignado' : 'Consignar'}`,

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

    'studio.consignArtwork.assetMedia.dragAndDrop': 'ENVIO DE OBRA DE ARTE ORIGINAL',
    'studio.consignArtwork.assetMedia.imageTypes': 'Imagem: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Vídeo: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Metadados do Ativo',
    'studio.consignArtwork.assetMetadata.description': 'Todos os metadados do ativo são visíveis ao público.',

    'studio.consignArtwork.assetMetadata.field.artistName': 'Nome do Artista',
    'studio.consignArtwork.assetMetadata.field.title': 'Título',
    'studio.consignArtwork.assetMetadata.field.description': 'Descrição',
    'studio.consignArtwork.assetMetadata.field.date': 'Data',
    'studio.consignArtwork.assetMetadata.field.place': 'Local',

    'studio.consignArtwork.assetMetadata.field.objectType': 'Tipo de Objeto',
    'studio.consignArtwork.assetMetadata.field.objectType.video': 'Vídeo',
    'studio.consignArtwork.assetMetadata.field.objectType.2D': '2D',
    'studio.consignArtwork.assetMetadata.field.objectType.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.objectType.phygital': 'Físgital',
    'studio.consignArtwork.assetMetadata.field.objectType.other': 'Outro',

    'studio.consignArtwork.assetMetadata.field.category': 'Categoria',
    'studio.consignArtwork.assetMetadata.field.category.photography': 'Fotografia',
    'studio.consignArtwork.assetMetadata.field.category.painting': 'Pintura',
    'studio.consignArtwork.assetMetadata.field.category.3D': '3D',
    'studio.consignArtwork.assetMetadata.field.category.video': 'Vídeo',
    'studio.consignArtwork.assetMetadata.field.category.mixedMedia': 'Mídia Mista',
    'studio.consignArtwork.assetMetadata.field.category.illustration': 'Ilustração',
    'studio.consignArtwork.assetMetadata.field.category.collage': 'Colagem',
    'studio.consignArtwork.assetMetadata.field.category.ai': 'IA',
    'studio.consignArtwork.assetMetadata.field.category.other': 'Outro',

    'studio.consignArtwork.assetMetadata.field.medium': 'Médio',
    'studio.consignArtwork.assetMetadata.field.medium.oil': 'Óleo',
    'studio.consignArtwork.assetMetadata.field.medium.watercolour': 'Aquarela',
    'studio.consignArtwork.assetMetadata.field.medium.acrylic': 'Acrílico',
    'studio.consignArtwork.assetMetadata.field.medium.ink': 'Tinta',
    'studio.consignArtwork.assetMetadata.field.medium.illustration': 'Ilustração',
    'studio.consignArtwork.assetMetadata.field.medium.collage': 'Colagem',
    'studio.consignArtwork.assetMetadata.field.medium.AI': 'IA',
    'studio.consignArtwork.assetMetadata.field.medium.mixedMedia': 'Mídia Mista',
    'studio.consignArtwork.assetMetadata.field.medium.film': 'Filme',
    'studio.consignArtwork.assetMetadata.field.medium.photography': 'Fotografia',
    'studio.consignArtwork.assetMetadata.field.medium.analogPhotography': 'Fotografia Analógica',
    'studio.consignArtwork.assetMetadata.field.medium.digitalPhotography': 'Fotografia Digital',
    'studio.consignArtwork.assetMetadata.field.medium.compositePhotography': 'Fotografia Composta',
    'studio.consignArtwork.assetMetadata.field.medium.other': 'Outro',
    'studio.consignArtwork.assetMetadata.field.tags': 'Tags',
    'studio.consignArtwork.assetMetadata.field.tags.button': 'Adicionar',
    'studio.consignArtwork.assetMetadata.field.tags.placeholder': 'Adicionar tag',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'required' ? 'Campo obrigatório' : ''}`,

    /* Licenças */
    'studio.consignArtwork.licenses.title': 'Licenças',
    'studio.consignArtwork.licenses.description': 'Selecione uma ou mais licenças para esta obra de arte',
    'studio.consignArtwork.licenses.oneLicense.error': 'Por favor, adicione pelo menos uma licença',
    'studio.consignArtwork.licenses.fillFields.error': 'Preencha os campos corretamente.',
    'studio.consignArtwork.licenses.alreadyAdded': 'Licença já adicionada',
    'studio.consignArtwork.licenses.delete.button': 'Deletar',
    'studio.consignArtwork.licenses.add.button': 'Adicionar',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'sim' : data.checkBoolean === false ? 'não' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'campo obrigatório' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'Stream v1.0',
    'studio.consignArtwork.licenses.field.print': 'Print v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'Unidades Máximas',
    'studio.consignArtwork.licenses.field.unitPrice': 'Preço Unitário',
    'studio.consignArtwork.licenses.field.maximumEditions': 'Edições Máximas',
    'studio.consignArtwork.licenses.field.editionPrice': 'Preço da Edição',
    'studio.consignArtwork.licenses.field.elasticEditions': 'Edições Elásticas',

    /* Termos de Uso */
    'studio.consignArtwork.termsOfUse.title': 'Termos de Uso',
    'studio.consignArtwork.termsOfUse.description': 'Complete todas as tarefas e publique sua obra de arte',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'Contrato aceito' : data.scrolledToBottom ? 'Aceitar Contrato' : 'Role até o final',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'Eu concordo que o Ativo e os arquivos de Mídia Auxiliar são obras originais e autênticas que foram criadas pelos criadores indicados na submissão de metadados e não foram copiados, roubados ou plagiados de qualquer outra fonte.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'Eu concordo que se qualquer parte do Ativo e dos arquivos de Mídia Auxiliar foram criados usando Inteligência Artificial, eu respondi "Sim" no campo de Metadados para "Geração por IA".',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'Eu concordo que esta obra não está cunhada em qualquer outra blockchain, oferecida, consignada ou listada para venda em qualquer outra plataforma, e não será cunhada, oferecida, consignada ou listada enquanto a listagem estiver ativa nesta plataforma.',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'Gostaria de salvar as informações?',
    'studio.consignArtwork.backModal.confirm.button': 'Salvar',
    'studio.consignArtwork.backModal.cancel.button': 'Não',

    /* Sidebar */
    'studio.sidebar.consign': 'Consignar Obra de Arte',

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
