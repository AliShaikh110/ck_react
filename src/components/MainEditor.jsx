// src/MainEditor.jsx
import React, { useState, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    GeneralHtmlSupport,
} from 'ckeditor5';
import { TimestampPlugin } from './TimeStampClass';
import EquationPlugin from './EquationPlugin';
import KaTeXRenderPlugin from './KaTeXRenderPlugin';
import EqEditorModal from './EqEditorModal';
import 'ckeditor5/ckeditor5.css';

function MainEditor() {
    const [modalOpen, setModalOpen] = useState(false);
    const [editorInstance, setEditorInstance] = useState(null);

    const handleInsertEquation = useCallback(
        (latexString) => {
            if (!editorInstance) return;
            editorInstance.model.change((writer) => {
                const position =
                    editorInstance.model.document.selection.getFirstPosition();
                const element = writer.createElement('mathBlock', {
                    latex: latexString,
                });
                editorInstance.model.insertContent(element, position);
            });
        },
        [editorInstance]
    );

    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjI1NTk5OTksImp0aSI6ImZlN2YxMzM5LTM2N2ItNDE3Mi1hOTZiLTIxYjAxMjI3NTVkYSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjU0ODI1ODE3In0.dRCuyIItJf7AXo0Lwn5-vUYEQ6uAVsjsq7R-ckvelj3xyjsMjgXjvSHsB1Rdrt46SPCjvrwd9lsZqtzfATkfGg',
                    plugins: [
                        Essentials,
                        Paragraph,
                        Bold,
                        Italic,
                        TimestampPlugin,
                        EquationPlugin,
                        GeneralHtmlSupport,
                        KaTeXRenderPlugin, // ✅ Math renderer
                    ],
                    toolbar: [
                        'undo',
                        'redo',
                        '|',
                        'bold',
                        'italic',
                        'timestamp',
                        'insertEquation',
                    ],
                    htmlSupport: {
                        allow: [
                            {
                                name: /.*/,
                                attributes: true,
                                classes: true,
                                styles: true,
                            },
                        ],
                    },
                    data: '<p>Hello from CKEditor 5 in React!</p>',
                }}
                onReady={(editor) => {
                    setEditorInstance(editor);
                    editor.on('openEqEditor', () => setModalOpen(true));
                }}
            />
            <EqEditorModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onInsert={handleInsertEquation}
            />
        </>
    );
}

export default MainEditor;
