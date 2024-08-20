const authentication = () => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      return token;
    }
  } catch (error) {
    console.log("Error", error);
  }
};
