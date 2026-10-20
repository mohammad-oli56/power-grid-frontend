
"use client";

import React, { useEffect, useState } from "react";
import { getAllNotification } from "../../_action/GetAllTecNotification";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const Page = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNotifications = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await getAllNotification();

        console.log("Full API response:", res);

        // Your response: { success, statusCode, message, data: [...] }
        const notificationData = res?.data;

        setNotifications(
          Array.isArray(notificationData) ? notificationData : []
        );
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setIsLoading(false);
      }
    };

    getNotifications();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="animate-pulse text-gray-500">
          Loading notifications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">{error}</p>
        <Button
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Technician Notifications
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Stay updated with your latest notifications.
        </p>

        <p className="mt-3 font-medium text-slate-700">
          Total Notifications: {notifications.length}
        </p>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <div className="mb-3 text-4xl">🔔</div>
          <h2 className="text-lg font-semibold text-slate-800">
            No Notifications
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            You don't have any notifications right now.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl border p-5 transition hover:shadow-md ${
                !notification.isRead
                  ? "border-blue-200 bg-blue-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl">
                  🔔
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-semibold text-slate-900">
                      {notification.title}
                    </h2>

                    {!notification.isRead && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        New
                      </span>
                    )}
                  </div>

                  <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                    {notification.message}
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
