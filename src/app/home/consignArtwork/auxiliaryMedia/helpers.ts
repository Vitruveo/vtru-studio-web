import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

export const mediaConfigs = {
    arImage: {
        title: 'studio.consignArtwork.auxiliaryMedia.arImage.title',
        description: 'studio.consignArtwork.auxiliaryMedia.arImage.description',
        type: 'Image',
        sizeMB: 10,
        width: 3840,
        height: 2160,
        required: false,
    },
    arVideo: {
        title: 'studio.consignArtwork.auxiliaryMedia.arVideo.title',
        description: 'studio.consignArtwork.auxiliaryMedia.arVideo.description',
        type: 'Ar Video',
        width: 3840,
        height: 2160,
        sizeMB: 50,
        required: false,
    },
    btsImage: {
        title: 'studio.consignArtwork.auxiliaryMedia.btsImage.title',
        description: 'studio.consignArtwork.auxiliaryMedia.btsImage.description',
        type: 'Image',
        width: 3840,
        height: 2160,
        sizeMB: 10,
        required: false,
    },
    btsVideo: {
        title: 'studio.consignArtwork.auxiliaryMedia.btsVideo.title',
        description: 'studio.consignArtwork.auxiliaryMedia.btsVideo.description',
        type: 'Video',
        width: 3840,
        height: 2160,
        sizeMB: 50,
        required: false,
    },
    codeZip: {
        title: 'studio.consignArtwork.auxiliaryMedia.codeZip.title',
        description: 'studio.consignArtwork.auxiliaryMedia.codeZip.description',
        type: 'Zip',
        width: 3840,
        height: 2160,
        sizeMB: 10,
        required: false,
    },
};


export const createDescriptionInitialState = (description: string) => {
    try {
        return EditorState.createWithContent(convertFromRaw(JSON.parse(description)));
    } catch (error) {
        return EditorState.createEmpty();
    }
}

export const getDescriptionJSONString = (editorState: EditorState) => {
    return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
};

export const getDescriptionText = (editorState: EditorState) => {
    return editorState.getCurrentContent().getPlainText();
};