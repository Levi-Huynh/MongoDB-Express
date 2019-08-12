import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const businesses = await req.context.models.Business.find();
  return res.send(businesses);
});

router.get("/:businessId", async (req, res) => {
  const business = await req.context.models.Business.findById(
    req.params.businessId
  ).populate("message", ["text"]);
  return res.send(business);
});

router.post("/", async (req, res) => {
  const business = await req.context.models.Business.create({
    name: req.body.name,
    wifi: req.body.wifi,
    message: req.body.message
  });

  return res.send(business);
});

router.delete("/:businessId", async (req, res) => {
  const business = await req.context.models.Business.findById(
    req.params.businessId
  );

  let result = null;
  if (business) {
    result = await business.remove();
  }

  return res.send(result);
});

export default router;
