import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Essentials,
  Paragraph,
  Heading,
  Link,
  List,
  Alignment,
  Undo,
  BlockQuote,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
  return (
    <div className="ckeditor-container">
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          plugins: [
            Essentials,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Paragraph,
            Heading,
            Link,
            List,
            Alignment,
            Undo,
            BlockQuote,
          ],
          toolbar: [
            'undo', 'redo',
            '|',
            'heading',
            '|',
            'bold', 'italic', 'underline', 'strikethrough',
            '|',
            'link', 'blockQuote',
            '|',
            'bulletedList', 'numberedList',
            '|',
            'alignment',
          ],
          placeholder: placeholder || 'Nhập nội dung...',
        }}
      />
      <style>{`
        .ckeditor-container .ck-editor__editable {
          min-height: 200px;
        }
        .ckeditor-container .ck.ck-editor__main > .ck-editor__editable {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
        }
        .ckeditor-container .ck.ck-toolbar {
          background: hsl(var(--muted));
          border-color: hsl(var(--border));
        }
        .ckeditor-container .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
          border-color: hsl(var(--ring));
        }
      `}</style>
    </div>
  );
};
