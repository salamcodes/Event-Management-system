import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from '../../config/firebaseConfig';
import {
    collection,
    addDoc,
    doc,
    setDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";


// Add Event
export const addEvent = createAsyncThunk(
    'events/add',
    async (eventData, { rejectWithValue }) => {
        try {
            const eventsRef = collection(db, "events");
            const docRef = await addDoc(eventsRef, {
                ...eventData,
                price: Number(eventData.price),
                capacity: Number(eventData.capacity),
                attendees: 0,
                ticketsValidated: 0,
                createdBy: auth.currentUser?.uid || null,
                status: eventData.status || 'upcoming',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });



            return {
                id: docRef.id,
                ...eventData,
                createdBy: auth.currentUser?.uid || null,
                status: eventData.status || 'upcoming',
                attendees: 0,
                ticketsValidated: 0,
            };

        } catch (error) {
            console.error('Error adding event:', error);
            return rejectWithValue({
                message: error.message || 'Failed to add event',
                code: error.code
            });
        }
    }
);

// Get All Events
export const fetchEvents = createAsyncThunk(
    'events/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const eventsRef = collection(db, "events");
            const querySnapshot = await getDocs(eventsRef);

            const events = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                events.push({
                    id: doc.id,
                    ...data,
                    price: Number(data.price),
                    capacity: Number(data.capacity),
                    attendees: Number(data.attendees),
                });
            });

            return events;

        } catch (error) {
            console.error('Error fetching events:', error);
            return rejectWithValue({
                message: error.message || 'Failed to fetch events',
                code: error.code
            });
        }
    }
);

// Get Single Event
export const fetchEventById = createAsyncThunk(
    'events/fetchById',
    async (eventId, { rejectWithValue }) => {
        try {
            const eventRef = doc(db, "events", eventId);
            const eventDoc = await getDoc(eventRef);

            if (!eventDoc.exists()) {
                return rejectWithValue({ message: 'Event not found' });
            }

            return {
                id: eventDoc.id,
                ...eventDoc.data()
            };

        } catch (error) {
            console.error('Error fetching event:', error);
            return rejectWithValue({
                message: error.message || 'Failed to fetch event',
                code: error.code
            });
        }
    }
);

// Update Event
export const updateEvent = createAsyncThunk(
    'events/update',
    async ({ eventId, eventData }, { rejectWithValue }) => {
        try {
            const eventRef = doc(db, "events", eventId);

            await updateDoc(eventRef, {
                ...eventData,
                updatedAt: serverTimestamp()
            });

            return {
                id: eventId,
                ...eventData,
                updatedAt: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error updating event:', error);
            return rejectWithValue({
                message: error.message || 'Failed to update event',
                code: error.code
            });
        }
    }
);

// Delete Event
export const deleteEvent = createAsyncThunk(
    'events/delete',
    async (eventId, { rejectWithValue }) => {
        try {
            const eventRef = doc(db, "events", eventId);
            await deleteDoc(eventRef);

            return eventId;

        } catch (error) {
            console.error('Error deleting event:', error);
            return rejectWithValue({
                message: error.message || 'Failed to delete event',
                code: error.code
            });
        }
    }
);



const initialState = {
    events: [],
    currentEvent: null,
    loading: 'idle',
    error: null,
    success: false
};


const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        setCurrentEvent: (state, action) => {
            state.currentEvent = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Add Event
            .addCase(addEvent.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
                state.success = false;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.events.push(action.payload);
                state.success = true;
                state.error = null;
            })
            .addCase(addEvent.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || { message: 'Failed to add event' };
                state.success = false;
            })

            // Fetch All Events
            .addCase(fetchEvents.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.events = action.payload;
                state.error = null;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || { message: 'Failed to fetch events' };
            })

            // Fetch Event By ID
            .addCase(fetchEventById.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.currentEvent = action.payload;
                state.error = null;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || { message: 'Failed to fetch event' };
            })

            // Update Event
            .addCase(updateEvent.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
                state.success = false;
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.success = true;
                state.error = null;
                // Update in events array
                const index = state.events.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.events[index] = { ...state.events[index], ...action.payload };
                }
                // Update current event if it's the same
                if (state.currentEvent?.id === action.payload.id) {
                    state.currentEvent = { ...state.currentEvent, ...action.payload };
                }
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || { message: 'Failed to update event' };
                state.success = false;
            })

            // Delete Event
            .addCase(deleteEvent.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
                state.success = false;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.success = true;
                state.error = null;

                state.events = state.events.filter(e => e.id !== action.payload);

                // Clear current event if it was deleted
                if (state.currentEvent?.id === action.payload) {
                    state.currentEvent = null;
                }
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || { message: 'Failed to delete event' };
                state.success = false;
            });
    }
});


export const { clearError, clearSuccess, setCurrentEvent } = eventSlice.actions;

// Selectors
export const selectEvents = (state) => state.events.events;
export const selectCurrentEvent = (state) => state.events.currentEvent;
export const selectEventsLoading = (state) => state.events.loading;
export const selectEventsError = (state) => state.events.error;
export const selectEventsSuccess = (state) => state.events.success;

// Reducer
export default eventSlice.reducer;