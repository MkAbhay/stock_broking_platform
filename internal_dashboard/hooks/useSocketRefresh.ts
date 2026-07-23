"use client";

import { useEffect } from "react";
import { useQueryClient, QueryKey } from "@tanstack/react-query";
import { socket } from "@/services/socket";

interface Props {
  queryKey: QueryKey;
  event?: string;
}

export default function useSocketRefresh({
  queryKey,
  event = "data:updated",
}: Props) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleRefresh = () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    };

    socket.on(event, handleRefresh);

    return () => {
      socket.off(event, handleRefresh);
    };
  }, [event, queryClient, queryKey]);
}