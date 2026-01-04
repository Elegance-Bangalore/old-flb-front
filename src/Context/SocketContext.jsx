import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { selectUser } from "@/Redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const authUser = useSelector(selectUser)
    const apiurl = import.meta.env.VITE_BASE_API_URL;

    useEffect(() => {
        if (authUser) {
            const socket = io(apiurl, {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};