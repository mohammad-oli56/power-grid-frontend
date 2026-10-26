
import { Suspense } from "react";
import VerifyAccount from "../_component/VerifyAccount";


export default function VerifyAccountPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading verification page...
        </div>
      }
    >
      <VerifyAccount />
    </Suspense>
  );
}
