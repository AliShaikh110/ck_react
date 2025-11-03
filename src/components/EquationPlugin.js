// src/EquationPlugin.js
import { Plugin, ButtonView } from 'ckeditor5';

export default class EquationPlugin extends Plugin {
    init() {
        const editor = this.editor;

        // --- Single "Insert Equation" Button ---
        editor.ui.componentFactory.add('insertEquation', (locale) => {
            const button = new ButtonView(locale);
            button.set({
                label: 'Insert Equation',
                withText: true,
                tooltip: true,
            });

            // When clicked → open modal (default: inline mode)
            button.on('execute', () => {
                editor.fire('openEqEditor', { displayMode: false });
            });

            return button;
        });
    }
}
