"use client";

import { updateprofile } from "@/app/(profile)/_action/updateprofile";
import { updateprofileImage } from "@/app/(profile)/_action/uploadimage";
import { getMe } from "@/service/getMe";
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