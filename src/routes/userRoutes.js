import express from "express";

const router = express.Router();

// dummy users data
const users = [
  { id: 1, name: "Noor", email: "noor@example.com" },
  { id: 2, name: "Arun", email: "arun@example.com" },
];

// View all users
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: users,
  });
});

// view user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

export default router;
