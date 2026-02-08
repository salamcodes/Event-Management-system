import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { setUser, LogOut } from '../redux/reducers/authSlice'

function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        dispatch(setUser({
                            uid: user.uid,
                            email: user.email,
                            name: userData.name,
                            role: userData.role
                        }));
                    } else {
                        dispatch(LogOut());
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    dispatch(LogOut());
                }
            } else {
                dispatch(LogOut());
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [dispatch]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
            }}>
                <div className="spinner" style={{
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{ marginTop: '20px' }}>Loading...</p>
            </div>
        );
    }

    return children;
}

export default AuthProvider;