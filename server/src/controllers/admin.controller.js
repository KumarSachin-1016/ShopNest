export const adminTest = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome Admin! You have admin access.",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};