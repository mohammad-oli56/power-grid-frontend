"use client";

import { useGetAllServiceRequest } from "@/hooks/coustomer.hooks";

const PaymentHistory = () => {
  const { data, isPending, isError } = useGetAllServiceRequest();

  if (isPending) return <h1>Loading...</h1>;

  if (isError) return <p>Failed to load payment history.</p>;

  console.log("Payment API response:", data);

  const responseData = data?.data;

  const requests = Array.isArray(responseData)
    ? responseData
    : Array.isArray(responseData?.result)
      ? responseData.result
      : Array.isArray(responseData?.data)
        ? responseData.data
        : [];

  const paidPayments = requests.filter(
    (request: any) => request.payment?.status === "PAID"
  );

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Payment History</h2>

      {paidPayments.length === 0 ? (
        <p>No completed payments found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b p-3">Amount</th>
                <th className="border-b p-3">Transaction ID</th>
                <th className="border-b p-3">Paid At</th>
                <th className="border-b p-3">Provider</th>
              </tr>
            </thead>

            <tbody>
              {paidPayments.map((request: any) => {
                const payment = request.payment;

                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="border-b p-3">
                      {payment.amount}
                    </td>
                    <td className="border-b p-3">
                      {payment.transactionId || "—"}
                    </td>
                    <td className="border-b p-3">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="border-b p-3">
                      {payment.provider}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;