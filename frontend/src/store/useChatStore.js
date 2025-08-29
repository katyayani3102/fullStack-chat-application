import { create } from "zustand"
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create( (set,get)=>({
    messages: [],
    users: [],
    isSelectedUser: null,
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
    
    getUsers: async ()=>{
        set({isUserLoading: true});

        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data})
        } catch (error) {
            console.log("Error in the getUser store : ", error);
            toast.error(error.response.data.messages)
        } finally {
            set({isUserLoading: false})
        }
    },

    getMessages: async (userId)=>{
        set({isMessageLoading: true});

        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data})
        } catch (error) {
            console.log("Error in the getMessages store : ", error);
            toast.error(error.response.data.messages)
        } finally {
            set({isMessageLoading: false})
        }
    },
    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]})
        } catch (error) {
            console.log("Error in send Message store : ", error)
            toast.error(error.response.data.message)
        }
    }, 
    subscribeToMessages: () => {
        const {selectedUser} = get();
        if(!selectedUser) return ;
        
        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSendFromSelectedUser = newMessage.senderId === selectedUser._id ;

            if(!isMessageSendFromSelectedUser) return ;

            set({...get().messages, newMessage});
        });
    },
    unsubscribeFromMessages: ()=>{
        const socket = useAuthStore.getState().socket;

        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser)=> set({selectedUser}),


}
))