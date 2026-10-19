
"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Wrench,
  CalendarDays,
  Inbox,
  Loader2,
} from "lucide-react";
import { getAllNotification } from "../_action/getAllNotification";

type Notification = {
  id?: string;
  title?: string | null;
  message?: string | null;
  isRead?: boolean;
  createdAt?: string | null;
  outageId?: string | null;
  scheduleId?: string | null;
};

type NotificationResponse = {
  data?: Notification[] | null;
};

const getNotifications = (response: unknown): Notification[] => {
  if (Array.isArray(response)) {
    return response.filter(
      (item): item is Notification =>
        typeof item === "object" && item !== null,
    );
  }

  if (
    typeof response === "object" &&
    response !== null &&
    "data" in response
  ) {
    const result = response as NotificationResponse;

    if (Array.isArray(result.data)) {
      return result.data.filter(
        (item): item is Notification =>
          typeof item === "object" && item !== null,
      );
    }
  }

  return [];
};

const formatDate = (date?: string | null): string => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(
    date.includes("T") ? date : `${date.replace(" ", "T")}Z`,
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getIcon = (title?: string | null) => {
  const safeTitle = title?.toLowerCase() ?? "";

  if (safeTitle.includes("outage")) {
    return <AlertTriangle className="h-5 w-5" />;
  }

  if (safeTitle.includes("service")) {
    return <Wrench className="h-5 w-5" />;
  }

  if (safeTitle.includes("schedule")) {
    return <CalendarDays className="h-5 w-5" />;
  }

  return <Bell className="h-5 w-5" />;
};

const getIconStyle = (title?: string | null): string => {
  const safeTitle = title?.toLowerCase() ?? "";

  if (safeTitle.includes("outage")) {
    return "bg-red-50 text-red-600";
  }

  if (safeTitle.includes("service")) {
    return "bg-blue-50 text-blue-600";
  }

  if (safeTitle.includes("schedule")) {
    return "bg-violet-50 text-violet-600";
  }

  return "bg-gray-50 text-gray-600";
};

const AllNotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        setIsPending(true);
        setIsError(false);

        const response: unknown = await getAllNotification();
        const result = getNotifications(response);

        if (isMounted) {
          setNotifications(result);
        }
      } catch (error) {
        console.error("Failed to load notifications:", error);

        if (isMounted) {
          setIsError(true);
        }
      } finally {
        if (isMounted) {
          setIsPending(false);
        }
      }
    };

    void fetchNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => notification.isRead === false,
  ).length;

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-2xl border bg-white"
          />
        ))}

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading notifications...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-red-500" />

        <h2 className="mt-3 font-semibold text-gray-900">
          Unable to load notifications
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Bell className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Stay updated with your latest activities.
            </p>
          </div>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl bg-blue-50 px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-blue-600" />

          <span className="text-sm font-medium text-blue-700">
            {unreadCount} unread
          </span>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-semibold text-gray-800">
            Recent Notifications
          </h2>

          <span className="text-sm text-gray-500">
            {notifications.length} total
          </span>
        </div>

        {/* Empty State */}
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
              <Inbox className="h-8 w-8 text-gray-400" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              No notifications yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              You&apos;re all caught up! When you receive a new update, it
              will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification, index) => {
            const title = notification.title?.trim() || "Notification";

            const message =
              notification.message?.trim() ||
              "No additional details available.";

            const isRead = notification.isRead ?? false;

            return (
              <article
                key={notification.id ?? `${title}-${index}`}
                className={`rounded-2xl border p-4 transition-shadow hover:shadow-md sm:p-5 ${
                  isRead
                    ? "border-gray-100 bg-white"
                    : "border-blue-100 bg-blue-50/40"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getIconStyle(title)}`}
                  >
                    {getIcon(title)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="break-words text-sm font-semibold text-gray-900 sm:text-base">
                        {title}
                      </h3>

                      {!isRead && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-2 break-words text-sm leading-6 text-gray-600">
                      {message}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(notification.createdAt)}
                      </span>

                      {isRead && (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Read
                        </span>
                      )}
                    </div>
                  </div>

                  {!isRead && (
                    <span
                      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600"
                      title="Unread"
                    />
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllNotificationPage;
