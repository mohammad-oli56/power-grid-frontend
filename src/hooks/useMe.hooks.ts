"use client";

import { updateprofile } from "@/app/(profile)/_action/updateprofile";
import { updateprofileImage } from "@/app/(profile)/_action/uploadimage";
import { googleaccount } from "@/app/(public)/(authentication)/_action/google.auth";
import { getMe } from "@/service/getMe";
import { logout } from "@/service/logout";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
}

export function useUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateprofile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}


export function useUpdateImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateprofileImage,

    onSuccess: async (result) => {
      if (result.success) {
        await queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
    },
  });
}


export function useGoogle() {
  return useMutation({
    mutationFn: googleaccount
  })
} 


export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      // Clear all React Query cache
      queryClient.clear();
    },
  });
}