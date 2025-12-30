import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
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
  Font,
  Highlight,
  Code,
  CodeBlock,
  HorizontalLine,
  Indent,
  IndentBlock,
  RemoveFormat,
  SpecialCharacters,
  SpecialCharactersEssentials,
  FindAndReplace,
  SourceEditing,
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
            Subscript,
            Superscript,
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
            Font,
            Highlight,
            Code,
            CodeBlock,
            HorizontalLine,
            Indent,
            IndentBlock,
            RemoveFormat,
            SpecialCharacters,
            SpecialCharactersEssentials,
            FindAndReplace,
            SourceEditing,
          ],
          toolbar: {
            items: [
              'undo', 'redo',
              '|',
              'heading',
              '|',
              'bold', 'italic', 'underline', 'strikethrough',
              '|',
              'subscript', 'superscript',
              '|',
              'fontSize', 'fontFamily',
              '|',
              'fontColor', 'fontBackgroundColor', 'highlight',
              '-',
              'link', 'uploadImage', 'mediaEmbed', 'insertTable',
              '|',
              'blockQuote', 'codeBlock', 'code', 'horizontalLine',
              '|',
              'bulletedList', 'numberedList',
              '|',
              'outdent', 'indent', 'alignment',
              '-',
              'specialCharacters', 'findAndReplace',
              '|',
              'removeFormat', 'sourceEditing',
            ],
            shouldNotGroupWhenFull: true,
          },
          placeholder: placeholder || 'Nhập nội dung...',
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            ],
          },
          fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 24, 28, 32, 36],
            supportAllValues: true,
          },
          fontFamily: {
            options: [
              'default',
              'Arial, Helvetica, sans-serif',
              'Courier New, Courier, monospace',
              'Georgia, serif',
              'Lucida Sans Unicode, Lucida Grande, sans-serif',
              'Tahoma, Geneva, sans-serif',
              'Times New Roman, Times, serif',
              'Trebuchet MS, Helvetica, sans-serif',
              'Verdana, Geneva, sans-serif',
            ],
            supportAllValues: true,
          },
          fontColor: {
            colors: [
              { color: '#000000', label: 'Black' },
              { color: '#4D4D4D', label: 'Dim grey' },
              { color: '#999999', label: 'Grey' },
              { color: '#E6E6E6', label: 'Light grey' },
              { color: '#FFFFFF', label: 'White' },
              { color: '#E64C4C', label: 'Red' },
              { color: '#E6994C', label: 'Orange' },
              { color: '#E6E64C', label: 'Yellow' },
              { color: '#4CE64C', label: 'Light green' },
              { color: '#26BF26', label: 'Green' },
              { color: '#4CE6E6', label: 'Aquamarine' },
              { color: '#4C4CE6', label: 'Blue' },
              { color: '#994CE6', label: 'Purple' },
            ],
            columns: 5,
          },
          fontBackgroundColor: {
            colors: [
              { color: '#FFFF00', label: 'Yellow' },
              { color: '#00FF00', label: 'Green' },
              { color: '#00FFFF', label: 'Cyan' },
              { color: '#FF00FF', label: 'Magenta' },
              { color: '#FF0000', label: 'Red' },
              { color: '#0000FF', label: 'Blue' },
              { color: '#FFA500', label: 'Orange' },
              { color: '#800080', label: 'Purple' },
            ],
            columns: 4,
          },
          highlight: {
            options: [
              { model: 'yellowMarker', class: 'marker-yellow', title: 'Yellow marker', color: '#fdfd77', type: 'marker' },
              { model: 'greenMarker', class: 'marker-green', title: 'Green marker', color: '#62f962', type: 'marker' },
              { model: 'pinkMarker', class: 'marker-pink', title: 'Pink marker', color: '#fc7899', type: 'marker' },
              { model: 'blueMarker', class: 'marker-blue', title: 'Blue marker', color: '#72ccfd', type: 'marker' },
              { model: 'redPen', class: 'pen-red', title: 'Red pen', color: '#e91313', type: 'pen' },
              { model: 'greenPen', class: 'pen-green', title: 'Green pen', color: '#118800', type: 'pen' },
            ],
          },
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
          codeBlock: {
            languages: [
              { language: 'plaintext', label: 'Plain text' },
              { language: 'javascript', label: 'JavaScript' },
              { language: 'typescript', label: 'TypeScript' },
              { language: 'python', label: 'Python' },
              { language: 'html', label: 'HTML' },
              { language: 'css', label: 'CSS' },
              { language: 'json', label: 'JSON' },
              { language: 'sql', label: 'SQL' },
            ],
          },
          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
          },
        }}
      />
      <style>{`
        /* Base styles */
        .ckeditor-container .ck-editor__editable {
          min-height: 250px;
        }
        
        .ckeditor-container .ck.ck-editor__main > .ck-editor__editable {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
        }
        
        .ckeditor-container .ck.ck-toolbar {
          background: hsl(var(--muted));
          border-color: hsl(var(--border));
          flex-wrap: wrap;
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
        
        .ckeditor-container .ck-content pre {
          background: hsl(var(--muted));
          border-radius: 0.375rem;
          padding: 1em;
          overflow-x: auto;
        }
        
        .ckeditor-container .ck-content code {
          background: hsl(var(--muted));
          padding: 0.125em 0.25em;
          border-radius: 0.25rem;
          font-family: monospace;
        }

        /* Dark mode styles */
        .dark .ckeditor-container .ck.ck-editor__main > .ck-editor__editable {
          background: hsl(var(--card));
          color: hsl(var(--card-foreground));
        }
        
        .dark .ckeditor-container .ck.ck-toolbar {
          background: hsl(var(--secondary));
          border-color: hsl(var(--border));
        }
        
        .dark .ckeditor-container .ck.ck-toolbar .ck-button {
          color: hsl(var(--foreground));
        }
        
        .dark .ckeditor-container .ck.ck-toolbar .ck-button:hover {
          background: hsl(var(--accent));
        }
        
        .dark .ckeditor-container .ck.ck-toolbar .ck-button.ck-on {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }
        
        .dark .ckeditor-container .ck.ck-icon {
          color: inherit;
        }
        
        .dark .ckeditor-container .ck.ck-editor__editable.ck-focused {
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
        }
        
        .dark .ckeditor-container .ck.ck-list__item .ck-button:hover {
          background: hsl(var(--accent));
        }
        
        .dark .ckeditor-container .ck.ck-dropdown__panel {
          background: hsl(var(--popover));
          border-color: hsl(var(--border));
        }
        
        .dark .ckeditor-container .ck.ck-dropdown__panel .ck-list__item .ck-button {
          color: hsl(var(--popover-foreground));
        }
        
        .dark .ckeditor-container .ck.ck-input {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          border-color: hsl(var(--border));
        }
        
        .dark .ckeditor-container .ck.ck-labeled-field-view > .ck-labeled-field-view__input-wrapper > .ck-label {
          color: hsl(var(--muted-foreground));
        }
        
        .dark .ckeditor-container .ck.ck-balloon-panel {
          background: hsl(var(--popover));
          border-color: hsl(var(--border));
        }
        
        .dark .ckeditor-container .ck.ck-balloon-panel .ck-button {
          color: hsl(var(--popover-foreground));
        }
        
        .dark .ckeditor-container .ck.ck-toolbar__separator {
          background: hsl(var(--border));
        }
        
        .dark .ckeditor-container .ck-placeholder::before {
          color: hsl(var(--muted-foreground));
        }
        
        .dark .ckeditor-container .ck-content pre {
          background: hsl(var(--secondary));
        }
        
        .dark .ckeditor-container .ck-content code {
          background: hsl(var(--secondary));
        }
        
        .dark .ckeditor-container .ck.ck-color-grid__tile {
          border-color: hsl(var(--border));
        }
        
        .dark .ckeditor-container .ck.ck-color-picker {
          background: hsl(var(--popover));
        }
      `}</style>
    </div>
  );
};
