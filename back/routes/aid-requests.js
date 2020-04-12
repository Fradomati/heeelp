const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

//Models
const AidRequests = require("../models/AidRequests");

// CREATE AidRequest
router.post("/create", isLoggedIn(), async (req, res, next) => {
  try {
    const { title, content, price, time, type } = req.body;
    const idUser = req.user;

    // Create the AidRequest
    await AidRequests.create({
      title,
      content,
      creatorUserid: idUser,
      price,
      time,
      type,
      status: "En creación",
    });

    return res.json({
      status: 200,
      message: "Petición de ayuda creada satisfactoriamente",
    });
  } catch (error) {
    return res.json({
      status: 401,
      message: "Fallo al crear el la petición de ayuda",
    });
  }
});

/* EDIT AidRequest */
router.post("/edit", isLoggedIn(), async (req, res, next) => {
  try {
    const { _id, title, content, price, time } = req.body;
    await AidRequests.findByIdAndUpdate(_id, {
      title,
      content,
      price,
      time,
    });
    return res.json({
      status: 200,
      message: "Petición de ayuda editada satisfactoriamente",
    });
  } catch (error) {
    return res.json({
      status: 401,
      message: "Fallo al crear el la petición de ayuda",
    });
  }
});

//GET ID AidRequest Creator
router.post("/id-creator", async (req, res) => {
  try {
    const idUser = req.user;

    const aidResquests = await AidRequests.find({
      creatorUserid: { _id: idUser._id },
    })
      .sort({ createdAt: -1 })
      .populate("creatorUserid")
      .populate("helperId")
      .populate("shoppinglist");

    return res.json(aidResquests);
  } catch (err) {
    return res.json({ status: 400, message: "Fallo al recibir los datos" });
  }
});

//GET ID AidRequest Helper
router.post("/id-helper", async (req, res) => {
  try {
    const idUser = req.user;

    const aidResquests = await AidRequests.find({
      helperId: { _id: idUser._id },
    })
      .sort({ createdAt: -1 })
      .populate("creatorUserid")
      .populate("helperId")
      .populate("shoppinglist");

    return res.json(aidResquests);
  } catch (err) {
    return res.json({ status: 400, message: "Fallo al recibir los datos" });
  }
});

//GET ALL AidRequest
router.post("/alls", async (req, res) => {
  try {
    const aidResquests = await AidRequests.find()
      .sort({ createdAt: -1 })
      .populate("creatorUserid")
      .populate("helperId")
      .populate("shoppinglist");

    return res.json(aidResquests);
  } catch (err) {
    return res.json({ status: 400, message: "Fallo al recibir los datos" });
  }
});

// //GET ALL AidRequest
// router.post("/alls", async (req, res) => {
//   try {
//     const aidResquests = await AidRequests.find().then(async (aidResquests) => {
//       const arrayModifyList = await Promise.all(
//         aidResquests.map(async (item) => {
//           const dateActually = new Date();

//           if (dateActually > item.time && item.status === "En curso") {
//             const itemModify = await AidRequests.findByIdAndUpdate(item._id, {
//               status: "Realizada",
//             })
//               .sort({ createdAt: -1 })
//               .populate("creatorUserid")
//               .populate("helperId")
//               .populate("shoppinglist");
//             console.log("dsdfdfsdfdsfsdfsdfsdfsdfsf   itemModify", itemModify);
//             return itemModify;
//           }
//           console.log("itemfadsfasfsa", item);
//           return item;
//         })
//       );

//       return arrayModifyList;
//     });
//     return res.json(aidResquests);
//   } catch (err) {
//     return res.json({ status: 400, message: "Fallo al recibir los datos" });
//   }
// });

/* PUBLIC AidRequest */
router.post("/public", isLoggedIn(), async (req, res, next) => {
  try {
    const { _id } = req.body;
    await AidRequests.findByIdAndUpdate(_id, {
      status: "Publicada",
    });
    return res.json({
      status: 200,
      message: "Petición de ayuda publicada satisfactoriamente",
    });
  } catch (error) {
    return res.json({
      status: 401,
      message: "Fallo al publicar la petición de ayuda",
    });
  }
});

/* Add HELPER in AidRequest */
router.post("/add-helper", isLoggedIn(), async (req, res, next) => {
  try {
    const { _id } = req.body;
    const idUser = req.user;
    await AidRequests.findByIdAndUpdate(_id, {
      helperId: idUser._id,
      status: "En curso",
    });
    return res.json({
      status: 200,
      message: "Petición de ayuda añadida a tu listado",
    });
  } catch (error) {
    return res.json({
      status: 401,
      message: "Fallo al añadir a tu listado la petición de ayuda",
    });
  }
});

/* Delete HELPER in AidRequest */
router.post("/delete-helper", isLoggedIn(), async (req, res, next) => {
  try {
    const { _id } = req.body;
    await AidRequests.findByIdAndUpdate(_id, {
      helperId: null,
      status: "Publicada",
    });
    return res.json({
      status: 200,
      message: "Petición de ayuda eliminada de tu listado",
    });
  } catch (error) {
    return res.json({
      status: 401,
      message: "Fallo al eliminar de tu listado la petición de ayuda",
    });
  }
});

/* DUPLICATE AidRequest */
router.post("/duplicate", isLoggedIn(), async (req, res, next) => {
  try {
    const { _id, title, time } = req.body;

    //Find AidRequest
    const oldAidRequest = await (await AidRequests.findById(_id)).populate(
      "shoppinglist"
    );

    // Create the AidRequest
    await AidRequests.create({
      title,
      content: oldAidRequest.content,
      creatorUserid: oldAidRequest.creatorUserid,
      price: oldAidRequest.price,
      time,
      type: oldAidRequest.type,
      status: "En creación",
    });

    return res.json({
      status: 200,
      message: "Petición de ayuda duplicada satisfactoriamente",
    });
  } catch (error) {
    return res.json({
      status: 401,
      message: "Fallo al duplicar la petición de ayuda",
    });
  }
});

module.exports = router;
