// src/plugins/KaTeXRenderPlugin.js
import { Plugin, Widget, toWidget } from 'ckeditor5';
// import { Widget, toWidget } from 'ckeditor5/src/widget';
import { renderLatexWithKatex } from './renderLatexWithKatex';

export default class KaTeXRenderPlugin extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
        const editor = this.editor;

        // --- 1. Define a math model element
        editor.model.schema.register('mathBlock', {
            allowWhere: '$block',
            isObject: true,
            allowAttributes: ['latex'],
        });

        // --- 2. Downcast (model → editing view)
        editor.conversion.for('editingDowncast').elementToElement({
            model: 'mathBlock',
            view: (modelItem, { writer }) => {
                const latex = modelItem.getAttribute('latex') || '';
                const html = renderLatexWithKatex(latex);

                const container = writer.createContainerElement('div', {
                    class: 'math-block',
                });

                const raw = writer.createRawElement(
                    'span',
                    { class: 'katex-render' },
                    (dom) => {
                        dom.innerHTML = html;
                    }
                );

                writer.insert(writer.createPositionAt(container, 0), raw);
                return toWidget(container, writer, { label: 'Math block' });
            },
        });

        // --- 3. Downcast for data (model → saved HTML)
        editor.conversion.for('dataDowncast').elementToElement({
            model: 'mathBlock',
            view: (modelItem, { writer }) => {
                const latex = modelItem.getAttribute('latex') || '';
                return writer.createContainerElement('div', {
                    class: 'math-block',
                    'data-latex': latex,
                });
            },
        });

        // --- 4. Upcast (HTML → model)
        editor.conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                classes: 'math-block',
            },
            model: (viewElement, { writer }) => {
                const latex = viewElement.getAttribute('data-latex');
                return writer.createElement('mathBlock', { latex });
            },
        });
    }
}
