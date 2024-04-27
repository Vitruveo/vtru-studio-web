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
        'Vitruveo está transformando a arte Web3, e isso significa um software totalmente novo como esta versão "Beta" do vtruStudio. Beta significa que o software não está totalmente pronto e você está nos ajudando a testá-lo para que possa ser melhorado.',
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
    'studio.myProfile.pasteCode': 'Cole o código',
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
    'studio.myProfile.form.profile.description': 'Permitido JPG, GIF ou PNG. Tamanho máximo de 800KB',
    'studio.myProfile.form.emails.title': 'Emails',
    'studio.myProfile.form.emailsExists.error': 'Email já existe',
    'studio.myProfile.form.addEmails.placeholder': 'Digite um endereço de e-mail adicional',
    'studio.myProfile.form.code.placeholder': 'digite um código...',
    'studio.myProfile.form.verify.button': 'Verificar',
    'studio.myProfile.form.delete.button': 'Excluir',
    'studio.myProfile.form.wallets.title': 'Carteiras',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'código de verificação enviado para o email',
    'studio.myProfile.verificationCodeSentMessageError': 'erro ao enviar código de verificação para o email',
    'studio.myProfile.emailVerificationMessageSuccess': 'email verificado',
    'studio.myProfile.emailVerificationMessageError': 'erro ao verificar o código',
    'studio.myProfile.form.wallet.placeholderAdded': 'Conectar carteira adicional',
    'studio.myProfile.form.wallet.placeholder': 'Conectar nova carteira',
    'studio.myProfile.form.connect.button': 'Conectar',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Próximo',
    'studio.consignArtwork.title': 'Consignar Obra de Arte',
    'studio.consignArtwork.subtitle.moreInformation': 'Para mais informações, visite o',
    'studio.consignArtwork.subtitle': 'Complete todas as tarefas necessárias e consigne sua obra de arte',
    'studio.consignArtwork.assetPreview': 'Prévia do Ativo',

    'studio.consignArtwork.stepName.assetMedia': 'Mídia de Ativo',
    'studio.consignArtwork.stepName.assetMetadata': 'Metadados do Ativo',
    'studio.consignArtwork.stepName.licenses': 'Licenças',
    'studio.consignArtwork.stepName.termsOfUse': 'Termos de Uso',
    'studio.consignArtwork.stepName.auxiliaryMedia': 'Mídia Auxiliar',
    'studio.consignArtwork.stepName.reviewAndConsign': 'Revisar e Consignar',
    'studio.consignArtwork.optional': 'opcional',
    'studio.consignArtwork.artworkListing': 'Listagem de Obra de Arte',
    'studio.consignArtwork.artworkConsignedTitle': 'Sua obra de arte está atualmente consignada.',
    'studio.consignArtwork.stepStatus.completed': 'Concluído',
    'studio.consignArtwork.stepStatus.inProgress': 'Em Andamento',
    'studio.consignArtwork.stepStatus.notStarted': 'Não Iniciado',
    'studio.consignArtwork.stepStatus.error': 'Erro',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Consignado com sucesso!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Editar' : 'Iniciar'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Consignado' : 'Consignar'}`,

    'studio.consignArtwork.comingSoon': 'Em breve',

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Mídia do Ativo',
    'studio.consignArtwork.assetMedia.description':
        'Faça upload dos arquivos de mídia para a obra de arte sendo consignada.',
    'studio.consignArtwork.assetMedia.differentUses': 'FAZER UPLOAD/CRIAR VARIAÇÕES PARA USOS DIFERENTES',
    'studio.consignArtwork.assetMedia.amazing':
        'Ficou incrível! Para que sua obra de arte pareça ótima em diferentes dispositivos, precisamos de algumas variações adicionais.',
    'studio.consignArtwork.assetMedia.haveCreated':
        'Se você criou seus próprios arquivos para as variações abaixo, basta fazer o upload de cada um aqui.',
    'studio.consignArtwork.assetMedia.haveNotCreated':
        'Se você não criou seus próprios arquivos, não se preocupe, faça o upload do seu arquivo original novamente para cada variação necessária e nós ajudaremos a recortar seu arquivo aqui mesmo.',
    'studio.consignArtwork.assetMedia.previewHelp':
        'O arquivo de visualização será um clipe de cinco segundos da sua obra de arte. Você pode fazer upload de um que tenha criado você mesmo ou simplesmente fazer upload do seu arquivo original, e nós ajudaremos a criar esse clipe aqui.',
    'studio.consignArtwork.assetMedia.upload.button': 'Upload',
    'studio.consignArtwork.assetMedia.assets': 'Arquivos de Mídia',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${
            data.definition === 'landscape' ? 'Paisagem' : data.definition === 'portrait' ? 'Retrato' : 'Quadrado'
        }`;
    },
    'studio.consignArtwork.assetMedia.image': 'imagem',
    'studio.consignArtwork.assetMedia.max': (data: { seconds: number }) =>
        `${data.seconds ? `máx / ${data.seconds} segundos` : 'máx.'}`,

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
    'studio.consignArtwork.assetMedia.dragAndDrop.description':
        'Para enviar sua obra de arte original, arraste e solte seu arquivo aqui ou clique para selecionar o arquivo em seu computador.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Imagem: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Vídeo: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Metadados do Ativo',
    'studio.consignArtwork.assetMetadata.description': 'Todos os Metadados do Ativo são visíveis ao público.',

    'studio.consignArtwork.assetMetadata.section.context': 'Contexto',
    'studio.consignArtwork.assetMetadata.section.taxonomy': 'Taxonomia',
    'studio.consignArtwork.assetMetadata.section.creators': 'Criadores',
    'studio.consignArtwork.assetMetadata.section.provenance': 'Procedência',
    'studio.consignArtwork.assetMetadata.section.custom': 'Personalizado',
    'studio.consignArtwork.assetMetadata.section.assets': 'Ativos',

    'studio.consignArtwork.assetMetadata.field.title': 'Título',
    'studio.consignArtwork.assetMetadata.field.title.description': 'Título da obra',

    'studio.consignArtwork.assetMetadata.field.description': 'Rótulo',
    'studio.consignArtwork.assetMetadata.field.description.description':
        'Breve descrição da obra. Descrição mais longa disponível em Mídia Auxiliar.',

    'studio.consignArtwork.assetMetadata.field.mood': 'Humor',
    'studio.consignArtwork.assetMetadata.field.mood.description': 'Sentimentos evocados pela obra',

    'studio.consignArtwork.assetMetadata.field.mood.enum.admiration': 'Admiração',
    'studio.consignArtwork.assetMetadata.field.mood.enum.absorbing': 'Absorvente',
    'studio.consignArtwork.assetMetadata.field.mood.enum.amusement': 'Diversão',
    'studio.consignArtwork.assetMetadata.field.mood.enum.adoration': 'Adoração',
    'studio.consignArtwork.assetMetadata.field.mood.enum.awe': 'Temor',
    'studio.consignArtwork.assetMetadata.field.mood.enum.anxiety': 'Ansiedade',
    'studio.consignArtwork.assetMetadata.field.mood.enum.boredom': 'Tédio',
    'studio.consignArtwork.assetMetadata.field.mood.enum.brooding': 'Melancolia',
    'studio.consignArtwork.assetMetadata.field.mood.enum.calmness': 'Calma',
    'studio.consignArtwork.assetMetadata.field.mood.enum.chills': 'Calafrios',
    'studio.consignArtwork.assetMetadata.field.mood.enum.chaotic': 'Caótico',
    'studio.consignArtwork.assetMetadata.field.mood.enum.connectedness': 'Conexão',
    'studio.consignArtwork.assetMetadata.field.mood.enum.cosmic': 'Cósmico',
    'studio.consignArtwork.assetMetadata.field.mood.enum.confusion': 'Confusão',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dread': 'Pavor',
    'studio.consignArtwork.assetMetadata.field.mood.enum.distaste': 'Repulsa',
    'studio.consignArtwork.assetMetadata.field.mood.enum.disgust': 'Desgosto',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dreary': 'Sombrio',
    'studio.consignArtwork.assetMetadata.field.mood.enum.disorienting': 'Desorientador',
    'studio.consignArtwork.assetMetadata.field.mood.enum.dreamy': 'Onírico',
    'studio.consignArtwork.assetMetadata.field.mood.enum.desire': 'Desejo',
    'studio.consignArtwork.assetMetadata.field.mood.enum.elegant': 'Elegante',
    'studio.consignArtwork.assetMetadata.field.mood.enum.humorous': 'Humorístico',
    'studio.consignArtwork.assetMetadata.field.mood.enum.intimate': 'Íntimo',
    'studio.consignArtwork.assetMetadata.field.mood.enum.intricate': 'Intrincado',
    'studio.consignArtwork.assetMetadata.field.mood.enum.love': 'Amor',
    'studio.consignArtwork.assetMetadata.field.mood.enum.lively': 'Vivo',
    'studio.consignArtwork.assetMetadata.field.mood.enum.mystical': 'Místico',
    'studio.consignArtwork.assetMetadata.field.mood.enum.mysterious': 'Misterioso',
    'studio.consignArtwork.assetMetadata.field.mood.enum.nostalgia': 'Nostalgia',
    'studio.consignArtwork.assetMetadata.field.mood.enum.ornate': 'Ornamental',
    'studio.consignArtwork.assetMetadata.field.mood.enum.psychedelic': 'Psicodélico',
    'studio.consignArtwork.assetMetadata.field.mood.enum.serenity': 'Serenidade',
    'studio.consignArtwork.assetMetadata.field.mood.enum.sadness': 'Tristeza',
    'studio.consignArtwork.assetMetadata.field.mood.enum.sensual': 'Sensual',
    'studio.consignArtwork.assetMetadata.field.mood.enum.spiritual': 'Espiritual',
    'studio.consignArtwork.assetMetadata.field.mood.enum.strange': 'Estranho',
    'studio.consignArtwork.assetMetadata.field.mood.enum.striking': 'Marcante',
    'studio.consignArtwork.assetMetadata.field.mood.enum.tragic': 'Trágico',
    'studio.consignArtwork.assetMetadata.field.mood.enum.tense': 'Tenso',
    'studio.consignArtwork.assetMetadata.field.mood.enum.vibrant': 'Vibrante',
    'studio.consignArtwork.assetMetadata.field.mood.enum.violent': 'Violento',
    'studio.consignArtwork.assetMetadata.field.mood.enum.wonder': 'Maravilha',
    'studio.consignArtwork.assetMetadata.field.mood.enum.whimsical': 'Fantasioso',

    'studio.consignArtwork.assetMetadata.field.copyright': 'Direitos Autorais',
    'studio.consignArtwork.assetMetadata.field.copyright.description':
        'Texto de direitos autorais. (Exemplo: Direitos autorais (c) 2024 Joe Artista)',

    'studio.consignArtwork.assetMetadata.field.colors': 'Cores',
    'studio.consignArtwork.assetMetadata.field.colors.item': 'Cor',
    'studio.consignArtwork.assetMetadata.field.colors.description': 'Paleta de cores principal (até três cores)',

    'studio.consignArtwork.assetMetadata.field.orientation': 'Orientação',
    'studio.consignArtwork.assetMetadata.field.orientation.description': 'Orientação desta obra',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.horizontal': 'Horizontal',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.vertical': 'Vertical',
    'studio.consignArtwork.assetMetadata.field.orientation.enum.square': 'Quadrada',

    'studio.consignArtwork.assetMetadata.field.culture': 'Cultura',
    'studio.consignArtwork.assetMetadata.field.culture.description': 'Cultura principal desta obra',

    'studio.consignArtwork.assetMetadata.field.culture.enum.african': 'Africana',
    'studio.consignArtwork.assetMetadata.field.culture.enum.persian': 'Persa',
    'studio.consignArtwork.assetMetadata.field.culture.enum.centralasian': 'Asiática Central',
    'studio.consignArtwork.assetMetadata.field.culture.enum.eastasian': 'Asiática Oriental',
    'studio.consignArtwork.assetMetadata.field.culture.enum.islamic': 'Islâmica',
    'studio.consignArtwork.assetMetadata.field.culture.enum.latinamerican': 'Latino-americana',
    'studio.consignArtwork.assetMetadata.field.culture.enum.nativeamerican': 'Nativa Americana',
    'studio.consignArtwork.assetMetadata.field.culture.enum.oceanic': 'Oceânica',
    'studio.consignArtwork.assetMetadata.field.culture.enum.southasian': 'Asiática Meridional',
    'studio.consignArtwork.assetMetadata.field.culture.enum.southeastasian': 'Sudeste Asiática',
    'studio.consignArtwork.assetMetadata.field.culture.enum.western': 'Ocidental',

    'studio.consignArtwork.assetMetadata.field.objectType': 'Tipo de Objeto',
    'studio.consignArtwork.assetMetadata.field.objectType.description': 'Origem da obra',

    'studio.consignArtwork.assetMetadata.field.objectType.enum.digitalart': 'Arte Digital',
    'studio.consignArtwork.assetMetadata.field.objectType.enum.physicalart': 'Arte Física',
    'studio.consignArtwork.assetMetadata.field.objectType.enum.digitalphysicalart': 'Arte Híbrida Física + Digital',

    'studio.consignArtwork.assetMetadata.field.tags': 'Tags',
    'studio.consignArtwork.assetMetadata.field.tags.item': 'Tag',
    'studio.consignArtwork.assetMetadata.field.tags.description': 'Tags relevantes para a obra',

    'studio.consignArtwork.assetMetadata.field.collections': 'Coleções',
    'studio.consignArtwork.assetMetadata.field.collections.item': 'Coleção',
    'studio.consignArtwork.assetMetadata.field.collections.description':
        'Coleções para organizar esta obra (pelo menos uma necessária)',

    'studio.consignArtwork.assetMetadata.field.category': 'Categoria',
    'studio.consignArtwork.assetMetadata.field.category.description': 'Categoria desta obra',

    'studio.consignArtwork.assetMetadata.field.category.enum.photography': 'Fotografia',
    'studio.consignArtwork.assetMetadata.field.category.enum.painting': 'Pintura',
    'studio.consignArtwork.assetMetadata.field.category.enum.threed': '3D',
    'studio.consignArtwork.assetMetadata.field.category.enum.video': 'Vídeo',
    'studio.consignArtwork.assetMetadata.field.category.enum.mixedmedia': 'Mista',
    'studio.consignArtwork.assetMetadata.field.category.enum.illustration': 'Ilustração',
    'studio.consignArtwork.assetMetadata.field.category.enum.collage': 'Colagem',

    'studio.consignArtwork.assetMetadata.field.medium': 'Médium',
    'studio.consignArtwork.assetMetadata.field.medium.description': 'Materiais usados nesta obra',

    'studio.consignArtwork.assetMetadata.field.medium.enum.acrylic': 'Acrílico',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ai': 'Inteligência Artificial',
    'studio.consignArtwork.assetMetadata.field.medium.enum.airbrush': 'Aerógrafo',
    'studio.consignArtwork.assetMetadata.field.medium.enum.albumensilver': 'Albumen Silver',
    'studio.consignArtwork.assetMetadata.field.medium.enum.algorithmic': 'Algorítmica',
    'studio.consignArtwork.assetMetadata.field.medium.enum.aluminium': 'Alumínio',
    'studio.consignArtwork.assetMetadata.field.medium.enum.appropriation': 'Apropriação',
    'studio.consignArtwork.assetMetadata.field.medium.enum.aquatint': 'Água-forte',
    'studio.consignArtwork.assetMetadata.field.medium.enum.assemblage': 'Assemblagem',
    'studio.consignArtwork.assetMetadata.field.medium.enum.augmentedreality': 'Realidade Aumentada',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ballpoint': 'Caneta Esferográfica',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bas-relief': 'Baixo-relevo',
    'studio.consignArtwork.assetMetadata.field.medium.enum.basalt': 'Basalto',
    'studio.consignArtwork.assetMetadata.field.medium.enum.binder': 'Aglutinante',
    'studio.consignArtwork.assetMetadata.field.medium.enum.blockchain': 'Blockchain',
    'studio.consignArtwork.assetMetadata.field.medium.enum.board': 'Tábua',
    'studio.consignArtwork.assetMetadata.field.medium.enum.brass': 'Latão',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bronze': 'Bronze',
    'studio.consignArtwork.assetMetadata.field.medium.enum.brush': 'Pincel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.burlap': 'Estopa',
    'studio.consignArtwork.assetMetadata.field.medium.enum.bw': 'Preto e Branco',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cable': 'Cabo',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cameo': 'Camafeu',
    'studio.consignArtwork.assetMetadata.field.medium.enum.canvas': 'Tela',
    'studio.consignArtwork.assetMetadata.field.medium.enum.carbonfiber': 'Fibra de Carbono',
    'studio.consignArtwork.assetMetadata.field.medium.enum.card': 'Cartão',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cardboard': 'Cartão',
    'studio.consignArtwork.assetMetadata.field.medium.enum.casein': 'Caseína',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cedar': 'Cedro',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cement': 'Cimento',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ceramic': 'Cerâmica',
    'studio.consignArtwork.assetMetadata.field.medium.enum.chalk': 'Giz',
    'studio.consignArtwork.assetMetadata.field.medium.enum.charcoal': 'Carvão',
    'studio.consignArtwork.assetMetadata.field.medium.enum.chrome': 'Cromo',
    'studio.consignArtwork.assetMetadata.field.medium.enum.clay': 'Argila',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cloud': 'Nuvem',
    'studio.consignArtwork.assetMetadata.field.medium.enum.coal': 'Carvão',
    'studio.consignArtwork.assetMetadata.field.medium.enum.collage': 'Colagem',
    'studio.consignArtwork.assetMetadata.field.medium.enum.colorpencil': 'Lápis de Cor',
    'studio.consignArtwork.assetMetadata.field.medium.enum.concrete': 'Concreto',
    'studio.consignArtwork.assetMetadata.field.medium.enum.copper': 'Cobre',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cryptoart': 'Arte Cripto',
    'studio.consignArtwork.assetMetadata.field.medium.enum.cyberart': 'Arte Cibernética',
    'studio.consignArtwork.assetMetadata.field.medium.enum.digital': 'Digital',
    'studio.consignArtwork.assetMetadata.field.medium.enum.drawing': 'Desenho',
    'studio.consignArtwork.assetMetadata.field.medium.enum.earth': 'Terra',
    'studio.consignArtwork.assetMetadata.field.medium.enum.electronic': 'Eletrônica',
    'studio.consignArtwork.assetMetadata.field.medium.enum.emulsion': 'Emulsão',
    'studio.consignArtwork.assetMetadata.field.medium.enum.enamel': 'Esmalte',
    'studio.consignArtwork.assetMetadata.field.medium.enum.etching': 'Gravura',
    'studio.consignArtwork.assetMetadata.field.medium.enum.eyeliner': 'Delineador de Olhos',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fabric': 'Tecido',
    'studio.consignArtwork.assetMetadata.field.medium.enum.feather': 'Pena',
    'studio.consignArtwork.assetMetadata.field.medium.enum.felt': 'Feltro',
    'studio.consignArtwork.assetMetadata.field.medium.enum.fiber': 'Fibra',
    'studio.consignArtwork.assetMetadata.field.medium.enum.foil': 'Folha',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gesso': 'Gesso',
    'studio.consignArtwork.assetMetadata.field.medium.enum.glass': 'Vidro',
    'studio.consignArtwork.assetMetadata.field.medium.enum.gold': 'Ouro',
    'studio.consignArtwork.assetMetadata.field.medium.enum.graphite': 'Grafite',
    'studio.consignArtwork.assetMetadata.field.medium.enum.grass': 'Grama',
    'studio.consignArtwork.assetMetadata.field.medium.enum.ink': 'Tinta',
    'studio.consignArtwork.assetMetadata.field.medium.enum.installation': 'Instalação',
    'studio.consignArtwork.assetMetadata.field.medium.enum.iron': 'Ferro',
    'studio.consignArtwork.assetMetadata.field.medium.enum.laminate': 'Laminado',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lapislazuli': 'Lápis-lazúli',
    'studio.consignArtwork.assetMetadata.field.medium.enum.laser': 'Laser',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lenticular': 'Lenticular',
    'studio.consignArtwork.assetMetadata.field.medium.enum.light': 'Luz',
    'studio.consignArtwork.assetMetadata.field.medium.enum.limestone': 'Calcário',
    'studio.consignArtwork.assetMetadata.field.medium.enum.linocut': 'Linogravura',
    'studio.consignArtwork.assetMetadata.field.medium.enum.lithograph': 'Litografia',
    'studio.consignArtwork.assetMetadata.field.medium.enum.magnet': 'Ímã',
    'studio.consignArtwork.assetMetadata.field.medium.enum.marble': 'Mármore',
    'studio.consignArtwork.assetMetadata.field.medium.enum.metal': 'Metal',
    'studio.consignArtwork.assetMetadata.field.medium.enum.microcontroller': 'Microcontrolador',
    'studio.consignArtwork.assetMetadata.field.medium.enum.microprint': 'Microimpressão',
    'studio.consignArtwork.assetMetadata.field.medium.enum.minerals': 'Minerais',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mixedmedia': 'Mista',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mosaic': 'Mosaico',
    'studio.consignArtwork.assetMetadata.field.medium.enum.mural': 'Mural',
    'studio.consignArtwork.assetMetadata.field.medium.enum.murano': 'Murano',
    'studio.consignArtwork.assetMetadata.field.medium.enum.neon': 'Neon',
    'studio.consignArtwork.assetMetadata.field.medium.enum.oil': 'Óleo',
    'studio.consignArtwork.assetMetadata.field.medium.enum.onyx': 'Ônix',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papercut': 'Recorte de Papel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papermache': 'Papier-mâché',
    'studio.consignArtwork.assetMetadata.field.medium.enum.papiermache': 'Papier-mâché',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pastel': 'Pastel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pencil': 'Lápis',
    'studio.consignArtwork.assetMetadata.field.medium.enum.performance': 'Performance',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photocopy': 'Fotocópia',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photogram': 'Fotograma',
    'studio.consignArtwork.assetMetadata.field.medium.enum.photography': 'Fotografia',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pin': 'Broche',
    'studio.consignArtwork.assetMetadata.field.medium.enum.pixel': 'Pixel',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plastic': 'Plástico',
    'studio.consignArtwork.assetMetadata.field.medium.enum.platinum': 'Platina',
    'studio.consignArtwork.assetMetadata.field.medium.enum.plexiglass': 'Plexiglás',
    'studio.consignArtwork.assetMetadata.field.medium.enum.poetry': 'Poesia',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polyester': 'Poliéster',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polymer': 'Polímero',
    'studio.consignArtwork.assetMetadata.field.medium.enum.polyurethane': 'Poliuretano',
    'studio.consignArtwork.assetMetadata.field.medium.enum.porcelain': 'Porcelana',
    'studio.consignArtwork.assetMetadata.field.medium.enum.preciousmetals': 'Metais Preciosos',
    'studio.consignArtwork.assetMetadata.field.medium.enum.print': 'Impressão',
    'studio.consignArtwork.assetMetadata.field.medium.enum.resin': 'Resina',
    'studio.consignArtwork.assetMetadata.field.medium.enum.rubber': 'Borracha',
    'studio.consignArtwork.assetMetadata.field.medium.enum.salt': 'Sal',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sand': 'Areia',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sandstone': 'Arenito',
    'studio.consignArtwork.assetMetadata.field.medium.enum.satin': 'Seda',
    'studio.consignArtwork.assetMetadata.field.medium.enum.science': 'Ciência',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sculpture': 'Escultura',
    'studio.consignArtwork.assetMetadata.field.medium.enum.silver': 'Prata',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sound': 'Som',
    'studio.consignArtwork.assetMetadata.field.medium.enum.spandex': 'Spandex',
    'studio.consignArtwork.assetMetadata.field.medium.enum.steel': 'Aço',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stencil': 'Estêncil',
    'studio.consignArtwork.assetMetadata.field.medium.enum.sticker': 'Adesivo',
    'studio.consignArtwork.assetMetadata.field.medium.enum.stone': 'Pedra',
    'studio.consignArtwork.assetMetadata.field.medium.enum.straw': 'Palha',
    'studio.consignArtwork.assetMetadata.field.medium.enum.synthetic': 'Sintético',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tablet': 'Tablet',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tapestry': 'Tapeçaria',
    'studio.consignArtwork.assetMetadata.field.medium.enum.taxidermy': 'Taxidermia',
    'studio.consignArtwork.assetMetadata.field.medium.enum.textile': 'Têxtil',
    'studio.consignArtwork.assetMetadata.field.medium.enum.thread': 'Linha',
    'studio.consignArtwork.assetMetadata.field.medium.enum.tinfoil': 'Folha-de-flandres',
    'studio.consignArtwork.assetMetadata.field.medium.enum.titanium': 'Titânio',
    'studio.consignArtwork.assetMetadata.field.medium.enum.unframed': 'Sem Moldura',
    'studio.consignArtwork.assetMetadata.field.medium.enum.upholstery': 'Estofamento',
    'studio.consignArtwork.assetMetadata.field.medium.enum.video': 'Vídeo',
    'studio.consignArtwork.assetMetadata.field.medium.enum.vinyl': 'Vinil',
    'studio.consignArtwork.assetMetadata.field.medium.enum.watercolor': 'Aquarela',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wax': 'Cera',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wood': 'Madeira',
    'studio.consignArtwork.assetMetadata.field.medium.enum.wool': 'Lã',
    'studio.consignArtwork.assetMetadata.field.medium.enum.yarn': 'Fio',
    'studio.consignArtwork.assetMetadata.field.medium.enum.other': 'Outros',

    'studio.consignArtwork.assetMetadata.field.style': 'Estilo',
    'studio.consignArtwork.assetMetadata.field.style.description': 'Estilos utilizados nesta obra',
    'studio.consignArtwork.assetMetadata.field.style.enum.abstract': 'Abstrato',
    'studio.consignArtwork.assetMetadata.field.style.enum.abstractexpressionism': 'Expressionismo Abstrato',
    'studio.consignArtwork.assetMetadata.field.style.enum.artdeco': 'Art Déco',
    'studio.consignArtwork.assetMetadata.field.style.enum.conceptual': 'Conceitual',
    'studio.consignArtwork.assetMetadata.field.style.enum.cubism': 'Cubismo',
    'studio.consignArtwork.assetMetadata.field.style.enum.dada': 'Dadaísmo',
    'studio.consignArtwork.assetMetadata.field.style.enum.documentary': 'Documentário',
    'studio.consignArtwork.assetMetadata.field.style.enum.expressionism': 'Expressionismo',
    'studio.consignArtwork.assetMetadata.field.style.enum.figurative': 'Figurativo',
    'studio.consignArtwork.assetMetadata.field.style.enum.fineart': 'Belas Artes',
    'studio.consignArtwork.assetMetadata.field.style.enum.folk': 'Popular',
    'studio.consignArtwork.assetMetadata.field.style.enum.illustration': 'Ilustração',
    'studio.consignArtwork.assetMetadata.field.style.enum.impressionism': 'Impressionismo',
    'studio.consignArtwork.assetMetadata.field.style.enum.minimalism': 'Minimalismo',
    'studio.consignArtwork.assetMetadata.field.style.enum.modern': 'Moderno',
    'studio.consignArtwork.assetMetadata.field.style.enum.photorealism': 'Fotorealismo',
    'studio.consignArtwork.assetMetadata.field.style.enum.popart': 'Pop Art',
    'studio.consignArtwork.assetMetadata.field.style.enum.portraiture': 'Retrato',
    'studio.consignArtwork.assetMetadata.field.style.enum.realism': 'Realismo',
    'studio.consignArtwork.assetMetadata.field.style.enum.streetart': 'Arte de Rua',
    'studio.consignArtwork.assetMetadata.field.style.enum.surrealism': 'Surrealismo',

    'studio.consignArtwork.assetMetadata.field.subject': 'Assunto',
    'studio.consignArtwork.assetMetadata.field.subject.description':
        'Palavras-chave identificando os assuntos utilizados nesta obra',
    'studio.consignArtwork.assetMetadata.field.subject.enum.abstract': 'Abstrato',
    'studio.consignArtwork.assetMetadata.field.subject.enum.aerial': 'Aéreo',
    'studio.consignArtwork.assetMetadata.field.subject.enum.aeroplane': 'Avião',
    'studio.consignArtwork.assetMetadata.field.subject.enum.animal': 'Animal',
    'studio.consignArtwork.assetMetadata.field.subject.enum.architecture': 'Arquitetura',
    'studio.consignArtwork.assetMetadata.field.subject.enum.automobile': 'Automóvel',
    'studio.consignArtwork.assetMetadata.field.subject.enum.beach': 'Praia',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bicycle': 'Bicicleta',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bike': 'Bicicleta',
    'studio.consignArtwork.assetMetadata.field.subject.enum.bird': 'Pássaro',
    'studio.consignArtwork.assetMetadata.field.subject.enum.boat': 'Barco',
    'studio.consignArtwork.assetMetadata.field.subject.enum.body': 'Corpo',
    'studio.consignArtwork.assetMetadata.field.subject.enum.botanic': 'Botânica',
    'studio.consignArtwork.assetMetadata.field.subject.enum.business': 'Negócio',
    'studio.consignArtwork.assetMetadata.field.subject.enum.calligraphy': 'Caligrafia',
    'studio.consignArtwork.assetMetadata.field.subject.enum.car': 'Carro',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cartoon': 'Desenho animado',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cats': 'Gatos',
    'studio.consignArtwork.assetMetadata.field.subject.enum.celebrity': 'Celebridade',
    'studio.consignArtwork.assetMetadata.field.subject.enum.children': 'Crianças',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cinema': 'Cinema',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cities': 'Cidades',
    'studio.consignArtwork.assetMetadata.field.subject.enum.classicalmythology': 'Mitologia Clássica',
    'studio.consignArtwork.assetMetadata.field.subject.enum.comics': 'Quadrinhos',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cows': 'Vacas',
    'studio.consignArtwork.assetMetadata.field.subject.enum.cuisine': 'Culinária',
    'studio.consignArtwork.assetMetadata.field.subject.enum.culture': 'Cultura',
    'studio.consignArtwork.assetMetadata.field.subject.enum.dogs': 'Cães',
    'studio.consignArtwork.assetMetadata.field.subject.enum.education': 'Educação',
    'studio.consignArtwork.assetMetadata.field.subject.enum.erotic': 'Erótico',
    'studio.consignArtwork.assetMetadata.field.subject.enum.family': 'Família',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fantasy': 'Fantasia',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fashion': 'Moda',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fish': 'Peixe',
    'studio.consignArtwork.assetMetadata.field.subject.enum.floral': 'Floral',
    'studio.consignArtwork.assetMetadata.field.subject.enum.food': 'Comida',
    'studio.consignArtwork.assetMetadata.field.subject.enum.fooddrink': 'Comida e Bebida',
    'studio.consignArtwork.assetMetadata.field.subject.enum.garden': 'Jardim',
    'studio.consignArtwork.assetMetadata.field.subject.enum.geometric': 'Geométrico',
    'studio.consignArtwork.assetMetadata.field.subject.enum.graffiti': 'Graffiti',
    'studio.consignArtwork.assetMetadata.field.subject.enum.healthbeauty': 'Saúde e Beleza',
    'studio.consignArtwork.assetMetadata.field.subject.enum.home': 'Casa',
    'studio.consignArtwork.assetMetadata.field.subject.enum.horse': 'Cavalo',
    'studio.consignArtwork.assetMetadata.field.subject.enum.humor': 'Humor',
    'studio.consignArtwork.assetMetadata.field.subject.enum.interiors': 'Interiores',
    'studio.consignArtwork.assetMetadata.field.subject.enum.kids': 'Crianças',
    'studio.consignArtwork.assetMetadata.field.subject.enum.kitchen': 'Cozinha',
    'studio.consignArtwork.assetMetadata.field.subject.enum.landscape': 'Paisagem',
    'studio.consignArtwork.assetMetadata.field.subject.enum.language': 'Idioma',
    'studio.consignArtwork.assetMetadata.field.subject.enum.light': 'Luz',
    'studio.consignArtwork.assetMetadata.field.subject.enum.love': 'Amor',
    'studio.consignArtwork.assetMetadata.field.subject.enum.men': 'Homens',
    'studio.consignArtwork.assetMetadata.field.subject.enum.mortality': 'Mortalidade',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motor': 'Motor',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motorbike': 'Motocicleta',
    'studio.consignArtwork.assetMetadata.field.subject.enum.motorcycle': 'Motocicleta',
    'studio.consignArtwork.assetMetadata.field.subject.enum.music': 'Música',
    'studio.consignArtwork.assetMetadata.field.subject.enum.nature': 'Natureza',
    'studio.consignArtwork.assetMetadata.field.subject.enum.nude': 'Nu',
    'studio.consignArtwork.assetMetadata.field.subject.enum.outerspace': 'Espaço Sideral',
    'studio.consignArtwork.assetMetadata.field.subject.enum.patterns': 'Padrões',
    'studio.consignArtwork.assetMetadata.field.subject.enum.people': 'Pessoas',
    'studio.consignArtwork.assetMetadata.field.subject.enum.performingarts': 'Artes Cênicas',
    'studio.consignArtwork.assetMetadata.field.subject.enum.places': 'Lugares',
    'studio.consignArtwork.assetMetadata.field.subject.enum.political': 'Político',
    'studio.consignArtwork.assetMetadata.field.subject.enum.politics': 'Política',
    'studio.consignArtwork.assetMetadata.field.subject.enum.popculturecelebrity': 'Cultura Pop/Celebridade',
    'studio.consignArtwork.assetMetadata.field.subject.enum.popularculture': 'Cultura Popular',
    'studio.consignArtwork.assetMetadata.field.subject.enum.portrait': 'Retrato',
    'studio.consignArtwork.assetMetadata.field.subject.enum.religion': 'Religião',
    'studio.consignArtwork.assetMetadata.field.subject.enum.religious': 'Religioso',
    'studio.consignArtwork.assetMetadata.field.subject.enum.rurallife': 'Vida Rural',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sailboat': 'Barco a Vela',
    'studio.consignArtwork.assetMetadata.field.subject.enum.science': 'Ciência',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sciencetechnology': 'Ciência/Tecnologia',
    'studio.consignArtwork.assetMetadata.field.subject.enum.seascape': 'Paisagem Marinha',
    'studio.consignArtwork.assetMetadata.field.subject.enum.seasons': 'Estações',
    'studio.consignArtwork.assetMetadata.field.subject.enum.ship': 'Navio',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sport': 'Esporte',
    'studio.consignArtwork.assetMetadata.field.subject.enum.sports': 'Esportes',
    'studio.consignArtwork.assetMetadata.field.subject.enum.stilllife': 'Natureza Morta',
    'studio.consignArtwork.assetMetadata.field.subject.enum.technology': 'Tecnologia',
    'studio.consignArtwork.assetMetadata.field.subject.enum.time': 'Tempo',
    'studio.consignArtwork.assetMetadata.field.subject.enum.train': 'Trem',
    'studio.consignArtwork.assetMetadata.field.subject.enum.travel': 'Viagem',
    'studio.consignArtwork.assetMetadata.field.subject.enum.tree': 'Árvore',
    'studio.consignArtwork.assetMetadata.field.subject.enum.typography': 'Tipografia',
    'studio.consignArtwork.assetMetadata.field.subject.enum.wall': 'Parede',
    'studio.consignArtwork.assetMetadata.field.subject.enum.water': 'Água',
    'studio.consignArtwork.assetMetadata.field.subject.enum.women': 'Mulheres',
    'studio.consignArtwork.assetMetadata.field.subject.enum.worldculture': 'Cultura Mundial',

    'studio.consignArtwork.assetMetadata.field.genre': 'Gênero',
    'studio.consignArtwork.assetMetadata.field.genre.description': 'Gêneros para esta obra',
    'studio.consignArtwork.assetMetadata.field.aiGeneration': 'Geração de IA',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.description': 'Alguma parte desta obra foi gerada por IA?',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.full': 'Totalmente gerada por IA',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.partial': 'Parcialmente gerada por IA',
    'studio.consignArtwork.assetMetadata.field.aiGeneration.enum.none': 'Nenhuma IA usada',
    'studio.consignArtwork.assetMetadata.field.arenabled': 'Realidade Aumentada ativada',
    'studio.consignArtwork.assetMetadata.field.arenabled.description':
        'A Realidade Aumentada está ativada para esta obra?',
    'studio.consignArtwork.assetMetadata.field.arenabled.enum.yes': 'Esta obra está habilitada para RA',
    'studio.consignArtwork.assetMetadata.field.arenabled.enum.no': 'Esta obra não está habilitada para RA',
    'studio.consignArtwork.assetMetadata.field.nudity': 'Nudez',
    'studio.consignArtwork.assetMetadata.field.nudity.description': 'Esta obra contém nudez?',
    'studio.consignArtwork.assetMetadata.field.nudity.enum.yes': 'Esta obra contém nudez',
    'studio.consignArtwork.assetMetadata.field.nudity.enum.no': 'Esta obra não contém nudez',
    'studio.consignArtwork.assetMetadata.field.name': 'Nome do Criador',
    'studio.consignArtwork.assetMetadata.field.name.description': 'Nome do criador ou pseudônimo',
    'studio.consignArtwork.assetMetadata.field.roles': 'Funções do Criador',
    'studio.consignArtwork.assetMetadata.field.roles.description': 'Funções do criador para esta obra ou título geral',
    'studio.consignArtwork.assetMetadata.field.bio': 'Biografia do Criador',
    'studio.consignArtwork.assetMetadata.field.bio.description': 'Biografia do criador (curta, 3-4 frases)',
    'studio.consignArtwork.assetMetadata.field.profileUrl': 'Link do Site do Criador',
    'studio.consignArtwork.assetMetadata.field.profileUrl.description': 'Link do site do criador',
    'studio.consignArtwork.assetMetadata.field.nationality': 'Nacionalidade',
    'studio.consignArtwork.assetMetadata.field.nationality.description': 'Nacionalidade ou país de origem do criador',
    'studio.consignArtwork.assetMetadata.field.residence': 'Residência',
    'studio.consignArtwork.assetMetadata.field.residence.description': 'País de residência do criador',
    'studio.consignArtwork.assetMetadata.field.ethnicity': 'Etnia',
    'studio.consignArtwork.assetMetadata.field.ethnicity.description': 'Etnia do criador',
    'studio.consignArtwork.assetMetadata.field.gender': 'Gênero',
    'studio.consignArtwork.assetMetadata.field.gender.description': 'Gênero do criador',
    'studio.consignArtwork.assetMetadata.field.country': 'País',
    'studio.consignArtwork.assetMetadata.field.country.description': 'País de origem desta obra',
    'studio.consignArtwork.assetMetadata.field.plusCode': 'Código Plus',
    'studio.consignArtwork.assetMetadata.field.plusCode.description':
        "Por exemplo, Copenhague, Dinamarca seria PlusCode 'MHJQ+4V'. Você pode procurar valores de PlusCode aqui: https://plus.codes/map",
    'studio.consignArtwork.assetMetadata.field.blockchain': 'Blockchain',
    'studio.consignArtwork.assetMetadata.field.blockchain.description': 'Blockchain',
    'studio.consignArtwork.assetMetadata.field.exhibitions': 'Exposições',
    'studio.consignArtwork.assetMetadata.field.exhibitions.item': 'Exposição',
    'studio.consignArtwork.assetMetadata.field.exhibitions.description': 'Exposições onde esta obra foi exibida',
    'studio.consignArtwork.assetMetadata.field.exhibitionName': 'Nome da Exposição',
    'studio.consignArtwork.assetMetadata.field.exhibitionName.description': 'Nome da exposição',
    'studio.consignArtwork.assetMetadata.field.exhibitionUrl': 'URL da Exposição',
    'studio.consignArtwork.assetMetadata.field.exhibitionUrl.description': 'Link para informações da exposição',
    'studio.consignArtwork.assetMetadata.field.awards': 'Prêmios',
    'studio.consignArtwork.assetMetadata.field.awards.item': 'Prêmio',
    'studio.consignArtwork.assetMetadata.field.awards.description': 'Prêmios que esta obra recebeu',
    'studio.consignArtwork.assetMetadata.field.awardName': 'Nome do Prêmio',
    'studio.consignArtwork.assetMetadata.field.awardName.description': 'Nome do prêmio',
    'studio.consignArtwork.assetMetadata.field.awardUrl': 'URL do Prêmio',
    'studio.consignArtwork.assetMetadata.field.awardUrl.description': 'Link para informações do prêmio',
    'studio.consignArtwork.assetMetadata.field.errors': (data) =>
        `${data.message === 'required' || data.message === 'minItems' ? 'Campo obrigatório' : ''}`,

    /* Licenças */
    'studio.consignArtwork.licenses.title': 'Licenças',
    'studio.consignArtwork.licenses.description':
        'Atualmente, a Vitruveo oferece quatro formas de licenciar/vender sua obra de arte. Aqui você pode escolher qualquer uma dessas opções de licenciamento:',
    'studio.consignArtwork.licenses.oneLicense.error': 'Por favor, adicione pelo menos uma licença',
    'studio.consignArtwork.licenses.fillFields.error': 'Preencha os campos corretamente.',
    'studio.consignArtwork.licenses.alreadyAdded': 'Licença já adicionada',
    'studio.consignArtwork.licenses.delete.button': 'Deletar',
    'studio.consignArtwork.licenses.add.button': 'Adicionar',
    'studio.consignArtwork.licenses.warning':
        'As obras da Gênese foram garantidas para uma venda de NFT por $150. Por favor, selecione a licença NFT-ART-1, Edição Única e insira $150. Você também pode selecionar licenças adicionais.',

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

    'studio.consignArtwork.licenses.license': 'Licença',

    'studio.consignArtwork.licenses.nft.ccby':
        'Esta licença permite que os reutilizadores distribuam, remisturem, adaptem e construam sobre o material em qualquer meio ou formato, desde que seja atribuída a autoria ao criador. A licença permite o uso comercial.',
    'studio.consignArtwork.licenses.nft.ccbysa':
        'Esta licença permite que os reutilizadores distribuam, remisturem, adaptem e construam sobre o material em qualquer meio ou formato, desde que seja atribuída a autoria ao criador. A licença permite o uso comercial. Se você remixar, adaptar ou construir sobre o material, você deve licenciar o material modificado sob termos idênticos.',
    'studio.consignArtwork.licenses.nft.ccbync':
        'Esta licença permite que os reutilizadores distribuam, remisturem, adaptem e construam sobre o material em qualquer meio ou formato apenas para fins não comerciais, e apenas desde que seja atribuída a autoria ao criador.',
    'studio.consignArtwork.licenses.nft.ccbyncsa':
        'Esta licença permite que os reutilizadores distribuam, remisturem, adaptem e construam sobre o material em qualquer meio ou formato apenas para fins não comerciais, e apenas desde que seja atribuída a autoria ao criador. Se você remixar, adaptar ou construir sobre o material, você deve licenciar o material modificado sob termos idênticos.',
    'studio.consignArtwork.licenses.nft.ccbynd':
        'Esta licença permite que os reutilizadores copiem e distribuam o material em qualquer meio ou formato apenas na forma não adaptada, e apenas desde que seja atribuída a autoria ao criador.',
    'studio.consignArtwork.licenses.nft.ccbyncnd':
        'Esta licença permite que os reutilizadores copiem e distribuam o material em qualquer meio ou formato apenas na forma não adaptada, apenas para fins não comerciais, e apenas desde que seja atribuída a autoria ao criador.',
    'studio.consignArtwork.licenses.nft.cc0':
        'CC0 (também conhecida como CC Zero) é uma ferramenta de dedicação pública, que permite aos criadores renunciarem aos seus direitos autorais e colocarem suas obras no domínio público mundial. CC0 permite que os reutilizadores distribuam, remisturem, adaptem e construam sobre o material em qualquer meio ou formato, sem condições.',

    'studio.consignArtwork.licenses.nft.description':
        'Esta licença torna a obra de arte disponível para venda sob um dos vários modelos de precificação de edição. Quando vendido, um NFT da obra de arte é cunhado e entregue ao comprador.',
    'studio.consignArtwork.licenses.nft.enable':
        'Ative esta licença se você deseja que os compradores tenham a propriedade de um colecionável digital da obra de arte.',

    'studio.consignArtwork.licenses.nft.selectEdition.title': 'Selecionar Edição',
    'studio.consignArtwork.licenses.nft.selectEdition.elasticEditions':
        'é um modelo flexível que dá ao comprador a capacidade de combinar várias edições em uma, alterando dinamicamente o tamanho da edição.',
    'studio.consignArtwork.licenses.nft.selectEdition.singleEdition': 'é um modelo fixo 1/1.',
    'studio.consignArtwork.licenses.nft.selectEdition.unlimitedEditions':
        'é um modelo gratuito ou com taxa para edições ilimitadas.',

    'studio.consignArtwork.licenses.nft.elasticEditions.title': 'Edições Elásticas',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice.title': 'Preço da Edição (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions.title': 'Número de Edições',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice.title': 'Preço Total (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount.title': 'Desconto da Edição',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice':
        '“Preço da Edição” é o preço da obra de arte em dólares americanos.',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions':
        '“Número de Edições” é a quantidade de edições da obra de arte que podem ser cunhadas.',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice':
        '“Preço Total” é o “Preço da Edição” multiplicado pelo “Número de Edições.”',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount':
        '“Desconto da Edição” é o desconto para o comprador ao comprar várias edições. É calculado dividindo 10 pelo “Número de Edições.” Se ativado, o desconto é aplicado para cada edição após a primeira.',
    'studio.consignArtwork.licenses.nft.singleEdition.title': 'Edição Única',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice':
        '“Preço da Edição” é o preço da obra de arte em dólares americanos.',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice.title': 'Preço da Edição (USD)',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.title': 'Edições Ilimitadas',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice':
        '“Preço da Edição” é o preço da obra de arte em dólares americanos.',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice.title': 'Preço da Edição (USD)',

    'studio.consignArtwork.licenses.stream.description':
        'Esta licença torna a obra de arte disponível para curadores para inclusão em playlists para transmissão de arte para quadros digitais. Os ganhos com a transmissão são calculados automaticamente com base no uso e nos acordos de preço negociados.',
    'studio.consignArtwork.licenses.stream.enable':
        'Ative esta licença se você deseja que os curadores incluam sua obra de arte em playlists que são usadas por consumidores e empresas para apresentações de slides em quadros digitais.',
    'studio.consignArtwork.licenses.stream.enable.description':
        'Os ganhos com a transmissão são calculados automaticamente com base no uso e nos acordos de preço negociados.',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming': 'Transmissão Ilimitada',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming.description':
        'A obra de arte pode ser usada para transmissão em cenários ilimitados.',

    'studio.consignArtwork.licenses.print.description':
        'Esta licença torna a obra de arte disponível para os usuários finais para impressão em um único item físico usando a tecnologia Print-on-Demand (POD). A licença é livremente transferível até o ponto de impressão, após o qual é transferível apenas para o proprietário do item físico.',
    'studio.consignArtwork.licenses.print.enable':
        'Ative esta licença se você deseja que os usuários finais usem sua arte para aplicações de impressão sob demanda (POD). Esta licença é para impressão individual; a impressão em massa não é permitida.',
    'studio.consignArtwork.licenses.print.singlePrint.title': 'Impressão Única',
    'studio.consignArtwork.licenses.print.singlePrint.description':
        '“Preço Unitário” é o preço da obra de arte em dólares americanos para uma única impressão.',
    'studio.consignArtwork.licenses.print.singlePrint.field': 'Preço Unitário (USD)',

    'studio.consignArtwork.licenses.remix.description':
        'Esta licença torna a obra de arte disponível para os usuários finais para uso em aplicações Remix usando a',
    'studio.consignArtwork.licenses.remix.description2': 'licença que permite o uso de remix para fins não comerciais.',
    'studio.consignArtwork.licenses.remix.singleRemix.title': 'Remix Único',
    'studio.consignArtwork.licenses.remix.singleRemix.description':
        '“Preço Unitário” é o preço da obra de arte em dólares americanos para um único remix.',
    'studio.consignArtwork.licenses.remix.singleRemix.field': 'Preço Unitário (USD)',
    'studio.consignArtwork.licenses.remix.enable':
        'Ative esta licença se você deseja que os usuários finais usem sua arte em aplicações Remix. O output do remix só pode ser usado para fins não comerciais.',

    /* Termos de Uso */
    'studio.consignArtwork.termsOfUse.title': 'Termos de Uso',
    'studio.consignArtwork.termsOfUse.description': 'Complete todas as tarefas necessárias e consigne sua obra de arte',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'Aceito' : data.scrolledToBottom ? 'Aceitar Contrato' : 'Role até o final',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'Eu concordo que o Ativo e os arquivos de Mídia Auxiliar são obras originais e autênticas que foram criadas pelos criadores indicados na submissão de metadados e não foram copiados, roubados ou plagiados de qualquer outra fonte.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'Eu concordo que se qualquer parte do Ativo e dos arquivos de Mídia Auxiliar foram criados usando Inteligência Artificial, eu respondi "Sim" no campo de Metadados para "Geração por IA".',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'Eu concordo que esta obra não está cunhada em qualquer outra blockchain, oferecida, consignada ou listada para venda em qualquer outra plataforma, e não será cunhada, oferecida, consignada ou listada enquanto a listagem estiver ativa nesta plataforma.',

    /* Auxiliary Media */
    'studio.consignArtwork.auxiliaryMedia.description':
        'Faça upload de ativos de mídia auxiliares para Bastidores (BTS) e Realidade Aumentada (AR).',
    'studio.consignArtwork.auxiliaryMedia.title': 'Mídia Auxiliar',
    'studio.consignArtwork.auxiliaryMedia.subTitle': 'Ativos de Mídia Auxiliar',
    'studio.consignArtwork.auxiliaryMedia.arImage.title': 'Imagem AR',
    'studio.consignArtwork.auxiliaryMedia.arVideo.title': 'Vídeo AR',
    'studio.consignArtwork.auxiliaryMedia.btsImage.title': 'Imagem BTS',
    'studio.consignArtwork.auxiliaryMedia.btsVideo.title': 'Vídeo BTS',
    'studio.consignArtwork.auxiliaryMedia.codeZip.title': 'Código Zip',
    'studio.consignArtwork.auxiliaryMedia.field.description': 'Descrição',
    'studio.consignArtwork.auxiliaryMedia.field.description.placeholder': 'Descrição Longa da Obra',

    /* Consignment Status */
    'studio.consignArtwork.consignmentStatus.title': 'Status de Consignação',
    'studio.consignArtwork.consignmentStatus.description':
        'Bom trabalho! Sua obra de arte está pronta para consignação.',
    'studio.consignArtwork.consignmentStatus.message': 'Esta funcionalidade estará disponível em breve.',
    'studio.consignArtwork.consignmentStatus.yes': 'Sim',
    'studio.consignArtwork.consignmentStatus.no': 'Não',
    'studio.consignArtwork.consignmentStatus.edit': 'Editar',
    'studio.consignArtwork.consignmentStatus.view': 'Visualizar',
    'studio.consignArtwork.consignmentStatus.search': 'Buscar',
    'studio.consignArtwork.consignmentStatus.license': 'Licença',
    'studio.consignArtwork.consignmentStatus.draft.title': 'Rascunho',
    'studio.consignArtwork.consignmentStatus.active.title': 'Ativo',
    'studio.consignArtwork.consignmentStatus.preview.title': 'Prévia',
    'studio.consignArtwork.consignmentStatus.activate.title': 'Ativar',

    'studio.consignArtwork.consignmentStatus.activation.title': 'Ativação',
    'studio.consignArtwork.consignmentStatus.activation.description':
        'A ativação consigna sua obra de arte à blockchain e requer um Crédito de Criador.',
    'studio.consignArtwork.consignmentStatus.creatorCreditsRequired': 'Créditos de Criador Necessários',
    'studio.consignArtwork.consignmentStatus.creatorCreditsAvailable': 'Créditos de Criador Disponíveis',
    'studio.consignArtwork.consignmentStatus.viewArtwork.button': 'Visualizar Obra de Arte',
    'studio.consignArtwork.consignmentStatus.warning':
        'Os Créditos do Criador serão distribuídos em breve para todos os artistas! Notificaremos você novamente quando estivermos prontos para esta etapa final.',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'Gostaria de salvar as informações?',
    'studio.consignArtwork.backModal.confirm.button': 'Salvar',
    'studio.consignArtwork.backModal.cancel.button': 'Não',

    /* Sidebar */
    'studio.sidebar.consign': 'Consignar Obra de Arte',
    'studio.sidebar.artistGuide': 'Guia do Artista',
    'studio.sidebar.community': 'Comunidade',

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
