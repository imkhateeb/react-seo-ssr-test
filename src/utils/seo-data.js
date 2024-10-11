export function generateMetaInfo() {
  if (window === undefined) return;
  console.log("Pathname", window.location.pathname);
  const path = "/";
  switch (path) {
    case "/":
      return {
        seoTitle: "Buy and Sell Used Bikes Online | DriveX",
        seoDescription:
          "Choose from a variety of Quality Used Bikes. DriveX Certified evaluated at 100+ checkpoints. Benefit from Simple Financing, RC transfer & Free Home Inspections",
        seoImage: "https://s3.drivex.dev/og_image_drivex.png",
      };
    default:
      return {
        seoTitle: "Contact | DriveX",
        seoDescription:
          "I am testing for contact. I had evaluated at 100+ checkpoints. Benefit from Simple Financing, RC transfer & Free Home Inspections",
        seoImage: "https://s3.drivex.dev/og_image_drivex.png",
      };
  }
}
