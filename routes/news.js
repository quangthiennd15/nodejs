var express = require("express");
var router = express.Router();

const newsController = require("../app/controllers/NewsController");

// newsController.index

router.use("/", newsController.index);

module.exports = router;

//route to read data
// app.get("/api/paras", (req, res) => {
//   //code to be executed
//   const newpara = paras.map((para) => {
//     const {
//       acount_rootcchain,
//       privatekey_rootchain,
//       rpc_rootchain,
//       address_token_on_root,
//       address_of_stakemanager,
//       address_of_supernetmanager,
//     } = para;
//     return {
//       acount_rootcchain,
//       privatekey_rootchain,
//       rpc_rootchain,
//       address_token_on_root,
//       address_of_stakemanager,
//       address_of_supernetmanager,
//     };
//   });
//   res.json(newpara);
// });
