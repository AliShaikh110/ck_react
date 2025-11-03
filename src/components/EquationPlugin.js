// src/EquationPlugin.js
import { Plugin, ButtonView } from 'ckeditor5';

export default class EquationPlugin extends Plugin {
    init() {
        const editor = this.editor;

        // --- Inline button
        editor.ui.componentFactory.add('insertInlineEquation', (locale) => {
            const button = new ButtonView(locale);
            button.set({
                label: 'Insert Inline Equation',
                withText: true,
                tooltip: true,
            });
            button.on('execute', () => {
                editor.fire('openEqEditor', { displayMode: false });
            });
            return button;
        });

        // --- Block button
        editor.ui.componentFactory.add('insertBlockEquation', (locale) => {
            const button = new ButtonView(locale);
            button.set({
                label: 'Insert Block Equation',
                withText: true,
                tooltip: true,
            });
            button.on('execute', () => {
                editor.fire('openEqEditor', { displayMode: true });
            });
            return button;
        });
    }
}
