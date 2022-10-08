const dns = require("dns");

module.exports = {
  urlValidator(req, res, next) {
    const { url } = req.body;
    const urlRegex =
      /^(https?:\/\/){1}(www\.)?([\S]+)\.([\S]+)(\.[\S]+)?(\/[\S]+)*$/;

    if (!urlRegex.test(url)) return res.json({ error: "invalid url" });
    next();
  },

  dnsLookup(req, res, next) {
    const { url } = req.body;
    const newUrl = url.split("//")[1].split("/")[0];
    dns.lookup(newUrl, (err) => {
      if (err) return res.json({ error: "invalid url" });
      next();
    });
  },
};
