
export const activeCheck = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running"
  });
};