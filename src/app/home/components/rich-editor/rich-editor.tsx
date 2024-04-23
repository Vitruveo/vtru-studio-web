import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './rich-editor.styles.css';

interface RichEditorProps {
    onChange: (editorState: EditorState) => void;
    editorState: EditorState;
}

export const RichEditor = ({ onChange, editorState }: RichEditorProps) => {
  
    const handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    return <Editor editorState={editorState} onChange={onChange} handleKeyCommand={handleKeyCommand} />;
};
