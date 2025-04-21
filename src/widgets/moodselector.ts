import { Widget, Window, RoleType, IdleUpWidgetState } from "../core/ui";
import { Circle, Text } from "@svgdotjs/svg.js";

class MoodSelector extends Widget {
    private _face: Circle;
    private _eyes: Text;
    private _mouth: Text;
    private _label: Text;
    private _moods = ["Happy", "Neutral", "Sad"];
    private _faces: Record<string, { eyes: string; mouth: string }> = {
        Happy: { eyes: "^ ^", mouth: " U " },
        Neutral: { eyes: "o o", mouth: " - " },
        Sad: { eyes: "- -", mouth: " n " }
    };
    private _currentMoodIndex = 0;
    private _onChange: (mood: string) => void = () => {};

    constructor(parent: Window) {
        super(parent);
        this.width = 80;
        this.height = 80;
        this.role = RoleType.group;

        this.render();
        this.setState(new IdleUpWidgetState());
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        // Circle face
        this._face = this._group.circle(60).fill("#fce38a").stroke("black").move(0, 0);

        // Eyes and mouth
        this._eyes = this._group.text("").font({ size: 10 }).move(15, 15);
        this._mouth = this._group.text("").font({ size: 12 }).move(22, 35);

        // Label
        this._label = this._group.text("").font({ size: 12 }).move(10, 65);

        this.updateFace();
        this.registerEvent(this._group);
    }

    private updateFace() {
        const mood = this._moods[this._currentMoodIndex];
        const face = this._faces[mood];

        this._eyes.text(face.eyes);
        this._mouth.text(face.mouth);
        this._label.text(mood);

        this._onChange(mood);
    }

    cycleMood() {
        this._currentMoodIndex = (this._currentMoodIndex + 1) % this._moods.length;
        this.updateFace();
    }

    onChange(handler: (mood: string) => void) {
        this._onChange = handler;
    }

    // Required visual states
    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {
        this.cycleMood();
    }
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export { MoodSelector };
