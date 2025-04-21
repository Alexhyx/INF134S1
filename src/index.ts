import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import {CheckBox} from "./widgets/checkbox"
import { RadioButtonGroup } from "./widgets/radio";
import { ScrollBar } from "./widgets/scrollbar";
import { ProgressBar } from "./widgets/progressbar";
import { MoodSelector } from "./widgets/moodselector";





let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14
btn.move(12, 50)

btn.onClick(() => {
    lbl1.text = "Button was clicked!";
});

// This is for the check box
let cb = new CheckBox(w, "I agree");
cb.move(10, 100);
cb.onChange((checked) => {
    console.log("Checkbox is now", checked);
});

// Radio
let radio = new RadioButtonGroup(w, ["Option A", "Option B", "Option C"], 10, 140);

// Scroll Bar
let sb = new ScrollBar(w, 120);
sb.move(160, 50);

sb.onScroll((dir) => console.log("Scrolled:", dir));
sb.onPositionChanged((pos) => console.log("Thumb position:", pos));

// progreebar
let pb = new ProgressBar(w, 150);
pb.move(10, 270);

pb.setIncrementValue(25); // Each increment adds 25

// Simulate external call (e.g., click or event)
setInterval(() => {
    pb.increment(pb.getIncrementValue());
}, 1000);

pb.onIncrement((val) => console.log("Progress now at", val));
pb.onStateChange(() => console.log("ProgressBar updated"));

// custom
let mood = new MoodSelector(w);
mood.move(200, 270);

mood.onChange((m) => console.log("Mood is now:", m));