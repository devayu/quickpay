import express from "express";
const app = express();
import db from "@repo/db/client";
app.use(express.json());

app.post("/hdfcWebhook", (req, res) => {
  const paymentInfo: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    db.$transaction([
      db.balance.updateMany({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "SUCCESS",
        },
      }),
    ]);
    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    db.onRampTransaction.updateMany({
      where: {
        token: paymentInfo.token,
      },
      data: {
        status: "FAILURE",
      },
    }),
      res.status(411).json({
        message: "Error while processing webhook",
      });
  }
});

app.listen(3003);
