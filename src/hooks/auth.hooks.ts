import { userLogin } from "@/api/auth.api";
import apiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

export function useLogin(){
     return useMutation({
        mutationFn: userLogin
     })
}