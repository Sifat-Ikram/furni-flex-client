import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useCart = () => {
    const {user} = useContext(AuthContext);
   const axiosPublic = useAxiosPublic();

    const { data: cart = [], refetch: cartRefetch } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/cart?email=${user.email}`);
            return res.data;
        }

    })
    return [cart, cartRefetch];
};

export default useCart;