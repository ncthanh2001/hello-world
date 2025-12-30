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
  Image,
  ImageUpload,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  Base64UploadAdapter,
  MediaEmbed,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
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
            Image,
            ImageUpload,
            ImageToolbar,
            ImageCaption,
            ImageStyle,
            ImageResize,
            Base64UploadAdapter,
            MediaEmbed,
            Table,
            TableToolbar,
            TableProperties,
            TableCellProperties,
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
            '|',
            'uploadImage', 'mediaEmbed', 'insertTable',
          ],
          placeholder: placeholder || 'Nhập nội dung...',
          image: {
            toolbar: [
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
              '|',
              'toggleImageCaption',
              'imageTextAlternative',
              '|',
              'resizeImage',
            ],
            resizeOptions: [
              { name: 'resizeImage:original', value: null, label: 'Original' },
              { name: 'resizeImage:25', value: '25', label: '25%' },
              { name: 'resizeImage:50', value: '50', label: '50%' },
              { name: 'resizeImage:75', value: '75', label: '75%' },
            ],
          },
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableProperties',
              'tableCellProperties',
            ],
          },
          mediaEmbed: {
            previewsInData: true,
          },
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
        .ckeditor-container .ck-content .image {
          max-width: 100%;
        }
        .ckeditor-container .ck-content .table {
          margin: 1em 0;
        }
        .ckeditor-container .ck-content .table table {
          border-collapse: collapse;
          width: 100%;
        }
        .ckeditor-container .ck-content .table table td,
        .ckeditor-container .ck-content .table table th {
          border: 1px solid hsl(var(--border));
          padding: 0.5em;
        }
      `}</style>
    </div>
  );
};
