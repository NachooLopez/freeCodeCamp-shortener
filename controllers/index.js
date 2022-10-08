const Url = require("../models/Url.js");
const Counter = require("../models/Counter.js");

async function getNextValue() {
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: "counter" },
      { $inc: { value: 1 } },
      { returnDocument: "after" }
    );
    return counter.value;
  } catch (e) {
    console.error(e);
  }
}

const responseGenerator = (url, n) => ({
  original_url: url,
  short_url: n,
});

module.exports = {
  async postController(req, res) {
    try {
      const { url_input } = req.body;
      const page = await Url.findOne({ destination: url_input });
      if (page)
        return res.json(responseGenerator(page.destination, page.number));

      const newPage = new Url({
        destination: url_input,
        number: await getNextValue(),
      });

      await newPage.save();
      res.json(responseGenerator(newPage.destination, newPage.number));
    } catch (e) {
      console.error(e);
    }
  },

  async getController(req, res) {
    try {
      const { id } = req.params;
      const page = await Url.findOne({ number: id });
      if (page) return res.status(301).redirect(page.destination);
      res.status(404).json({ error: "Page not found" });
    } catch (e) {
      console.error(e);
    }
  },
};
