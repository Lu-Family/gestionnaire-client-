const express = require("express");
const router = express.Router();
const Partner = require("../models/partner");
const connectEnsureLogin = require('connect-ensure-login');

// All partners Route
router.get("/" , connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const partners = await Partner.find(searchOptions);
    res.render("partners/index", {
      partners: partners,
      searchOptions: req.query,
      user: req.user 
    });
  } catch {
    res.redirect("/");
  }
});

// New partner Route
router.get("/new", (req, res) => {
  res.render("partners/new", { partner: new Partner() });
});
// Async fonction to deal with mangoDB and try to catch an error
router.post("/", async (req, res) => {
  const partner = new Partner({
    name: req.body.name,
  });
  try {
    const newPartner = await partner.save();
    // res.redirect(`partners/${newPartners.id}`)
    res.redirect("partners");
  } catch {
    res.render("partners/new", {
      partner: partner,
      errorMessage: "Erreur lors de la création du partenaire",
    });
  }
  /*
// Autocomplete search 
  router.get("/", async (req, res) => {
    try {
      let results;
      if (req.query.name) {
        results = await Partner.aggregate([
          {
            $search: {
              index: "autocomplete",
              autocomplete: {
                query: req.query.name,
                path: "name",
                fuzzy: {
                  maxEdits: 1,
                },
                tokenOrder: "sequential",
              },
            },
          },
          {
            $project: {
              name: 1,
              _id: 1,
            },
          },
          {
            $limit: 10,
          },
        ]);
        if (results) return res.send(results);
      }
      res.send([]);
    } catch (error) {
      console.log(error);
      res.send([]);
    }
  });
*/
});

module.exports = router;
