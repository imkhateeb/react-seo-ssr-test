export function generateMetaInfo({ path, city = "", productDetail = {} }) {
  switch (path) {
    case "/":
      return {
        seoTitle: "Buy and Sell Used Bikes Online | DriveX",
        seoDescription:
          "Choose from a variety of Quality Used Bikes. DriveX Certified evaluated at 100+ checkpoints. Benefit from Simple Financing, RC transfer & Free Home Inspections",
        seoImage: "https://s3.drivex.dev/og_image_drivex.png",
      };
    case `/${city}/buy-two-wheelers/${productDetail?.vehicleId}`:
      return {
        seoTitle: `${productDetail?.vehicleName}`,
        seoDescription: `${productDetail?.vehicleName}`,
        seoImage: `${productDetail?.imagePaths[0]}`,
      };
    default:
      return {
        seoTitle: "Buy and Sell Used Bikes Online | DriveX",
        seoDescription:
          "Choose from a variety of Quality Used Bikes. DriveX Certified evaluated at 100+ checkpoints. Benefit from Simple Financing, RC transfer & Free Home Inspections",
        seoImage: "https://s3.drivex.dev/og_image_drivex.png",
      };
  }
}
