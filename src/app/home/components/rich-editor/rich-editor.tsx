import { ContentBlock, Editor, EditorState, RichUtils } from 'draft-js';
import { Stack, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeft from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenter from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRight from '@mui/icons-material/FormatAlignRight';
import 'draft-js/dist/Draft.css';
import './rich-editor.styles.css';

interface RichEditorProps {
    onChange: (editorState: EditorState) => void;
    editorState: EditorState;
}

interface EditorControlProps {
    onClick: () => void;
    icon: React.ReactNode;
}

const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    return type;
};

export const RichEditor = ({ onChange, editorState }: RichEditorProps) => {
    const handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    const onBoldClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };

    const onItalicClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    };

    const onUnderlineClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    };

    const onLeftAlignClick = () => {
        onChange(RichUtils.toggleBlockType(editorState, 'text-align-left'));
    };

    const onCenterAlignClick = () => {
        onChange(RichUtils.toggleBlockType(editorState, 'text-align-center'));
    };

    const onRightAlignClick = () => {
        onChange(RichUtils.toggleBlockType(editorState, 'text-align-right'));
    };

    return (
        <Stack>
            <Stack direction="row" gap={1} mb={1}>
                <EditorControl onClick={onBoldClick} icon={<FormatBoldIcon />} />
                <EditorControl onClick={onItalicClick} icon={<FormatItalicIcon />} />
                <EditorControl onClick={onUnderlineClick} icon={<FormatUnderlinedIcon />} />
                <EditorControl onClick={onLeftAlignClick} icon={<FormatAlignLeft />} />
                <EditorControl onClick={onCenterAlignClick} icon={<FormatAlignCenter />} />
                <EditorControl onClick={onRightAlignClick} icon={<FormatAlignRight />} />
            </Stack>
            <Editor
                blockStyleFn={blockStyleFn}
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
            />
        </Stack>
    );
};

const EditorControl = ({ onClick, icon }: EditorControlProps) => {
    return (
        <IconButton size="small" onClick={onClick}>
            {icon}
        </IconButton>
    );
};
