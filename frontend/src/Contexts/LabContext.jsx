import { createContext } from "react";

export class Rights {
    read = false;
    write = false;
    grant = false;

    constructor(r, w, g) {
        this.read = r;
        this.write = w;
        this.grant = g;
    }
}

export const LabContext = createContext();

export const LabProvider = ({ children }) => {
    const subjects = ["Олег", "Ваня", "Антон", "Abobabebebe", "Igor"];
    const objects = ["Object 1", "Object 2", "Object 3", "Object 4", "Object 5"];

    const rights = [];

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

    const getSubjectRights = (sub) => {
        return rights[subjects.indexOf(sub)].map((e, i) => [e, objects[i]]);
    };

    return (
        <LabContext.Provider value={{
            subjects,
            objects,
            getSubjectRights
        }}>
            {children}
        </LabContext.Provider>
    );
};