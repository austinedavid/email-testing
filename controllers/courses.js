export const createCourse = async (req, res) => {
  const body = req.body;
  console.log(body.name);
  console.log(body);
  res.send("sent now oooo");
};
