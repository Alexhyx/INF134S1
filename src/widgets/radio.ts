import { Widget, Window, RoleType, EventArgs, IdleUpWidgetState } from "../core/ui";
import { Rect, Text } from "@svgdotjs/svg.js";

class RadioButton extends Widget {
    private _circle: Rect;
    private _dot: Rect;
    private _label: Text;
    private _labelText: string = "";
    private _isSelected: boolean = false;
    private _index: number;
    private _onSelect: (index: number) => void = () => {};

    constructor(parent: Window, index: number, label: string) {
        super(parent);
        this._index = index;
        this._labelText = label;
        this.width = 120;
        this.height = 20;
        this.role = RoleType.button;

        this.render();
        this.setState(new IdleUpWidgetState());
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        // Outer circle
        this._circle = this._group.rect(16, 16).radius(8).fill("white").stroke("black").move(0, 2);

        // Inner dot (selected indicator)
        this._dot = this._group.rect(8, 8).radius(4).fill("black").move(4, 6).hide();

        // Label
        this._label = this._group.text(this._labelText).font({ size: 14 }).move(22, 1);

        this.registerEvent(this._group);
    }

    select() {
        this._isSelected = true;
        this._dot.show();
    }

    deselect() {
        this._isSelected = false;
        this._dot.hide();
    }

    onSelect(handler: (index: number) => void) {
        this._onSelect = handler;
    }

    // Widget state handlers
    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {
        this._onSelect(this._index);
    }
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

class RadioButtonGroup {
    private _buttons: RadioButton[] = [];

    constructor(parent: Window, labels: string[], startX: number, startY: number) {
        labels.forEach((label, i) => {
            const btn = new RadioButton(parent, i, label);
            btn.move(startX, startY + i * 30);
            btn.onSelect((index) => this.handleSelection(index));
            this._buttons.push(btn);
        });
    }

    private handleSelection(selectedIndex: number) {
        this._buttons.forEach((btn, i) => {
            if (i === selectedIndex) {
                btn.select();
                console.log("Radio selected:", i);
            } else {
                btn.deselect();
            }
        });
    }
}

export { RadioButton, RadioButtonGroup };
