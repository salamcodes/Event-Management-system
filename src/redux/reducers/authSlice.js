import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

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

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            // Sign in user
            const userCredential = await signInWithEmailAndPassword(
                auth,
                credentials.email,
                credentials.password
            );

            const user = userCredential.user;


            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();


                return {
                    uid: user.uid,
                    email: user.email,
                    name: userData.name,
                    role: userData.role,

                };
            } else {

                return {
                    uid: user.uid,
                    email: user.email,

                };
            }

        } catch (error) {

            let errorMessage = "Login failed";

            if (error.code === 'auth/user-not-found') {
                errorMessage = "No user found with this email";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "Incorrect password";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address";
            } else if (error.code === 'auth/user-disabled') {
                errorMessage = "This account has been disabled";
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = "Invalid credentials";
            }

            return rejectWithValue({ message: errorMessage, code: error.code });
        }
    }
);

const initialState = {
    user: null,
    status: 'idle',
    error: null,
    isAuthenticated: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
                state.isAuthenticated = true
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || { message: 'Error Occured' }
            })
            // login
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || { message: "An error occurred" };
                state.isAuthenticated = false;
            });
    }


})

export const { logOut, setUser } = authSlice.actions;
export default authSlice.reducer;