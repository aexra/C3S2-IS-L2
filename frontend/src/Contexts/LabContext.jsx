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
    var objects = [];
    const nobj = 5;

    var rights = [];

    const getSubjectRights = (sub) => {
        return rights[subjects.indexOf(sub)].map((e, i) => [e, objects[i]]);
    };

    const setRight = (sub, obj, right, value = '1') => {
        if (subjects.includes(sub) && 0 <= obj && obj <= objects.length && (right === "read" || right === "write" || right === "grant")) {
            const id = subjects.indexOf(sub);
            switch (right) {
                case "read":
                    rights[id][obj].read = (value === '1' ? true : false);
                    break;
                case "write":
                    rights[id][obj].write = (value === '1' ? true : false);
                    break;
                default:
                    rights[id][obj].grant = (value === '1' ? true : false);
                    break;
            }

            return true;
        }
        return false;
    }

    const setFiles = (files) => {
        objects = files;

        rights = [];

        const getRandomBoolean = () => {
            return Math.random() > 0.5;
        }
    
        for (var s = 0; s < subjects.length; s++) {
            rights.push([]);
            for (var o = 0; o < nobj; o++) {
                rights[s].push(new Rights(
                    getRandomBoolean(),
                    getRandomBoolean(),
                    getRandomBoolean()
                ));
            }
        }

        for (var o = 0; o < nobj; o++) {
            rights[4][o] = new Rights(true, true, true);
        }

        console.log(rights);
    };

    const writeFile = (id, text) => {
        objects[id].content = text;
    };

    return (
        <LabContext.Provider value={{
            subjects,
            objects,
            getSubjectRights,
            setRight,
            setFiles,
            writeFile
        }}>
            {children}
        </LabContext.Provider>
    );
};