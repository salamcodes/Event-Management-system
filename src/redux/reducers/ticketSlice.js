import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../../config/firebaseConfig";
import { collection, doc, setDoc, getDocs, query, where, updateDoc, increment } from "firebase/firestore";


export const addTicket = createAsyncThunk(
    "tickets/addTicket",
    async ({ eventId, name, email, phone, quantity }, { rejectWithValue }) => {
        try {
            if (!auth.currentUser) throw new Error("User must be logged in");

            const ticketId = `${eventId}_${auth.currentUser.uid}`;
            const ticketRef = doc(db, "tickets", ticketId);

            await setDoc(ticketRef, {
                eventId,
                userId: auth.currentUser.uid,
                name,
                email,
                phone,
                quantity,
                createdAt: new Date().toISOString(),
            });

            // Increment attendee count
            const eventRef = doc(db, "events", eventId);
            await updateDoc(eventRef, { attendees: increment(quantity) });

            return { eventId, ticketId, name, email, phone, userId: auth.currentUser.uid };
        } catch (err) {
            console.error(err);
            return rejectWithValue(err.message || "Failed to book ticket");
        }
    }
);

// user tickets
export const fetchUserTickets = createAsyncThunk(
    "tickets/fetchUserTickets",
    async (_, { rejectWithValue }) => {
        try {
            if (!auth.currentUser) throw new Error("User must be logged in");

            const ticketsRef = collection(db, "tickets");
            const q = query(ticketsRef, where("userId", "==", auth.currentUser.uid));
            const snapshot = await getDocs(q);

            const tickets = [];
            snapshot.forEach((doc) => tickets.push({ id: doc.id, ...doc.data() }));

            return tickets;
        } catch (err) {
            console.error(err);
            return rejectWithValue(err.message || "Failed to fetch tickets");
        }
    }
);

// event tickets
export const fetchEventTickets = createAsyncThunk(
    "tickets/fetchEventTickets",
    async (eventId, { rejectWithValue }) => {
        try {
            const ticketsRef = collection(db, "tickets");
            const q = query(ticketsRef, where("eventId", "==", eventId));
            const snapshot = await getDocs(q);

            const tickets = [];
            snapshot.forEach((doc) => tickets.push({ id: doc.id, ...doc.data() }));

            return tickets;
        } catch (err) {
            console.error(err);
            return rejectWithValue(err.message || "Failed to fetch event tickets");
        }
    }
);


const initialState = {
    tickets: [],
    loading: "idle",
    error: null,
    success: false,
};

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        clearTicketsError: (state) => { state.error = null; },
        clearTicketsSuccess: (state) => { state.success = false; },
        clearTickets: (state) => { state.tickets = []; }
    },
    extraReducers: (builder) => {
        builder

            .addCase(addTicket.pending, (state) => {
                state.loading = "loading";
                state.error = null;
                state.success = false;
            })
            .addCase(addTicket.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.tickets.push(action.payload);
                state.success = true;
            })
            .addCase(addTicket.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
                state.success = false;
            })


            .addCase(fetchUserTickets.pending, (state) => {
                state.loading = "loading";
                state.error = null;
            })
            .addCase(fetchUserTickets.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.tickets = action.payload;
            })
            .addCase(fetchUserTickets.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            })


            .addCase(fetchEventTickets.pending, (state) => {
                state.loading = "loading";
                state.error = null;
            })
            .addCase(fetchEventTickets.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.tickets = action.payload;
            })
            .addCase(fetchEventTickets.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});


export const { clearTicketsError, clearTicketsSuccess, clearTickets } = ticketSlice.actions;

export const selectTickets = (state) => state.tickets.tickets;
export const selectTicketsLoading = (state) => state.tickets.loading;
export const selectTicketsError = (state) => state.tickets.error;
export const selectTicketsSuccess = (state) => state.tickets.success;

export default ticketSlice.reducer;
