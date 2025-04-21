import { Widget, Window, RoleType, IdleUpWidgetState } from "../core/ui";
import { Rect, Text } from "@svgdotjs/svg.js";

class ScrollBar extends Widget {
    private _track: Rect;
    private _thumb: Rect;
    private _upBtn: Rect;
    private _downBtn: Rect;
    private _height: number = 100;
    private _thumbY: number = 0;
    private _onScroll: (direction: 'up' | 'down') => void = () => {};
    private _onPositionChanged: (position: number) => void = () => {};

    constructor(parent: Window, height: number = 100) {
        super(parent);
        this.height = height;
        this.width = 20;
        this.role = RoleType.scrollbar;

        this.render();
        this.setState(new IdleUpWidgetState());
    }

    render(): void {
        const btnHeight = 20;
        const thumbHeight = 20;
        const trackHeight = this.height - 2 * btnHeight;

        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        // Up button
        this._upBtn = this._group.rect(20, btnHeight).fill("lightgray").stroke("black").move(0, 0);
        this._group.text("▲").font({ size: 10 }).move(6, 2);

        // Down button
        this._downBtn = this._group.rect(20, btnHeight).fill("lightgray").stroke("black").move(0, this.height - btnHeight);
        this._group.text("▼").font({ size: 10 }).move(6, this.height - btnHeight + 2);

        // Track
        this._track = this._group.rect(20, trackHeight).fill("#ddd").move(0, btnHeight);

        // Thumb
        this._thumb = this._group.rect(20, thumbHeight).fill("#888").move(0, btnHeight);

        this.registerEvent(this._upBtn);
        this.registerEvent(this._downBtn);
        this.registerEvent(this._track);
        this.registerEvent(this._thumb);
    }

    moveThumb(direction: 'up' | 'down') {
        let newY = Number(this._thumb.y());
        const btnHeight = 20;
        const thumbHeight = 20;
        const trackTop = btnHeight;
        const trackBottom = this.height - 2 * btnHeight;

        if (direction === 'up') {
            newY = Math.max(trackTop, newY - 10);
        } else {
            newY = Math.min(trackTop + trackBottom - thumbHeight, newY + 10);
        }

        this._thumb.move(0, newY);
        this._thumbY = newY;
        this._onScroll(direction);
        this._onPositionChanged(this._thumbY);
    }

    jumpThumb(y: number) {
        const btnHeight = 20;
        const thumbHeight = 20;
        const newY = Math.max(btnHeight, Math.min(this.height - btnHeight - thumbHeight, y));
        this._thumb.move(0, newY);
        this._thumbY = newY;
        this._onPositionChanged(this._thumbY);
    }

    getThumbPosition(): number {
        return this._thumbY;
    }

    setHeight(h: number): void {
        this.height = h;
        this.render(); // re-render with updated height
    }

    onScroll(handler: (direction: 'up' | 'down') => void) {
        this._onScroll = handler;
    }

    onPositionChanged(handler: (position: number) => void) {
        this._onPositionChanged = handler;
    }

    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {
        const target = this.rawEvent?.target;
        if (target === this._upBtn.node) {
            this.moveThumb('up');
        } else if (target === this._downBtn.node) {
            this.moveThumb('down');
        } else if (target === this._track.node) {
            const y = this.rawEvent.offsetY;
            this.jumpThumb(y);
        }
    }
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export { ScrollBar };
