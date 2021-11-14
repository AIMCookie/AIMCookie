import P5 from 'p5';

// Your code:


class p5 {
    constructor() {
        this.play = false;
        this.left = 0;
        this.top = 0;
        this.loading = false;
        this.notes = [];
    }

    initVars() {
        this.play = false;
        this.left = 0;
        this.top = 0;
        this.loading = false;
        this.notes = [];
    }

    createP5(parentId, w, h, backgroundColor) {
        const sketch = p => {
            // var rectWidth = 150;
            // var rectHeight = 160;

            // var MIDI_START_NOTE = 21; //lowest piano midi note
            p.setup = () => {
                p.createCanvas(w, h);
            }
            p.draw = () => {
                p.background(backgroundColor);
                var width = p.windowWidth - this.left;
                var height = p.windowHeight;

                if (this.loading) {
                    p.textSize(32);
                    p.fill(255, 255, 255);
                    p.text('로딩...🎈', width / 2 - 5, height / 2 - 15);
                } else if (this.play) {
                    p.fill(255, 255, 255);

                    // p.rect(width * 0.05, height * 0.9 * 0.5 - rectHeight * 0.5, rectWidth, rectHeight, 20);

                    // p.rect(width * 0.78, height * 0.9 * 0.15 - rectHeight * 0.5, rectWidth, rectHeight, 20);
                    // p.rect(width * 0.78, height * 0.9 * 0.35 - rectHeight * 0.5, rectWidth, rectHeight, 20);
                    // p.rect(width * 0.78, height * 0.9 * 0.55 - rectHeight * 0.5, rectWidth, rectHeight, 20);
                    // p.rect(width * 0.78, height * 0.9 * 0.75 - rectHeight * 0.5, rectWidth, rectHeight, 20);
                    // drawNotes(this.notes, 150, 150, 500, 500);
                }
            }

            // function drawNotes(notes, x, y, width, height) {
            //     p.push();
            //     p.translate(x, y);
            //     var cellWidth = width / numSteps;
            //     var cellHeight = height / numNotes;
            //     var START_COLOR = p.color(60, 180, 203);
            //     var END_COLOR = p.color(233, 72, 88);
            //     var i = 0;
            //     var currColor = p.lerpColor(START_COLOR, END_COLOR, i / 2);
            //     //use currColor but at 50% opacity
            //     p.fill(p.red(currColor), p.green(currColor), p.blue(currColor), 125);
            //     notes.forEach(function (note) {
            //         var emptyNoteSpacer = 1;
            //         p.rect(emptyNoteSpacer + cellWidth * note.quantizedStartStep, height - cellHeight * (note.pitch - MIDI_START_NOTE),
            //             cellWidth * (note.quantizedEndStep - note.quantizedStartStep) - emptyNoteSpacer, cellHeight);
            //         i++;
            //     });
            //     p.pop();
            // }
        }
        return new P5(sketch, parentId);
    }

    setPlay(play) {
        this.play = play;
    }
    setLeftTop(left, top) {
        this.left = left;
        this.top = top;
    }
    setLoading(loading) {
        this.loading = loading;
    }
    pushNote(note) {
        this.notes.push({
            note: note.notes,
            numSteps: note.totalQuantizedSteps,
            numNotes: note.length
        });
    }
}

export default p5;