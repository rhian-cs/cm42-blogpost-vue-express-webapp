import express from "express";
import http from "http";

const router = express.Router();

const supportedAssets = [
  "svg",
  "png",
  "jpg",
  "png",
  "jpeg",
  "mp4",
  "ogv",
  "js",
];

const assetExtensionRegex = () => {
  const formattedExtensionList = supportedAssets.join("|");

  return new RegExp(`/.+\.(${formattedExtensionList})$`);
};

router.get(assetExtensionRegex(), (req, res) => {
  proxyRequest(req, res, `http://localhost:5173/src${req.path}`);
});

const proxyRequest = (clientReq, clientRes, url) => {
  const proxy = http.request(url, function (proxyRes) {
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(clientRes, { end: true });
  });

  clientReq.pipe(proxy, { end: true });
};

export default router;
