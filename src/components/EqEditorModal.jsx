// EqEditorModal.jsx
import React, { useEffect, useRef } from 'react';

function EqEditorModal({ isOpen, onClose, onInsert, initialLatex = '', isEditing = false }) {
  const textareaRef = useRef(null);
  const outputRef = useRef(null);
  const toolbarRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !window.EqEditor) return;

    // 1) Initialize once per open
    const textarea = window.EqEditor.TextArea.link('latexInput');
    const output = window.EqEditor.Output.link('output', 'url'); // or omit 'url' to use default
    const toolbar = window.EqEditor.Toolbar.link('toolbar');

    textarea.addOutput(output).addHistoryMenu(new window.EqEditor.History('history'));
    toolbar.addTextArea(textarea);

    textareaRef.current = textarea;
    outputRef.current = output;
    toolbarRef.current = toolbar;

    // 2) If editing, load the LaTeX via API that exists: clear + insert
    if (initialLatex) {
      textarea.clear();                  // wipe CC spans safely
      textarea.insert(initialLatex);     // put raw LaTeX; EqEditor builds its structured DOM
      // Either of these will refresh the preview:
      // textarea.notifyOutputs();
      output.updateOutput();
    }

    // Cleanup when modal unmounts/closes (optional)
    return () => {
      // If you dynamically add/remove, you could also call textarea.close()
      // to clean extra DOM created by EqEditor.
      // textareaRef.current?.close?.();
      textareaRef.current = null;
      outputRef.current = null;
      toolbarRef.current = null;
    };
  }, [isOpen, initialLatex]);

  if (!isOpen) return null;

  const handleInsert = () => {
    const latex =
      textareaRef.current?.getTextArea()?.textContent?.trim() || ''; // <- supported way to read LaTeX
    if (latex) onInsert(latex);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 20,
          width: 600,
          maxHeight: '80vh',
          overflowY: 'auto',
          borderRadius: 8
        }}
      >
        <h3 style={{ marginTop: 0 }}>{isEditing ? 'Edit Equation' : 'Insert Equation'}</h3>
        <div id="equation-editor">
          <div id="history"></div>
          <div id="toolbar"></div>
          <div
            id="latexInput"
            contentEditable
            style={{
              border: '1px solid #ccc',
              minHeight: '100px',
              padding: 10,
              marginTop: 10,
              backgroundColor: '#f9f9f9',
              whiteSpace: 'pre-wrap',
              overflow: 'auto',
              resize: 'vertical'
            }}
            placeholder="Write Equation here..."
            spellCheck={false}
            autoComplete="off"
            tabIndex={0}
          />
          <div id="equation-output" style={{ marginTop: 10 }}>
            <img id="output" alt="Equation output" />
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button
            onClick={handleInsert}
            style={{
              marginRight: 10,
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {isEditing ? 'Update' : 'Insert'}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EqEditorModal;
