export class Rights {
    public read: boolean = false;
    public write: boolean = false;
    public grant: boolean = false;

    public constructor(r: boolean, w: boolean, g: boolean) {
        this.read = r;
        this.write = w;
        this.grant = g;
    }
}

export const useLab = () => {
    const subjects = ["Олег", "Ваня", "Антон", "Abobabebebe", "Igor"];
    const objects = ["Object 1", "Object 2", "Object 3", "Object 4", "Object 5"];

    const rights: Rights[][] = [];

    const getRandomBoolean = () => {
        return Math.random() > 0.5;
    }

    for (var s = 0; s < subjects.length; s++) {
        rights.push([]);
        for (var o = 0; o < objects.length; o++) {
            rights[s].push(new Rights(
                getRandomBoolean(),
                getRandomBoolean(),
                getRandomBoolean()
            ));
        }
    }
    for (var o = 0; o < objects.length; o++) {
        rights[4][o] = new Rights(true, true, true);
    }
};