const dns = require("dns");

module.exports = {
  urlValidator(req, res, next) {
    const { url_input } = req.body;
    const urlRegex =
      /^(https?:\/\/){1}(www\.)?([a-zA-Z0-9]+)\.([a-zA-Z0-9]+)(\.[a-zA-Z0-9]+)?(\/[a-zA-Z0-9]+)*$/;

    if (!urlRegex.test(url_input)) return res.json({ error: "invalid url" });
    next();
  },

  dnsLookup(req, res, next) {
    const { url_input } = req.body;
    const url = url_input.split("//")[1].split("/")[0];
    dns.lookup(url, (err) => {
      if (err) return res.json({ error: "invalid url" });
      next();
    });
  },
};
