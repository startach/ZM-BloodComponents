export const makeSignUp = (dbSignUp) => {
    return async (email, password) => {
        try {
            await dbSignUp(email, password);
        } catch (e) {
            throw Error(e.message);
        }
    };
};

export const makeSignIn = (dbSignIn) => {
    return async (email, password) => {
        try {
            await dbSignIn(email, password);
        } catch (e) {
            throw Error(e.message);
        }
    };
};

export const makeSignOut = (dbSignOut) => {
    return async () => {
        try {
            await dbSignOut();
        } catch (e) {
            throw Error(e.message);
        }
    };
};
