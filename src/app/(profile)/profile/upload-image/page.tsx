"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdateImage } from "@/hooks/useMe.hooks";
import Image from "next/image";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ProfileImageUpload() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending, reset } = useUpdateImage();

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    setMessage("");
    setSuccess(false);
    reset();

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setFile(null);
      setMessage("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setMessage("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  function handleUpload() {
    if (isPending) return;

    if (!file) {
      setSuccess(false);
      setMessage("Please select an image first.");
      return;
    }

    const formData = new FormData();

    // Must match the backend: upload.single("profileimage")
    formData.append("profileimage", file);

    setMessage("");
    setSuccess(false);

    mutate(formData, {
      onSuccess: (result) => {
        setSuccess(result.success);
        setMessage(result.message);

        if (result.success) {
          setFile(null);

          if (inputRef.current) {
            inputRef.current.value = "";
          }

          // Navigate to profile after successful upload.
          router.push("/profile");
          router.refresh();
        }
      },

      onError: (error) => {
        console.error("Profile image upload failed:", error);

        setSuccess(false);
        setMessage("Something went wrong. Please try again.");
      },
    });
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Update Profile Image
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Select a new profile picture. Maximum size is 5 MB.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          {/* Image preview */}
          <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
            {preview ? (
              <Image
                src={preview}
                alt="Selected profile preview"
                width={160}
                height={160}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>

                <span className="text-xs">No image selected</span>
              </div>
            )}
          </div>

          {/* File selection */}
          <label
            htmlFor="profile-image"
            className={`cursor-pointer rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 ${
              isPending ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Choose Image
          </label>

          <input
            ref={inputRef}
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isPending}
            className="sr-only"
          />

          {file && (
            <p className="max-w-full break-all text-center text-sm text-gray-500">
              Selected: {file.name}
            </p>
          )}

          {/* Upload button */}
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || isPending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending && (
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4z"
                />
              </svg>
            )}

            {isPending ? "Uploading..." : "Upload Image"}
          </button>

          {/* Accessible status message */}
          {message && (
            <output
              aria-live="polite"
              className={`w-full rounded-lg p-3 text-sm ${
                success
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </output>
          )}
        </div>
      </section>
    </main>
  );
}
