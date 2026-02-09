export const signUp = createAsyncThunk(
    'auth/signUp',
    async (userData, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                role: 'user',
                name: userData.name,
                email: userData.email
            });

            return {
                uid: user.uid,
                email: user.email,
                name: userData.name,  
                role: 'user'          
            };

        } catch (error) {
            let errorMessage = "Sign up failed";

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Email already in use";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password is too weak";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address";
            }

            return rejectWithValue({ message: errorMessage, code: error.code });
        }
    }
);