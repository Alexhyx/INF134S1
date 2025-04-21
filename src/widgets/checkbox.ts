import { Widget, Window, RoleType, EventArgs, IdleUpWidgetState } from "../core/ui";
import { Rect, Text } from "@svgdotjs/svg.js";

class CheckBox extends Widget {
    private _box: Rect;
    private _checkMark: Text;
    private _label: Text;
    private _labelText: string = "Check me!";
    private _isChecked: boolean = false;
    private _onChange: (checked: boolean) => void = () => {};

    constructor(parent: Window, label: string = "Check me!") {
        super(parent);
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

        // checkbox square
        this._box = this._group.rect(16, 16).fill("white").stroke("black").move(0, 2);
        
        // check mark (initially hidden)
        this._checkMark = this._group.text("✔").font({ size: 12 }).move(2, 1).hide();

        // label to the right
        this._label = this._group.text(this._labelText).font({ size: 14 }).move(22, 1);

        // register events
        this.registerEvent(this._group);
    }

    private toggle() {
        this._isChecked = !this._isChecked;
        if (this._isChecked) {
            this._checkMark.show();
        } else {
            this._checkMark.hide();
        }
        this._onChange(this._isChecked);
    }

    onChange(handler: (checked: boolean) => void) {
        this._onChange = handler;
    }

    // Required visual state overrides (can customize as needed)
    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {
        this.toggle();
    }
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export { CheckBox };
