const newsRouter = require("./news");

function route(app) {
  app.use("./news", newsRouter);

  // app.get("/paras", (req, res) => {
  //     //code to be executed
  //     const newpara = paras.map((para) => {
  //       const {
  //         acount_rootcchain,
  //         privatekey_rootchain,
  //         rpc_rootchain,
  //         address_token_on_root,
  //         address_of_stakemanager,
  //         address_of_supernetmanager,
  //       } = para;
  //       return {
  //         acount_rootcchain,
  //         privatekey_rootchain,
  //         rpc_rootchain,
  //         address_token_on_root,
  //         address_of_stakemanager,
  //         address_of_supernetmanager,
  //       };
  //     });
  //     res.json(newpara);
  //   });
}

module.exports = route;
