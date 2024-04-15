import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: string;
  locked: string;
}) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between gap-4 py-4 border-b ">
        <div>Unlocked balance</div>
        <div>{amount} INR</div>
      </div>
      <div className="flex justify-between gap-4 py-4 border-b ">
        <div>Locked balance</div>
        <div>{locked} INR</div>
      </div>
      <div className="flex justify-between gap-4 py-4 border-b ">
        <div>Total balance</div>
        <div>{Number(amount) + Number(locked)} INR</div>
      </div>
    </Card>
  );
};
