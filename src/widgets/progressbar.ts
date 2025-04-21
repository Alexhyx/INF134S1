import { Widget, Window, RoleType, IdleUpWidgetState } from "../core/ui";
import { Rect, Text } from "@svgdotjs/svg.js";

class ProgressBar extends Widget {
    private _background: Rect;
    private _fill: Rect;
    private _label: Text;
    private _value: number = 0; // 0–100
    private _barWidth: number = 200;
    private _incrementStep: number = 10;

    private _onIncrement: (value: number) => void = () => {};
    private _onStateChange: () => void = () => {};

    constructor(parent: Window, width: number = 200) {
        super(parent);
        this._barWidth = width;
        this.width = width;
        this.height = 30;
        this.role = RoleType.group;

        this.render();
        this.setState(new IdleUpWidgetState());
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        this._background = this._group.rect(this._barWidth, 20).fill("#ccc").stroke("black").move(0, 0);
        this._fill = this._group.rect(0, 20).fill("#76c7c0").move(0, 0);
        this._label = this._group.text(`${this._value}%`).font({ size: 14 }).move(this._barWidth + 10, 2);

        this.registerEvent(this._group);
    }

    increment(val: number): void {
        const newValue = Math.min(100, this._value + val);
        this._value = newValue;

        const fillWidth = (this._barWidth * this._value) / 100;
        this._fill.width(fillWidth);
        this._label.text(`${this._value}%`);

        this._onIncrement(this._value);
        this._onStateChange();
    }

    setWidth(width: number): void {
        this._barWidth = width;
        this.render();
    }

    setIncrementValue(val: number): void {
        this._incrementStep = val;
    }

    getIncrementValue(): number {
        return this._incrementStep;
    }

    onIncrement(handler: (value: number) => void) {
        this._onIncrement = handler;
    }

    onStateChange(handler: () => void) {
        this._onStateChange = handler;
    }

    // Required visual states
    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export { ProgressBar };
